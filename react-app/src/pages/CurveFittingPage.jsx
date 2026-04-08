import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./CurveFittingPage.css";

// Plot dimensions (viewBox units)
const PLOT = {
  width: 720,
  height: 480,
  marginLeft: 60,
  marginRight: 30,
  marginTop: 30,
  marginBottom: 50,
};

const X_MIN = -5;
const X_MAX = 5;
const Y_MIN = -10;
const Y_MAX = 10;

const DEGREE = 5; // 5-degree polynomial => 6 coefficients k0..k5
const NUM_POINTS = 12;
const TOTAL_ANIM_MS = 800;

// Convert data coordinates to SVG pixel coordinates
function xToPx(x) {
  const { width, marginLeft, marginRight } = PLOT;
  const plotWidth = width - marginLeft - marginRight;
  return marginLeft + ((x - X_MIN) / (X_MAX - X_MIN)) * plotWidth;
}
function yToPx(y) {
  const { height, marginTop, marginBottom } = PLOT;
  const plotHeight = height - marginTop - marginBottom;
  return marginTop + ((Y_MAX - y) / (Y_MAX - Y_MIN)) * plotHeight;
}

// Seeded random for reproducible points across renders
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generatePoints(seed) {
  const rand = mulberry32(seed);
  // Generate a "true" polynomial we sample from, then add noise
  const trueK = [
    (rand() - 0.5) * 2, // k0
    (rand() - 0.5) * 2, // k1
    (rand() - 0.5) * 0.5, // k2
    (rand() - 0.5) * 0.2, // k3
    (rand() - 0.5) * 0.05, // k4
    (rand() - 0.5) * 0.01, // k5
  ];
  const pts = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    const x = X_MIN + ((i + 0.5) / NUM_POINTS) * (X_MAX - X_MIN) + (rand() - 0.5) * 0.4;
    const yTrue = polynomial(trueK, x);
    const noise = (rand() - 0.5) * 2.5;
    let y = yTrue + noise;
    // Clamp so nothing escapes the plot
    y = Math.max(Y_MIN + 0.5, Math.min(Y_MAX - 0.5, y));
    pts.push({ x, y });
  }
  return pts;
}

function polynomial(k, x) {
  // k[0] + k[1]*x + k[2]*x^2 + ... + k[5]*x^5
  let result = 0;
  let xp = 1;
  for (let i = 0; i < k.length; i++) {
    result += k[i] * xp;
    xp *= x;
  }
  return result;
}

// Per-coefficient slider ranges — higher orders need smaller ranges
const K_RANGES = [
  { min: -10, max: 10, step: 0.01 }, // k0
  { min: -5, max: 5, step: 0.01 }, // k1
  { min: -2, max: 2, step: 0.001 }, // k2
  { min: -1, max: 1, step: 0.001 }, // k3
  { min: -0.3, max: 0.3, step: 0.0001 }, // k4
  { min: -0.05, max: 0.05, step: 0.00001 }, // k5
];

function Dial({ index, value, onChange, learning, mapped, onLearn }) {
  const { min, max, step } = K_RANGES[index];
  const pct = (value - min) / (max - min);
  // Map to -135deg .. 135deg
  const angle = -135 + pct * 270;

  return (
    <div className={`dial ${learning ? "learning" : ""} ${mapped ? "mapped" : ""}`}>
      <div className="dial-label">
        k<sub>{index}</sub>
      </div>
      <div
        className="dial-knob"
        style={{ transform: `rotate(${angle}deg)` }}
        onWheel={(e) => {
          e.preventDefault();
          const delta = e.deltaY < 0 ? step * 10 : -step * 10;
          const next = Math.max(min, Math.min(max, value + delta));
          onChange(next);
        }}
      >
        <div className="dial-indicator" />
      </div>
      <input
        className="dial-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <div className="dial-value">{value.toFixed(4)}</div>
      <button
        className={`dial-learn ${learning ? "learning" : ""}`}
        onClick={() => onLearn(index)}
        title="Click then move a MIDI control to map it"
      >
        {mapped ? "mapped" : learning ? "listening..." : "MIDI learn"}
      </button>
    </div>
  );
}

export default function CurveFittingPage() {
  // Coefficients start at 0 — so the initial curve is y = 0
  const [coeffs, setCoeffs] = useState(() => new Array(DEGREE + 1).fill(0));
  const [visibleCount, setVisibleCount] = useState(0);

  // MIDI state
  const [midiAccess, setMidiAccess] = useState(null);
  const [midiError, setMidiError] = useState(null);
  const [midiDevices, setMidiDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  // mappings[kIndex] = { controller, channel } | null
  const [mappings, setMappings] = useState(() => new Array(DEGREE + 1).fill(null));
  const [learningIndex, setLearningIndex] = useState(null);

  const mappingsRef = useRef(mappings);
  const learningRef = useRef(learningIndex);
  useEffect(() => {
    mappingsRef.current = mappings;
  }, [mappings]);
  useEffect(() => {
    learningRef.current = learningIndex;
  }, [learningIndex]);

  // Generate points once
  const points = useMemo(() => generatePoints(1337), []);

  // Animate points in sequentially over 800ms total
  useEffect(() => {
    setVisibleCount(0);
    const perPoint = TOTAL_ANIM_MS / NUM_POINTS;
    const timeouts = [];
    for (let i = 1; i <= NUM_POINTS; i++) {
      const t = setTimeout(() => setVisibleCount(i), i * perPoint);
      timeouts.push(t);
    }
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Compute the polynomial path string
  const curvePath = useMemo(() => {
    const steps = 200;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const x = X_MIN + (i / steps) * (X_MAX - X_MIN);
      const y = polynomial(coeffs, x);
      // Clamp y for drawing so it doesn't explode
      const yClamped = Math.max(Y_MIN - 5, Math.min(Y_MAX + 5, y));
      const px = xToPx(x);
      const py = yToPx(yClamped);
      d += (i === 0 ? "M" : "L") + px.toFixed(2) + "," + py.toFixed(2) + " ";
    }
    return d;
  }, [coeffs]);

  // MSE across all visible points
  const mse = useMemo(() => {
    const visible = points.slice(0, visibleCount);
    if (!visible.length) return 0;
    let sum = 0;
    for (const p of visible) {
      const yHat = polynomial(coeffs, p.x);
      const err = p.y - yHat;
      sum += err * err;
    }
    return sum / visible.length;
  }, [coeffs, points, visibleCount]);

  const updateCoeff = useCallback((index, value) => {
    setCoeffs((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  // --- Web MIDI ---
  const handleMidiMessage = useCallback((event) => {
    const [status, data1, data2] = event.data;
    const messageType = status & 0xf0;
    const channel = status & 0x0f;

    // 0xB0 = control change, 0xE0 = pitch bend. We handle CC primarily.
    if (messageType !== 0xb0) return;

    const controller = data1;
    const value = data2; // 0..127

    // If we're in learn mode, bind this CC to the current k
    const learningIdx = learningRef.current;
    if (learningIdx !== null) {
      const newMappings = [...mappingsRef.current];
      // Remove this CC from any other slots to avoid duplicates
      for (let i = 0; i < newMappings.length; i++) {
        if (
          newMappings[i] &&
          newMappings[i].controller === controller &&
          newMappings[i].channel === channel
        ) {
          newMappings[i] = null;
        }
      }
      newMappings[learningIdx] = { controller, channel };
      mappingsRef.current = newMappings;
      setMappings(newMappings);
      setLearningIndex(null);
      learningRef.current = null;
      return;
    }

    // Otherwise apply the control to any mapped coefficient
    mappingsRef.current.forEach((m, idx) => {
      if (m && m.controller === controller && m.channel === channel) {
        const { min, max } = K_RANGES[idx];
        const next = min + (value / 127) * (max - min);
        updateCoeff(idx, next);
      }
    });
  }, [updateCoeff]);

  const refreshDevices = useCallback((access) => {
    const inputs = [];
    access.inputs.forEach((input) => {
      inputs.push({ id: input.id, name: input.name, manufacturer: input.manufacturer });
    });
    setMidiDevices(inputs);
    if (inputs.length && !selectedDeviceId) {
      setSelectedDeviceId(inputs[0].id);
    }
  }, [selectedDeviceId]);

  // Request MIDI access
  useEffect(() => {
    if (!navigator.requestMIDIAccess) {
      setMidiError("Web MIDI is not supported in this browser.");
      return;
    }
    let access;
    navigator
      .requestMIDIAccess()
      .then((a) => {
        access = a;
        setMidiAccess(a);
        refreshDevices(a);
        a.onstatechange = () => refreshDevices(a);
      })
      .catch((err) => {
        setMidiError("MIDI access denied: " + err.message);
      });
    return () => {
      if (access) {
        access.inputs.forEach((input) => (input.onmidimessage = null));
        access.onstatechange = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Attach handler only to the selected device
  useEffect(() => {
    if (!midiAccess) return;
    midiAccess.inputs.forEach((input) => {
      if (input.id === selectedDeviceId) {
        input.onmidimessage = handleMidiMessage;
      } else {
        input.onmidimessage = null;
      }
    });
  }, [midiAccess, selectedDeviceId, handleMidiMessage]);

  const resetCoeffs = () => setCoeffs(new Array(DEGREE + 1).fill(0));
  const clearMappings = () => {
    setMappings(new Array(DEGREE + 1).fill(null));
    setLearningIndex(null);
  };

  // Axis ticks
  const xTicks = [];
  for (let x = X_MIN; x <= X_MAX; x++) xTicks.push(x);
  const yTicks = [];
  for (let y = Y_MIN; y <= Y_MAX; y += 2) yTicks.push(y);

  return (
    <div className="curve-fit-page">
      <div className="curve-fit-inner">
        <h1 className="gradient-title">Curve Fitting with MIDI</h1>
        <p className="intro">
          Curve fitting is the process of finding a function that best describes a
          set of data points. In machine learning, we tune the parameters of a
          model — here, the coefficients{" "}
          <code>k<sub>0</sub>..k<sub>5</sub></code> of a 5-degree polynomial
          <code> ŷ = k₀ + k₁x + k₂x² + k₃x³ + k₄x⁴ + k₅x⁵</code> — to minimise a{" "}
          <em>loss function</em>. Below, the loss is the{" "}
          <strong>Mean Squared Error</strong> between each data point and the
          curve. Tweak the dials by hand, or plug in a MIDI controller and map
          its knobs to the coefficients.
        </p>

        <div className="plot-wrapper">
          <svg
            className="plot-svg"
            viewBox={`0 0 ${PLOT.width} ${PLOT.height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Plot background */}
            <rect
              x={PLOT.marginLeft}
              y={PLOT.marginTop}
              width={PLOT.width - PLOT.marginLeft - PLOT.marginRight}
              height={PLOT.height - PLOT.marginTop - PLOT.marginBottom}
              className="plot-bg"
            />

            {/* Grid */}
            {xTicks.map((x) => (
              <line
                key={"gx" + x}
                x1={xToPx(x)}
                x2={xToPx(x)}
                y1={PLOT.marginTop}
                y2={PLOT.height - PLOT.marginBottom}
                className="grid-line"
              />
            ))}
            {yTicks.map((y) => (
              <line
                key={"gy" + y}
                x1={PLOT.marginLeft}
                x2={PLOT.width - PLOT.marginRight}
                y1={yToPx(y)}
                y2={yToPx(y)}
                className="grid-line"
              />
            ))}

            {/* Axes */}
            <line
              x1={PLOT.marginLeft}
              y1={yToPx(0)}
              x2={PLOT.width - PLOT.marginRight}
              y2={yToPx(0)}
              className="axis-line"
            />
            <line
              x1={xToPx(0)}
              y1={PLOT.marginTop}
              x2={xToPx(0)}
              y2={PLOT.height - PLOT.marginBottom}
              className="axis-line"
            />

            {/* Axis labels */}
            {xTicks.map((x) => (
              <text
                key={"tx" + x}
                x={xToPx(x)}
                y={PLOT.height - PLOT.marginBottom + 18}
                className="tick-label"
                textAnchor="middle"
              >
                {x}
              </text>
            ))}
            {yTicks.map((y) => (
              <text
                key={"ty" + y}
                x={PLOT.marginLeft - 8}
                y={yToPx(y) + 4}
                className="tick-label"
                textAnchor="end"
              >
                {y}
              </text>
            ))}

            {/* Polynomial curve */}
            <path d={curvePath} className="curve-line" />

            {/* Error lines (dotted) from each visible point to curve */}
            {points.slice(0, visibleCount).map((p, i) => {
              const yHat = polynomial(coeffs, p.x);
              const yHatClamped = Math.max(Y_MIN - 5, Math.min(Y_MAX + 5, yHat));
              return (
                <line
                  key={"err" + i}
                  x1={xToPx(p.x)}
                  y1={yToPx(p.y)}
                  x2={xToPx(p.x)}
                  y2={yToPx(yHatClamped)}
                  className="error-line"
                />
              );
            })}

            {/* Data points */}
            {points.slice(0, visibleCount).map((p, i) => (
              <circle
                key={"pt" + i}
                cx={xToPx(p.x)}
                cy={yToPx(p.y)}
                r={5}
                className="data-point"
              />
            ))}
          </svg>

          <div className="loss-display">
            <div className="loss-label">MSE loss</div>
            <div className="loss-value">{mse.toFixed(4)}</div>
          </div>
        </div>

        <div className="dials-section">
          <div className="section-head">
            <h2>Coefficients</h2>
            <div className="btn-group">
              <button className="control-btn" onClick={resetCoeffs}>
                Reset to y = 0
              </button>
              <button className="control-btn" onClick={clearMappings}>
                Clear MIDI mappings
              </button>
            </div>
          </div>
          <div className="dials-grid">
            {coeffs.map((v, i) => (
              <Dial
                key={i}
                index={i}
                value={v}
                onChange={(nv) => updateCoeff(i, nv)}
                learning={learningIndex === i}
                mapped={!!mappings[i]}
                onLearn={(idx) =>
                  setLearningIndex((prev) => (prev === idx ? null : idx))
                }
              />
            ))}
          </div>
        </div>

        <div className="midi-section">
          <h2>MIDI input</h2>
          {midiError && <div className="midi-error">{midiError}</div>}
          {!midiError && (
            <>
              <label className="midi-label" htmlFor="midi-device-select">
                Device
              </label>
              <select
                id="midi-device-select"
                className="midi-select"
                value={selectedDeviceId}
                onChange={(e) => setSelectedDeviceId(e.target.value)}
                disabled={!midiDevices.length}
              >
                {midiDevices.length === 0 ? (
                  <option>No MIDI devices connected</option>
                ) : (
                  midiDevices.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} {d.manufacturer ? `(${d.manufacturer})` : ""}
                    </option>
                  ))
                )}
              </select>
              <p className="midi-hint">
                Click <em>MIDI learn</em> on any dial, then move a knob or fader
                on your controller. That CC will be bound to the coefficient.
              </p>
              {mappings.some(Boolean) && (
                <ul className="mapping-list">
                  {mappings.map((m, i) =>
                    m ? (
                      <li key={i}>
                        <code>
                          k<sub>{i}</sub>
                        </code>{" "}
                        ← CC{m.controller} (ch {m.channel + 1})
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

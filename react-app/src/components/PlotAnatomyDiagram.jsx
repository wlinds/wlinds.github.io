import { useState } from "react";

const LABELS = {
  en: {
    title: "Revenue & Units Sold (2019-2024)",
    yLeft: "Revenue (MSEK)",
    yRight: "Units Sold",
    xLabel: "Year",
    profit: "Profit",
    loss: "Loss",
    unitsSold: "Units Sold",
    // Annotations
    annTitle: "Chart Title",
    annYAxis: "Y-Axis Title",
    annSecondaryY: "Secondary Y-Axis",
    annYTicks: "Y-Axis Tick Labels",
    annXAxis: "X-Axis Title",
    annXTicks: "X-Axis Tick Labels",
    annGridLines: "Grid Lines",
    annDataPoint: "Data Point",
    annLineSeries: "Line Series",
    annColumnSeries: "Column Series",
    annPlotArea: "Plot Area",
    annLegend: "Legend",
  },
  sv: {
    title: "Omsättning & Antal Sålda (2019-2024)",
    yLeft: "Omsättning (MSEK)",
    yRight: "Antal Sålda",
    xLabel: "År",
    profit: "Vinst",
    loss: "Förlust",
    unitsSold: "Antal Sålda",
    // Annotations
    annTitle: "Titel",
    annYAxis: "Y-axelns titel",
    annSecondaryY: "Sekundär Y-axel",
    annYTicks: "Skalmarkeringar",
    annXAxis: "X-axelns titel",
    annXTicks: "Skalmarkeringar",
    annGridLines: "Rutnät",
    annDataPoint: "Datapunkt",
    annLineSeries: "Linjeserie",
    annColumnSeries: "Stapel",
    annPlotArea: "Diagramyta",
    annLegend: "Förklaring",
  },
};

export default function PlotAnatomyDiagram() {
  const [lang, setLang] = useState("en");
  const t = LABELS[lang];

  return (
    <div style={{ margin: "1.5rem 0" }}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <button
          onClick={() => setLang("en")}
          style={{
            padding: "0.3rem 0.75rem",
            borderRadius: "6px",
            border: "1px solid",
            borderColor: lang === "en" ? "#8548f5" : "#2a2a3a",
            background: lang === "en" ? "rgb(133 72 245 / 15%)" : "transparent",
            color: lang === "en" ? "#b794f4" : "#6b7280",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 500,
            fontFamily: "inherit",
          }}
        >
          English
        </button>
        <button
          onClick={() => setLang("sv")}
          style={{
            padding: "0.3rem 0.75rem",
            borderRadius: "6px",
            border: "1px solid",
            borderColor: lang === "sv" ? "#8548f5" : "#2a2a3a",
            background: lang === "sv" ? "rgb(133 72 245 / 15%)" : "transparent",
            color: lang === "sv" ? "#b794f4" : "#6b7280",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 500,
            fontFamily: "inherit",
          }}
        >
          Svenska
        </button>
      </div>

      <svg
        viewBox="0 0 900 560"
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        fontFamily="'Work Sans', system-ui, sans-serif"
      >
        <defs>
          <marker id="ann-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#b794f4" />
          </marker>
        </defs>

        {/* Background */}
        <rect width="900" height="560" fill="#0d0d13" rx="12" />

        {/* Title */}
        <text x="320" y="48" fill="#b794f4" fontSize="15" fontWeight="600">{t.title}</text>

        {/* Plot area */}
        <rect x="120" y="65" width="580" height="340" fill="#14141e" rx="4" stroke="#1e1e2e" strokeWidth="1" />

        {/* Grid lines */}
        <line x1="120" y1="133" x2="700" y2="133" stroke="#1e1e2e" strokeWidth="1" />
        <line x1="120" y1="201" x2="700" y2="201" stroke="#1e1e2e" strokeWidth="1" />
        <line x1="120" y1="269" x2="700" y2="269" stroke="#1e1e2e" strokeWidth="1" />
        <line x1="120" y1="337" x2="700" y2="337" stroke="#1e1e2e" strokeWidth="1" />

        {/* Y-axis label left */}
        <text x="18" y="240" fill="#6b7280" fontSize="12" transform="rotate(-90,18,240)" textAnchor="middle">{t.yLeft}</text>

        {/* Y-axis tick labels left */}
        <text x="108" y="72" fill="#6b7280" fontSize="11" textAnchor="end">400</text>
        <text x="108" y="137" fill="#6b7280" fontSize="11" textAnchor="end">300</text>
        <text x="108" y="205" fill="#6b7280" fontSize="11" textAnchor="end">200</text>
        <text x="108" y="273" fill="#6b7280" fontSize="11" textAnchor="end">100</text>
        <text x="108" y="341" fill="#6b7280" fontSize="11" textAnchor="end">0</text>
        <text x="108" y="409" fill="#6b7280" fontSize="11" textAnchor="end">-100</text>

        {/* Y-axis label right */}
        <text x="882" y="240" fill="#6b7280" fontSize="12" transform="rotate(90,882,240)" textAnchor="middle">{t.yRight}</text>

        {/* Y-axis tick labels right */}
        <text x="712" y="72" fill="#6b7280" fontSize="11" textAnchor="start">15k</text>
        <text x="712" y="137" fill="#6b7280" fontSize="11" textAnchor="start">12k</text>
        <text x="712" y="205" fill="#6b7280" fontSize="11" textAnchor="start">9k</text>
        <text x="712" y="273" fill="#6b7280" fontSize="11" textAnchor="start">6k</text>
        <text x="712" y="341" fill="#6b7280" fontSize="11" textAnchor="start">3k</text>
        <text x="712" y="409" fill="#6b7280" fontSize="11" textAnchor="start">0</text>

        {/* X-axis tick labels */}
        <text x="186" y="425" fill="#6b7280" fontSize="12" textAnchor="middle">2019</text>
        <text x="282" y="425" fill="#6b7280" fontSize="12" textAnchor="middle">2020</text>
        <text x="378" y="425" fill="#6b7280" fontSize="12" textAnchor="middle">2021</text>
        <text x="474" y="425" fill="#6b7280" fontSize="12" textAnchor="middle">2022</text>
        <text x="570" y="425" fill="#6b7280" fontSize="12" textAnchor="middle">2023</text>
        <text x="666" y="425" fill="#6b7280" fontSize="12" textAnchor="middle">2024</text>

        {/* X-axis label */}
        <text x="410" y="450" fill="#6b7280" fontSize="12" textAnchor="middle">{t.xLabel}</text>

        {/* Bars */}
        <rect x="162" y="269" width="48" height="68" fill="#4ade80" rx="2" opacity="0.85" />
        <rect x="258" y="235" width="48" height="102" fill="#4ade80" rx="2" opacity="0.85" />
        <rect x="354" y="337" width="48" height="40" fill="#ef4444" rx="2" opacity="0.85" />
        <rect x="450" y="337" width="48" height="60" fill="#ef4444" rx="2" opacity="0.85" />
        <rect x="546" y="302" width="48" height="35" fill="#4ade80" rx="2" opacity="0.85" />
        <rect x="642" y="337" width="48" height="25" fill="#ef4444" rx="2" opacity="0.85" />

        {/* Line */}
        <polyline points="186,250 282,140 378,170 474,300 570,280 666,310" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />

        {/* Data points */}
        <circle cx="186" cy="250" r="5" fill="#f59e0b" />
        <circle cx="282" cy="140" r="5" fill="#f59e0b" />
        <circle cx="378" cy="170" r="5" fill="#f59e0b" />
        <circle cx="474" cy="300" r="5" fill="#f59e0b" />
        <circle cx="570" cy="280" r="5" fill="#f59e0b" />
        <circle cx="666" cy="310" r="5" fill="#f59e0b" />

        {/* Legend */}
        <rect x="200" y="470" width="400" height="32" fill="#14141e" rx="6" stroke="#1e1e2e" />
        <rect x="220" y="481" width="12" height="12" fill="#4ade80" rx="2" />
        <text x="238" y="492" fill="#9ca3af" fontSize="11">{t.profit}</text>
        <rect x="300" y="481" width="12" height="12" fill="#ef4444" rx="2" />
        <text x="318" y="492" fill="#9ca3af" fontSize="11">{t.loss}</text>
        <line x1="380" y1="487" x2="400" y2="487" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="390" cy="487" r="3" fill="#f59e0b" />
        <text x="408" y="492" fill="#9ca3af" fontSize="11">{t.unitsSold}</text>

        {/* ===== Annotations ===== */}
        <text x="610" y="30" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annTitle}</text>
        <line x1="600" y1="34" x2="520" y2="44" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />

        <text x="42" y="120" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annYAxis}</text>
        <line x1="42" y1="124" x2="24" y2="190" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />

        <text x="760" y="120" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annSecondaryY}</text>
        <line x1="850" y1="124" x2="876" y2="190" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />

        <text x="10" y="350" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annYTicks}</text>
        <line x1="78" y1="344" x2="100" y2="338" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />

        <text x="420" y="540" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annXAxis}</text>
        <line x1="440" y1="534" x2="418" y2="455" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />

        <text x="148" y="455" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annXTicks}</text>
        <line x1="180" y1="449" x2="186" y2="432" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />

        <text x="740" y="202" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annGridLines}</text>
        <line x1="740" y1="204" x2="702" y2="201" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />

        <text x="310" y="120" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annDataPoint}</text>
        <line x1="332" y1="124" x2="284" y2="136" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />

        <text x="520" y="260" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annLineSeries}</text>
        <line x1="530" y1="264" x2="490" y2="280" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />

        <text x="120" y="216" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annColumnSeries}</text>
        <line x1="168" y1="222" x2="180" y2="265" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />

        <text x="740" y="80" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annPlotArea}</text>
        <line x1="740" y1="82" x2="702" y2="70" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />

        <text x="620" y="485" fill="#e9ecf2" fontSize="12" fontWeight="600">{t.annLegend}</text>
        <line x1="618" y1="483" x2="604" y2="483" stroke="#b794f4" strokeWidth="1.2" markerEnd="url(#ann-arrow)" />
      </svg>
    </div>
  );
}

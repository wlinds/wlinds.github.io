import { Link } from "react-router-dom";
import "./AppPage.css";

export default function MeretPage() {
  return (
    <div className="app-page theme-dark" style={{ "--accent": "#fed06e" }}>
      <div className="app-page-container">
        <div className="app-hero">
          <img
            src="/assets/images/meret/meret-logo.png"
            alt="Meret App Icon"
            className="app-icon"
          />
          <h1>Meret</h1>
          <p className="app-tagline">Lossless Audio Recorder</p>
          <p className="app-subtitle">
            Record in WAV or ALAC. Transfer to your DAW over WiFi. No cables, no
            cloud, no compression.
          </p>
          <a href="https://apps.apple.com/dk/app/meret-pro-audio-capture/id6758951462" className="app-store-badge">
            <img
              src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-us?size=250x83"
              alt="Download on the App Store"
            />
          </a>
        </div>

        <div className="app-card">
          <h2 className="app-card-title">Features</h2>
          <div className="app-feature-grid">
            <div className="app-feature">
              <div>
                <h3>Lossless Recording</h3>
                <p>WAV, ALAC, or AAC. Up to 96kHz/24-bit.</p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>WiFi Transfer</h3>
                <p>Download files directly to your computer.</p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Pro Meters</h3>
                <p>Real-time peak levels with clipping detection.</p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Privacy First</h3>
                <p>No cloud. No accounts. Your files stay yours.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="app-card">
          <h2 className="app-card-title">Specs</h2>
          <div className="app-specs">
            <span className="app-spec-tag">WAV</span>
            <span className="app-spec-tag">ALAC</span>
            <span className="app-spec-tag">AAC</span>
            <span className="app-spec-tag">44.1kHz</span>
            <span className="app-spec-tag">48kHz</span>
            <span className="app-spec-tag highlight">96kHz</span>
            <span className="app-spec-tag">16-bit</span>
            <span className="app-spec-tag highlight">24-bit</span>
            <span className="app-spec-tag">Stereo</span>
            <span className="app-spec-tag">Bonjour</span>
          </div>
        </div>

        <div className="app-card">
          <h2 className="app-card-title">Perfect For</h2>
          <p className="app-about-text">
            Musicians capturing ideas. Podcasters recording interviews. Field
            recorders and sound designers. Audio engineers who need quick capture.
            Anyone who's tired of Voice Memos quality.
          </p>
        </div>

        <div className="app-page-footer">
          <p>&copy; 2026 William Akilles Lindstedt</p>
          <p className="app-footer-links">
            <a href="mailto:akilles@wlinds.se">Contact</a>
            <span className="app-footer-divider">&middot;</span>
            <Link to="/meret-privacy">Privacy Policy</Link>
            <span className="app-footer-divider">&middot;</span>
            <Link to="/meret-support">Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

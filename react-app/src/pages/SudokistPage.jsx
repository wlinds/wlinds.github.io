import { Link } from "react-router-dom";
import "./AppPage.css";

export default function SudokistPage() {
  return (
    <div className="app-page theme-dark" style={{ "--accent": "#3b82f6" }}>
      <div className="app-page-container">
        <div className="app-hero">
          <img
            src="/assets/images/sudokist/sudokist-app-icon.png"
            alt="Sudokist App Icon"
            className="app-icon"
          />
          <h1>Sudokist</h1>
          <p className="app-tagline">Sudoku for iOS</p>
          <p className="app-subtitle">
            A small, offline Sudoku app. No ads, no bloat.
          </p>
          <a href="#" className="app-store-badge">
            <img
              src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-us?size=250x83"
              alt="Download on the App Store"
            />
          </a>
        </div>

        <div className="app-card">
          <h2 className="app-card-title">Why Sudokist</h2>
          <div className="app-stats">
            <div className="app-stat">
              <div className="app-stat-value">&lt;20MB</div>
              <div className="app-stat-label">App Size</div>
            </div>
            <div className="app-stat">
              <div className="app-stat-value">0</div>
              <div className="app-stat-label">Ads</div>
            </div>
            <div className="app-stat">
              <div className="app-stat-value">4</div>
              <div className="app-stat-label">Difficulty Levels</div>
            </div>
          </div>
        </div>

        <div className="app-card">
          <h2 className="app-card-title">Features</h2>
          <div className="app-feature-grid">
            <div className="app-feature">
              <div>
                <h3>Offline puzzles</h3>
                <p>Generated on-device. No internet needed.</p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Notes</h3>
                <p>Mark candidates per cell.</p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Highlighting</h3>
                <p>Related cells and matching numbers.</p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Statistics</h3>
                <p>Times and completion rates per difficulty.</p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Undo</h3>
                <p>Step back as many moves as you need.</p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Dark mode</h3>
                <p>Follows system appearance.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="app-card">
          <h2 className="app-card-title">About</h2>
          <p className="app-about-text">
            Most Sudoku apps are oversized, ad-heavy, and full of unnecessary
            mechanics. Sudokist is the opposite: a lightweight app that does
            one thing well.
          </p>
        </div>

        <div className="app-page-footer">
          <p>&copy; 2026 William Akilles Lindstedt</p>
          <p className="app-footer-links">
            <a href="mailto:akilles.dev@gmail.com">Contact</a>
            <span className="app-footer-divider">&middot;</span>
            <Link to="/sudokist-privacy">Privacy Policy</Link>
            <span className="app-footer-divider">&middot;</span>
            <Link to="/sudokist-support">Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

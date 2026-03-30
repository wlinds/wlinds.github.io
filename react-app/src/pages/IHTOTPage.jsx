import { Link } from "react-router-dom";
import "./AppPage.css";

export default function IHTOTPage() {
  return (
    <div className="app-page theme-dark ihtot-page" style={{ "--accent": "#f87171" }}>
      <video
        className="ihtot-bg-video"
        autoPlay
        loop
        muted
        playsInline
        src="/assets/videos/IHTOT-early-demo.mp4"
      />
      <div className="ihtot-bg-overlay" />

      <div className="ihtot-hero-split">
        <div className="ihtot-hero-text">
          <h1>Invaders Hate This One Trick</h1>
          <p className="app-tagline">Block-stacking survival</p>
          <p className="app-subtitle">
            Stack blocks around your Core while a beat-synced invader tries to
            destroy it. Like Space Invaders, but inverted. You're the one
            being shot at.
          </p>
          <a href="#" className="app-store-badge">
            <img
              src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-us?size=250x83"
              alt="Download on the App Store"
            />
          </a>
        </div>
        <div className="ihtot-hero-video">
          <div className="ihtot-phone-frame">
            <video
              autoPlay
              loop
              muted
              playsInline
              src="/assets/videos/IHTOT-early-demo.mp4"
            />
          </div>
        </div>
      </div>

      <div className="app-page-container">
        <div className="app-card">
          <h2 className="app-card-title">How to Play</h2>
          <div className="app-feature-grid">
            <div className="app-feature">
              <div>
                <h3>Move piece</h3>
                <p>Hold and drag left/right.</p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Rotate piece</h3>
                <p>Tap anywhere.</p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Drop piece</h3>
                <p>Swipe down.</p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Survive</h3>
                <p>Keep your Core alive as the invader evolves.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="app-card">
          <h2 className="app-card-title">Features</h2>
          <ul className="app-features-list ihtot-features">
            <li>Beat-synced audio and invader mechanics</li>
            <li>Fortification system: match colors for defense bonuses</li>
            <li>4 upgrades: Shield, Power, Luck, Magnet</li>
            <li>Multi-stage progression with evolving invader phases</li>
            <li>Adaptive zoom and dynamic visual effects</li>
            <li>11 piece shapes, 8 colors</li>
          </ul>
        </div>

        <div className="app-card">
          <h2 className="app-card-title">About</h2>
          <p className="app-about-text">
            Stack blocks to fortify your Core, choose upgrades between stages,
            and outlast an invader that gets smarter and more aggressive as you
            progress. Every drop rotates the structure. Plan accordingly.
          </p>
        </div>

        <div className="app-page-footer">
          <p>&copy; 2026 William Akilles Lindstedt</p>
          <p className="app-footer-links">
            <a href="mailto:akilles.dev@gmail.com">Contact</a>
            <span className="app-footer-divider">&middot;</span>
            <Link to="/ihtot-privacy">Privacy Policy</Link>
            <span className="app-footer-divider">&middot;</span>
            <Link to="/ihtot-support">Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

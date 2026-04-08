import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header id="header">
      <nav className="header-container">
        <div className="header-main">
          <div className="logo">
            <h1>🍍</h1>
            <Link to="/" className="logo-text">
              wlinds.github.io
            </Link>
          </div>

          <div className="header-right hidden-md">
            <div className="nav-links">
              <Link to="/" className="nav-btn">Home</Link>
              <Link to="/blog" className="nav-btn">Blog</Link>
              <Link to="/code" className="nav-btn hidden-lg">Code</Link>
              <Link to="/ml-concepts" className="nav-btn hidden-lg">AI/ML Models</Link>
              <Link to="/curve-fitting" className="nav-btn hidden-lg">Curve Fitting</Link>
              <Link to="/downloads" className="nav-btn hidden-lg">Downloads</Link>
            </div>

            <div className="social-icons">
              <a href="https://bsky.app/profile/wlinds.bsky.social" target="_blank" rel="noopener noreferrer">
                <img src="/assets/icons/bluesky.svg" alt="Bluesky" className="icon" />
              </a>
              <a href="https://twitter.com/wlinds_" target="_blank" rel="noopener noreferrer">
                <img src="/assets/icons/x.svg" alt="Twitter" className="icon hidden-sm" />
              </a>
              <a href="https://www.linkedin.com/in/williamlindstedt/" target="_blank" rel="noopener noreferrer">
                <img src="/assets/icons/linkedin.svg" alt="LinkedIn" className="icon hidden-sm" />
              </a>
              <a href="https://github.com/wlinds" target="_blank" rel="noopener noreferrer">
                <img src="/assets/icons/github.svg" alt="GitHub" className="icon" />
              </a>
            </div>
          </div>

          <button className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
            <img src="/assets/icons/hamburger.svg" alt="Menu" />
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-menu">
            <div className="mobile-links">
              <Link to="/" className="mobile-btn" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/blog" className="mobile-btn" onClick={() => setMobileOpen(false)}>Blog</Link>
              <Link to="/code" className="mobile-btn" onClick={() => setMobileOpen(false)}>Code</Link>
              <Link to="/ml-concepts" className="mobile-btn" onClick={() => setMobileOpen(false)}>AI/ML Models</Link>
              <Link to="/curve-fitting" className="mobile-btn" onClick={() => setMobileOpen(false)}>Curve Fitting</Link>
              <Link to="/downloads" className="mobile-btn" onClick={() => setMobileOpen(false)}>Downloads</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

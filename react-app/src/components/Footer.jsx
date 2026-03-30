import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-column">
            <h3 className="footer-title">About</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/blog" className="footer-link">Blog</Link></li>
              <li><Link to="/about" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Audio</h3>
            <ul className="footer-links">
              <li><a href="https://soundcloud.com/lindstedt" className="footer-link">SoundCloud</a></li>
              <li><Link to="/downloads" className="footer-link">Synth Presets</Link></li>
              <li><Link to="/downloads" className="footer-link">Drum Samples</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Assets</h3>
            <ul className="footer-links">
              <li><Link to="/downloads" className="footer-link">Downloads</Link></li>
              <li><Link to="/ml-concepts" className="footer-link">ML Models</Link></li>
              <li><a href="https://gist.github.com/wlinds" className="footer-link">Gists</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Links</h3>
            <ul className="footer-links">
              <li><a href="https://twitter.com/wlinds_" className="footer-link">Twitter/X</a></li>
              <li><a href="https://bsky.app/profile/wlinds.bsky.social" className="footer-link">Bluesky</a></li>
              <li><a href="https://github.com/wlinds" className="footer-link">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/williamlindstedt/" className="footer-link">LinkedIn</a></li>
              <li><a href="https://discordapp.com/users/379866962462769173" className="footer-link">Discord</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Apps</h3>
            <ul className="footer-links">
              <li><a href="https://github.com/wlinds/uci-dataset-loader" className="footer-link">UCI Dataset Loader</a></li>
              <li><Link to="/doggo-blocks" className="footer-link">Doggo Blocks</Link></li>
            </ul>
          </div>
        </div>
        <div className="persistent-footer">
          <p>
            wlinds &copy; 2024 |{" "}
            <a href="https://github.com/wlinds/wlinds.github.io" className="footer-link">
              Source Code
            </a>{" "}
            | William Akilles Lindstedt
          </p>
        </div>
      </div>
    </footer>
  );
}

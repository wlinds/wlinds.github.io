import { Link } from "react-router-dom";
import "./AppPage.css";

export default function IHTOTPrivacy() {
  return (
    <div className="app-legal theme-dark" style={{ "--accent": "#f87171" }}>
      <div className="app-legal-container">
        <h1>Privacy Policy</h1>
        <p className="app-legal-name">Invaders Hate This One Trick</p>
        <p className="app-legal-date">Last updated: March 2026</p>

        <div className="app-legal-highlight">
          <p>
            This app does not collect, store, or transmit any personal data.
          </p>
        </div>

        <h2>Data Collection</h2>
        <p>
          We do not collect any information from you. The app works entirely
          offline and does not communicate with any servers.
        </p>

        <h2>Local Storage</h2>
        <p>
          Your game progress and high scores are stored locally on your device.
          This data never leaves your device and is not accessible to us or any
          third parties.
        </p>

        <h2>Analytics</h2>
        <p>
          This app does not use any analytics or tracking services.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          This app does not integrate with any third-party services, advertising
          networks, or social media platforms.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          This app is safe for users of all ages. We do not collect any
          information from anyone, including children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          If we ever change this policy, we will update this page and the "Last
          updated" date above.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email us at{" "}
          <a href="mailto:akilles.dev@gmail.com">akilles.dev@gmail.com</a>.
        </p>

        <Link to="/ihtot" className="app-legal-back">
          &larr; Back
        </Link>
      </div>
    </div>
  );
}

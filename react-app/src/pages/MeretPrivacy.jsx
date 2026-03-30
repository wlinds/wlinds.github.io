import { Link } from "react-router-dom";
import "./AppPage.css";

export default function MeretPrivacy() {
  return (
    <div className="app-legal theme-dark" style={{ "--accent": "#fed06e" }}>
      <div className="app-legal-container">
        <h1>Privacy Policy</h1>
        <p className="app-legal-name">Meret</p>
        <p className="app-legal-date">Last updated: February 2026</p>

        <div className="app-legal-highlight">
          <p>
            <strong>TL;DR:</strong> Meret doesn't collect any data. Your
            recordings stay on your device. We can't see them, and we don't want
            to.
          </p>
        </div>

        <h2>Overview</h2>
        <p>
          Meret is designed with privacy as a core principle. We believe your
          audio recordings are personal and should remain under your control at
          all times.
        </p>

        <h2>Data Collection</h2>
        <p>
          Meret does not collect, transmit, or store any personal information. We
          do not use analytics, tracking pixels, or any form of usage monitoring.
        </p>
        <p>
          Your audio recordings are stored locally on your device in the app's
          Documents folder. They are never uploaded to any server unless you
          explicitly transfer them using the WiFi Transfer feature.
        </p>

        <h2>WiFi Transfer</h2>
        <p>
          The WiFi Transfer feature creates a local HTTP server that runs
          entirely on your device. Files are transferred directly over your local
          network to the connected computer. No data passes through external
          servers.
        </p>
        <p>
          The server only runs when you explicitly start it and stops when you
          tap "Stop Server" or close the app.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Meret does not integrate any third-party analytics, advertising, or
          tracking services. The app functions entirely offline and does not
          require an internet connection.
        </p>

        <h2>Files App Integration</h2>
        <p>
          Meret integrates with the iOS Files app, allowing you to access your
          recordings from other apps. This is a local feature that does not
          involve any network transmission.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Meret is rated 4+ and does not collect any information from users of
          any age.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          If we ever change this policy, we will update the "Last updated" date
          above. Significant changes will be noted in the app's release notes.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this privacy policy:{" "}
          <a href="mailto:akilles.dev@gmail.com">akilles.dev@gmail.com</a>.
        </p>

        <Link to="/meret" className="app-legal-back">
          &larr; Back to Meret
        </Link>
      </div>
    </div>
  );
}

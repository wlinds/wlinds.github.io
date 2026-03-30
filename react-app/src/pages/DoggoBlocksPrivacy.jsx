import { Link } from "react-router-dom";
import "./AppPage.css";

export default function DoggoBlocksPrivacy() {
  return (
    <div className="app-legal theme-dark" style={{ "--accent": "#b794f4" }}>
      <div className="app-legal-container">
        <h1>Privacy Policy</h1>
        <p className="app-legal-name">Doggo Blocks</p>
        <p className="app-legal-date">Last updated: January 2026</p>

        <h2>Overview</h2>
        <p>
          Doggo Blocks is designed with your privacy in mind. We do not collect,
          store, or share any personal information.
        </p>

        <h2>Data Collection</h2>
        <p>
          The app does not collect any personal data. Your game progress and high
          scores are stored locally on your device and are not transmitted to any
          external servers.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Doggo Blocks version 1.1 and above uses Google AdMob to display
          advertisements. AdMob may collect certain information for ad
          personalization. Version 1.0 does not contain any advertisements. You
          can learn more about Google's privacy practices at{" "}
          <a href="https://policies.google.com/privacy">
            Google Privacy Policy
          </a>
          .
        </p>
        <p>
          The app also uses Apple's Game Center for leaderboards and
          achievements. Game Center is subject to{" "}
          <a href="https://www.apple.com/legal/privacy/">
            Apple's Privacy Policy
          </a>
          .
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Doggo Blocks is rated 4+ and is suitable for all ages. We do not
          knowingly collect any information from children.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at <a href="mailto:akilles.dev@gmail.com">akilles.dev@gmail.com</a>.
        </p>

        <Link to="/doggo-blocks" className="app-legal-back">
          &larr; Back to Doggo Blocks
        </Link>
      </div>
    </div>
  );
}

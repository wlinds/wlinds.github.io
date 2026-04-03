import { Link } from "react-router-dom";
import "./AppPage.css";

export default function PlantPlannerPrivacy() {
  return (
    <div className="app-legal theme-plant" style={{ "--accent": "#4a7c59" }}>
      <div className="app-legal-container">
        <h1>Privacy Policy</h1>
        <p className="app-legal-name">PlantPlanner</p>
        <p className="app-legal-date">Last updated: April 2026</p>

        <div className="app-legal-highlight">
          <p>
            <strong>TL;DR:</strong> PlantPlanner uses your location to determine
            your growing zone. We don't store it on any server. Your plants,
            photos, and progress stay on your device.
          </p>
        </div>

        <h2>Overview</h2>
        <p>
          PlantPlanner is designed to help you grow plants, not to collect your
          data. Your privacy is a core design principle.
        </p>

        <h2>Location Data</h2>
        <p>
          The app requests location access to determine your hardiness zone and
          provide accurate planting recommendations. Your location is processed
          on-device and is not transmitted to any external server. You can also
          enter your location manually instead of using GPS.
        </p>

        <h2>Data Storage</h2>
        <p>
          Your plant collection, growing progress, journal photos, and
          preferences are stored locally on your device. This data is never
          uploaded to any server unless you explicitly choose to share it (e.g.
          sharing a completion collage via the system share sheet).
        </p>

        <h2>Weather Data</h2>
        <p>
          The app may fetch weather information to provide care recommendations.
          This uses Apple's WeatherKit service. No personally identifiable
          information is sent with these requests.
        </p>

        <h2>Analytics</h2>
        <p>
          PlantPlanner does not use any analytics, tracking, or advertising
          services.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          The app does not integrate with any third-party advertising networks or
          social media SDKs.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          PlantPlanner is rated 4+ and is suitable for all ages. We do not
          knowingly collect any information from children.
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

        <Link to="/plantplanner" className="app-legal-back">
          &larr; Back to PlantPlanner
        </Link>
      </div>
    </div>
  );
}

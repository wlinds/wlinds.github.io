import { Link } from "react-router-dom";
import "./AppPage.css";

export default function PlantPlannerDeleteAccount() {
  return (
    <div className="app-legal theme-plant" style={{ "--accent": "#4a7c59" }}>
      <div className="app-legal-container">
        <h1>Delete Account & Data</h1>
        <p className="app-legal-name">Plant Planner</p>

        <h2>How Your Data Works</h2>
        <p>
          Plant Planner stores all data locally on your device. We do not maintain
          user accounts or store any personal data on external servers.
        </p>

        <h2>Delete Your Data</h2>
        <p>
          Since all data is stored on your device, you can delete it at any time
          by uninstalling the app. This permanently removes all your plant
          collections, growing progress, journal photos, and preferences.
        </p>

        <h2>Request Account Deletion</h2>
        <p>
          If you believe we hold any data associated with your use of
          Plant Planner and would like it deleted, please contact us at{" "}
          <a href="mailto:akilles.dev@gmail.com?subject=Plant%20Planner%20Account%20Deletion%20Request">
            akilles.dev@gmail.com
          </a>{" "}
          and we will process your request within 7 days.
        </p>

        <Link to="/plantplanner" className="app-legal-back">
          &larr; Back to Plant Planner
        </Link>
      </div>
    </div>
  );
}

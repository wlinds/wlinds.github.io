import { Link } from "react-router-dom";
import "./AppPage.css";

export default function PlantPlannerSupport() {
  return (
    <div className="app-legal theme-plant" style={{ "--accent": "#4a7c59" }}>
      <div className="app-legal-container">
        <h1>Support</h1>
        <p className="app-legal-name">PlantPlanner</p>

        <h2>Getting Started</h2>
        <p>
          When you first open PlantPlanner, allow location access or enter your
          location manually. The app uses this to determine your hardiness zone
          and show you plants that grow well in your area.
        </p>

        <h2>Frequently Asked Questions</h2>

        <div className="app-faq">
          <h3>How does the app know what I can grow?</h3>
          <p>
            PlantPlanner uses your location to determine your hardiness zone
            (klimatzon in Swedish). Each plant in the database has zone
            compatibility data, so the app only shows plants that can thrive
            where you live.
          </p>
        </div>

        <div className="app-faq">
          <h3>Can I use the app without sharing my location?</h3>
          <p>
            Yes. You can enter your location manually, or skip location setup
            entirely. Without a location, the app shows year-round plants that
            don't depend on climate zone.
          </p>
        </div>

        <div className="app-faq">
          <h3>What does "Start Growing" do?</h3>
          <p>
            It creates a personalized checklist for that plant -- supplies to
            gather, preparation steps, and care milestones. You'll get reminders
            at key stages and prompts to photograph your progress.
          </p>
        </div>

        <div className="app-faq">
          <h3>How do growth stage photos work?</h3>
          <p>
            You get three photo slots: planted, growing, and done. You can take a
            new photo or pick one from your camera roll. When you complete a grow,
            the app creates a shareable collage of all three.
          </p>
        </div>

        <div className="app-faq">
          <h3>Is the app available in Swedish?</h3>
          <p>
            Yes. PlantPlanner supports both Swedish and English. The language
            follows your device settings, or you can change it in the app's
            settings.
          </p>
        </div>

        <div className="app-faq">
          <h3>Does the app work offline?</h3>
          <p>
            The plant database and growing guides work fully offline. Weather
            data requires an internet connection.
          </p>
        </div>

        <div className="app-contact-box">
          <h2>Still need help?</h2>
          <p>Send us an email and we'll get back to you.</p>
          <a
            href="mailto:akilles.dev@gmail.com?subject=PlantPlanner Support"
            className="app-email-btn"
          >
            Contact Support
          </a>
        </div>

        <Link to="/plantplanner" className="app-legal-back">
          &larr; Back to PlantPlanner
        </Link>
      </div>
    </div>
  );
}

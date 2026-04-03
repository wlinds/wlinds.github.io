import { Link } from "react-router-dom";
import "./AppPage.css";

export default function PlantPlannerPage() {
  return (
    <div className="app-page theme-plant" style={{ "--accent": "#4a7c59" }}>
      <div className="app-page-container">
        <div className="app-hero">
          <img
            src="/assets/images/plantplanner/plantplanner-icon.png"
            alt="PlantPlanner App Icon"
            className="app-icon"
          />
          <h1>Plant Planner</h1>
          <p className="app-tagline">Know what to grow. Know when to start.</p>
          <p className="app-subtitle">
            Zone-based plant planning for Swedish and Nordic climates. Set your
            location and get a personalized growing calendar with step-by-step
            guides.
          </p>
          <a href="#" className="app-store-badge">
            <img
              src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
              alt="Download on the App Store"
            />
          </a>
        </div>

        <div className="app-card">
          <h2 className="app-card-title">Features</h2>
          <div className="app-feature-grid">
            <div className="app-feature">
              <div>
                <h3>Zone-Based Planning</h3>
                <p>
                  GPS or manual location sets your hardiness zone. See only
                  plants that work where you live.
                </p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Seasonal Calendar</h3>
                <p>
                  Month-by-month view of what you can plant right now, with
                  timing adjusted to your climate.
                </p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Growing Guides</h3>
                <p>
                  Step-by-step checklists from seed to harvest. Temperature
                  ranges, care tips, and supplies needed.
                </p>
              </div>
            </div>
            <div className="app-feature">
              <div>
                <h3>Growth Journal</h3>
                <p>
                  Track your grows with photos at three stages. Share a
                  completion collage when you harvest.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="app-screenshots-row">
          <img
            src="/assets/images/plantplanner/screenshot-4.png"
            alt="PlantPlanner home screen"
          />
          <img
            src="/assets/images/plantplanner/screenshot-2.png"
            alt="PlantPlanner seasonal calendar"
          />
          <img
            src="/assets/images/plantplanner/screenshot-3.png"
            alt="PlantPlanner my plants"
          />
          <img
            src="/assets/images/plantplanner/screenshot-1.png"
            alt="PlantPlanner plant detail"
          />
        </div>

        <div className="app-card">
          <h2 className="app-card-title">Built For</h2>
          <p className="app-about-text">
            First-time growers who don't know where to start. Apartment
            gardeners with a windowsill and a dream. Seasoned planters who want
            zone-accurate timing without the guesswork. Anyone who has ever
            googled "when to plant tomatoes in Sweden."
          </p>
        </div>

        <div className="app-page-footer">
          <p>&copy; 2026 William Akilles Lindstedt</p>
          <p className="app-footer-links">
            <a href="mailto:akilles.dev@gmail.com">Contact</a>
            <span className="app-footer-divider">&middot;</span>
            <Link to="/plantplanner-privacy">Privacy Policy</Link>
            <span className="app-footer-divider">&middot;</span>
            <Link to="/plantplanner-support">Support</Link>
            <span className="app-footer-divider">&middot;</span>
            <Link to="/plantplanner-delete-account">Delete Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

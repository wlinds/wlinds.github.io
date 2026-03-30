import { Link } from "react-router-dom";
import "./AppPage.css";

export default function DoggoBlocksSupport() {
  return (
    <div className="app-legal theme-dark" style={{ "--accent": "#b794f4" }}>
      <div className="app-legal-container">
        <h1>Support</h1>
        <p className="app-legal-name">Doggo Blocks</p>

        <h2>How to Play</h2>
        <p>
          Drag and drop blocks onto the 8x8 grid. Complete full rows or columns
          to clear them and score points. Keep playing until no more blocks can
          be placed!
        </p>

        <h2>Frequently Asked Questions</h2>

        <div className="app-faq">
          <h3>How do I reset my high score?</h3>
          <p>Delete and reinstall the app to reset your high score.</p>
        </div>

        <div className="app-faq">
          <h3>The game won't start / crashes</h3>
          <p>
            Make sure you have the latest version of the app. Try restarting your
            device, or delete and reinstall the app.
          </p>
        </div>

        <div className="app-faq">
          <h3>How do I save my progress?</h3>
          <p>Your high score is automatically saved on your device.</p>
        </div>

        <div className="app-contact-box">
          <h2>Still need help?</h2>
          <p>For questions, feedback, or bug reports:</p>
          <a
            href="mailto:akilles.dev@gmail.com?subject=Doggo Blocks Support"
            className="app-email-btn"
          >
            Contact Support
          </a>
        </div>

        <Link to="/doggo-blocks" className="app-legal-back">
          &larr; Back to Doggo Blocks
        </Link>
      </div>
    </div>
  );
}

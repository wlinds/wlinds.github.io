import { Link } from "react-router-dom";
import "./AppPage.css";

export default function SudokistSupport() {
  return (
    <div className="app-legal theme-dark" style={{ "--accent": "#3b82f6" }}>
      <div className="app-legal-container">
        <h1>Support</h1>
        <p className="app-legal-name">Sudokist</p>

        <h2>Frequently Asked Questions</h2>

        <div className="app-faq">
          <h3>How do I use Notes mode?</h3>
          <p>
            Tap the pencil icon in the toolbar to toggle Notes mode. While
            active, tapping numbers will add small candidates to cells instead of
            filling them in. Tap the pencil again to return to normal input.
          </p>
        </div>

        <div className="app-faq">
          <h3>Can I undo my moves?</h3>
          <p>
            Yes! Tap the undo arrow in the toolbar to step back through your
            moves. You can undo all the way back to the starting puzzle.
          </p>
        </div>

        <div className="app-faq">
          <h3>How does highlighting work?</h3>
          <p>
            When you select a cell, Sudokist highlights the row, column, and 3x3
            box it belongs to. If the cell contains a number, all matching
            numbers on the board are also highlighted.
          </p>
        </div>

        <div className="app-faq">
          <h3>What difficulty levels are available?</h3>
          <p>
            Four levels: Easy, Medium, Hard, and Expert. Each level removes
            progressively more numbers from the starting grid. Expert puzzles may
            require advanced techniques like X-Wing or Swordfish.
          </p>
        </div>

        <div className="app-faq">
          <h3>Are puzzles randomly generated?</h3>
          <p>
            Yes. Puzzles are generated on your device using a proper Sudoku
            algorithm that guarantees exactly one solution. No internet required.
          </p>
        </div>

        <div className="app-faq">
          <h3>Is my progress saved?</h3>
          <p>
            Your current game is automatically saved when you leave the app. Your
            statistics (games played, best times, completion rates) are also
            stored locally on your device.
          </p>
        </div>

        <div className="app-faq">
          <h3>Does Sudokist work offline?</h3>
          <p>
            Yes, completely. Puzzles are generated locally and no internet
            connection is needed to play.
          </p>
        </div>

        <div className="app-contact-box">
          <h2>Still need help?</h2>
          <p>Send us an email and we'll get back to you.</p>
          <a
            href="mailto:akilles.dev@gmail.com?subject=Sudokist Support"
            className="app-email-btn"
          >
            Contact Support
          </a>
        </div>

        <Link to="/sudokist" className="app-legal-back">
          &larr; Back to Sudokist
        </Link>
      </div>
    </div>
  );
}

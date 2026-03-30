import { Link } from "react-router-dom";
import "./AppPage.css";

export default function IHTOTSupport() {
  return (
    <div className="app-legal theme-dark" style={{ "--accent": "#f87171" }}>
      <div className="app-legal-container">
        <h1>Support</h1>
        <p className="app-legal-name">Invaders Hate This One Trick</p>

        <h2>Frequently Asked Questions</h2>

        <div className="app-faq">
          <h3>How do I move and drop pieces?</h3>
          <p>
            Hold and drag left/right to move. Tap anywhere to rotate. Swipe down
            to drop.
          </p>
        </div>

        <div className="app-faq">
          <h3>What is fortification?</h3>
          <p>
            When same-color pieces connect via adjacency, they form fortified
            groups that absorb hits. The more pieces in a group, the stronger the
            defense.
          </p>
        </div>

        <div className="app-faq">
          <h3>What happens at stage up?</h3>
          <p>
            At every 20-cell threshold, the invader retreats and you choose one
            of three upgrade cards (Shield, Power, Luck, or Magnet). The invader
            then returns stronger.
          </p>
        </div>

        <div className="app-faq">
          <h3>What do the upgrades do?</h3>
          <p>
            Shield adds a protective layer to the Core. Luck increases the
            chance of pre-fortified pieces. Magnet lets dropped pieces snap to
            the structure. Effects stack across stages.
          </p>
        </div>

        <div className="app-faq">
          <h3>Why does the structure rotate?</h3>
          <p>
            The structure rotates 90 degrees after every drop -- clockwise if the
            piece landed right of center, counter-clockwise if left. This is a
            core mechanic that keeps the game dynamic.
          </p>
        </div>

        <div className="app-faq">
          <h3>Does the game work offline?</h3>
          <p>
            Yes, completely. No internet connection is needed.
          </p>
        </div>

        <div className="app-contact-box">
          <h2>Still need help?</h2>
          <p>Send us an email and we'll get back to you.</p>
          <a
            href="mailto:akilles.dev@gmail.com?subject=IHTOT Support"
            className="app-email-btn"
          >
            Contact Support
          </a>
        </div>

        <Link to="/ihtot" className="app-legal-back">
          &larr; Back
        </Link>
      </div>
    </div>
  );
}

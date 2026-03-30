import { Link } from "react-router-dom";
import "./AppPage.css";

export default function MeretSupport() {
  return (
    <div className="app-legal theme-dark" style={{ "--accent": "#fed06e" }}>
      <div className="app-legal-container">
        <h1>Support</h1>
        <p className="app-legal-name">Meret</p>

        <h2>Frequently Asked Questions</h2>

        <div className="app-faq">
          <h3>How do I transfer files to my computer?</h3>
          <p>
            Go to the Transfer tab, tap "Start Server", then scan the QR code
            with your computer's camera or type the URL into any web browser.
            Both devices must be on the same WiFi network.
          </p>
        </div>

        <div className="app-faq">
          <h3>Why can't my computer connect?</h3>
          <p>
            Make sure both devices are on the same WiFi network. Some corporate
            or public networks block local connections. Try a home network or
            mobile hotspot.
          </p>
        </div>

        <div className="app-faq">
          <h3>What's the difference between WAV and ALAC?</h3>
          <p>
            Both are lossless. WAV is uncompressed and universally compatible.
            ALAC (Apple Lossless) compresses without quality loss, resulting in
            smaller files. Choose WAV for maximum compatibility, ALAC for space
            savings.
          </p>
        </div>

        <div className="app-faq">
          <h3>Can I record in stereo?</h3>
          <p>
            Yes, when using an external stereo microphone or audio interface. The
            built-in iPhone mic is mono.
          </p>
        </div>

        <div className="app-faq">
          <h3>What does the clipping indicator mean?</h3>
          <p>
            Clipping occurs when the audio signal is too loud and gets cut off,
            causing distortion. If you see the clip indicator, try moving further
            from the sound source or reducing input gain on your external mic.
          </p>
        </div>

        <div className="app-faq">
          <h3>Where are my recordings stored?</h3>
          <p>
            Recordings are stored in the app's Documents folder. You can access
            them via the Files app on your iPhone, or through Finder when your
            iPhone is connected to your Mac.
          </p>
        </div>

        <div className="app-faq">
          <h3>Does recording work in the background?</h3>
          <p>
            Yes, Meret continues recording when you switch to other apps or lock
            your screen.
          </p>
        </div>

        <div className="app-contact-box">
          <h2>Still need help?</h2>
          <p>Send us an email and we'll get back to you.</p>
          <a
            href="mailto:akilles@wlinds.se?subject=Meret Support"
            className="app-email-btn"
          >
            Contact Support
          </a>
        </div>

        <Link to="/meret" className="app-legal-back">
          &larr; Back to Meret
        </Link>
      </div>
    </div>
  );
}

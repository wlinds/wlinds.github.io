import { Link } from "react-router-dom";
import "./DoggoBlocksPage.css";

const DOG_BREEDS = [
  { file: "1-shiba-inu.jpg", name: "Shiba Inu" },
  { file: "6-labrador.jpg", name: "Labrador" },
  { file: "7-husky.jpg", name: "Husky" },
  { file: "9-goled-retriever.jpg", name: "Golden Retriever" },
  { file: "11-french-bulldog.jpg", name: "French Bulldog" },
  { file: "15-corgi.jpg", name: "Corgi" },
];

const ACHIEVEMENTS = [
  "first_step2.png",
  "getting_started2.png",
  "combo_starter2.png",
  "breed_matcher2.png",
  "breed_expert2.png",
  "breed_master2.png",
  "purebred2.png",
  "breed_collector2.png",
  "line_clearer2.png",
  "line_master2.png",
  "line_expert2.png",
  "block_enthusiast2.png",
  "block_legend2.png",
  "combo_king2.png",
  "coombo_legend2.png",
  "quadruple_clear2.png",
  "full_house2.png",
  "best_in_show2.png",
  "dedicated_player2.png",
  "regular_player2.png",
  "doggo_addict2.png",
  "doggo_champion2.png",
  "puzzle_master2.png",
];

export default function DoggoBlocksPage() {
  return (
    <div className="doggo-body">
      <div className="doggo-page-wrapper">
        {/* Header */}
        <div className="doggo-header">
          <div className="doggo-logo-container">
            <img
              src="/assets/doggo-blocks/new_logo.png"
              alt="Doggo Blocks"
            />
          </div>
          <p className="doggo-tagline">
            Discover 20 adorable dog breeds. Drag blocks. Solve puzzles.
          </p>
          <div className="doggo-badge-container">
            <a
              href="https://apps.apple.com/app/id6758318578"
              className="doggo-app-store-badge"
            >
              <img
                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83"
                alt="Download on the App Store"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.doggoblocks.app"
              className="doggo-android-badge"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
              />
            </a>
          </div>
        </div>

        {/* Bento grid */}
        <div className="doggo-bento-grid">
          {/* Hero polaroid */}
          <div className="doggo-scrapbook-card doggo-polaroid-hero">
            <img
              src="/assets/doggo-blocks/AAD6C804-78C6-4352-9D2A-0347D65CF940_1_201_a.jpeg"
              alt="Doggo Blocks Gameplay"
              className="doggo-polaroid-hero-image"
            />
          </div>

          {/* Dog breed cards */}
          {DOG_BREEDS.map((dog) => (
            <div className="doggo-scrapbook-card doggo-dog-card" key={dog.file}>
              <img
                src={`/assets/doggo-blocks/${dog.file}`}
                alt={dog.name}
              />
            </div>
          ))}

          {/* Features card */}
          <div className="doggo-scrapbook-card doggo-features-card">
            <h2>What You Get</h2>
            <ul className="doggo-features-list">
              <li>20 unique dog breeds to unlock</li>
              <li>Relaxing, no-pressure gameplay</li>
              <li>Simple one-touch controls</li>
              <li>Unlimited puzzle generation</li>
              <li>Track your high scores</li>
              <li>Light &amp; dark mode support</li>
            </ul>
          </div>

          {/* Global stats */}
          <div className="doggo-scrapbook-card doggo-global-stats-card">
            <h2>Global Leaderboard &amp; Achievements</h2>
            <p>
              Compete globally with players worldwide. Track your best scores,
              unlock achievements, and climb the leaderboards across different
              difficulty levels and game modes.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="doggo-footer">
          <p>&copy; 2026 William Akilles Lindstedt</p>
          <p className="doggo-footer-links">
            <a href="mailto:akilles.dev@gmail.com">Contact</a>
            <span className="doggo-footer-divider">&middot;</span>
            <Link to="/doggo-blocks-privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>

      {/* Achievements section */}
      <div className="doggo-achievements-section">
        <div className="doggo-achievements-container">
          <h2>Achievements to Unlock</h2>
          <p>
            Earn badges by completing milestones. From your first puzzle solved
            to becoming a Puzzle Master, track your progress with our
            achievement system.
          </p>
          <div className="doggo-achievements-grid">
            {ACHIEVEMENTS.map((file) => {
              const name = file
                .replace("2.png", "")
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());
              return (
                <div className="doggo-achievement-coin" title={name} key={file}>
                  <div className="doggo-achievement-inner">
                    <img
                      src={`/assets/doggo-blocks/achievements/${file}`}
                      alt={name}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CodePage.css";

function ensureLeadingSlash(path) {
  if (!path) return path;
  if (path.startsWith("http")) return path;
  return path.replace(/^\.\.\//, "/");
}

function MobileCard({ card, index }) {
  return (
    <Link
      to={card.link}
      className="card card-mobile"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="card-mobile-hero">
        <img src={card.icon} alt={card.title} className="card-mobile-icon" />
        {card.banner && <span className="card-mobile-banner">{card.banner}</span>}
      </div>
      <div className="card-mobile-stat">
        <div className="card-mobile-stat-header">
          <img src={card.icon} alt="" className="card-mobile-stat-icon" />
          <span className="card-mobile-title">{card.title}</span>
        </div>
        <p className="card-mobile-desc">{card.description}</p>
        {card.tags && (
          <div className="card-mobile-tags">
            {card.tags.map((tag) => (
              <span key={tag} className="card-mobile-tech">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

function RepoCard({ card, index }) {
  return (
    <a
      href={card.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <img src={ensureLeadingSlash(card.image1)} alt="" />
      {card.image2 && <img src={ensureLeadingSlash(card.image2)} alt="" />}
      <p
        dangerouslySetInnerHTML={{
          __html: card.description.replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2">$1</a>'
          ),
        }}
      />
    </a>
  );
}

export default function CodePage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((r) => r.json())
      .then((data) => setCards(data.cards || []))
      .catch(console.error);
  }, []);

  return (
    <div className="cards-container">
      <div className="cards-main">
        {cards.map((card, index) =>
          card.type === "mobile" ? (
            <MobileCard key={index} card={card} index={index} />
          ) : (
            <RepoCard key={index} card={card} index={index} />
          )
        )}
      </div>
    </div>
  );
}

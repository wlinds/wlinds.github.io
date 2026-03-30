import { useState, useEffect } from "react";
import "./CodePage.css";

function ensureLeadingSlash(path) {
  if (!path) return path;
  if (path.startsWith("http")) return path;
  return path.replace(/^\.\.\//, "/");
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
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <img src={ensureLeadingSlash(card.image1)} alt="" />
            <img src={ensureLeadingSlash(card.image2)} alt="" />
            <p
              dangerouslySetInnerHTML={{
                __html: card.description.replace(
                  /\[([^\]]+)\]\(([^)]+)\)/g,
                  '<a href="$2">$1</a>'
                ),
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

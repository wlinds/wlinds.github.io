import "./Hero.css";

export default function Hero({ hero }) {
  if (!hero) return null;

  return (
    <div className="hero-container">
      {hero.background_blur && (
        <div
          className="hero-blur"
          style={{
            backgroundColor: hero.background_blur.color,
            animation: hero.background_blur.animation
              ? "animateBlur 2.1s ease forwards"
              : "none",
          }}
        />
      )}
      <h1>{hero.title}</h1>
      <p>{hero.description}</p>
      <div className="tags-container">
        {hero.tags?.map((tag, i) => (
          <div
            key={tag}
            className="hero-tag"
            style={{ animation: `fadeInTag 0.5s ease forwards ${0.6 + i * 0.1}s` }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

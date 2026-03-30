import "./EthicsSection.css";

export default function EthicsSection({ ethics }) {
  if (!ethics) return null;

  return (
    <div className="my-ethics">
      <h2 className="gradient-title">{ethics.title}</h2>
      <p
        className="my-ethics-content"
        dangerouslySetInnerHTML={{ __html: ethics.description }}
      />
      <div className="principles-grid">
        {ethics.principles?.map((principle) => (
          <div className="principle" key={principle.title}>
            <img
              src={principle.icon}
              alt={principle.title}
              className="principle-icon"
            />
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

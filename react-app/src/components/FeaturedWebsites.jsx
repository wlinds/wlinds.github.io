import "./FeaturedWebsites.css";

const websites = [
  {
    name: "CPS Sweden",
    description:
      "Business intelligence tool that helps companies identify profitable products and customers, enabling smarter decisions to boost profits.",
    image: "/assets/images/featured-websites/web-cps.png",
    url: "https://cpssweden.se",
  },
  {
    name: "Nya Flugan",
    description:
      'Fresh news platform providing "reliable", "unbiased" "news" and opinions to Swedish readers.',
    image: "/assets/images/featured-websites/web-flugan.png",
    url: "https://nyaflugan.se",
  },
  {
    name: "Hampaoasen",
    description:
      "Hemp cultivation consulting and services, promoting sustainable farming and biodiversity in Sweden.",
    image: "/assets/images/featured-websites/web-hampa.png",
    url: "https://hampaoasen.se",
  },
];

export default function FeaturedWebsites() {
  return (
    <section className="featured-websites">
      <h2 className="gradient-title">Featured Projects #webdev</h2>
      <div className="websites-grid">
        {websites.map((site) => (
          <div className="website-card" key={site.name}>
            <div className="website-screenshot">
              <img src={site.image} alt={`${site.name} Screenshot`} />
            </div>
            <div className="website-info">
              <h3>{site.name}</h3>
              <p>{site.description}</p>
              <a
                href={site.url}
                className="website-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Site &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

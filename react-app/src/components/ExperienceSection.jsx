import "./ExperienceSection.css";

export default function ExperienceSection({ experience }) {
  if (!experience?.positions?.length) return null;

  return (
    <section className="professional-experience">
      <h2 className="gradient-title">{experience.title}</h2>
      <div className="experience-items">
        {experience.positions.map((pos) => (
          <div className="experience-item" key={`${pos.company}-${pos.period}`}>
            <div className="experience-header">
              <div>
                <h3 className="experience-title">{pos.title}</h3>
                <a
                  href={pos.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="experience-company"
                >
                  {pos.company}
                </a>
              </div>
              <span className="experience-date">{pos.period}</span>
            </div>
            <p className="experience-description">{pos.description}</p>
            <div className="experience-skills">
              {pos.technologies.map((tech) => (
                <span className="skill-tag" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

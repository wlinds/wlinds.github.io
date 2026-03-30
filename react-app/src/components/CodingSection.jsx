import { Link } from "react-router-dom";
import "./CodingSection.css";

export default function CodingSection({ coding }) {
  if (!coding) return null;

  return (
    <div className="my-coding">
      <div>
        <h2 className="main-h2">{coding.title}</h2>
        <p
          className="my-coding-content"
          dangerouslySetInnerHTML={{ __html: coding.description }}
        />
        <div className="btn-div">
          <Link to="/about" className="btn-0">
            {coding.buttonText}
          </Link>
        </div>
        <h3>Featured repos</h3>
        <div className="featuredProjects">
          {coding.featured_projects?.map((project) => (
            <div className="featured-project" key={project.name}>
              <img
                src={project.icon}
                alt={project.name}
                className="project-icon"
              />
              <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <img src="/assets/icons/github.svg" alt="GitHub" className="icon" />
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View source code on Github
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

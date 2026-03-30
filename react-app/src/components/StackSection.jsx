import { useState, useCallback } from "react";
import "./StackSection.css";

const defaultDescriptions = {
  Python:
    "My go-to language for data science and ML projects. Extensively used for building data pipelines, training models, and automating workflows.",
  JavaScript:
    "Essential part of my web development toolkit. Used for creating interactive data visualizations and building modern web apps.",
  TypeScript:
    "Brings type safety to JavaScript projects. Critical for maintaining large-scale applications and catching errors early.",
  PostgreSQL:
    "Powers databases behind data-intensive applications. Skilled in optimizing complex queries and designing efficient schemas.",
  TensorFlow:
    "My primary framework for deploying production ML models. Used for developing deep learning solutions.",
  PyTorch:
    "Preferred framework for ML research and experimentation. Great for rapid prototyping and custom model development.",
  "Scikit-Learn":
    "Core toolkit for classical machine learning. Used extensively for data preprocessing and feature engineering.",
  OpenCV:
    "Essential for computer vision projects. Used for image processing and real-time video analysis.",
};

export default function StackSection({ stack }) {
  const [activePopover, setActivePopover] = useState(null);

  const handleClick = useCallback(
    (skillName, e) => {
      e.stopPropagation();
      setActivePopover(activePopover === skillName ? null : skillName);
    },
    [activePopover]
  );

  const closeAll = useCallback(() => setActivePopover(null), []);

  if (!stack) return null;

  return (
    <section className="my-stack" onClick={closeAll}>
      <div className="logo-stack">
        <h2 className="gradient-title">{stack.title}</h2>
        <div className="skills-grid">
          {stack.skills_categories?.map((category) => (
            <div className="skills-category" key={category.name}>
              <h3 className="category-name">{category.name}</h3>
              <div className="skill-items">
                {category.items.map((item) => (
                  <div
                    className="skill-item"
                    key={item.name}
                    tabIndex={0}
                    onClick={(e) => handleClick(item.name, e)}
                  >
                    <div className="skill-item-content">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="skill-icon"
                      />
                      <div className="skill-info">
                        <div className="skill-name">{item.name}</div>
                        <div className="skill-meta">
                          <span className="skill-level">{item.level}</span>
                          <span>{item.years} years</span>
                        </div>
                      </div>
                    </div>
                    {activePopover === item.name && (
                      <div
                        className="skill-popover active"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="popover-title">{item.name}</div>
                        <div className="popover-content">
                          {item.description ||
                            defaultDescriptions[item.name] ||
                            "A key technology in the development stack."}
                        </div>
                        <div className="popover-stats">
                          <div className="stat-item">
                            <div className="stat-label">Level</div>
                            <div className="stat-value">{item.level}</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-label">Experience</div>
                            <div className="stat-value">
                              {item.years} years
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="stack-description"
        dangerouslySetInnerHTML={{ __html: stack.description }}
      />
    </section>
  );
}

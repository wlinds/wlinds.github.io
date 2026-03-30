import { useState } from "react";
import "./AboutPage.css";

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard
      .writeText("akilles.dev@gmail.com")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(console.error);
  };

  return (
    <div className="about-container">
      <section className="contact-section">
        <h2 className="about-header">Contact</h2>
        <div className="contact-info" onClick={copyEmail}>
          <span>akilles.dev@gmail.com</span>
          <span className="info2">Click to copy email address</span>
          <span className={`verification ${copied ? "show" : ""}`}>
            {copied ? "Copied!" : ""}
          </span>
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-header">About me</h2>
        <div className="about-content">
          <p>
            I'm a developer interested in machine learning, data science and
            software design. Whether you're looking for someone to help give you
            advice on your next ML pipelines or just looking to build a simple
            static website, I've got you covered.
          </p>
          <p>
            If you have a vision for a new project, but need talent to make that
            happen, I'm here to help. When you hire me, you tap into years of
            experience in everything from developing mobile & web applications,
            to Cloud Services administration and custom API development and
            integrations.
          </p>
          <p>
            If you're struggling to maintain or upgrade your existing projects --
            I'll help with that too. I will work with you to create new user
            experiences and improve your marketing. I help you identify
            inefficiencies in your business operations and build custom software
            to automate your workflows.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-header">Values</h2>
        <div className="about-content">
          <p>
            At the core of everything I do is a commitment to responsible AI
            development. Here's what that means to me:
          </p>
          <ul>
            <li>
              <strong>Data Integrity:</strong> I believe in using clean, unbiased
              data to train AI systems. This means scrutinizing data sources for
              errors and ensuring they represent the real world accurately.
            </li>
            <li>
              <strong>Safety and Reliability:</strong> AI systems should be
              dependable and safe. I prioritize building robust AI that delivers
              consistent, trustworthy results.
            </li>
            <li>
              <strong>Avoiding Bias:</strong> AI should be fair and impartial. I
              actively work to identify and mitigate potential biases in training
              data and algorithms. We all have biases, but AI shouldn't inherit
              them.
            </li>
          </ul>
          <p>
            By focusing on these values, I aim to create AI solutions that are
            not only powerful, but also ethical and trustworthy. We can build a
            future where AI empowers everyone, without discrimination or bias.
          </p>
        </div>
      </section>
    </div>
  );
}

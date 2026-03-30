import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Remarkable } from "remarkable";
import PlotAnatomyDiagram from "../components/PlotAnatomyDiagram";
import "./BlogPostPage.css";

function extractHeadings(html) {
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/g;
  const headings = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const text = match[2].replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ level, text, id });
  }
  return headings;
}

function injectHeadingIds(html) {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h([23])>/g, (_, level, attrs, text, closeLevel) => {
    const plainText = text.replace(/<[^>]*>/g, "");
    const id = plainText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `<h${level}${attrs} id="${id}">${text}</h${closeLevel}>`;
  });
}

function PlotAnatomyBody({ html }) {
  const imgRegex = /<p><img[^>]*plot-anatomy\.svg[^>]*><\/p>/;
  const parts = html.split(imgRegex);
  if (parts.length < 2) {
    return <div className="blogpost-body" dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return (
    <div className="blogpost-body">
      <div dangerouslySetInnerHTML={{ __html: parts[0] }} />
      <PlotAnatomyDiagram />
      <div dangerouslySetInnerHTML={{ __html: parts[1] }} />
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [html, setHtml] = useState("");
  const [activeHeading, setActiveHeading] = useState("");
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/data/blog/index.json");
        const posts = await res.json();
        const found = posts.find((p) => p.slug === slug);
        if (!found) return;
        setPost(found);

        const md = new Remarkable();
        const mdRes = await fetch(`/data/blog/${found.fileName}`);
        const mdText = await mdRes.text();
        const rendered = md.render(mdText);
        setHtml(injectHeadingIds(rendered));
      } catch (err) {
        console.error("Error loading blog post:", err);
      }
    }
    load();
  }, [slug]);

  const headings = useMemo(() => extractHeadings(html), [html]);

  useEffect(() => {
    if (!headings.length) return;

    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);

      const offset = 100;
      let current = "";
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActiveHeading(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (!post) {
    return (
      <div className="blogpost-container">
        <div className="blog-loading">Loading...</div>
      </div>
    );
  }

  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div
        className="blogpost-progress"
        style={{ transform: `scaleX(${readProgress})` }}
      />

      {/* Hero banner */}
      <div className="blogpost-hero">
        <div className="blogpost-hero-bg" />
        <div className="blogpost-hero-content">
          <div className="blogpost-hero-tags">
            {post.tags.slice(0, 2).map((tag) => (
              <span className="blogpost-hero-tag" key={tag}>{tag}</span>
            ))}
          </div>
          <h1 className="blogpost-hero-title">{post.title}</h1>
          <div className="blogpost-hero-meta">
            <span>Published: {formattedDate}</span>
            <span className="blogpost-dot">&bull;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

    <div className="blogpost-container">
      <div className="blogpost-layout">
        {/* Left sidebar */}
        <aside className="blogpost-sidebar-left">
          <Link to="/blog" className="blogpost-back">
            &larr; Back to blog
          </Link>

          {headings.length > 0 && (
            <nav className="blogpost-toc">
              <h3 className="blogpost-toc-title">Table of contents</h3>
              <ul className="blogpost-toc-list">
                {headings.map(({ level, text, id }) => (
                  <li
                    key={id}
                    className={`blogpost-toc-item ${level === 3 ? "indent" : ""} ${activeHeading === id ? "active" : ""}`}
                  >
                    <a href={`#${id}`}>{text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </aside>

        {/* Main content */}
        <main className="blogpost-content">
          {slug === "anatomy-of-plots" ? (
            <PlotAnatomyBody html={html} />
          ) : (
            <div
              className="blogpost-body"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </main>

        {/* Right sidebar */}
        <aside className="blogpost-sidebar-right">
          <div className="blogpost-share">
            <h3 className="blogpost-sidebar-title">Share</h3>
            <div className="blogpost-share-links">
              <a
                href={`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="blogpost-share-btn"
                title="Share on X"
              >
                X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="blogpost-share-btn"
                title="Share on LinkedIn"
              >
                in
              </a>
            </div>
          </div>

          <div className="blogpost-sidebar-tags">
            {post.tags.map((tag) => (
              <span className="blog-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="blogpost-cta">
            <h3 className="blogpost-cta-title">More from the blog</h3>
            <p className="blogpost-cta-text">
              Tutorials, guides, and technical deep-dives on Linux, web
              development, and machine learning.
            </p>
            <Link to="/blog" className="blogpost-cta-link">
              Browse all posts &rarr;
            </Link>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
}

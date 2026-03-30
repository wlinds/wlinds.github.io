import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BlogPage.css";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/data/blog/index.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
        );
        setPosts(sorted);
      })
      .catch((err) => console.error("Error loading blog index:", err));
  }, []);

  if (!posts.length) {
    return (
      <div className="blog-container">
        <div className="blog-loading">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1 className="blog-page-title">Blog</h1>
        <p className="blog-subtitle">Technical tutorials and insights</p>
      </header>

      <div className="blog-grid">
        {posts.map((post) => (
          <Link
            to={`/blog/${post.slug}`}
            key={post.slug}
            className="blog-card-link"
          >
            <article className="blog-card">
              {post.image && (
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} />
                </div>
              )}
              <div className="blog-card-body">
                <div className="blog-card-tags">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span className="blog-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-meta">
                  <span className="blog-date">
                    {new Date(post.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

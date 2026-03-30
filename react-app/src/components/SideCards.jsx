import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideCards.css";

function ensureLeadingSlash(path) {
  if (!path) return path;
  return path.startsWith("/") || path.startsWith("http") ? path : `/${path}`;
}

export default function SideCards() {
  const [latestMusic, setLatestMusic] = useState(null);
  const [latestBlog, setLatestBlog] = useState(null);

  useEffect(() => {
    fetch("/data/audio.json")
      .then((r) => r.json())
      .then((tracks) => {
        if (tracks?.[0]) setLatestMusic(tracks[0]);
      })
      .catch(console.error);

    fetch("/data/blog/index.json")
      .then((r) => r.json())
      .then((posts) => {
        if (posts?.[0]) setLatestBlog(posts[0]);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="side-content">
      {/* Latest Music */}
      <div className="side-card">
        <a href="https://soundcloud.com/lindstedt/tracks">
          <h3 className="side-card-header">Latest Music Release</h3>
          <div className="side-card-content">
            <img
              src={ensureLeadingSlash(latestMusic?.image) || "/assets/images/placeholder-album.png"}
              alt="Latest album"
              className="side-card-image"
            />
            <div className="side-card-text">
              <h4 className="side-card-title">
                {latestMusic?.text || "Loading..."}
              </h4>
              <div className="side-card-meta">
                {latestMusic
                  ? `${new Date(latestMusic.date).toLocaleDateString()} · ${latestMusic.genre || "Electronic"} · ${latestMusic.tracks} tracks`
                  : "Loading..."}
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Latest Blog */}
      <div className="side-card">
        <Link to="/blog">
          <h3 className="side-card-header">Latest Post</h3>
          <div className="side-card-content">
            <img
              src={ensureLeadingSlash(latestBlog?.image) || "/assets/images/blog/linux-server.png"}
              alt="Blog thumbnail"
              className="side-card-image"
            />
            <div className="side-card-text">
              <h4 className="side-card-title">
                {latestBlog?.title || "Loading..."}
              </h4>
              <div className="side-card-meta">
                {latestBlog
                  ? `${new Date(latestBlog.publishDate).toLocaleDateString()} · ${latestBlog.readTime}`
                  : "Loading..."}
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Desktop only cards */}
      <div className="desktop-only-cards">
        <div className="side-card">
          <Link to="/doggo-blocks">
            <h3 className="side-card-header">Latest Mobile App</h3>
            <div className="side-card-content">
              <img
                src="/assets/icons/Doggoblocka1AppIcon.png"
                alt="Doggo Blocks"
                className="side-card-image"
              />
              <div className="side-card-text">
                <h4 className="side-card-title">Doggo Blocks (2026)</h4>
                <p className="side-card-meta">Block puzzle game on iOS</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

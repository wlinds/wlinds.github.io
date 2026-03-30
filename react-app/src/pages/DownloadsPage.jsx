import { useState, useEffect, useMemo } from "react";
import "./DownloadsPage.css";

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data/downloads.json")
      .then((r) => r.json())
      .then((data) => setDownloads(data.downloads || []))
      .catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    if (!term) return downloads;
    return downloads.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term)
    );
  }, [downloads, search]);

  return (
    <div className="downloads-container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Looking for something special...?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="downloads-table">
        <thead>
          <tr>
            <th>Preview</th>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => (
            <tr key={item.title}>
              <td>
                <img
                  src={item.preview}
                  alt={item.title}
                  className="preview-image"
                />
              </td>
              <td>{item.title}</td>
              <td>
                <span className="category-badge">{item.category}</span>
              </td>
              <td>{item.description}</td>
              <td>
                <a
                  href={item.link}
                  className="download-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.linkText}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

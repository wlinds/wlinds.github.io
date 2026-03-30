import { useState, useEffect } from "react";
import "./MusicSection.css";

function ensureLeadingSlash(path) {
  if (!path) return path;
  return path.startsWith("/") || path.startsWith("http") ? path : `/${path}`;
}

export default function MusicSection({ music }) {
  const [audioData, setAudioData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [playerVisible, setPlayerVisible] = useState(false);

  useEffect(() => {
    fetch("/data/audio.json")
      .then((r) => r.json())
      .then(setAudioData)
      .catch(console.error);
  }, []);

  if (!music) return null;

  const handleTabClick = (index) => {
    setActiveTab(index);
    setPlayerVisible(true);
  };

  const handleClose = () => {
    setPlayerVisible(false);
    setActiveTab(null);
  };

  return (
    <div className="my-music">
      <div>
        <h2 className="gradient-title">{music.title}</h2>
        <div
          className="my-music-content"
          dangerouslySetInnerHTML={{ __html: music.description }}
        />

        {audioData.length > 0 && (
          <>
            <div className="player-tabs">
              {audioData.map((playlist, index) => (
                <button
                  key={index}
                  className={`tab-button ${activeTab === index ? "active" : ""}`}
                  style={{ backgroundImage: `url('${ensureLeadingSlash(playlist.image)}')` }}
                  onClick={() => handleTabClick(index)}
                >
                  <span className="tab-button-overlay" />
                  <span className="tab-button-text">{playlist.title}</span>
                </button>
              ))}
            </div>
            <div className={`player-content ${playerVisible ? "visible" : ""}`}>
              <button className="close-player" onClick={handleClose}>
                &times;
              </button>
              <div className="player-panels">
                {activeTab !== null && audioData[activeTab] && (
                  <div className="player-panel active">
                    <div className="soundcloud-player">
                      <div className="player-header">
                        <h3 className="soundcloud-title">
                          {audioData[activeTab].text}
                        </h3>
                        <div className="playlist-meta">
                          <span className="genre">
                            {audioData[activeTab].genre}
                          </span>
                          <span className="tracks">
                            {audioData[activeTab].tracks} tracks
                          </span>
                        </div>
                      </div>
                      <iframe
                        title={audioData[activeTab].text}
                        width="100%"
                        height="450"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(audioData[activeTab].link)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="btn-div">
          <a
            href="https://soundcloud.com/lindstedt"
            className="btn-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            {music.buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

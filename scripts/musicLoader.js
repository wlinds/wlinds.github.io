function populateSoundCloudTabs() {
    fetch('data/audio.json')
        .then(response => response.json())
        .then(audioData => {
            const genresContainer = document.getElementById('musicGenres');
            
            // Create tabs container and content container
            const tabsHtml = `
                <div class="player-tabs">
                    ${audioData.map((playlist, index) => `
                        <button class="tab-button" 
                                data-index="${index}"
                                style="background-image: url('${playlist.image}')">
                            <span class="tab-button-overlay"></span>
                            <span class="tab-button-text">${playlist.title}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="player-content">
                    <button class="close-player">×</button>
                    <div class="player-panels">
                        ${audioData.map((playlist, index) => `
                            <div class="player-panel" data-index="${index}">
                                <div class="soundcloud-player">
                                    <div class="player-header">
                                        <h3 class="soundcloud-title">${playlist.text}</h3>
                                        <div class="playlist-meta">
                                            <span class="genre">${playlist.genre}</span>
                                            <span class="tracks">${playlist.tracks} tracks</span>
                                        </div>
                                    </div>
                                    <iframe
                                        width="100%"
                                        height="450"
                                        scrolling="no"
                                        frameborder="no"
                                        allow="autoplay"
                                        src="https://w.soundcloud.com/player/?url=${encodeURIComponent(playlist.link)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">
                                    </iframe>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            genresContainer.innerHTML = tabsHtml;

            // Add click handlers to tabs
            const tabs = document.querySelectorAll('.tab-button');
            const playerContent = document.querySelector('.player-content');
            const closeButton = document.querySelector('.close-player');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const index = tab.dataset.index;
                    
                    // Remove active class from all tabs
                    document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
                    // Hide all panels
                    document.querySelectorAll('.player-panel').forEach(p => p.classList.remove('active'));
                    
                    // Show the player content if hidden
                    if (!playerContent.classList.contains('visible')) {
                        playerContent.classList.add('visible');
                    }
                    
                    // Activate selected tab and panel
                    tab.classList.add('active');
                    document.querySelector(`.player-panel[data-index="${index}"]`).classList.add('active');
                });
            });

            // Add close button handler
            closeButton.addEventListener('click', () => {
                playerContent.classList.remove('visible');
                // Remove active states
                document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
            });
        })
        .catch(error => {
            console.error('Error loading audio data:', error);
            document.getElementById('musicGenres').innerHTML = '<p>Error loading playlists</p>';
        });
}

document.addEventListener('DOMContentLoaded', populateSoundCloudTabs);
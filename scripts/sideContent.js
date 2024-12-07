document.addEventListener('DOMContentLoaded', function() {
    // Load latest blog post
    fetch('data/blog/index.json')
        .then(response => response.json())
        .then(posts => {
            const latest = posts[0];
            if (latest) {
                // Update image
                const blogImage = document.getElementById('latestBlogImage');
                if (blogImage) {
                    blogImage.src = latest.image;
                    blogImage.alt = latest.title;
                }
                
                // Update title
                const blogTitle = document.getElementById('latestBlogTitle');
                if (blogTitle) {
                    blogTitle.textContent = latest.title;
                }
                
                // Update meta
                const blogMeta = document.getElementById('latestBlogMeta');
                if (blogMeta) {
                    blogMeta.textContent = `${new Date(latest.publishDate).toLocaleDateString()} · ${latest.readTime}`;
                }
            }
        })
        .catch(error => console.error('Error loading blog data:', error));

    // Load latest music
    fetch('data/audio.json')
        .then(response => response.json())
        .then(tracks => {
            const latest = tracks[0]; // Gets Technical Debt
            if (latest) {
                // Update image
                const musicImage = document.getElementById('latestMusicImage');
                if (musicImage) {
                    musicImage.src = latest.image;
                    musicImage.alt = latest.text;
                }
                
                // Update title
                const musicTitle = document.getElementById('latestMusicTitle');
                if (musicTitle) {
                    musicTitle.textContent = latest.text;
                }
                
                // Update meta
                const musicMeta = document.getElementById('latestMusicMeta');
                if (musicMeta) {
                    musicMeta.textContent = `${new Date(latest.date).toLocaleDateString()} · ${latest.genre} · ${latest.tracks} tracks`;
                }
            }
        })
        .catch(error => console.error('Error loading music data:', error));
});
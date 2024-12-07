document.addEventListener('DOMContentLoaded', function () {
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = `
        <div class="footer-container">
            <div class="footer-main">
                    <div class="footer-column">
                        <h3 class="footer-title">About</h3>
                        <ul class="footer-links">
                            <li><a href="/" class="footer-link">Home</a></li>
                            <li><a href="/pages/blog/main.html" class="footer-link">Blog</a></li>
                            <li><a href="/pages/code.html" class="footer-link">Projects</a></li>
                            <li><a href="/pages/about.html" class="footer-link">Contact</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h3 class="footer-title">Audio</h3>
                        <ul class="footer-links">
                            <li><a href="https://soundcloud.com/lindstedt" class="footer-link">SoundCloud</a></li>
                            <li><a href="/pages/downloads.html" class="footer-link">Synth Presets</a></li>
                            <li><a href="/pages/downloads.html" class="footer-link">Drum Samples</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h3 class="footer-title">Assets</h3>
                        <ul class="footer-links">
                            <li><a href="/pages/downloads.html" class="footer-link">Downloads</a></li>
                            <li><a href="/pages/machine-learning-concepts.html" class="footer-link">ML Models</a></li>
                            <li><a href="https://gist.github.com/wlinds" class="footer-link">Gists</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h3 class="footer-title">Links</h3>
                        <ul class="footer-links">
                            <li><a href="https://twitter.com/wlinds_" class="footer-link">Twitter/X</a></li>
                            <li><a href="https://bsky.app/profile/wlinds.bsky.social" class="footer-link">Bluesky</a></li>
                            <li><a href="https://github.com/wlinds" class="footer-link">GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/williamlindstedt/" class="footer-link">LinkedIn</a></li>
                            <li><a href="https://discordapp.com/users/379866962462769173" class="footer-link">Discord</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h3 class="footer-title">Apps</h3>
                        <ul class="footer-links">
                            <li><a href="https://bfd7-2001-2042-7952-b800-767a-e1ab-b4d5-77e7.ngrok-free.app" class="footer-link">TPME (Live)</a></li>
                            <li><a href="https://github.com/wlinds/uci-dataset-loader" class="footer-link">UCI Dataset Loader</a></li>
                        </ul>
                    </div>
            </div>
            <div class="persistent-footer">
                <p>wlinds ©️ 2024 | <a href="https://github.com/wlinds/wlinds.github.io" class="footer-link">Source Code</a> | William Akilles Lindstedt</p>
            </div>
        </div>
        `;
    }
});

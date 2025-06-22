/**
 * Main JavaScript for wlinds.github.io
 * Handles all core functionality for the site
 */

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    initializeMobileMenu();
    initializeContentLoaders();
    
    // Initialize page-specific functionality based on page URL
    const currentPath = window.location.pathname;
    
    if (currentPath === '/' || currentPath.includes('index.html')) {
      initializeHomePage();
    } else if (currentPath.includes('machine-learning-concepts.html')) {
      initializeMLConceptsPage();
    } else if (currentPath.includes('blog')) {
      initializeBlogPage();
    } else if (currentPath.includes('downloads.html')) {
      initializeDownloadsPage();
    } else if (currentPath.includes('code.html')) {
      initializeProjectsPage();
    }
  });
  
  /**
   * Mobile Menu Functionality
   */
  function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Accessibility
        const isExpanded = mobileMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', false);
        }
      });
    }
  }
  
  /**
   * Content Loaders
   */
  function initializeContentLoaders() {
    // Load site content from JSON
    fetchSiteContent();
  }
  
  /**
   * Load and update site content from JSON
   */
  async function fetchSiteContent() {
    try {
      const response = await fetch('/data/site-content.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const content = await response.json();
      console.log('Content loaded successfully');
      
      // Update sections if they exist on the page
      if (document.querySelector('.hero-container')) updateHero(content.hero);
      if (document.querySelector('.my-coding')) updateCoding(content.my_coding);
      if (document.querySelector('.my-ethics')) updateEthics(content.my_ethics);
      if (document.querySelector('.my-music')) updateMusic(content.my_music);
      if (document.querySelector('.my-stack')) updateStack(content.my_stack);
      if (document.querySelector('.testimonials')) updateTestimonials(content.testimonials);
      if (document.querySelector('.professional-experience')) updateProfessionalExperience(content.professional_experience);
      if (document.querySelector('.blog-highlights')) updateBlogHighlights(content.blog_highlights);
      
    } catch (error) {
      console.error('Error loading site content:', error);
      handleContentLoadError();
    }
  }
  
  /**
   * Handle errors when content fails to load
   */
  function handleContentLoadError() {
    document.querySelectorAll('.loading-placeholder').forEach(placeholder => {
      placeholder.innerHTML = `
        <div class="error-message">
          <p>Failed to load content. Please refresh the page or try again later.</p>
          <button class="btn btn-primary retry-button">Retry</button>
        </div>
      `;
      
      const retryButton = placeholder.querySelector('.retry-button');
      if (retryButton) {
        retryButton.addEventListener('click', () => {
          placeholder.innerHTML = '<p>Loading...</p>';
          fetchSiteContent();
        });
      }
    });
  }
  
  /**
   * Update Hero Section
   */
  function updateHero(hero) {
    if (!hero) return;
    
    const titleElem = document.querySelector('.hero-container h1');
    const descElem = document.querySelector('.hero-container p');
    const tagsContainer = document.querySelector('.tags-container');
    
    if (titleElem) titleElem.textContent = hero.title;
    if (descElem) descElem.textContent = hero.description;
    
    if (tagsContainer && hero.tags) {
      // Clear existing tags
      tagsContainer.innerHTML = '';
      
      // Add tags with staggered animation
      hero.tags.forEach((tag, index) => {
        const tagElement = document.createElement('div');
        tagElement.className = 'hero-tag';
        tagElement.textContent = tag;
        
        // Add staggered animation delay
        tagElement.style.opacity = '0';
        tagElement.style.animation = `fadeInTag 0.5s ease forwards ${0.6 + (index * 0.1)}s`;
        
        tagsContainer.appendChild(tagElement);
      });
    }
  
    // Handle blur effect if specified
    if (hero.background_blur) {
      const blur = document.querySelector('.hero-blur');
      if (blur) {
        blur.style.backgroundColor = hero.background_blur.color;
        if (hero.background_blur.animation) {
          blur.style.animation = 'animateBlur 2.1s ease forwards';
        }
      }
    }
  }
  
  /**
   * Update Coding Section
   */
  function updateCoding(coding) {
    if (!coding) return console.error("Coding data is missing!");
        
    const codingSection = document.querySelector('.my-coding');
    if (!codingSection) return console.error("Coding section not found!");
  
    const image = codingSection.querySelector('#codingImage');
    const title = codingSection.querySelector('.main-h2');
    const description = codingSection.querySelector('.my-coding-content');
    const button = codingSection.querySelector('.btn-0');
    const projectsContainer = codingSection.querySelector('#featuredProjects');
  
    if (image) {
      image.src = coding.image;
      image.alt = "Coding showcase";
    }
    if (title) title.textContent = coding.title;
    if (description) description.innerHTML = coding.description;
    if (button) button.textContent = coding.buttonText;
  
    if (projectsContainer && coding.featured_projects) {
      projectsContainer.innerHTML = coding.featured_projects.map(project => `
        <div class="featured-project">
          <img src="${project.icon}" alt="${project.name}" class="project-icon">
          <div class="project-info">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <img src="/assets/icons/github.svg" alt="GitHub" class="icon">
            <a href="${project.link}" target="_blank" class="project-link">View source code on Github</a>
          </div>
        </div>
      `).join('');
    }
  }
  
  /**
   * Update Ethics Section
   */
  function updateEthics(ethics) {
    if (!ethics) return;
    
    const ethicsSection = document.querySelector('.my-ethics');
    if (!ethicsSection) return;
    
    const title = ethicsSection.querySelector('.main-h2');
    const description = ethicsSection.querySelector('p');
  
    if (title) title.textContent = ethics.title;
    if (description) description.innerHTML = ethics.description;
  
    // Handle principles if exist
    if (ethics.principles && ethicsSection.querySelector('#ethicsPrinciples')) {
      const principlesContainer = ethicsSection.querySelector('#ethicsPrinciples');
      principlesContainer.innerHTML = ethics.principles.map(principle => `
        <div class="principle">
          <img src="${principle.icon}" alt="${principle.title}" class="principle-icon">
          <h3>${principle.title}</h3>
          <p>${principle.description}</p>
        </div>
      `).join('');
    }
  }
  
  /**
   * Update Music Section
   */
  function updateMusic(music) {
    if (!music) return;
    
    const musicSection = document.querySelector('.my-music');
    if (!musicSection) return console.error('Music section not found!');
  
    const image = musicSection.querySelector('#musicImage');
    const title = musicSection.querySelector('.main-h2');
    const description = musicSection.querySelector('.my-music-content');
    const button = musicSection.querySelector('.btn-0');
  
    // Update image
    if (image) {
      image.src = music.image;
      image.alt = 'Music production';
    }
  
    // Update title and description
    if (title) title.textContent = music.title;
    if (description) description.innerHTML = music.description;
  
    // Update button text
    if (button) {
      button.textContent = music.buttonText;
      button.href = 'https://soundcloud.com/lindstedt';
    }
  }
  
  /**
   * Update Stack Section
   */
  function updateStack(stack) {
    if (!stack) return console.error("Stack data is missing!");
  
    // Update main title and description
    const title = document.querySelector('.my-stack .main-h2');
    const description = document.querySelector('#stackDescription');
    if (title) title.textContent = stack.title;
    if (description) description.innerHTML = stack.description;
  
    // Update skills categories
    const skillsContainer = document.querySelector('#skillsCategories');
    if (!skillsContainer) return console.error("Skills container not found!");
  
    // Create the outer grid
    skillsContainer.innerHTML = `
      <div class="skills-grid">
        ${stack.skills_categories.map(category => `
          <div class="skills-category">
            <h3 class="category-name">${category.name}</h3>
            <div class="skill-items">
              ${category.items.map(item => `
                <div class="skill-item" tabindex="0">
                  <div class="skill-item-content">
                    <img src="${item.icon}" alt="${item.name}" class="skill-icon">
                    <div class="skill-info">
                      <div class="skill-name">${item.name}</div>
                      <div class="skill-meta">
                        <span class="skill-level">${item.level}</span>
                        <span>${item.years} years</span>
                      </div>
                    </div>
                  </div>
                  <div class="skill-popover">
                    <div class="popover-title">${item.name}</div>
                    <div class="popover-content">
                      ${item.description || getDefaultDescription(item.name)}
                    </div>
                    <div class="popover-stats">
                      <div class="stat-item">
                        <div class="stat-label">Level</div>
                        <div class="stat-value">${item.level}</div>
                      </div>
                      <div class="stat-item">
                        <div class="stat-label">Experience</div>
                        <div class="stat-value">${item.years} years</div>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  
    initializeSkillPopovers();
  }
  
  /**
   * Initialize Skill Popovers
   */
  function initializeSkillPopovers() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
      // Handle both click and keyboard events
      item.addEventListener('click', handlePopover);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePopover(e);
        }
      });
    });
  
    // Close popovers when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.skill-item')) {
        closeAllPopovers();
      }
    });
  }
  
  /**
   * Handle Skill Popover Toggle
   */
  function handlePopover(e) {
    e.stopPropagation();
    const item = e.currentTarget;
    const popover = item.querySelector('.skill-popover');
    const wasActive = popover.classList.contains('active');
    
    closeAllPopovers();
    
    if (!wasActive) {
      const itemRect = item.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportMiddle = viewportWidth / 2;
      
      if (itemRect.left < viewportMiddle) {
        // Item is in left column - show popover on the right
        popover.style.left = 'calc(100% + 10px)';
        popover.style.right = 'auto';
        // Adjust arrow to point left
        popover.style.setProperty('--arrow-left', '-6px');
        popover.style.setProperty('--arrow-right', 'auto');
        popover.style.setProperty('--arrow-transform', 'rotate(45deg)');
      } else {
        // Item is in right column - show popover on the left
        popover.style.left = 'auto';
        popover.style.right = 'calc(100% + 10px)';
        // Adjust arrow to point right
        popover.style.setProperty('--arrow-left', 'auto');
        popover.style.setProperty('--arrow-right', '-6px');
        popover.style.setProperty('--arrow-transform', 'rotate(225deg)');
      }
      
      popover.classList.add('active');
      // Set focus for accessibility
      item.focus();
    }
  }
  
  /**
   * Close All Popovers
   */
  function closeAllPopovers() {
    document.querySelectorAll('.skill-popover.active')
      .forEach(popover => popover.classList.remove('active'));
  }
  
  /**
   * Get Default Description for Skill
   */
  function getDefaultDescription(skillName) {
    const defaults = {
      'Python': 'My go-to language for data science and ML projects. Extensively used for building data pipelines, training models, and automating workflows. Love its elegant syntax and rich ecosystem.',
      
      'JavaScript': 'Essential part of my web development toolkit. Used for creating interactive data visualizations, building modern web apps, and enhancing user experiences with dynamic features.',
      
      'TypeScript': 'Brings type safety to JavaScript projects. Critical for maintaining large-scale applications and catching errors early. Improves code quality and team collaboration.',
      
      'PostgreSQL': 'Powers databases behind data-intensive applications. Skilled in optimizing complex queries, designing efficient schemas, and handling large-scale data operations.',
      
      'TensorFlow': 'My primary framework for deploying production ML models. Used for developing and training deep learning solutions, from computer vision to natural language processing tasks.',
      
      'PyTorch': 'Preferred framework for ML research and experimentation. Great for rapid prototyping and implementing cutting-edge deep learning architectures. Excellent for custom model development.',
      
      'Scikit-Learn': 'Core toolkit for classical machine learning. Used extensively for data preprocessing, feature engineering, and implementing traditional ML algorithms. Perfect for quick model iteration.',
      
      'OpenCV': 'Essential for computer vision projects. Used for image processing, real-time video analysis, and developing computer vision applications. Strong experience with both Python and C++ APIs.'
    };
    return defaults[skillName] || 'A key technology in the development stack.';
  }
  
  /**
   * Update Testimonials Section
   */
  function updateTestimonials(testimonials) {
    if (!testimonials || !testimonials.items || testimonials.items.length === 0) return;
    
    const testimonialsSection = document.querySelector('.testimonials');
    if (!testimonialsSection) return console.error('Testimonials section not found!');
  
    // Set title
    const title = testimonialsSection.querySelector('.main-h2');
    if (title) title.textContent = testimonials.title;
  
    // Populate items
    const itemsContainer = testimonialsSection.querySelector('.testimonial-items');
    if (itemsContainer) {
      itemsContainer.innerHTML = testimonials.items.map(item => `
        <div class="testimonial-item">
          <img src="${item.image}" alt="${item.company} logo" class="testimonial-image">
          <blockquote>"${item.text}"</blockquote>
          <p>- ${item.author}, ${item.company}</p>
        </div>
      `).join('');
    }
  }
  
  /**
 * Function to properly initialize and render the experience items
 */
function updateProfessionalExperience(experience) {
    if (!experience || !experience.positions || experience.positions.length === 0) return;
    
    const experienceSection = document.querySelector('.professional-experience');
    if (!experienceSection) return console.error('Professional experience section not found!');
  
    // Set title
    const title = experienceSection.querySelector('.heading-gradient');
    if (title) title.textContent = experience.title;
  
    // Populate positions
    const positionsContainer = experienceSection.querySelector('.experience-items');
    if (positionsContainer) {
      positionsContainer.innerHTML = experience.positions.map(position => `
        <div class="experience-item">
          <div class="experience-content">
            <div class="experience-left">
              <h3 class="experience-title">
                ${position.title}
                <span>at</span>
                <a href="${position.link}" target="_blank" rel="noopener" class="experience-company">${position.company}</a>
              </h3>
              <div class="experience-period">${position.period}</div>
              <p class="experience-description">${position.description}</p>
              
              <div class="technologies-container">
                <h4 class="technology-title">Technologies</h4>
                <div class="technologies-list">
                  ${position.technologies.map(tech => `<span class="technology-tag">${tech}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
  
  /**
   * Update Blog Highlights Section
   */
  function updateBlogHighlights(blog) {
    if (!blog || !blog.featured || blog.featured.length === 0) return;
  
    const blogSection = document.querySelector('.blog-highlights');
    if (!blogSection) return console.error('Blog highlights section not found!');
  
    // Set title and description
    const title = blogSection.querySelector('.main-h2');
    const description = blogSection.querySelector('.blog-description');
    if (title) title.textContent = blog.title;
    if (description) description.textContent = blog.description;
  
    // Populate featured articles
    const blogContainer = blogSection.querySelector('.blog-items');
    if (blogContainer) {
      blogContainer.innerHTML = blog.featured.map(article => `
        <div class="blog-item">
          <h3><a href="${article.link}" target="_blank">${article.title}</a></h3>
          <p>${article.excerpt}</p>
          <p><small>${new Date(article.date).toLocaleDateString()}</small></p>
        </div>
      `).join('');
    }
  }
  
  /**
   * Initialize Home Page
   */
  function initializeHomePage() {
    // Load audio playlist data
    loadAudioPlaylists();
    loadLatestBlogPost();
    loadLatestMusic();
  }
  
  /**
   * Load Audio Playlists
   */
  async function loadAudioPlaylists() {
    const musicGenres = document.getElementById('musicGenres');
    if (!musicGenres) return;
    
    try {
      const response = await fetch('/data/audio.json');
      const audioData = await response.json();
      
      // Create tabs container and content container
      const tabsHtml = `
        <div class="player-tabs">
          ${audioData.slice(0, 6).map((playlist, index) => `
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
            ${audioData.slice(0, 6).map((playlist, index) => `
              <div class="player-panel" data-index="${index}">
                <div class="soundcloud-player">
                  <div class="player-header">
                    <h3 class="soundcloud-title">${playlist.text}</h3>
                    <div class="playlist-meta">
                      <span class="genre">${playlist.genre || 'Electronic'}</span>
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
      
      musicGenres.innerHTML = tabsHtml;
      
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
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          playerContent.classList.remove('visible');
          // Remove active states
          document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
        });
      }
    } catch (error) {
      console.error('Error loading audio data:', error);
      if (musicGenres) {
        musicGenres.innerHTML = '<p>Error loading playlists. Please try again later.</p>';
      }
    }
  }
  
  /**
   * Load Latest Blog Post
   */
  async function loadLatestBlogPost() {
    const latestBlogImage = document.getElementById('latestBlogImage');
    const latestBlogTitle = document.getElementById('latestBlogTitle');
    const latestBlogMeta = document.getElementById('latestBlogMeta');
    
    if (!latestBlogTitle || !latestBlogMeta) return;
    
    try {
      const response = await fetch('/data/blog/index.json');
      const posts = await response.json();
      const latest = posts[0];
      
      if (latest) {
        // Update image
        if (latestBlogImage) {
          latestBlogImage.src = latest.image;
          latestBlogImage.alt = latest.title;
        }
        
        // Update title
        latestBlogTitle.textContent = latest.title;
        
        // Update meta
        latestBlogMeta.textContent = `${new Date(latest.publishDate).toLocaleDateString()} · ${latest.readTime}`;
      }
    } catch (error) {
      console.error('Error loading blog data:', error);
    }
  }
  
  /**
   * Load Latest Music
   */
  async function loadLatestMusic() {
    const latestMusicImage = document.getElementById('latestMusicImage');
    const latestMusicTitle = document.getElementById('latestMusicTitle');
    const latestMusicMeta = document.getElementById('latestMusicMeta');
    
    if (!latestMusicTitle || !latestMusicMeta) return;
    
    try {
      const response = await fetch('/data/audio.json');
      const tracks = await response.json();
      const latest = tracks[0];
      
      if (latest) {
        // Update image
        if (latestMusicImage) {
          latestMusicImage.src = latest.image;
          latestMusicImage.alt = latest.text;
        }
        
        // Update title
        latestMusicTitle.textContent = latest.text;
        
        // Update meta
        latestMusicMeta.textContent = `${new Date(latest.date).toLocaleDateString()} · ${latest.genre || 'Electronic'} · ${latest.tracks} tracks`;
      }
    } catch (error) {
      console.error('Error loading music data:', error);
    }
  }
  
  /**
   * Initialize ML Concepts Page
   */
  function initializeMLConceptsPage() {
    // This will be initialized when D3.js is loaded
    loadD3().then(() => {
      loadMathJax().then(() => {
        initializeNetwork();
        initializeResizePanel();
      });
    });
  }
  
  /**
   * Load D3.js
   */
  function loadD3() {
    if (window.d3) return Promise.resolve();
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }
  
  /**
   * Load MathJax
   */
  function loadMathJax() {
    if (window.MathJax) return Promise.resolve();
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.id = 'MathJax-script';
      script.async = true;
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }
  
  /**
   * Initialize ML Concepts Network Visualization
   */
  async function initializeNetwork() {
    try {
      const response = await fetch('/data/ml_concepts.json');
      const data = await response.json();
      setupMLNetwork(data);
      initializeMLControls();
    } catch (error) {
      console.error('Error loading ML concepts data:', error);
    }
  }
  
  /**
   * Setup ML Concepts Network Visualization
   */
  function setupMLNetwork(data) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const svg = d3.select('#network')
      .attr('width', width)
      .attr('height', height);
  
    const container = svg.append('g')
      .attr('class', 'container');
  
    // Process data
    const nodes = Object.entries(data).map(([name, concept]) => ({
      id: name,
      ...concept,
      radius: getNodeRadius(concept)
    }));
  
    const links = createMLLinks(nodes);
  
    const simulation = d3.forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => d.radius + 10))
      .force('link', d3.forceLink(links).id(d => d.id).distance(100))
      .on('tick', () => {
        container.selectAll('line')
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
  
        container.selectAll('.node')
          .attr('transform', d => `translate(${d.x},${d.y})`);
      });
  
    const link = container.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('class', 'link');
  
    const node = container.append('g')
      .attr('class', 'nodes')
      .selectAll('.node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .call(d3.drag()
        .on('start', (event) => {
          if (!event.active && window.physicsEnabled) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on('drag', (event) => {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on('end', (event) => {
          if (!event.active && window.physicsEnabled) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }));
  
    node.append('circle')
      .attr('class', 'node-circle')
      .attr('r', d => d.radius)
      .style('fill', d => getNodeColor(d));
  
    node.append('text')
      .attr('class', 'node-text')
      .attr('dy', '.35em')
      .text(d => d.id)
      .style('font-size', d => Math.max(8, d.radius / 3) + 'px');
  
    node.on('click', showMLDetail);
  
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
      });
  
    svg.call(zoom);
    
    // Store references for use by controls
    window.mlNetwork = {
      svg,
      container,
      simulation,
      zoom,
      physicsEnabled: true
    };
  }
  
  /**
   * Get Node Radius
   */
  function getNodeRadius(concept) {
    const baseSize = 30;
    const tagBonus = concept.tags.length * 2;
    const yearBonus = (2024 - parseInt(concept.year)) / 20;
    return baseSize + tagBonus + yearBonus;
  }
  
  /**
   * Get Node Color
   */
  function getNodeColor(node) {
    return node.type === 'supervised' 
      ? 'rgba(40, 200, 245, 0.1)'
      : 'rgba(72, 200, 245, 0.2)';
  }
  
  /**
   * Create ML Network Links
   */
  function createMLLinks(nodes) {
    const links = [];
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach(otherNode => {
        if (areConceptsRelated(node, otherNode)) {
          links.push({ source: node.id, target: otherNode.id });
        }
      });
    });
    return links;
  }
  
  /**
   * Check if Concepts are Related
   */
  function areConceptsRelated(a, b) {
    return a.tags.some(tag => b.tags.includes(tag)) || 
      Math.abs(parseInt(a.year) - parseInt(b.year)) < 10;
  }
  
  /**
   * Show ML Concept Detail
   */
  function showMLDetail(event, d) {
    const panel = document.querySelector('.detail-panel');
    const content = panel.querySelector('.detail-content');
  
    content.innerHTML = `
      <h2 class="detail-title">${d.id}</h2>
      <div class="detail-year">${d.year}</div>
      <div class="detail-tags">
        ${d.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      ${d.img ? `
        <img src="${d.img}" alt="${d.id}" class="detail-image">
        <p>${d.img_description}</p>
      ` : ''}
      <p>${d.paragraph}</p>
    `;
  
    panel.classList.add('active');
    
    // Handle LaTeX content
    if (window.MathJax) {
      MathJax.typesetPromise([content]).catch((err) => console.log('MathJax error:', err));
    }
  }
  
  /**
   * Initialize ML Controls
   */
  function initializeMLControls() {
    document.querySelector('.close-btn')?.addEventListener('click', () => {
      document.querySelector('.detail-panel').classList.remove('active');
    });
  
    document.getElementById('zoomIn')?.addEventListener('click', () => {
      if (window.mlNetwork?.svg) {
        window.mlNetwork.svg.transition().call(window.mlNetwork.zoom.scaleBy, 1.5);
      }
    });
  
    document.getElementById('zoomOut')?.addEventListener('click', () => {
      if (window.mlNetwork?.svg) {
        window.mlNetwork.svg.transition().call(window.mlNetwork.zoom.scaleBy, 0.75);
      }
    });
  
    document.getElementById('reset')?.addEventListener('click', () => {
      if (window.mlNetwork?.svg) {
        window.mlNetwork.svg.transition().call(window.mlNetwork.zoom.transform, d3.zoomIdentity);
      }
    });
  
    document.getElementById('togglePhysics')?.addEventListener('click', () => {
      if (window.mlNetwork) {
        window.mlNetwork.physicsEnabled = !window.mlNetwork.physicsEnabled;
        if (window.mlNetwork.physicsEnabled) {
          window.mlNetwork.simulation.restart();
        } else {
          window.mlNetwork.simulation.stop();
        }
      }
    });
  }
  
  /**
   * Initialize Resize Panel
   */
  function initializeResizePanel() {
    const panel = document.querySelector('.detail-panel');
    if (!panel) return;
    
    // Resize handle
    const handle = document.createElement('div');
    handle.className = 'resize-handle';
    panel.insertBefore(handle, panel.firstChild);
  
    let isResizing = false;
    let startX;
    let startWidth;
  
    handle.addEventListener('mousedown', startResize);
  
    function startResize(e) {
      isResizing = true;
      startX = e.clientX;
      startWidth = parseInt(getComputedStyle(panel).width, 10);
      panel.classList.add('resizing');
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
      e.preventDefault();
    }
  
    function resize(e) {
      if (!isResizing) return;
      
      const width = startWidth + (startX - e.clientX);
      const constrainedWidth = Math.max(300, Math.min(800, width));
      panel.style.width = `${constrainedWidth}px`;
    }
  
    function stopResize() {
      isResizing = false;
      panel.classList.remove('resizing');
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    }
  }
  
  /**
   * Initialize Blog Page
   */
  function initializeBlogPage() {
    fetchAndRenderMarkdown();
  }
  
  /**
   * Fetch and Render Markdown Blog Posts
   */
  async function fetchAndRenderMarkdown() {
    const blogArticleDiv = document.getElementById('blog-article');
    if (!blogArticleDiv) return;
    
    try {
      const response = await fetch('../../data/blog/post_index.json');
      const filesData = await response.json();
      const sortedFiles = filesData.sort((a, b) => b.index - a.index);
  
      // For each Markdown file, create an article
      for (const fileData of sortedFiles) {
        const filePath = `${fileData.fileName}`;
        const response = await fetch(filePath);
        const markdownText = await response.text();
        const tags = fileData.tags.split(',');
        
        // Load Remarkable if not already loaded
        if (!window.remarkable) {
          await loadRemarkable();
        }
        
        // Convert Markdown to HTML
        const md = new remarkable.Remarkable();
        const htmlContent = md.render(markdownText);
  
        // Create a new div element for each blog article
        const articleDiv = document.createElement('div');
        articleDiv.className = 'blog-article';
        articleDiv.innerHTML = htmlContent;
        
        // Extract tags from JSON and create container for them
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'tags-container-left';
        
        // Publish date
        const publishDateElement = document.createElement('div');
        publishDateElement.textContent = fileData.publishDate;
  
        const h1Element = articleDiv.querySelector('h1');
        if (h1Element) h1Element.parentNode.insertBefore(publishDateElement, h1Element);
        
        // Create a tag element for each tag
        tags.forEach(tag => {
          const tagElement = document.createElement('div');
          tagElement.className = 'blog-tags';
          tagElement.textContent = tag.trim();
          tagsContainer.appendChild(tagElement);
        });
        
        // Order
        if (h1Element) {
          publishDateElement.className = 'publish-date';
          publishDateElement.textContent = "Published " + fileData.publishDate;
          h1Element.insertAdjacentElement('afterend', publishDateElement);
          h1Element.insertAdjacentElement('afterend', tagsContainer);
          h1Element.classList.add('blog-h1');
        }
        
        // Append the blog article div to the main content container
        blogArticleDiv.appendChild(articleDiv);
      }
    } catch (error) {
      console.error('Error fetching and rendering Markdown:', error);
      if (blogArticleDiv) {
        blogArticleDiv.innerHTML = '<p>Error loading blog posts. Please try again later.</p>';
      }
    }
  }
  
  /**
   * Load Remarkable Markdown Library
   */
  function loadRemarkable() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/remarkable@2/dist/remarkable.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  /**
   * Initialize Downloads Page
   */
  function initializeDownloadsPage() {
    loadDownloads();
  }
  
  /**
   * Load Downloads Data
   */
  async function loadDownloads() {
    const downloadsTableBody = document.getElementById('downloadsTableBody');
    if (!downloadsTableBody) return;
    
    try {
      const response = await fetch('/data/downloads.json');
      const data = await response.json();
      const downloads = data.downloads;
      
      renderDownloads(downloads);
      setupDownloadsSearch(downloads);
    } catch (error) {
      console.error('Error loading downloads:', error);
      downloadsTableBody.innerHTML = '<tr><td colspan="5">Error loading downloads. Please try again later.</td></tr>';
    }
  }
  
  /**
   * Render Downloads Table
   */
  function renderDownloads(downloads) {
    const tbody = document.getElementById('downloadsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = downloads.map(item => `
      <tr>
        <td>
          <img src="${item.preview}" alt="${item.title}" class="preview-image">
        </td>
        <td>${item.title}</td>
        <td><span class="category-badge">${item.category}</span></td>
        <td>${item.description}</td>
        <td>
          <a href="${item.link}" class="download-link" target="_blank">${item.linkText}</a>
        </td>
      </tr>
    `).join('');
  }
  
  /**
   * Setup Downloads Search
   */
  function setupDownloadsSearch(downloads) {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredDownloads = downloads.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
      renderDownloads(filteredDownloads);
    });
  }
  
  /**
   * Initialize Projects Page
   */
  function initializeProjectsPage() {
    loadProjects();
  }
  
  /**
   * Load Projects Data
   */
  async function loadProjects() {
    const cardsContainer = document.getElementById('cardsContainer');
    if (!cardsContainer) return;
    
    try {
      const response = await fetch('/data/projects copy.json');
      const data = await response.json();
      const cards = data.cards;
      
      // Loop through each card object in the array
      cards.forEach((card, index) => {
        // Create a new card element
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
  
        // Create an anchor element for the link
        const linkElement = document.createElement('a');
        linkElement.href = card.link;
  
        // Create the first image element
        const image1Element = document.createElement('img');
        image1Element.src = card.image1;
        image1Element.alt = '';
  
        // Create the second image element
        const image2Element = document.createElement('img');
        image2Element.src = card.image2;
        image2Element.alt = '';
  
        // Append both images to the anchor element
        linkElement.appendChild(image1Element);
        linkElement.appendChild(image2Element);
  
        // Append the anchor element to the card element
        cardElement.appendChild(linkElement);
  
        // Create a paragraph element for the description
        const descriptionElement = document.createElement('p');
  
        // Parse the description text and replace any occurrences of links with anchor tags
        const descriptionWithLinks = card.description.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        descriptionElement.innerHTML = descriptionWithLinks;
  
        // Append the description paragraph to the card element
        cardElement.appendChild(descriptionElement);
  
        // Append the card element to the cards container
        cardsContainer.appendChild(cardElement);
  
        // Animate the card with a staggered delay
        setTimeout(() => {
          cardElement.classList.add('fade-in-up');
        }, index * 40); // Delay
      });
    } catch (error) {
      console.error('Error fetching projects data:', error);
      if (cardsContainer) {
        cardsContainer.innerHTML = '<p>Error loading projects. Please try again later.</p>';
      }
    }
  }
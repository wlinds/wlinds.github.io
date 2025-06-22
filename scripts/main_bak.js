document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    
    fetch('../components/header.html')
        .then(response => {
            return response.text();
        })
        .then(data => {
            headerPlaceholder.innerHTML = data;

            const menuToggle = document.getElementById('menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');

            if (menuToggle && mobileMenu) {
                menuToggle.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }
        })
        .catch(error => console.error('Error loading header:', error));
});



document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch main content
        console.log('Fetching site content...');
        const response = await fetch('data/site-content.json');
        const content = await response.json();
        console.log('Content loaded successfully');

        // Update Hero Section with animated tags
        function updateHero(hero) {
            if (!hero) return;
            console.log('Updating hero section');
            
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

        // Update Skills Section
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
        
            if (projectsContainer) {
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
        
        // Update Ethics Section
        function updateEthics(ethics) {
            if (!ethics) return;
            console.log('Updating ethics section');
            
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

        // Update Music Section
        function updateMusic(music) {
            if (!music) return;
            console.log('Updating music section with:', music);
        
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
        
        

// Update Stack Section
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
  
    // First, create the outer grid
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
  
    initializePopovers();
    console.log("Stack section updated successfully!");
  }
  
  function initializePopovers() {
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
  
  function handlePopover(e) {
    e.stopPropagation();
    const item = e.currentTarget;
    const wasActive = item.querySelector('.skill-popover').classList.contains('active');
    
    closeAllPopovers();
    
    if (!wasActive) {
      item.querySelector('.skill-popover').classList.add('active');
      // Set focus for accessibility
      item.focus();
    }
  }
  
  function closeAllPopovers() {
    document.querySelectorAll('.skill-popover.active')
      .forEach(popover => popover.classList.remove('active'));
  }
  
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

  function initializePopovers() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllPopovers();
      
      const popover = item.querySelector('.skill-popover');
      
      // Get item's position relative to viewport
      const itemRect = item.getBoundingClientRect();
      // Get the viewport width
      const viewportWidth = window.innerWidth;
      // Get the middle point of the viewport
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
    });
  });

  // Close popovers when clicking outside
  document.addEventListener('click', closeAllPopovers);
}

function closeAllPopovers() {
  document.querySelectorAll('.skill-popover.active')
    .forEach(popover => popover.classList.remove('active'));
}

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
        
        function updateProfessionalExperience(experience) {
            if (!experience || !experience.positions || experience.positions.length === 0) return;
            
            const experienceSection = document.querySelector('.professional-experience');
            if (!experienceSection) return console.error('Professional experience section not found!');
        
            // Set title
            const title = experienceSection.querySelector('.main-h2');
            if (title) title.textContent = experience.title;
        
            // Populate positions
            const positionsContainer = experienceSection.querySelector('.experience-items');
            if (positionsContainer) {
                positionsContainer.innerHTML = experience.positions.map(position => `
                    <div class="experience-item">
                        <h3>${position.title} at <a href="${position.link}" target="_blank">${position.company}</a></h3>
                        <p>${position.period}</p>
                        <p>${position.description}</p>
                        <ul>
                            ${position.technologies.map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    </div>
                `).join('');
            }
        }
        
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

        // Initialize all sections
        console.log('Initializing all sections');
        updateHero(content.hero);
        updateCoding(content.my_coding);
        updateEthics(content.my_ethics);
        updateMusic(content.my_music);
        updateStack(content.my_stack);
        updateTestimonials(content.testimonials)
        updateProfessionalExperience(content.professional_experience)
        updateBlogHighlights(content.blog_highlights)

        console.log('All sections updated successfully');

    } catch (error) {
        console.error('Error loading site content:', error);
        // Handle errors gracefully
        document.querySelectorAll('.loading-placeholder').forEach(placeholder => {
            placeholder.textContent = 'Failed to load content. Please refresh the page.';
        });
    }
});

// Add necessary CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInTag {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes animateBlur {
        0% {
            filter: blur(128px);
            opacity: 0.2;
            transform: matrix(1, 0, 0, 1, -350.75, 0);
            width: 80%;
        }
        100% {
            filter: blur(64px);
            opacity: 0.8;
            transform: matrix(1, 0, 0, 1, -350.75, 0);
            width: 13.3333%;
        }
    }
`;
document.head.appendChild(styleSheet);
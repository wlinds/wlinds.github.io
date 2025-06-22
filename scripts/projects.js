/**
 * Projects Page JavaScript
 * Handles loading and displaying projects from JSON data
 */

document.addEventListener('DOMContentLoaded', () => {
    // Load projects
    loadProjects();
  });
  
  /**
   * Load projects from JSON file
   */
  async function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    try {
      const response = await fetch('/data/projects copy.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Clear loading placeholder
      projectsGrid.innerHTML = '';
      
      // Create cards for each project
      data.cards.forEach((card, index) => {
        createProjectCard(card, index, projectsGrid);
      });
      
      // Start observing cards for IntersectionObserver animations
      observeProjectCards();
      
    } catch (error) {
      console.error('Error loading projects:', error);
      projectsGrid.innerHTML = '<p class="error-message">Failed to load projects. Please try again later.</p>';
    }
  }
  
  /**
   * Create a project card element
   */
  function createProjectCard(card, index, container) {
    const cardElement = document.createElement('div');
    cardElement.className = 'project-card';
    
    // Parse description text and replace any Markdown links with HTML links
    const descriptionWithLinks = card.description.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    
    // Card content
    cardElement.innerHTML = `
      <a href="${card.link}" target="_blank" rel="noopener">
        <div class="project-images">
          <img src="${card.image1}" alt="" class="project-image">
          <img src="${card.image2}" alt="" class="project-image">
        </div>
        <div class="project-description">
          ${descriptionWithLinks}
        </div>
      </a>
    `;
    
    container.appendChild(cardElement);
    
    // Add delay for staggered animation if not using IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setTimeout(() => {
        cardElement.classList.add('visible');
      }, index * 50); // 50ms delay between each card
    }
  }
  
  /**
   * Observe project cards for scroll animations using IntersectionObserver
   */
  function observeProjectCards() {
    if ('IntersectionObserver' in window) {
      const cards = document.querySelectorAll('.project-card');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class with slight delay based on index
            const index = Array.from(cards).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 50);
            
            // Stop observing this card once it's visible
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item is visible
      });
      
      // Start observing each card
      cards.forEach(card => {
        observer.observe(card);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('visible');
      });
    }
  }
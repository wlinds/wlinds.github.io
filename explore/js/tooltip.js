export class TooltipManager {
    constructor() {
        console.log('TooltipManager constructing...');
        this.tooltip = document.getElementById('tooltip');
        this.elements = {
            image: document.getElementById('tooltip-image'),
            title: document.getElementById('tooltip-title'),
            subtitle: document.getElementById('tooltip-subtitle'),
            description: document.getElementById('tooltip-description'),
            tags: document.getElementById('tooltip-tags'),
            links: document.getElementById('tooltip-links'),
            closeButton: document.getElementById('close-tooltip')
        };

        this.setupEventListeners();
        console.log('TooltipManager constructed:', this);
    }

    show(position, data) {
        console.log('Show method called with:', position, data);
        this.updateContent(data);
        
        this.tooltip.style.left = `${position.x}px`;
        this.tooltip.style.top = `${position.y}px`;
        
        this.tooltip.style.display = 'block';
    }

    hide() {
        this.tooltip.style.display = 'none';
    }

    setupEventListeners() {
        this.elements.closeButton.addEventListener('click', () => {
            this.hide();
        });

        window.addEventListener('resize', () => {
            this.hide();
        });
    }

    updateContent(data) {
        const {
            image = 'https://via.placeholder.com/50',
            title = 'Title Placeholder',
            subtitle = 'Subtitle Placeholder',
            description = 'Lorem ipsum dolor sit amet.',
            tags = [],
            links = []
        } = data;

        this.elements.image.src = image;

        this.elements.title.textContent = title;
        this.elements.subtitle.textContent = subtitle;
        this.elements.description.textContent = description;

        this.elements.tags.innerHTML = '';
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            this.elements.tags.appendChild(tagElement);
        });

        this.elements.links.innerHTML = '';
        links.forEach((link, index) => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.textContent = link.text;
            linkElement.target = '_blank';
            this.elements.links.appendChild(linkElement);

            if (index < links.length - 1) {
                const separator = document.createTextNode(' | ');
                this.elements.links.appendChild(separator);
            }
        });
    }
}
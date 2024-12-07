document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../data/ml_concepts.json');
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log('Data fetched successfully:', data);

        const container = document.querySelector('.article-container');

        Object.keys(data).forEach(key => {
            const concept = data[key];

            const modelElement = document.createElement('div');
            modelElement.classList.add('model-box');

            const titleElement = document.createElement('h2');
            titleElement.textContent = key;
            modelElement.appendChild(titleElement);

            const infoContainer = document.createElement('div');
            infoContainer.classList.add('info-container');
            
            
            // Create elements for year and type (supervised/unsupervised)
            const yearElement = document.createElement('p');
            yearElement.textContent = `Introduced: ${concept.year}`;
            yearElement.classList.add('ml-year-div');
            infoContainer.appendChild(yearElement);

            const typeElement = document.createElement('p');
            const capitalizedType = concept.type.charAt(0).toUpperCase() + concept.type.slice(1);
            typeElement.textContent = `Type: ${capitalizedType}`;
            typeElement.classList.add('ml-type-div');
            infoContainer.appendChild(typeElement);

            modelElement.appendChild(infoContainer);

            // Tags
            const tagsContainer = document.createElement('div');
            tagsContainer.classList.add('ml-tags');

            concept.tags.forEach(tag => {
                const tagElement = document.createElement('div');
                tagElement.classList.add('ml-tag');
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });

            modelElement.appendChild(tagsContainer);

            // Images, img alt and img caption
            const imageElement = document.createElement('img');
            if (concept.img && concept.img.trim() !== '') {
                imageElement.src = concept.img;
                imageElement.alt = concept.img_alt;
                modelElement.appendChild(imageElement);
            }

            const imageCaptionElement = document.createElement('p');
            if (concept.img_description.trim() !== '') {
                imageCaptionElement.innerHTML = concept.img_description;
                imageCaptionElement.classList.add('image-caption');
                modelElement.appendChild(imageCaptionElement);

            }

            // Subheading
            // const subheadingElement = document.createElement('h2');
            // subheadingElement.textContent = concept.subheading;
            // modelElement.appendChild(subheadingElement);




            // Parse paragraphs with html tags and latex
            const paragraphElement = document.createElement('p');
            paragraphElement.innerHTML = concept.paragraph;

            modelElement.appendChild(paragraphElement);

            MathJax.typeset([paragraphElement]);

            // Links
            // const linkElement = document.createElement('a');
            // linkElement.href = concept.link;
            // linkElement.textContent = concept.link_desc;
            // modelElement.appendChild(linkElement);

            container.appendChild(modelElement);
        });
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
});

// Fetch the JSON data
fetch('data/projects.json')
    .then(response => response.json())
    .then(data => {
        // Access the cards array from the JSON data
        const cards = data.cards;

        // Get the container element where the cards will be appended
        const cardsContainer = document.querySelector('.cards-main');

        // Loop through each card object in the array
        cards.forEach(card => {
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
        });
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

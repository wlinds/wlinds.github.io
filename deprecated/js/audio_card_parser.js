fetch('../data/audio.json')
    .then(response => response.json())
    .then(data => {
        // Access the array of cards from the JSON data
        const cards = data;

        // Get the container element where the cards will be appended
        const cardsContainer = document.getElementById('cardsContainer');

        // Loop through each card object in the array
        cards.forEach(card => {
            // Create a new card element
            const cardElement = document.createElement('div');
            cardElement.classList.add('card2');

            // Create an anchor element for the link
            const linkElement = document.createElement('a');
            linkElement.href = card.link;

            // Create the image element
            const imageElement = document.createElement('img');
            imageElement.src = card.image;
            imageElement.alt = '';

            // Append the image to the anchor element
            linkElement.appendChild(imageElement);

            // Append the anchor element to the card element
            cardElement.appendChild(linkElement);

            // Create a paragraph element for the text
            const textElement = document.createElement('p');
            textElement.textContent = card.text;

            // Append the text paragraph to the card element
            cardElement.appendChild(textElement);

            // Append the card element to the cards container
            cardsContainer.appendChild(cardElement);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

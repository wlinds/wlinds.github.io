fetch('data/textcopy.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('title').textContent = data.hero.title;
        document.getElementById('description').textContent = data.hero.description;
        const tagsContainer = document.querySelector('.tags-container');
        data.hero.tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.classList.add('hero-tag');
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });

        const myCoding = data['my-coding'];
        document.querySelector('.my-coding img').src = myCoding.image;
        document.querySelector('.my-coding h2').textContent = myCoding.title;
        document.querySelector('.my-coding p').innerHTML = myCoding.description.replace(/\n/g, '<br>');
        document.querySelector('.my-coding button').textContent = myCoding.buttonText;

        const myEthics = data['my-ethics'];
        // document.querySelector('.my-ethics img').src = myEthics.image;
        document.querySelector('.my-ethics h2').textContent = myEthics.title;
        document.querySelector('.my-ethics p').innerHTML = myEthics.description.replace(/\n/g, '<br>');
        document.querySelector('.my-ethics button').textContent = myEthics.buttonText;

        const myMusic = data['my-music'];
        document.querySelector('.my-music img').src = myMusic.image;
        document.querySelector('.my-music h2').textContent = myMusic.title;
        document.querySelector('.my-music p').innerHTML = myMusic.description.replace(/\n/g, '<br>');
        document.querySelector('.my-music button').textContent = myMusic.buttonText;

        const myStack = data['my-stack'];
        document.querySelector('.my-stack h2').textContent = myStack.title;
        document.querySelector('.my-stack p:nth-of-type(1)').innerHTML = myStack.description1.replace(/\n/g, '<br>');;
        document.querySelector('.my-stack p:nth-of-type(2)').textContent = myStack.description2;
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
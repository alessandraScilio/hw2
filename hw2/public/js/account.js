
function onError(error) {
     console.error('Error:', error);
    const container = document.getElementById('liked-posts-container');
    if (container) {
        container.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

function onJson(favourites) {
    const container = document.getElementById('liked-posts-container');
    if (!container) return;

    container.innerHTML = ''; 

    for (let i = 0; i < favourites.length; i++) {
        const favourite = favourites[i];

        const postElement = document.createElement('div');
        postElement.className = 'liked-post';

        const postImg = document.createElement('img');
        postImg.src = favourite.image_url || 'pics/default_img.jpeg';
        postImg.alt = favourite.title || 'Article image';
        postElement.appendChild(postImg);

        const postLink = document.createElement('a');
        postLink.href = BASE_URL + 'article/' + favourite.id;
        postLink.className = 'liked-post-title';

        const postTitle = document.createElement('h3');
        postTitle.textContent = favourite.title;
        postLink.appendChild(postTitle);

        postElement.appendChild(postLink);
        container.appendChild(postElement);
    }
}

function onResponse(response) {
    return response.json();
}

function getData() {
    const formData = new FormData();
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    formData.append('_token', csrfToken);

    fetch(BASE_URL + 'favs', {
        method: 'POST',
        body: formData
        }).then(onResponse)
        .then(onJson)
        .catch(onError);
}

document.addEventListener('DOMContentLoaded', getData);

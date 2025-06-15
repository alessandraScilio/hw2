
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



function toggleMobileMenu() {
  const menuContainer = document.getElementById('menu-container');
  const body = document.body;
  const hamburger = document.querySelector('.hamburger');
  const navContainer = document.getElementById('nav-container');
  const overlay = document.getElementById('menu-overlay');

  const isMenuOpen = menuContainer.classList.toggle('show');

  body.classList.toggle('no-scroll', isMenuOpen);
  overlay.classList.toggle('show', isMenuOpen);
  menuContainer.classList.toggle('hidden', !isMenuOpen);

  if (isMenuOpen) {
    hamburger.innerHTML = '<img src="' + BASE_URL + 'pics/cross.svg" alt="Close menu">';
    navContainer.classList.add('nav-expanded');
  } else {
    hamburger.innerHTML = '<img src="' + BASE_URL + 'pics/hamburger.svg">';
    navContainer.classList.remove('nav-expanded');
  }
}

function onDomLoaded() {
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }
    getData();
}

document.addEventListener('DOMContentLoaded', onDomLoaded);


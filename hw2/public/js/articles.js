function onJSON(json) {
    const container = document.getElementById('articles-container');
    container.innerHTML = '';

    if (json.length === 0) {
        const noArticlesMessage = document.createElement('p');
        noArticlesMessage.textContent = 'No articles found.';
        container.appendChild(noArticlesMessage);
        return;
    }

    for (const article of json) {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        const image = document.createElement('img');
        image.src = article.image_url || 'pics/default_img.jpeg';
        articleDiv.appendChild(image);

        const title = document.createElement('h3');
        title.textContent = article.title.length > 150 ? article.title.substring(0, 15) + '...' : article.title;
        articleDiv.appendChild(title);

        const preview = document.createElement('p');
        preview.textContent = article.content.length > 150 ? article.content.substring(0, 150) + '...' : article.content;
        articleDiv.appendChild(preview);

        const articleId = article.id;

        const readMore = document.createElement('a');
        readMore.textContent = 'Read more';
        readMore.classList.add('read-more');
        readMore.href = BASE_URL + 'article/' + articleId;
        articleDiv.appendChild(readMore);
        container.appendChild(articleDiv);
    }
}

function onResponse(response) {
    console.log(response);
    return response.json();
}

function searchArticles(event) {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const meta_element = document.querySelector('meta[name="csrf-token"]');
    const csrf_token = meta_element.content;
    formData.append ('_token', csrf_token);

    fetch(BASE_URL + 'search_article', {
        method: 'POST',
        body: formData
    }).then(onResponse)
    .then(onJSON);
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
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', searchArticles);
    }
}


document.addEventListener('DOMContentLoaded', onDomLoaded);




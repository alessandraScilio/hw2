function createArticleCard(post) {
    const articleCard = document.createElement('div');
    articleCard.classList.add('article-card');

    const postImg = document.createElement('img');
    postImg.src = post.image_url;
    postImg.alt = post.title;
    articleCard.appendChild(postImg);

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title.length > 20 ? post.title.substring(0, 20) + '...' : post.title;
    articleCard.appendChild(postTitle);

    const postContent = document.createElement('p');
    postContent.textContent = post.content.length > 90 ? post.content.substring(0, 90) + '...' : post.content;
    articleCard.appendChild(postContent);

    const articleId = post.id;
    const link = document.createElement('a');
    link.href = BASE_URL + 'article/' + articleId;
    link.classList.add('read-more');
    link.textContent = 'Read more';
    articleCard.appendChild(link);

    return articleCard;
}

function onResponse(response) {
    if (!response.ok) {
        throw new Error('Errore nella risposta del server');
    }
    return response.json();
}

function onJson(posts) {
    const container = document.getElementById('articles-grid');

    if (!container) return;

    container.innerHTML = '';

    if (posts.error) {
        throw new Error(posts.error);
    }

     for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const articleCard = createArticleCard(post);
        container.appendChild(articleCard);
    }

}

function loadPopularPosts() {
    const container = document.getElementById('articles-grid');

    if (!container) return;
    container.innerHTML = '';

    fetch(BASE_URL + 'list')
        .then(onResponse)
        .then(onJson);
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
  loadPopularPosts();
}


document.addEventListener('DOMContentLoaded', onDomLoaded);


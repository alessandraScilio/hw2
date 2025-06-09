function getFlightPage() {
    window.location.href = 'articles.php';
}

function createArticleCard(post) {
    const articleCard = document.createElement('div');
    articleCard.classList.add('article-card');

    const postImg = document.createElement('img');
    postImg.src = post.image_url && post.image_url.trim() !== '' ? post.image_url : 'default.jpg';
    postImg.alt = post.title;
    articleCard.appendChild(postImg);

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    articleCard.appendChild(postTitle);

    const postContent = document.createElement('p');
    postContent.textContent = post.content.length > 150 ? post.content.substring(0, 100) + '...' : post.content;
    articleCard.appendChild(postContent);

    articleCard.addEventListener('click', getFlightPage);

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

    fetch('getPopularPosts.php')
        .then(onResponse)
        .then(onJson);
}

document.addEventListener('DOMContentLoaded', loadPopularPosts);

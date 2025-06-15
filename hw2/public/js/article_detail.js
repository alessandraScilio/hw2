function handleLikeJSON(data) {
  if (data.liked) {
    checkLikeStatus(data.article_id);
  }
}

function handleUnlikeJSON(data) {
  if (data.unliked) {
    checkLikeStatus(data.article_id);
  }
}

function getLikeHandler(articleId) {
  return function likeHandler() {
    const formData = new FormData();
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    formData.append('_token', csrfToken);
    formData.append('article_id', articleId);

    fetch(BASE_URL + 'like', {
      method: 'POST',
      body: formData
    }).then(onResponse).then(handleLikeJSON);
  };
}

function getUnlikeHandler(articleId) {
  return function unlikeHandler() {
    const formData = new FormData();
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    formData.append('_token', csrfToken);
    formData.append('article_id', articleId);

    fetch(BASE_URL + 'unlike', {
      method: 'POST',
      body: formData
    }).then(onResponse).then(handleUnlikeJSON);
  };
}

function handleStatusJSON(data) {
  const oldButton = document.querySelector('.like-button');
  const articleId = oldButton.getAttribute('data-article-id');

  const newButton = document.createElement('button');
  newButton.classList.add('like-button');
  newButton.setAttribute('data-article-id', articleId);

  if (data.liked) {
    newButton.textContent = 'Remove from favourites';
    newButton.addEventListener('click', getUnlikeHandler(articleId));
  } else {
    newButton.textContent = 'Add to favourites';
    newButton.addEventListener('click', getLikeHandler(articleId));
  }

  oldButton.replaceWith(newButton);
}

function onResponse(response) {
  return response.json();
}

function checkLikeStatus(articleId) {
  const formData = new FormData();
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  formData.append('_token', csrfToken);
  formData.append('article_id', articleId);

  fetch(BASE_URL + 'status', {
    method: 'POST',
    body: formData
  }).then(onResponse).then(handleStatusJSON);
}


function initLikeStatus() {
  const likeButton = document.querySelector('.like-button');
  if (!likeButton) return;

  const articleId = likeButton.getAttribute('data-article-id');
  checkLikeStatus(articleId);
}

document.addEventListener('DOMContentLoaded', initLikeStatus);

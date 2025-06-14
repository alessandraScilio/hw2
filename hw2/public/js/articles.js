function onAddCommentJson(commentsDiv, articleDiv, input) {
    return function(newComment) {

        const commentP = document.createElement('p');
        commentP.classList.add('comment');
        commentP.textContent = newComment.content;
        commentsDiv.appendChild(commentP);
        input.value = '';

        const commentCountElement = articleDiv.querySelector('.comment-count');
        if (commentCountElement) {
            const currentCount = parseInt(commentCountElement.textContent);
            commentCountElement.textContent = currentCount + 1;
        }
    };
}

function onAddCommentResponse(response){
      return response.json();
}

function onCommentsResponse(response) {
    return response.json();
}


function onCommentsJson(commentsDiv) {
    return function(comments) {
        const start = Math.max(0, comments.length - 2); 
            
        for (let i = start; i < comments.length; i++) {
            const comment = comments[i];
            const commentP = document.createElement('p');
            commentP.classList.add('comment');
            commentP.textContent = comment.comment_text;
            commentsDiv.appendChild(commentP);
        }
    };
}

function handleCommentSubmission(e, commentsDiv, articleDiv, input, articleData) {
    e.preventDefault();
    const comment = input.value.trim();
    if (comment === '') {
        alert('Please enter a comment before submitting.');
        return;
    } 

    fetch('addComment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            article_id: articleData.id,
            comment: comment
        })
    })
    .then(onAddCommentResponse)
    .then(onAddCommentJson(commentsDiv, articleDiv, input));
}

function handleShowLessClick(articleDiv, articleData, preview, commentsDiv, commentForm, showLessBtn) {
    preview.textContent = articleData.content.substring(0,150);

    commentsDiv.remove();
    commentForm.remove();
    showLessBtn.remove();

    const newReadMoreBtn = document.createElement('button');
    newReadMoreBtn.textContent = 'Read more';
    newReadMoreBtn.classList.add('read-more');
    articleDiv.appendChild(newReadMoreBtn);
    newReadMoreBtn.addEventListener('click', function() {
        readMoreFunction(articleDiv, articleData);
    });
}

function readMoreFunction(articleDiv, articleData) {
    const preview = articleDiv.querySelector('p');
    preview.textContent = articleData.content;

    const readMoreBtn = articleDiv.querySelector('.read-more');
    if (readMoreBtn) readMoreBtn.remove();

    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('comments-container');
    articleDiv.appendChild(commentsDiv);

    fetch(`getComments.php?article_id=${articleData.id}`)
        .then(onCommentsResponse)
        .then(onCommentsJson(commentsDiv));

    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Write a comment...';
    input.required = true;

    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Send';

    commentForm.appendChild(input);
    commentForm.appendChild(submitBtn);
    articleDiv.appendChild(commentForm);

    submitBtn.addEventListener('click', function(e) {
        handleCommentSubmission(e, commentsDiv, articleDiv, input, articleData);
    });

    const showLessBtn = document.createElement('button');
    showLessBtn.textContent = 'Read less';
    showLessBtn.classList.add('read-more');
    articleDiv.appendChild(showLessBtn);

    showLessBtn.addEventListener('click', function() {
        handleShowLessClick(articleDiv, articleData, preview, commentsDiv, commentForm, showLessBtn);
    });
}




function updateLike(result, articleId, likeImg, likeCount, newSrc, newHandlerFunction) {
    likeImg.src = newSrc;
    likeCount.textContent = result.like_count;

    const newHandler = newHandlerFunction(articleId, likeImg, likeCount);
    likeImg.replaceWith(likeImg); 
    likeImg.addEventListener('click', newHandler);
}


function onLikeJSON(articleId, likeImg, likeCount) {
    return function(result) {
        updateLike(result, articleId, likeImg, likeCount, 'pics/liked.svg', unlikeFunction);
    };
}

function onLikeResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Network response was not ok');
    }
}

function likeFunction(articleId, likeImg, likeCount) {
    return function () {
        const data = { article_id: articleId };

        fetch('likeArticles.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(onLikeResponse)
        .then(onLikeJSON(articleId, likeImg, likeCount));
    };
}



function onUnlikeJson(articleId, likeImg, likeCount) {
    return function(result) {
        updateLike(result, articleId, likeImg, likeCount, 'pics/like.svg', likeFunction);
    };
}

function onUnlikeResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function unlikeFunction(articleId, likeImg, likeCount) {
    return function () {
        const data = { article_id: articleId };

        fetch('unlikeArticles.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(onUnlikeResponse)
        .then(onUnlikeJson(articleId, likeImg, likeCount));
    };
}


function onJSON(json) {
    const container = document.getElementById('articles-container');
    container.innerHTML = '';

     if (!Array.isArray(json)) {
        console.error("Expected array, got:", json);
        json = []; 
    }

    if (json.length === 0) {
        console.log('<p>No articles found.</p>');
        return;
    }

    for (const article of json) {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        const image = document.createElement('img');
        image.src = article.image_url || 'pics/default_img.jpeg';
        articleDiv.appendChild(image);

        const title = document.createElement('h3');
        title.textContent = article.title;
        articleDiv.appendChild(title);

        const preview = document.createElement('p');
        preview.textContent = article.content.length > 150 ? article.content.substring(0, 150) + '...' : article.content;
        articleDiv.appendChild(preview);

        const actionDiv = document.createElement('div');
        actionDiv.classList.add('article-meta');

        const likeImg = document.createElement('img');
        likeImg.dataset.id = article.id;

        if (article.liked == 0) {
            likeImg.src = 'pics/like.svg';
        } else {
            likeImg.src = 'pics/liked.svg';
        }

        const likeCount = document.createElement('p');
        likeCount.textContent = article.like_count;

        const handler = article.liked ? unlikeFunction(article.id, likeImg, likeCount) : likeFunction(article.id, likeImg, likeCount);
        likeImg.addEventListener('click', handler);
        actionDiv.appendChild(likeImg);

        actionDiv.appendChild(likeCount);

        const shareImg = document.createElement('img');
        shareImg.src = 'pics/share.svg';
        actionDiv.appendChild(shareImg);

        articleDiv.appendChild(actionDiv);

        const readMore = document.createElement('a');
        readMore.textContent = 'Read more';
        readMore.classList.add('read-more');
        readMore.addEventListener('click', function() {
            readMoreFunction(articleDiv, article);
        });
        articleDiv.appendChild(readMore);
        articleDiv.dataset.id = article.id;
        container.appendChild(articleDiv);
    }
}

function onResponse(response) {
    console.log(response);
    return response.json().catch(error => {
        console.error("Failed to parse JSON:", error);
        return [];
    });
}

function searchArticles(event) {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const meta_element = document.querySelector('meta[name="csrf-token"]');
    const csrf_token = meta_element.content;
    formData.append ('_token', csrf_token);

    fetch(BASE_URL + 'search', {
        method: 'POST',
        body: formData
    }).then(onResponse)
    .then(onJSON);
}

const searchForm = document.getElementById('search-form');
if (searchForm) {
    searchForm.addEventListener('submit', searchArticles);
}


function getFlightPage() {
    window.location.href = 'articles.php';
}

function createArticleCard(post) {
    const articleCard = document.createElement('div');
    articleCard.classList.add('article-card');

    const postImg = document.createElement('img');
    postImg.src = post.image_url && post.image_url.trim() !== '' ? post.image_url : 'pics/default.jpg';
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

    fetch(BASE_URL + 'list')
        .then(onResponse)
        .then(onJson);
}

document.addEventListener('DOMContentLoaded', loadPopularPosts);


function checkOut() {
  window.location.href = BASE_URL + 'payment';
}

function handleOutsideClick(event) {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartButton = document.querySelector('.cart-button');

  if (
    cartSidebar.classList.contains('open') &&
    !cartSidebar.contains(event.target) &&
    !cartButton.contains(event.target)
  ) {
    closeCart();
  }
}

function refreshCart() {
    console.log('Flight removed successfully');
    openCart(); 
}

function onRemoveResponse(response) {
  if (!response.ok) {
    throw new Error('Errore nella rimozione della prenotazione.');
  }
  return response.json();
}


function removeBooking(flightId) {

    const formData = new FormData();
    formData.append('flight_id', flightId);

    const meta_element = document.querySelector('meta[name="csrf-token"]');
    const csrf_token = meta_element.content;
    formData.append ('_token', csrf_token);

    fetch(BASE_URL + 'delete_booking', {
        method: 'POST',
        body: formData
    })
    .then(onRemoveResponse)
    .then(refreshCart);
}

function onJson(result) {
    const cartContent = document.querySelector('.cart-sidebar-content');
    cartContent.innerHTML = ''; 

    if (result.length === 0) {
        cartContent.textContent = 'No bookings yet.';
        return;
    }

    let total = 0;

    for (let i = 0; i < result.length; i++) {
        const booking = result[i];

        console.log('Flight ID:', booking.flight_id);
        console.log('Price:', booking.price);

        total += parseFloat(booking.price);

        const bookingElement = document.createElement('div');
        bookingElement.classList.add('booking-item');

        const flightInfo = document.createElement('div');
        flightInfo.classList.add('flight-info');

        const flightId = document.createElement('p');
        flightId.textContent = 'Flight ID: ' + booking.flight_id;

        const price = document.createElement('p');
        price.textContent = 'Price: €' + booking.price;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✕';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            removeBooking(booking.flight_id);
        });

        flightInfo.appendChild(flightId);
        flightInfo.appendChild(price);

        bookingElement.appendChild(flightInfo);
        bookingElement.appendChild(deleteButton);
        cartContent.appendChild(bookingElement);

        const separator = document.createElement('hr');
        cartContent.appendChild(separator);
    }

    const totalElement = document.createElement('p');
    totalElement.classList.add('total-price');
    totalElement.textContent = 'Total: €' + total.toFixed(2);
    cartContent.appendChild(totalElement);

    const payButton = document.createElement('button');
    payButton.textContent = 'Pay Now';
    payButton.addEventListener('click', checkOut);
    payButton.classList.add('pay-button');
    cartContent.appendChild(payButton);
}


function onResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


function openCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.classList.add('open');
  document.body.addEventListener('click', handleOutsideClick);
  document.body.style.overflow = 'hidden';
  fetch(BASE_URL + 'show_bookings').then(onResponse).then(onJson);

}

function closeCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.classList.remove('open');
  document.body.style.overflow = '';
}

function handleCartToggle(event) {
  event.preventDefault();

  const cartSidebar = document.getElementById('cart-sidebar');
  const isOpen = cartSidebar.classList.contains('open');

  if (isOpen) {
    closeCart();
  } else {
    openCart();
  }
}


const cartButton = document.querySelector('.cart-button');
if (cartButton) {
  cartButton.addEventListener('click', handleCartToggle);
}


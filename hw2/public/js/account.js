function onPostsJson(posts) {
    const container = document.getElementById('liked-posts-container');
    
    if (!container) return;

     for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postElement = document.createElement('div');
        postElement.className = 'liked-post';

        const postImg = document.createElement('img');
        postImg.src = post.image_url || 'default.jpg';
        postElement.appendChild(postImg);

        const postTitle = document.createElement('h3');
        postTitle.textContent = post.title;
        postTitle.className = 'liked-post-title';
        postElement.appendChild(postTitle);

        container.appendChild(postElement);
    }

}

function onBookingsJson(bookings) {
    const bookingsContainer = document.getElementById('bookings-container');
    if (!bookingsContainer) return;

    let totalPrice = 0;

   for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i];

        const bookedFlight = document.createElement('div');
        bookedFlight.classList.add('booked-flight');
        bookedFlight.textContent = `Flight ID: ${booking.flight_id} - Price: ${booking.price}`;
        bookingsContainer.appendChild(bookedFlight);

        totalPrice += parseFloat(booking.price);
    }

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total-price');
    totalDiv.textContent = 'Total price: ' + totalPrice.toFixed(2) + ' €';
    bookingsContainer.appendChild(totalDiv);

    const payBtn = document.createElement('button');
    payBtn.classList.add('account-button');
    payBtn.textContent = 'Pay now';
    bookingsContainer.appendChild(payBtn);
}

function onError(error) {
    console.error('Error:', error);
    const containers = [
        document.getElementById('liked-posts-container'),
        document.getElementById('bookings-container')
    ];
     for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        if (container) {
            container.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
}
}

function onResponse(response) {
    return response.json();
}


function getData() {
    fetch('getPosts.php')
        .then(onResponse)
        .then(onPostsJson)
        .catch(onError);

    fetch('getBookings.php')
        .then(onResponse)
        .then(onBookingsJson)
        .catch(onError);
}

document.addEventListener('DOMContentLoaded', getData);

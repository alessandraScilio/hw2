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
    openCart(); 
}

function removeBooking(flightId) {
    fetch(BASE_URL + 'delete_booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'flight_id=' + encodeURIComponent(flightId)
    })
    .then(onResponse)
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
    payButton.textContent = 'Paga ora';
    payButton.classList.add('pay-button');
    payButton.addEventListener('click', function () {
        alert('Procedura di pagamento avviata.');
    });

    cartContent.appendChild(payButton);
}


function onResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
}


function openCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.body.addEventListener('click', handleOutsideClick);

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


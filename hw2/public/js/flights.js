function onBookFlightSuccess(result) {
    console.log('Flight booked successfully:', result);
}


function onTextResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
}

function bookFlight(event, flightNumber, price) {
    const bookedBtn = event.currentTarget;
    bookedBtn.textContent = 'Booked';
    bookedBtn.disabled = true;

    const formData = new FormData();
    formData.append('flight_id', flightNumber);
    formData.append('price',price );

    const meta_element = document.querySelector('meta[name="csrf-token"]');
    const csrf_token = meta_element.content;
    formData.append ('_token', csrf_token);
    
    fetch(BASE_URL + 'book_flight', {
        method: 'POST',
        body: formData
    })
    .then(onTextResponse)
    .then(onBookFlightSuccess);
}


function onCheckFlightResult(flightNumber, price, bookBtn) {
    return function(result) {
        if (result.success) {
            bookBtn.textContent = "Book now";
            bookBtn.addEventListener('click', function(event) {
                bookFlight(event, flightNumber, price);
            });
        } else {
            bookBtn.textContent = "Booked";
        }
    };
}

function handleCheckFlightResponse(response) {
    if (!response.ok) {
        throw new Error('Errore nella risposta del server');
    }
    return response.json();
}

function checkFlightAvailability(flightNumber, price, bookBtn) {
    const formData = new FormData();
    formData.append('flight_id', flightNumber);
    const meta_element = document.querySelector('meta[name="csrf-token"]');
    const csrf_token = meta_element.content;
    formData.append ('_token', csrf_token);

    fetch(BASE_URL + 'check_flight', {
        method: 'POST',
        body: formData
    })
    .then(handleCheckFlightResponse)
    .then(onCheckFlightResult(flightNumber, price, bookBtn));
}


function getAirlineName(carrierCode, carriersDictionary) {
        const commonAirlines = {
        'AZ': 'Alitalia',
        'LH': 'Lufthansa',
        'AF': 'Air France',
        'BA': 'British Airways',
        'EK': 'Emirates',
        'AA': 'American Airlines',
        'DL': 'Delta Air Lines',
        'W2': 'FlexFlight',
        'FR': 'Ryanair',
        'U2': 'EasyJet'
    };
    return commonAirlines[carrierCode];
}

function formatTimeWithTimezone(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
}

function formatDuration(isoDuration) {
    const hours = isoDuration.match(/(\d+)H/)?.[1] || '0';
    const minutes = isoDuration.match(/(\d+)M/)?.[1] || '00';
    return hours + "h " + minutes.padStart(2, '0') + "m";
}

function formatItinerary(itinerary) {
    if (!itinerary.segments?.length) return "No segment data";

    const segment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];

    const departure = segment.departure.iataCode;
    const departureTime = formatTimeWithTimezone(segment.departure.at);

    const arrival = lastSegment.arrival.iataCode;
    const arrivalTime = formatTimeWithTimezone(lastSegment.arrival.at);

    const duration = formatDuration(itinerary.duration);
    return "(" + departure + ") at " + departureTime + "  →  " + duration + "  → (" + arrival + ") at " + arrivalTime;
}

function createFlightCaption(label, content) {
    const caption = document.createElement('div');
    caption.classList.add('flight-caption');
    caption.textContent = label + ": " + content;
    return caption;
}

function handleError(error) {
    const output = document.getElementById('flight-result');
    output.textContent = "Errore";
    console.error('Errore fetch:', error);
}

function handleResult(flights) {
    const flightResult = document.getElementById('flight-result');
    flightResult.classList.add('show');
    flightResult.innerHTML = '';

    if (flights.error) {
        flightResult.innerHTML = '<p class="error-message">Errore: ' + flights.error + '</p>';
        return;
    }

   for (let i = 0; i < flights.length; i++) {
        const flightDiv = document.createElement('div');
        flightDiv.classList.add('flight');

        const flight = flights[i];
        const price = flight.price?.total || "Price not available.";
        const flightNumber = flight.itineraries[0].segments[0].carrierCode + flight.itineraries[0].segments[0].number;

        const carrierCode = flight.itineraries[0].segments[0].carrierCode;
        const airlineName = getAirlineName(carrierCode, window.dictionaries?.carriers);

        const flightContent = document.createElement('div');
        flightContent.classList.add('flight-content');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('flight-info');

        const outbound = formatItinerary(flight.itineraries[0]);
        infoDiv.appendChild(createFlightCaption("OB", outbound));

        if (flight.itineraries.length > 1) {
            const inbound = formatItinerary(flight.itineraries[1]);
            infoDiv.appendChild(createFlightCaption("RT", inbound));
        }

        infoDiv.appendChild(createFlightCaption("Operated by", airlineName));
        infoDiv.appendChild(createFlightCaption("Prezzo", price + " €"));

        const bookBtn = document.createElement('button');
        bookBtn.classList.add('book-button');
        checkFlightAvailability(flightNumber, price, bookBtn);
        flightContent.appendChild(infoDiv);
        flightContent.appendChild(bookBtn);
        flightDiv.appendChild(flightContent);
        flightResult.appendChild(flightDiv);
    }
}


function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Errore nella risposta del server');
    }
    return response.json();
}

function isFutureDate(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr) >= today;
}

function showDateError(elementId, message) {
  const errorDiv = document.getElementById(elementId);
  errorDiv.textContent = message;
}

function clearDateError(elementId) {
  const errorDiv = document.getElementById(elementId);
  errorDiv.textContent = '';
}

function validateCitiesDifferent() {
  const departureCity = document.getElementById('departure-input').value.trim().toLowerCase();
  const destinationCity = document.getElementById('destination-input').value.trim().toLowerCase();
  const errorMessage = document.getElementById('city-error');
  
  errorMessage.textContent = '';

  if (departureCity && destinationCity && departureCity === destinationCity) {
    errorMessage.textContent = "Departure and destination cities must be different.";
    return false;
  }

  return true;
}

function validateDepartureDate() {
  const input = document.getElementById('departure-date');
  if (!input.value || !isFutureDate(input.value)) {
    showDateError('departure-error', "Wrong departure date.");
    return false;
  }
  clearDateError('departure-error');
  return true;
}


function validateReturnDate() {
  const departure = document.getElementById('departure-date');
  const ret = document.getElementById('return-date');
  const depDate = new Date(departure.value);
  const retDate = new Date(ret.value);

  if (!ret.value || !isFutureDate(ret.value) || retDate < depDate) {
    showDateError('return-error', "Wrong return date.");
    return false;
  } 
  clearDateError('return-error');
  return true;
}



function handleFlightSearch(event) {
    event.preventDefault();       
    
    const validDeparture = validateDepartureDate();
    const validReturn = validateReturnDate();
    const validCities = validateCitiesDifferent();


    const generalError = document.getElementById('error-message');
    
    if (!validDeparture || !validReturn || !validCities) {
          generalError.classList.add('error-message');
          generalError.textContent = "Please correct the errors before submitting.";
      return;
    }


    generalError.classList.remove('error-message');
    generalError.textContent = ''; 
    
    const form = document.getElementById('flight-search-form');
    const formData = new FormData(form);

    const meta_element = document.querySelector('meta[name="csrf-token"]');
    const csrf_token = meta_element.content;
    formData.append ('_token', csrf_token);

    fetch(BASE_URL + 'search', {
        method: 'POST',
        body: formData
    })
    .then(handleResponse)
    .then(handleResult)
    .catch(handleError);
}



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

    const closeButton = document.querySelector('#close-cart');
    closeButton.addEventListener('click', closeCart);

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

  const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
    cartButton.addEventListener('click', handleCartToggle);
    }

    document.getElementById('departure-date').addEventListener('blur', validateDepartureDate);
    document.getElementById('return-date').addEventListener('blur', validateReturnDate);
    document.getElementById('destination-input').addEventListener('blur', validateCitiesDifferent);
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', handleFlightSearch);

}


document.addEventListener('DOMContentLoaded', onDomLoaded);


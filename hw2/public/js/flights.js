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

    const data = { 
        flight_id: flightNumber, 
        flight_price: price
    };

    fetch('book_flight.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(onTextResponse)
    .then(onBookFlightSuccess);
}


function handleError(error) {
    const output = document.getElementById('flight-result');
    output.textContent = "Errore";
    console.error('Errore fetch:', error);
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Errore nella risposta del server');
    }
    return response.json();
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

function checkFlightAvailability(flightNumber, price, bookBtn) {
    const data = { flight_id: flightNumber };

    fetch('check_flight.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(handleResponse)
    .then(onCheckFlightResult(flightNumber, price, bookBtn));
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
        const segment = flight.itineraries[0].segments[0];

        const departure = segment.departure.iataCode;
        const departureTime = segment.departure.at;
        const dTime = departureTime.substring(11, 16);

        const arrival = segment.arrival.iataCode;
        const arrivalTime = segment.arrival.at;
        const aTime = arrivalTime.substring(11, 16);

        const flightNumber = segment.carrierCode + segment.number;
        const price = flight.price.total;

        const stopover = segment.numberOfStops;
        const stopoverText = stopover === 0 ? "Non-stop" : stopover + " stop(s)";

        const index = i + 1;

        const flightContent = document.createElement('div');
        flightContent.classList.add('flight-content');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('flight-info');

        const captionResult = document.createElement('div');
        captionResult.classList.add('flight-caption');
        captionResult.textContent = "Result: " + index;
        infoDiv.appendChild(captionResult);

        const captionFrom = document.createElement('div');
        captionFrom.classList.add('flight-caption');
        captionFrom.textContent = "From: " + departure + " at: " + dTime + 
                                  " → To: " + arrival + " at: " + aTime;
        infoDiv.appendChild(captionFrom);

        const captionPrice = document.createElement('div');
        captionPrice.classList.add('flight-caption');
        captionPrice.textContent = "Price: " + price + " €";
        infoDiv.appendChild(captionPrice);

        const captionFlight = document.createElement('div');
        captionFlight.classList.add('flight-caption');
        captionFlight.textContent = "Flight: " + flightNumber;
        infoDiv.appendChild(captionFlight);

        const bookBtn = document.createElement('button');
        bookBtn.classList.add('book-button');

        checkFlightAvailability(flightNumber, price, bookBtn);

        flightContent.appendChild(infoDiv);
        flightContent.appendChild(bookBtn);
        flightDiv.appendChild(flightContent);
        flightResult.appendChild(flightDiv);
    }
}

function handleFlightSearch(event) {
    event.preventDefault();    
    const form = document.getElementById('flight-search-form');
    const formData = new FormData(form);

    fetch('getFlight.php', {
        method: 'POST',
        body: formData
    })
    .then(handleResponse)
    .then(handleResult)
    .catch(handleError);
}

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', handleFlightSearch);

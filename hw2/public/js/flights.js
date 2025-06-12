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

function handleFlightSearch(event) {
    event.preventDefault();        
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

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', handleFlightSearch);

// Utilizzare fake store api per simulare pagaemnto
function handleError(error) {
    console.error('Errore fetch:', error);
}


function handleResult(responseData) {

    const message = document.getElementsByClassName("error-message");

    if (responseData.success) {
      message.textContent  = "Successfull Payment.";

      setTimeout(function () {
        window.location.href = BASE_URL + 'thanks';
      }, 3000);

    } else {
        message.textContent  =  "Payment failed.";
        window.location.href = BASE_URL + 'flight';

    }
}


function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Errore nella risposta del server');
    }
    return response.json();
}


function handlePayment(event) {
    event.preventDefault();        
    const form = document.getElementById('payment-form');
    const formData = new FormData(form);

    const meta_element = document.querySelector('meta[name="csrf-token"]');
    const csrf_token = meta_element.content;
    formData.append ('_token', csrf_token);

    fetch(BASE_URL + 'do_payment', {
        method: 'POST',
        body: formData
    })
    .then(handleResponse)
    .then(handleResult)
    .catch(handleError);
}

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', handlePayment);



function handleErrorCount(error) {
    console.error('Errore nel recupero del totale:', error);
}

function handleResponseCount(response) {
    if (!response.ok) {
        throw new Error('Errore nella risposta del server');
    }
    return response.json();
}

function handleResultCount(data) {
    const totalSpan = document.getElementById('total-amount');
    if (totalSpan && data.total !== undefined) {
        totalSpan.textContent = data.total.toFixed(2);
    } else {
        console.warn("Elemento 'total-amount' non trovato o totale mancante.");
    }
}

function countTotal() {
    fetch(BASE_URL + 'count')
        .then(handleResponseCount)
        .then(handleResultCount)
        .catch(handleErrorCount);
}


document.addEventListener('DOMContentLoaded', countTotal);
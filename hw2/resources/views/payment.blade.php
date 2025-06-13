<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TravelHub - Pagamento</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="stylesheet" href="{{ url('css/commons.css') }}">
    <link rel="stylesheet" href="{{ url('css/login.css') }}">
      <link rel="stylesheet" href="{{ url('css/payment.css') }}">
      <script>
    const BASE_URL = "{{ url('/') }}/"
    </script>
          <script src='{{ url("js/payment.js") }}' defer></script> 
</head>
<body>

  <div id="payment-container">
    <h1>Procede to payment</h1>
    <form id="payment-form">
      @csrf

      <label for="cardholder-name">Full Name</label>
      <input type="text" id="cardholder-name" name="cardholder_name" placeholder="Mario Rossi" required />

      <label for="card-number">Card Number</label>
      <input type="tel" id="card-number" name="card_number" placeholder="4242 4242 4242 4242" maxlength="19" required />

      <label for="expiry-date">Expiry Date</label>
      <input type="month" id="expiry-date" name="expiry_date" required />

      <label for="cvc">CVC</label>
      <input type="password" id="cvc" name="cvc" maxlength="4" placeholder="123" required />

      <button type="submit" id = "submit">Pay Now</button>
    </form>

    <a href="{{ route('flight') }}">Back To Cart</a>
    <div id="total">
    <p>TOTAL AMOUNT: <span id="total-amount"></span> €</p>
  </div>
</div>

  </div>

  


</body>
</html>

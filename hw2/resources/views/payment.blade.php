<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TravelHub - Pagamento</title>
  <link rel="stylesheet" href="{{ url('css/commons.css') }}">
    <link rel="stylesheet" href="{{ url('css/login.css') }}">
      <link rel="stylesheet" href="{{ url('css/payment.css') }}">

</head>
<body style="background-color: var(--sabbia); font-family: Arial, sans-serif;">

  <div id="payment-container">
    <h1>Pagamento</h1>

    <form id="payment-form" method="POST" action="{{ route('payment.process') }}">
      @csrf

      <label for="cardholder-name">Nome intestatario carta</label>
      <input type="text" id="cardholder-name" name="cardholder_name" placeholder="Mario Rossi" required />

      <label for="card-number">Numero carta</label>
      <input type="tel" id="card-number" name="card_number" placeholder="4242 4242 4242 4242" maxlength="19" required />

      <label for="expiry-date">Data scadenza</label>
      <input type="month" id="expiry-date" name="expiry_date" required />

      <label for="cvc">CVC</label>
      <input type="password" id="cvc" name="cvc" maxlength="4" placeholder="123" required />

      <button type="submit">Paga ora</button>
    </form>

    <p>
      <a href="{{ route('cart') }}">Torna al carrello</a>
    </p>
  </div>

</body>
</html>

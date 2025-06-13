<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TravelHub - Pagamento</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ url('css/thankyou.css') }}">
    <script>
    const BASE_URL = "{{ url('/') }}/"
    </script>
          <script src='{{ url("js/payment.js") }}' defer></script> 
</head>
<body>
<div id="thankyou-container">
    <h1>Thanks for your purchase!</h1>
    <p>Wish you a great trip.</p>
    <a href="{{ route('flight') }}">Back to TravelHub.</a>
  </div>

</body>
</html>

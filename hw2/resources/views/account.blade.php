<!DOCTYPE html>
<html lang="it">
 <head>
    <meta charset="UTF-8">
    <title>TravelHub - Account</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet"href="{{ url('css/commons.css') }}">
        <link rel="stylesheet"href="{{ url('css/account.css') }}">

    <script>
    const BASE_URL = "{{ url('/') }}/"
  </script>
   <script src='{{ url("js/account.js") }}' defer></script> 
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
  </head>
<body>

 <body>
  <nav id="nav-container">
  <div id="nav-content">
  
  <button class="hamburger">
   <img id="curtain-menu-image" src="{{ asset('pics/hamburger.svg') }}">
   </button>
    <a href="{{ url('home') }}" id="site-name">TravelHub</a>

    <div id="menu-container">
      <a class="menu-item" href="{{ route('flight') }}">Flights</a>
      <a class="menu-item" href="{{ route('article') }}">Articles</a>
      <a class="menu-item" href="#">Hotels</a>
      <a class="menu-item" href="{{ route('account') }}">Account</a>
    </div>

    <div id="account-button-container">
      <a href="{{ route('account') }}" class="account-button">{{ $username }}'s Account</a>
    </div>
  </div>

  <div id="cart-sidebar" class="cart-sidebar">
  <div class="cart-sidebar-header">
    <h2>Your cart</h2>
    <button id="close-cart" class="close-button">&times;</button>
  </div>
  <div class="cart-sidebar-content">
  </div>
</div>
</nav>
<div id="menu-overlay" class="hidden"></div>
  
  <div class="account-container">
    <h1>{{ $username }}'s Account</h1>
    <div class="account-section">
      <h2>Personal information</h2>
      <p>Username: {{ $username }}</p>
      <p>Email: {{ $email }}</p>
    </div>

    <div class="account-section">
      <h2>Settings</h2>
        <button class="account-button" type='change-password'>
          <a href = "{{ route('reset.form') }}" class="account-button">Change password</a>
        </button>


    </div>
    </div>

    <section class="liked-posts-section">
        <h2>Your favourite posts</h2>
        <div id="liked-posts-container"></div>
    </section>


    <footer class="site-footer">
  <div class="footer-container">
    <div class="footer-left">
      <h3>TravelHub</h3>
      <p>Your gateway to unforgettable journeys. Discover, plan, and share travel experiences.</p>
    </div>
    <div class="footer-links">
      <a href="#">Home</a>
      <a href="#">Articles</a>
      <a href="#">Flights</a>
      <a href="#">Hotels</a>
      <a href="#">Account</a>
    </div>
  </div>
  <div class="footer-bottom">
    &copy; 2025 TravelHub. All rights reserved.
  </div>
</footer>
</body>
</html>

<htlm>
  <!DOCTYPE html>
  <head>
    <meta charset="UTF-8">
    <title>TravelHub - Articles</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ url('css/articles.css') }}">
    <link rel="stylesheet"href="{{ url('css/commons.css') }}">
    <script>
    const BASE_URL = "{{ url('/') }}/"
  </script>
   <script src='{{ url("js/articles.js") }}' defer></script> 
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
  </head>
  
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
  

<section class="search-section">
  <h2>Find Travel Articles</h2>
  <form id="search-form">
    @csrf
    <div class="form-group">
      <label>Insert a continent, country or city</label>
        <input type="text" id="smart-search"  name="smart-search"  placeholder="Ex: Europe, Italy, Rome..." autocomplete="off" required>
    </div>
    <button type="submit" class="search-button">Search</button>
  </form>
</section>

  <div id="articles-container"></div>

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
<!DOCTYPE html>
<htlm>
    <head>
    <meta charset="UTF-8">
    <title>TravelHub - Flights</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ url('css/flights.css') }}">
    <link rel="stylesheet"href="{{ url('css/commons.css') }}">
    <script>
    const BASE_URL = "{{ url('/') }}/"
    </script>
    <script src='{{ url("js/flights.js") }}' defer></script> 
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
      <a class="menu-item" href="{{ route('channels') }}">Channels</a>
      <a class="menu-item" href="{{ route('account') }}">Account</a>
    </div>

      
    <div id="account-button-container">
      <button class="cart-button">
        <img id="cart-icon" src="{{ asset('pics/cart.svg') }}">
      </button>
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
  
 <section id="flight-section">
    <h1 class="title">Flight Offers</h1>
      
    <form id="flight-search-form">
        @csrf
        <div class="form-row">
            <div class="form-group">
            <label for="departure-input">Departure city</label>
            <input type="text" id="departure-input" name="departure_city" placeholder="City name" required>
            </div>
            
            <div class="form-group">
            <label for="destination-input">Destination city</label>
            <input type="text" id="destination-input" name="destination_city" placeholder="City name" required>
            <div id="city-error" class="date-error"></div>   
            </div>
            </div>

            <div class="form-row">
            <div class="form-group">
            <label for="departure-date">Departure date</label>
            <input type="date" id="departure-date" name="departure_date" required>
            <div id="departure-error" class="date-error"></div>
            </div>
            
            <div class="form-group">
            <label for="return-date">Return date</label>
            <input type="date" id="return-date" name="return_date" required> 
            <div id="return-error" class="date-error"></div>
            </div>

            <div class="form-group">
                <label for="passengers">Passengers</label>
                <select id="passengers" name="passengers">
                    <option value="1">1 passenger</option>
                    <option value="2">2 passengers</option>
                    <option value="3">3 passengers</option>
                    <option value="4">4 passengers</option>
                    <option value="5+">5+ passengers</option>
                </select>
            </div>
        </div>
        <div class="form-submit">
            <input type="submit" id="submit" value="Search Flights">
        </div>
    </form>
        
    <section id="error-message"></section>
    <div id="flight-result"></div>
    </section>

  <footer class="site-footer">
  <div class="footer-container">
    <div class="footer-left">
      <h3>TravelHub</h3>
      <p>Your gateway to unforgettable journeys. Discover, plan, and share travel experiences.</p>
    </div>
    <div class="footer-links">
      <a href="{{ route('home') }}">Home</a>
      <a href="{{ route('article') }}">Articles</a>
      <a href="{{ route('flight') }}">Flights</a>
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

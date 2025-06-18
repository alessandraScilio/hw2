<!DOCTYPE html>
<html lang="it">
 <head>
    <meta charset="UTF-8">
    <title>TravelHub - Account</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet"href="{{ url('css/commons.css') }}">
        <link rel="stylesheet"href="{{ url('css/channels.css') }}">

    <script>
    const BASE_URL = "{{ url('/') }}/"
  </script>
    <script src="{{ url('js/.js') }}"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
  </head>
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
      <a href="{{ route('logout') }}" class="account-button">Logout</a>
    </div>
  </div>
</nav>

<body>

<section class="social-section">
  <h2>Follow us on social medias</h2>

  <p> We post daily content on travel tips and incredible itineraries. </p>
  <p>
    <span class="social-icon">
        <img src="{{ asset('pics/instagram.svg') }}" width="24" height="24">
    </span>
    Instagram: <a href="https://instagram.com/travelhub" target="_blank">instagram.com/travelhub</a>
  </p>

  <p>
    <span class="social-icon">
        <img src="{{ asset('pics/facebook.svg') }}" alt="Show password" width="24" height="24">
      </svg>
    </span>
    Facebook: <a href="https://facebook.com/travelhub" target="_blank">facebook.com/travelhub</a>
  </p>

  <p>
    <span class="social-icon">
        <img src="{{ asset('pics/tik-tok.svg') }}" alt="Show password" width="24" height="24">
      </svg>
    </span>
    Tik Tok: <a href="https://twitter.com/travelhub" target="_blank">tik-tok.com/travelhub</a>
  </p>
</section>


</body>


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

<html>
  <head>
    <meta charset="UTF-8">
    <title>TravelHub - Articles</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet"href="{{ url('css/commons.css') }}">
        <link rel="stylesheet"href="{{ url('css/article_detail.css') }}">

    <script>
    const BASE_URL = "{{ url('/') }}/"
  </script>
   <script src='{{ url("js/article_detail.js") }}' defer></script> 
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
  </head>
  
  <body>
    <nav id="nav-container">
    <div id="nav-content">
    
 <a href="{{ url('home') }}" id="site-name">TravelHub</a>

  <div id="menu-container">
      <a class="menu-item" href="{{ route('flight') }}">Flights</a>
      <a class="menu-item" href="{{ route('article') }}">Articles</a>
      <a class="menu-item" href="#">Hotels</a>
      <a class="menu-item" href="#">Channels</a>
    </div>

    <div id="account-button-container">
      <div id="cart-button-container">
      <button class="cart-button">
        <img id="cart-icon" src="{{ asset('pics/cart.svg') }}">
      </button>
  </div>
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

      <div class="article-detail">
        <h2>{{ $article->title }}</h2>
              <img src="{{ url($article->image_url) }}"  alt="Article image" class="article-img">

      <div>{!! nl2br(e($article->content)) !!}</div>
      <button class="like-button" data-article-id="{{ $article->id }}">
      </button>
      </div>

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
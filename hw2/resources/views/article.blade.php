<htlm>
  <!DOCTYPE html>
  <head>
    <meta charset="UTF-8">
    <title>TravelHub - Articles</title>
    <link rel="stylesheet" href="{{ url('css/articles.css') }}">
    <link rel="stylesheet"href="{{ url('css/commons.css') }}">
    <script>
    const BASE_URL = "{{ url('/') }}/"
  </script>
   <script src="articles.js" defer></script> 
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
  </head>
  
  <body>
    <nav id="nav-container">
    <div id="nav-content">
    
 <a href="{{ url('home') }}" id="site-name">TravelHub</a>

   <div id="menu-container">
      <a class="menu-item" href="{{ route('article') }}">Articles</a>
      <a class="menu-item" href="{{ route('flight') }}">Flights</a>
      <a class="menu-item" href="#">Hotels</a>
      <a class="menu-item" href="#">Channels</a>
    </div>

    <div id="account-button-container">
      <a href="account.php" class="account-button">{{ $username }}'s Account</a>
    </div>

  </div>
</nav>

<section class="search-section">
  <h2>Find Travel Articles</h2>
  <form id="search-form" method='POST'>
    <div class="form-group">
      <label for="continent">Continent</label>
      <input type="text" id="continent" name="continent" placeholder="e.g. Europe">
    </div>
    
    <div class="form-group">
      <label for="country">Country</label>
      <input type="text" id="country" name="country" placeholder="e.g. Italy">
    </div>
    
    <div class="form-group">
      <label for="city">City</label>
      <input type="text" id="city" name="city" placeholder="e.g. Rome">
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
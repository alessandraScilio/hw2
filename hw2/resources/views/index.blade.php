<htlm>
  <head>
    <title>TravelHub</title>
    <link rel="stylesheet" href="{{ url('css/commons.css') }}">
        <link rel="stylesheet" href="{{ url('css/index.css') }}">
    <script src='{{ url("js/index.js") }} ' defer></script> 
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
  </head>
   
      <body>
     <nav id="nav-container">
        <div id="nav-content">
        <a href="home.php" id="site-name">TravelHub</a>
  
         <div id="menu-container">
      <a class="menu-item" href="{{ route('flight') }}">Flights</a>
      <a class="menu-item" href="{{ route('article') }}">Articles</a>
      <a class="menu-item" href="{{ route('channels') }}">Channels</a>
      <a class="menu-item" href="{{ route('account') }}">Account</a>
    </div>

        <div id="auth-buttons">
        <a class="auth-button" href="{{ route('login.form') }}">Login</a>
        <a class="auth-button signup" href="{{ route('signup.form') }}">Sign Up</a>
        </div>
      </div>
    </nav>

    <div class="header-slideshow">
    <div class="slide active" style="background-image: url('pics/desert.jpg');"></div>
    <div class="slide" style="background-image: url('pics/mountain.webp');"></div>
    <div class="slide" style="background-image: url('pics/sea.webp');"></div>
    <div class="slide" style="background-image: url('pics/city.jpg');"></div>
    
    <div class="header-content">
      <h1 id="title">TravelHub</h1>
      <div class="divider-line"></div>
      <p id="subtitle">Your personal travel center</p>
      <div class="auth-buttons">
        <a href="{{ route('login.form') }}" class="auth-btn">Login</a>
        <a href="{{ route('signup.form') }}" class="auth-btn secondary">Sign up</a>
      </div>
    </div>
    
    <div class="carousel-controls">
      <div class="carousel-control prev"></div>
      <div class="carousel-control next"></div>
    </div>
    

  </div>


<section class="services-section">
  <div class="services-container">
    <h2>Our Services</h2>
    <p class="services-subtitle">Discover everything TravelHub offers to enhance your journeys.</p>
    
    <div class="services-grid">
      <div class="service-card">
        <h3>Exclusive Deals</h3>
        <p>Access members-only discounts on flights, hotels, and experiences.</p>
      </div>
      <div class="service-card">
        <h3>Travel Articles</h3>
        <p>Read curated stories, guides, and insights from seasoned travelers around the globe.</p>
      </div>
      <div class="service-card">
        <h3>Itinerary Planner</h3>
        <p>Create and customize your travel plans with our smart itinerary builder.</p>
      </div>
      <div class="service-card">
        <h3>Community Tips</h3>
        <p>Get practical advice and hidden gems shared by our vibrant travel community.</p>
      </div>
    </div>
  </div>
</section>


  <section class="travel-articles-intro">
       <div class="intro-container">
        <div class="intro-text">
          <h2>Discover Our Travel Articles</h2>
        <p>Authentic stories, unforgettable destinations, and exclusive tips await you.</br>
        Log in to your account to access reserved content and get inspired for your next adventure.</p>
        <a href="{{ route('login.form') }}"  class="cta-button">Log in to read</a>
        </div>
      </div>
  </section>

   <span id = "features-container">
            <div id="features-text">TRAVEL HUB HAS BEEN FEATURED IN...</div>
          <div id="logos-container">
            <img class="logo" src="{{ asset('pics/good-morning-america-logo-svg.png') }}" alt="GMA">
            <img class="logo" src="{{ asset('pics/people-logo.png') }}" alt="People">
            <img class="logo" src="{{ asset('pics/nyp-logo.png') }}" alt="New York Post">
            <img class="logo" src="{{ asset('pics/daily-mail.png') }}" alt="Daily Mail">
            <img class="logo" src="{{ asset('pics/nyt.png') }}" alt="New York Times">
            <img class="logo" src="{{ asset('pics/tl.png') }}" alt="Travel Logo">
        </div>
        </span>


  <footer class="site-footer">
  <div class="footer-container">
    <div class="footer-left">
      <h3>TravelHub</h3>
      <p>Your guide to the world’s most inspiring travel experiences.</p>
    </div>
    <div class="footer-links">
      <a href="#">About</a>
      <a href="#">Articles</a>
      <a href="#">Contact</a>
      <a href="#">Login</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2025 TravelHub. All rights reserved.</p>
  </div>
</footer>


</body>
</html>

  
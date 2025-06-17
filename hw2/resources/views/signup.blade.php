<html>
<head>
  <title>Sign Up - TravelHub</title>
  <link rel="stylesheet" href="{{ url('css/signup.css') }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
   <script>
    const BASE_URL = "{{ url('/') }}/"
  </script>
  <script src='{{ url("js/signup.js") }}' defer></script> 
  <meta charset="utf-8">
</head>

<body>
  <div id="signup-container">
    <h1>Signup to TravelHub</h1>
    <form id="signup-form" method="post">
    @csrf
      <div class="username">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" value='{{ old("username") }}' required>
        </div> 
       <div id="username-error"></div>

      <div class="email">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value='{{ old("email") }}' required>
      </div>
      <div id="email-error"></div>

      <div id="specifiche">Min. 8 chars, 1 uppercase, 1 special.</div>
      <div class="password">
        <label for="password">Password:</label>
        <div class="password-wrapper">
        <input type="password" id="password" name="password" required>
        <button type="button" id="toggle-password" aria-label="Show password">
            <img src="{{ asset('pics/open-eye.svg') }}" alt="Show password" width="24" height="24">
        </button>
        </div>
      </div>
      <div id="password-error"></div>

      <div class="confirm-password">
          <label for="confirm-password">Confirm password:</label>
        <label for="confirm-password"></label>
        <div class="password-wrapper">
          <input type="password" id="confirm-password" name="password_confirmation" required>        
          <button type="button" id="toggle-confirm" aria-label="Show password">
            <img src="{{ asset('pics/open-eye.svg') }}" alt="Show password" width="24" height="24">
        </button>
        </div>
      </div>
     <div id="confirm-error"></div>

      
      <div class="allow">
                <input type='checkbox' name='allow' id='allow' value='1' required>
                <label for='allow'>I Agree to Privacy Policy</label>
            </div>
      <div id="allow-error"></div>

      <input type="submit" value="Sign Up">
    </form>
    <div id="error-msg"></div>

    @if($error == 'empty_fields') 
    <section class = 'error-message'>Fill out form.</section>
    @elseif($error == 'bad_passwords')
    <section class = 'error-message'>Different passwords.</section>
    @elseif($error == 'existing')
    <section class = 'error-message'>Username exists already.</section>
    @elseif($error == 'existing_email')
    <section class = 'error-message'>Email exists already.</section>
    @elseif($error == 'short_password')
    <section class = 'error-message'>Password is too short.</section>
    @elseif($error == 'invalid_username')
    <section class = 'error-message'>Invalid username.</section>
    @elseif($error == 'incomplete_password')
    <section class = 'error-message'>Incomplete password.</section>
    @elseif($error == 'unaccepted_terms')
    <section class = 'error-message'>Unaccepted terms.</section>
    @endif

    <p>Already have an account? <a  href="{{ route('login.form') }}">Login here</a></p>
  </div>
</body>
</html>

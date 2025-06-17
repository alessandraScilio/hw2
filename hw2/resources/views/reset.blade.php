<html>
<head>
  <title>Sign Up - TravelHub</title>
  <link rel="stylesheet" href="{{ url('css/login.css') }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
   <script>
    const BASE_URL = "{{ url('/') }}/"
  </script>
  <script src='{{ url("js/reset.js") }}' defer></script> 
  <meta charset="utf-8">
</head>
<body>

    <div id="login-container">
        <h1>Travel Hub: Reset page</h1>
        <form id ="signup-form" method="post">
        
        @csrf
        <div class="email">
            <label for="email">Email:</label><br>
            <input type="text" id="email" name="email" value = '{{ old("email")}}'><br>
        </div>
        <div id="email-error"></div>

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

         <div class="submit-container">
                    <div class="login-btn">
                        <input type='submit' value="Reset and Login">
                    </div>
                </div>    
        </form> 
        @if($error == 'empty_fields')
        <section class = 'error-message'>Empty fields.</section>
        @elseif($error == 'bad_passwords')
        <section class = 'error-message'>Bad passwords.</section>
         @elseif($error == 'non_existing_email')
        <section class = 'error-message'>Email doesn't exists.</section>
         @elseif($error == 'incomplete_password')
        <section class = 'error-message'>Change password.</section>
        @endif

        <p><a  href="{{ route('signup.form') }}">Signup here</a></p>
        <p><a  href="{{ route('login.form') }}">Login here</a></p>

        <p id="error-message"></p>
    </div>
    </body>
</html>

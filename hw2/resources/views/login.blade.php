<html>
<head>
  <title>Sign Up - TravelHub</title>
  <link rel="stylesheet" href="{{ url('css/login.css') }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
   <script>
    const BASE_URL = "{{ url('/') }}/"
  </script>
  <script src='{{ url("js/login.js") }}' defer></script> 
  <meta charset="utf-8">
</head>
<body>

    <div id="login-container">
        <h1>Welcome to Travel Hub</h1>
        <form id = "signup-form" method="post">
        
        @csrf
        <div class="email">
            <label for="email">Email:</label><br>
            <input type="text" id="email" name="email" value = '{{ old("username")}}'><br>
            <div id="email-error"></div>
        </div>

        <div class="password">
            <label for="password">Password:</label><br>
            <div class="password-wrapper">
                <input type="password" id="password" name="password" required>
                <button type="button" id="toggle-password" aria-label="Show password">
                <img src="{{ asset('pics/open-eye.svg') }}" alt="Show password" width="24" height="24">
                </button>
            </div>
            <div id="password-error"></div>
        </div>

         <div class="submit-container">
                    <div class="login-btn">
                        <input type='submit' value="Login">
                    </div>
                </div>    

        </form> 

        @if($error == 'wrong_credentials')
        <section class = 'error-message'>Wrong credentials.</section>
        @elseif($error == 'empty_fields')
        <section class = 'error-message'>Empty fields.</section>
        @endif

        <p>Don't have an account? <a  href="{{ route('signup.form') }}">Register here</a></p>
        <p>Forgot your password? <a  href="{{ route('reset.form') }}">Reset here</a></p>


        <p id="error-message"></p>
    </div>
    </body>
</html>

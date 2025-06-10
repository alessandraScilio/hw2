<html>
<head>
    <title>TravelHub</title>
    <link rel="stylesheet" href="{{ url('css/login.css') }}">
    <link rel="stylesheet" href="{{ url('css/reset.css') }}">
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
    </head>
<body>

    <div id="login-container">
        <h1>Travel Hub: Reset page</h1>
        <form id = "form" method="post">
        
        @csrf
        <div class="username">
            <label for="username">Email:</label><br>
            <input type="text" id="username" name="email" value = '{{ old("email")}}'><br>
        </div>

        <div class="password">
            <label for="password">New Password:</label><br>
            <input type="password" id="password" name="password"><br><br>
        </div>

        <div class="password">
            <label for="password">Confirm Password:</label><br>
            <input type="password" id="password" name="password_confirmation"><br><br>
        </div>

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

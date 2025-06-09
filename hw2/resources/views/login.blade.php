<html>
<head>
    <title>TravelHub</title>
    <link rel="stylesheet" href="{{ url('css/login.css') }}">
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
    </head>
<body>

    <div id="login-container">
        <h1>Welcome to Travel Hub</h1>
        <form id = "form" method="post">
        
        @csrf
        <div class="username">
            <label for="username">Email:</label><br>
            <input type="text" id="username" name="email" value = '{{ old("username")}}'><br>
        </div>

        <div class="password">
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password"><br><br>
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

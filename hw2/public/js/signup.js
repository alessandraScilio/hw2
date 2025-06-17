function togglePassword(event) {
  var toggleBtn = event.currentTarget;
  var inputId = toggleBtn.getAttribute('data-input');
  var input = document.getElementById(inputId);

  if (input.type === 'password') {
    input.type = 'text';
    toggleBtn.querySelector('img').alt = 'Hide password';
    toggleBtn.querySelector('img').src = "pics/eye-closed.svg";
  } else {
    input.type = 'password';
    toggleBtn.querySelector('img').alt = 'Show password';
    toggleBtn.querySelector('img').src = "pics/open-eye.svg";
  }
}


function setupToggle() {
  const togglePasswordBtn = document.getElementById('toggle-password');
  togglePasswordBtn.setAttribute('data-input', 'password');
  togglePasswordBtn.addEventListener('click', togglePassword);

  const toggleConfirmBtn = document.getElementById('toggle-confirm');
  toggleConfirmBtn.setAttribute('data-input', 'confirm-password');
  toggleConfirmBtn.addEventListener('click', togglePassword);
}


function validateCheckbox() {
  const checkbox = document.querySelector('#allow');
  const errorElement = document.querySelector('#allow-error');
  
  if (!checkbox.checked) {
    errorElement.textContent ="";
    errorElement.classList.remove('ok');
    errorElement.textContent = "Accept privacy policy";
    errorElement.classList.add('show');
    formStatus.checkbox = false;
    return false;
  } else {
    formStatus.checkbox = true;
    return true;
  }
}

function validateConfirmPassword() {
  const confirmInput = document.getElementById('confirm-password');
  const passwordInput = document.getElementById('password');
  const errorElement = document.querySelector('#confirm-error');

  if (confirmInput.value !== passwordInput.value) {
    errorElement.textContent ="";
    errorElement.classList.remove('ok');
    errorElement.textContent = "Different passwords";
    errorElement.classList.add('show');
    formStatus.confirm = false;
    return false;
  } else {
    errorElement.classList.remove('show');
    errorElement.textContent = "Same passwords";
    errorElement.classList.add('ok');
    formStatus.confirm = true;
    return true;
  }
}

function validatePassword() {
  const input = document.querySelector('#password');
  const value = input.value;
  const errorElement = document.querySelector('#password-error');

  const isValid = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(value);

  if (!isValid) {
    errorElement.textContent ="";
    errorElement.classList.remove('ok');
    errorElement.textContent = "Min. 8 chars, 1 upper, 1 special";
    errorElement.classList.add('show');
    formStatus.password = false;

    return false;
  } else {
    errorElement.textContent ="";
    errorElement.classList.remove('show');
    errorElement.textContent = "Valid password";
    errorElement.classList.add('ok');
    formStatus.password = true;
    return true;
  }
}

function validateEmailSync() {
  const input = document.querySelector('#email');
  const value = input.value.trim().toLowerCase();
  const errorElement = document.getElementById('email-error');

  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailPattern.test(value)) {
    errorElement.textContent ="";
    errorElement.classList.remove('ok');
    errorElement.textContent = "Invalid email format";
    errorElement.classList.add('show');
    return false;
  } else {
    errorElement.textContent ="";
    errorElement.classList.remove('show');
    errorElement.textContent = "Valid email format";
    errorElement.classList.add('ok');
    return true;
  }
}


function onEmailJson(json) {
    const errorElement = document.getElementById('email-error');

    if (json && json.exists) {
    errorElement.textContent ="";
    errorElement.classList.remove('ok');
    errorElement.classList.add('show');
    errorElement.textContent = "Email exists already";
    formStatus.email = false;
    return false;
    }
    else {
    errorElement.textContent ="";
    errorElement.classList.remove('show');
    errorElement.classList.add('ok');
    errorElement.textContent = "Valid email";
    formStatus.email = true;
    return true;
    }

}

function checkEmail(event) {
  if (!validateEmailSync()) return;

  const input = document.querySelector('#email');
  const value = input.value.trim().toLowerCase();

  const formData = new FormData();
  formData.append('email', value);
  formData.append('_token', document.querySelector('meta[name="csrf-token"]').content);

  fetch(BASE_URL + 'check_email', {
    method: 'POST',
    body: formData
  })
    .then(fetchResponse)
    .then(onEmailJson);
}

function onUsernameJson(json) {
  const errorElement = document.getElementById('username-error');
    if (json && json.exists) {
    errorElement.textContent ="";
    errorElement.classList.remove('ok');
    errorElement.classList.add('show');
    errorElement.textContent = "Username exists already";
    formStatus.username = false;
    return false;
    }
    else {
    errorElement.textContent ="";
    errorElement.classList.remove('show');
    errorElement.classList.add('ok');
    errorElement.textContent = "Valid username";
    formStatus.username = true;
    return true;
    }
}

function checkUsername(event) {
  const input = document.querySelector('#username');
  const value = input.value.trim();
  const errorElement = document.getElementById('username-error');

  if (!/^[a-zA-Z0-9_]{1,15}$/.test(value)) {
    errorElement.textContent = "Letters, numbers and underscore. Max 15.";
    errorElement.classList.add('show');
    return;
  }

  const formData = new FormData();
  formData.append('username', value);
  formData.append('_token', document.querySelector('meta[name="csrf-token"]').content);

  fetch(BASE_URL + 'check_username', {
    method: 'POST',
    body: formData
  }).then(fetchResponse)
    .then(onUsernameJson);
}

function fetchResponse(response) {
  if (!response.ok) return null;
  return response.json();
}

function checkSignup(event) {
  validatePassword();
  validateConfirmPassword();
  validateCheckbox();

  if (!formStatus.username || !formStatus.email || !formStatus.password || !formStatus.confirm || !formStatus.checkbox) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = "Please fix the errors above.";
    errorElement.classList.add('show');
    event.preventDefault();
  }
}


var formStatus = {
  username: false,
  email: false,
  password: false,
  confirm: false,
  checkbox: false
};

function onDomContentLoaded() {
  document.querySelector('#allow').addEventListener('change', validateCheckbox);
  document.querySelector('#username').addEventListener('blur', checkUsername);
  document.querySelector('#email').addEventListener('blur', checkEmail);
  document.querySelector('#password').addEventListener('blur', validatePassword);
  document.querySelector('#confirm-password').addEventListener('blur', validateConfirmPassword);
  document.querySelector('#signup-form').addEventListener('submit', checkSignup);
  setupToggle();
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded);
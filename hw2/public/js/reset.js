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
    return false;
  } else {
    errorElement.textContent ="";
    errorElement.classList.remove('show');
    errorElement.textContent = "Valid password";
    errorElement.classList.add('ok');
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
    return false;
  } else {
    errorElement.classList.remove('show');
    errorElement.textContent = "Same passwords";
    errorElement.classList.add('ok');
    return true;
  }
}


function onEmailJson(json) {
    const errorElement = document.getElementById('email-error');
    if (json && json.exists) {
    errorElement.textContent ="";
    errorElement.classList.remove('show');
    errorElement.classList.add('ok');
    errorElement.textContent = "Valid email";
    formStatus.email = true;
    }
    else {
    errorElement.textContent ="";
    errorElement.classList.remove('ok');
    errorElement.classList.add('show');
    errorElement.textContent = "Invalid email";
    formStatus.email = false;
    }

}

function fetchResponse(response) {
  if (!response.ok) return null;
  return response.json();
}


function checkEmail(event) {
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

function checkSignup(event) {
  const validPassword = validatePassword();
  const validConfirm = validateConfirmPassword();
  const errorElement = document.querySelector('#error-message');

  if (!(formStatus.email && validPassword && validConfirm)) {
    errorElement.textContent ="";
    errorElement.classList.add('show');
    errorElement.textContent = "Please fix the errors above.";
    event.preventDefault();
    return;
  }
}

var formStatus = {
  email: false
};

function onDomContentLoaded(){
    document.querySelector('#email').addEventListener('blur', checkEmail);
    document.querySelector('#password').addEventListener('blur', validatePassword);
    document.querySelector('#confirm-password').addEventListener('blur', validateConfirmPassword);
    document.querySelector('#signup-form').addEventListener('submit', checkSignup);
    setupToggle();
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded);
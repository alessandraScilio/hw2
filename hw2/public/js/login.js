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
}



function onEmailJson(json) {
    const errorElement = document.getElementById('email-error');

    if (json && json.exists) {
    errorElement.textContent ="";
    errorElement.classList.remove('show');
    errorElement.classList.add('ok');
    errorElement.textContent = "Valid email";
    }
    else {
    errorElement.textContent ="";
    errorElement.classList.remove('ok');
    errorElement.classList.add('show');
    errorElement.textContent = "Invalid email";
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


function onDomContentLoaded(){
    document.querySelector('#email').addEventListener('blur', checkEmail);
    setupToggle();
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded);
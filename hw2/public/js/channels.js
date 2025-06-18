
function toggleMobileMenu() {
  const menuContainer = document.getElementById('menu-container');
  const body = document.body;
  const hamburger = document.querySelector('.hamburger');
  const navContainer = document.getElementById('nav-container');
  const overlay = document.getElementById('menu-overlay');

  const isMenuOpen = menuContainer.classList.toggle('show');

  body.classList.toggle('no-scroll', isMenuOpen);
  overlay.classList.toggle('show', isMenuOpen);
  menuContainer.classList.toggle('hidden', !isMenuOpen);

  if (isMenuOpen) {
    hamburger.innerHTML = '<img src="' + BASE_URL + 'pics/cross.svg" alt="Close menu">';
    navContainer.classList.add('nav-expanded');
  } else {
    hamburger.innerHTML = '<img src="' + BASE_URL + 'pics/hamburger.svg">';
    navContainer.classList.remove('nav-expanded');
  }
}

function onDomLoaded() {
  const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
}


document.addEventListener('DOMContentLoaded', onDomLoaded);


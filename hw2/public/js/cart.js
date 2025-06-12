function handleOutsideClick(event) {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartButton = document.querySelector('.cart-button');

  if (
    cartSidebar.classList.contains('open') &&
    !cartSidebar.contains(event.target) &&
    !cartButton.contains(event.target)
  ) {
    closeCart();
  }
}

function openCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.body.addEventListener('click', handleOutsideClick);
}

function closeCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.classList.remove('open');
  document.body.style.overflow = '';
}

function handleCartToggle(event) {
  event.preventDefault();

  const cartSidebar = document.getElementById('cart-sidebar');
  const isOpen = cartSidebar.classList.contains('open');

  if (isOpen) {
    closeCart();
  } else {
    openCart();
  }
}


const cartButton = document.querySelector('.cart-button');
if (cartButton) {
  cartButton.addEventListener('click', handleCartToggle);
}


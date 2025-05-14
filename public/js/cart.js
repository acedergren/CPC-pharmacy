// public/js/cart.js
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  function addToCart(product) {
    const cart = getCart();
    cart.push(product);
    saveCart(cart);
    updateCartCount();
  }
  function updateCartCount() {
    document.getElementById('cart-count').textContent = getCart().length;
  }
  
  // Initialize badge on every page load
  document.addEventListener('DOMContentLoaded', updateCartCount);
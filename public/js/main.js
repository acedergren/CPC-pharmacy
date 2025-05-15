// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  if (!location.pathname.endsWith('checkout.html')) return;

  const params = new URLSearchParams(window.location.search);
  document.getElementById('price-label').textContent = params.get('price') || '0';

  document.getElementById('checkout-form').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const data = {
      product: params.get('product') || 'Okänd produkt',
      price: params.get('price') || '0',
      name: form.name.value,
      email: form.email.value,
      cardNumber: form.cardNumber.value,
      expiry: form.expiry.value,
      cvv: form.cvv.value
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      const resultEl = document.getElementById('result');
      if (json.success) {
        resultEl.innerHTML = `
          <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong class="font-bold">Tack!</strong> Din beställning är mottagen.<br>
            En bekräftelse har skickats till <em>${form.email.value}</em>.
          </div>`;
        form.querySelectorAll('input, button').forEach(el => el.disabled = true);
      } else {
        resultEl.textContent = '❌ Något gick fel, försök igen.';
      }
    } catch (err) {
      document.getElementById('result').textContent = `🚨 Serverfel: ${err.message}`;
    }
  });
});
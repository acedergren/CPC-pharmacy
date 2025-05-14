// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded shadow flex flex-col';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="h-40 object-cover rounded mb-4">
      <h2 class="text-lg font-bold">${p.name}</h2>
      <p class="text-gray-600 flex-grow">${p.description}</p>
      <p class="text-green-600 font-semibold mt-2">${p.price} kr</p>
      <a href="/demos/cpc/checkout.html?product=${encodeURIComponent(p.name)}&price=${p.price}"
         class="mt-4 bg-green-600 text-white text-center py-2 rounded hover:bg-green-700">
        Köp nu
      </a>
    `;
    grid.appendChild(card);
  });
});
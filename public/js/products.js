// public/js/products.js
// Fetch multilingual product catalog and render into grid
(async function() {
  try {
    // Use relative path so it works regardless of mount point
    const resp = await fetch('api/products');
    if (!resp.ok) throw new Error(`Products API error: ${resp.status}`);
    const products = await resp.json();

    // Translate and set the product list title
    const titleEl = document.querySelector('[data-i18n="productListTitle"]');
    if (titleEl) titleEl.innerText = i18next.t('productListTitle');

    // Pre-fetch localized Add to Cart label
    const addLabel = i18next.t('product.addToCart');

    const lang = i18next.language || 'en';
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    products.forEach(p => {
      const name = p[`${lang}_name`] || p['en_name'];
      const desc = p[`${lang}_desc`] || p['en_desc'];
      const imgFile = p.image || p.image_filename;
      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow p-4 flex flex-col';

      card.innerHTML = `
        <img src="/images/products/${imgFile}" alt="${name}" class="h-32 object-contain mb-2 mx-auto" />
        <h4 class="font-semibold text-lg mb-1">${name}</h4>
        <p class="text-sm text-gray-600 flex-grow">${desc}</p>
        <button data-id="${p.id}" class="mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
          ${addLabel}
        </button>
      `;

      // Attach click handler for add-to-cart
      const btn = card.querySelector('button');
      btn.addEventListener('click', () => {
        addToCart(p.id, name);
      });

      grid.appendChild(card);
    });
  } catch (err) {
    console.error('❌ Error loading products:', err);
  }
})();

// Simple cart logic (store in localStorage)
function addToCart(id, name) {
  const cart = JSON.parse(localStorage.getItem('demoCart') || '[]');
  cart.push({ id, name });
  localStorage.setItem('demoCart', JSON.stringify(cart));
  alert(`${name} added to cart`);
}
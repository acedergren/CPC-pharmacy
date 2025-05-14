// public/js/products.js
document.addEventListener('DOMContentLoaded', () => {
  const baseProducts = [
    { name: "Alvedon 500 mg", description: "Smärtstillande och febernedsättande.", price: 49 },
    { name: "Ipren 400 mg", description: "Smärtstillning med antiinflammatorisk effekt.", price: 59 },
    { name: "Naproxen 250 mg", description: "Långverkande mot smärta.", price: 65 },
    { name: "Panodil 500 mg", description: "Mot feber och lätt smärta.", price: 45 },
    { name: "Aspirin 500 mg", description: "Blodförtunnande och smärtstillande.", price: 55 },
    { name: "Voltaren Gel 2,32 %", description: "Lindrar muskler och ledsmärta.", price: 79 },
    { name: "Zinksalva 30 g", description: "Lindrar irriterad och torr hud.", price: 69 },
    { name: "Cetirizin 10 mg", description: "Mot pollen- och allergisymtom.", price: 99 },
    { name: "Nasonex Nässpray 0,05 %", description: "Lindrar nästäppa vid allergi.", price: 119 },
    { name: "Otrivin 0,1 %", description: "Tillfällig nästäppa vid förkylning.", price: 89 },
    { name: "Omeprazol 20 mg", description: "Mot magsårs- och refluxbesvär.", price: 129 },
    { name: "Loperamid 2 mg", description: "Mot tillfällig diarré.", price: 49 },
    { name: "Bricanyl Turbuhaler", description: "Luftrörsvidgande vid astma.", price: 159 },
    { name: "Vita C-brus 500 mg", description: "Immunstöd och energi.", price: 79 },
    { name: "D-Vitamin 1000 IE", description: "För normalt kalciumupptag.", price: 99 },
    { name: "Multivitamin", description: "Komplett vitamin- och mineralkombination.", price: 119 },
    { name: "Probi Mage", description: "Probiotika för bättre maghälsa.", price: 129 },
    { name: "Sovakutan", description: "Naturläkemedel som främjar god sömn.", price: 89 },
    { name: "Traumeel Salva 50 g", description: "Mot blåmärken och stukningar.", price: 99 },
    { name: "NEO-Citran brustablett", description: "Mot förkylningssymtom och halsont.", price: 69 }
  ];

  const products = Array.from({ length: 100 }, (_, i) => {
    const base = baseProducts[i % baseProducts.length];
    const id = i + 1;
    return {
      id,
      name: base.name,
      description: base.description,
      price: base.price,
      image: `/images/products/produkt_${id}.png`
    };
  });

  const grid = document.getElementById('product-grid');
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded shadow flex flex-col';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="h-40 object-cover rounded mb-4">
      <h2 class="text-lg font-bold">${p.name}</h2>
      <p class="text-gray-600 flex-grow">${p.description}</p>
      <p class="text-green-600 font-semibold mt-2">${p.price} kr</p>
      <a href="/checkout.html?product=${encodeURIComponent(p.name)}&price=${p.price}"
         class="mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-center">
        Köp nu
      </a>
    `;
    grid.appendChild(card);
  });
});
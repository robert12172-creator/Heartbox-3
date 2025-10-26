// Tiny Express server for the public MVP
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use('/', express.static(path.join(__dirname)));

let memory = []; // in-memory fallback

app.post('/api/messages', (req, res) => {
  const { data, mime } = req.body || {};
  if (!data) return res.status(400).json({ ok:false, error:'No data' });
  const id = String(Date.now());
  memory.push({ id, mime: mime || 'audio/ogg', size: data.length });
  return res.json({ ok:true, id });
});

app.get('/healthz', (_, res)=> res.send('ok'));

app.listen(PORT, () => console.log(`Public MVP server on :${PORT}`));

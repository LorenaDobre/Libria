require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Libria</h1><p>Serverul functioneaza!</p>');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', aplicatie: 'Libria' });
});

app.listen(PORT, () => {
  console.log(`Libria ruleaza la http://localhost:${PORT}`);
});

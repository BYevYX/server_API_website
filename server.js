const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/env', (req, res) => {
  res.json({
      login: process.env.LOGIN,
      token: process.env.TOKEN,
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порте ${port}`);
});

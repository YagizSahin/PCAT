const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});
app.get('/about.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/about.html'));
});
app.get('/contact.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/contact.html'));
});


const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});

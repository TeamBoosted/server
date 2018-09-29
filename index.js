const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.end('hi');
});

app.listen(PORT, () => console.log('started'));
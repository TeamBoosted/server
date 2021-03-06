require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/routes.js');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => console.log('started'));

app.use(express.static(process.env.CLIENT_FOLDER || path.join(__dirname, '../client/dist')));

app.use((req, res, next) => {
  console.log('Req.url\n-------\n', req.url);
  console.log('Req.method\n-------\n', req.method);
  next();
});
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/msg', (req, res) => {
  res.json({ what: 'up' });
});

app.use('/api', api);

app.use('*', express.static(process.env.CLIENT_FOLDER || path.join(__dirname, '../client/dist')));

module.exports = server;

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { getMovieByTitle } = require('./api/movies');
const api = require('./routes/routes.js');

const app = express();
const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => console.log('started'));

app.use((req, res, next) => {
  console.log('Req.url', req.url);
  console.log('Req.method', req.method);
  next();
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hi');
});

app.get('/msg', (req, res) => {
  res.json({ what: 'up' });
});

app.post('/user/signup', (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.sendStatus(403);
  }
  username = username.toLowerCase();
  res.json({ username, password });
});

app.use('/api', api);

app.get('/*', (req, res) => {
  res.sendStatus(404);
});


module.exports = server;
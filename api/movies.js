const axios = require('axios');
const api_key = process.env.MOVIE_API_KEY;
const { formatData, limitToFive } = require('../helpers/helper.js');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);
const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_URL,
  password: process.env.REDIS_PASS
});

module.exports.getMovieByTitle = (req, res) => {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const { query } = req.params;
  const params = {
    query,
    api_key
  };

  client.getAsync(query)
    .then(response => {
      if (!response) {
        axios
          .get(url, { params })
          .then(response => {
            const data = response.data.results;
            const formatted = formatData(data, 'movie');
            client.set(query, JSON.stringify(formatted));
            res.send(formatted);
          })
      } else {
        res.send(response);
      }
    })
    .catch(console.log);
}

module.exports.getMovieRecc = (req, res) => {
  const movie_id = req.params.movieId;
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations`;
  const params = {
    api_key
  };

  client.getAsync(movie_id)
    .then(response => {
      if(!response) {
        axios
          .get(url, { params })
          .then(response => {
            const data = response.data.results;
            const limittedData = limitToFive(data);
            const formatted = formatData(limittedData, 'movie');
            client.set(movie_id, JSON.stringify(formatted));
            res.send(formatted);
          })
      } else {
        res.send(response);
      }
    })
    .catch(console.log);

}

module.exports.getManyMovieReccs = (req, res) => {
  const movie_id0 = req.params.movieId0;
  const movie_id1 = req.params.movieId1;
  const movie_id2 = req.params.movieId2;
  const body = [];
  const params = {
    api_key
  };
  client.mgetAsync(movie_id0, movie_id1, movie_id2)
    .then(response => {
      response.forEach(data => {
        let parsed = JSON.parse(data);
        body.push(parsed);
      })
      res.send(body);
    })
    .catch(console.log);
  // Promise.all([
  //   axios.get(`https://api.themoviedb.org/3/movie/${movie_id0}/recommendations`, { params }), 
  //   axios.get(`https://api.themoviedb.org/3/movie/${movie_id1}/recommendations`, { params }), 
  //   axios.get(`https://api.themoviedb.org/3/movie/${movie_id2}/recommendations`, { params })
  // ]).then(data => {
  //   // const body = [];
  //   data.forEach(response => {
  //     const results = response.data.results;
  //     const limittedData = limitToFive(results);
  //     const formatted = formatData(limittedData, 'movie');
  //     body.push(formatted);
  //   })
  //   res.send(body);
  // })
  // .catch(console.log);
}

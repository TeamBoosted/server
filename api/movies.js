const axios = require('axios');
const api_key = process.env.MOVIE_API_KEY;
const { formatData, limitToFive } = require('../helpers/helper.js');

module.exports.getMovieByTitle = (req, res) => {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const { query } = req.params;
  const params = {
    query,
    api_key
  };
  client.getAsync(query)
    .then(res => {
      console.log(res);
    })
  axios
    .get(url, { params })
      .then(response => {
        const data = response.data.results;
        const formatted = formatData(data, 'movie');
        res.send(formatted);
      })
      .catch(console.log);
}

module.exports.getMovieRecc = (req, res) => {
  const movie_id = req.params.movieId;
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations`;
  const params = {
    api_key
  };

  client.get()
  axios
    .get(url, { params })
      .then(response => {
        const data = response.data.results;
        const limittedData = limitToFive(data);
        const formatted = formatData(limittedData, 'movie');
        res.send(formatted);
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

  Promise.all([
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id0}/recommendations`, { params }), 
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id1}/recommendations`, { params }), 
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id2}/recommendations`, { params })
  ]).then(data => {
    // const body = [];
    data.forEach(response => {
      const results = response.data.results;
      const limittedData = limitToFive(results);
      const formatted = formatData(limittedData, 'movie');
      body.push(formatted);
    })
    res.send(body);
  })
  .catch(console.log);
}

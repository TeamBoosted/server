const { get }  = require('axios');
const api_key = process.env.MOVIE_API_KEY;

module.exports.getMovieByTitle = (req, res) => {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const { query } = req.params;
  const params = {
    query,
    api_key
  };
  console.log(`Hey we made it to the server!!!!`)
  get(url, { params })
  .then(response => {
    res.send(response.data.results);
  })
  .catch(console.log);
}

module.exports.getMovieRecc = (req, res) => {
  const movie_id = req.params.movieId;
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations`;
  const params = {
    api_key
  };

  get(url, { params })
  .then(response => {
    res.send(response.data.results);
  })
  .catch(console.log);
}
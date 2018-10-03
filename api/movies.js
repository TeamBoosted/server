const { get }  = require('axios');
const api_key = process.env.MOVIE_API_KEY;
const url = 'https://api.themoviedb.org/3/search/movie'

module.exports.getMovieByTitle = (req, res) => {
  const { query } = req.params;
  const params = {
    query,
    api_key
  }

  get(url, { params })
  .then(response => {
    res.send(response.data.results);
  })
  .catch(console.log)
} 
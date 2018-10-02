require('dotenv').config();
const axios  = require('axios');
const key = process.env.MOVIE_API_KEY;
const url = 'https://api.themoviedb.org/3/search/movie'

module.exports.getMovieByTitle = (title) => {
  const params = {
    query: title,
    api_key: key
  }

  return axios.get(url, {
    params
  })
  .then(response => {
    return response.data.results;
  })
  .catch(console.log)
} 
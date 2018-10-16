const axios = require('axios');
const api_key = process.env.MOVIE_API_KEY;
const { formatData, formatTV } = require('../helpers/helper.js');


module.exports.getByTvTitle = (req, res) => {
  const url = 'https://api.themoviedb.org/3/search/tv';
  const { query } = req.params;
  const params = {
    query,
    api_key
  };

  axios
    .get(url, { params })
    .then(response => {
      const data = response.data.results;
      const formatted = formatData(data, 'tv');
      res.send(formatted);
    })
    .catch(console.log);
}

module.exports.getTvRecc = (req, res) => {
  const tv_id = req.params.tvId;
  const url = `https://api.themoviedb.org/3/tv/${tv_id}/recommendations`;
  const params = {
    api_key
  };

  axios
    .get(url, { params })
    .then(response => {
      const data = response.data.results;
      const formatted = formatData(data, 'tv');
      console.log('WHAT IS THE TV RECCCC DATA',formatted)
      res.send(formatted);
    })
    .catch(console.log);
}

module.exports.tvRecByGenre = async (req, res) => {
  const { genreId } = req.params;
  const url = 'https://api.themoviedb.org/3/discover/tv';
  const params = {
    include_null_first_air_dates: 'false',
    with_genres: `${genreId}`,
    timezone: 'America/New_York',
    page: '1',
    sort_by: 'popularity.desc',
    language: 'en-US',
    api_key,
  }
 
  try {
    const response = await axios.get(url, { params })
    console.log('----------\nGetting response from discover\n----------\n', response);
    const formatted = formatData(response.data.results, 'tv');
    res.send(formatted);
  } catch (err) {
    console.log(err);
  }
}
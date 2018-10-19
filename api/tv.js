const axios = require('axios');
const api_key = process.env.MOVIE_API_KEY;
const { formatData, limitToN } = require('../helpers/helper.js');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);
const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_URL,
  password: process.env.REDIS_PASS
});

module.exports.getByTvTitle = (req, res) => {
  const url = 'https://api.themoviedb.org/3/search/tv';
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
            const formatted = formatData(response.data.results, 'tv');
            const limitted = limitToN(formatted, 10);
            client.set(query, JSON.stringify(limitted));
            res.send(limitted);
          })
          .catch(console.log)
      } else {
        res.send(response);
      }
    })
    .catch(console.log);
}

module.exports.getTvRecc = (req, res) => {
  const { tvId } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${tvId}/recommendations`;
  const params = {
    api_key
  };


  client.getAsync(tvId)
    .then(response => {
      if (!response) {
        axios
          .get(url, { params })
          .then(response => {
            const formatted = formatData(response.data.results, 'tv');
            // const limitted = limitToN(formatted, 2);
            client.set(tvId, JSON.stringify(formatted));
            res.send(formatted);
          })
      } else {
        res.send(response);
      }
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
    const formatted = formatData(response.data.results, 'tv');
    // const limit = limitToN(formatted);
    res.send(formatted);
  } catch (err) {
    console.log(err);
  }
}
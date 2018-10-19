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
            const formatted = formatData(response.data.results, 'movie');
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

module.exports.getMovieRecc = (req, res) => {
  const { movieId } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations`;
  const params = {
    api_key
  };

  client.getAsync(movieId)
    .then(response => {
      if (!response) {
        axios
          .get(url, { params })
          .then(response => {
            const formatted = formatData(response.data.results, 'movie');
            // const limitted = limitToN(formatted, 2)
            client.set(movieId, JSON.stringify(formatted));
            res.send(formatted);
          })
      } else {
        res.send(response);
      }
    })
    .catch(console.log);

}

module.exports.getManyMovieReccs = (req, res) => {
  const { movieId0, movieId1, movieId2 } = req.params;
  const body = [];
  // const params = {
  //   api_key
  // };
  client.mgetAsync(movieId0, movieId1, movieId2)
    .then(response => {
      console.log('redis',response)
      response.forEach(data => {
        if (data) {
          let parsed = JSON.parse(data);
          body.push(parsed);
        }
      })
      res.send(body);
    })
    .catch(console.log);
}

module.exports.getRecsFromLastThree = (movieId0, movieId1, movieId2) => {
  return client.mgetAsync(movieId0, movieId1, movieId2)
    .then(response => {
      const body = [];
      response.forEach(data => {
        if (data) {
          let parsed = JSON.parse(data);
          body.push(parsed);
        }
      })
      return body;
    })
    .catch(console.log);
}

module.exports.movieRecByGenre = async (req, res) => {
  const { genreId } = req.params;
  const url = 'https://api.themoviedb.org/3/discover/movie';
  const params = {
    with_genres: `${genreId}`,
    page: '1',
    include_video: 'false',
    include_adult: 'false',
    sort_by: 'popularity.desc',
    language: 'en-US',
    api_key
  }
  try {
    const response = await axios.get(url, { params })
    const formatted = formatData(response.data.results, 'movie');
    // const limit = limitToN(formatted, 2);
    res.send(formatted);
  } catch (err) {
    console.log(err);
  }
}

module.exports.cache = (req, res) => {
  const {
    key,
    value} = req.body;
  client.getAsync(key)
    .then(response => {
      if (!response) {
        const string = JSON.stringify(value);
        client.set(key, string);
        res.sendStatus(200);
      } else {
        res.send(JSON.parse(response));
      }
    })
}
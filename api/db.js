const axios = require('axios');
const { formatUrl } = require('../helpers/helper.js');
const url = process.env.DB_URL || 'http://localhost:8081';
const { getRecsFromLastThree, getMovieRecc } = require('./movies.js');
const api_key = process.env.MOVIE_API_KEY;
const { formatData } = require('../helpers/helper.js');

module.exports.saveMediumToDb = (req, res) => {
  const mediumObj = req.body.data.movie;
  const id_token = req.body.data.user;
  axios
    .post(`${url}/db/addMedium`, { mediumObj, id_token })
    .then(() => {
      if (mediumObj.genre_id && mediumObj.genre_id.length > 0) {
        axios
          .post(`${url}/db/addGenre`, { genre_ids: mediumObj.genre_id, id_token })
          .then(results => {
            res.sendStatus(200);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(500);
          });
      } else {
        res.sendStatus(200);
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports.getLastThreeMedia = async (req, res) => {
  const id_token = req.body.data.id_token;
  try {
    let lastThree = await axios.post(`${url}/db/getLastThreeMedia`, { id_token });
    let redisRecs = await getRecsFromLastThree(lastThree.data[0].moviedb_id, lastThree.data[1].moviedb_id, lastThree.data[2].moviedb_id);
    if (redisRecs.length > 0) {
      res.send(redisRecs);
    } else {
      let arr = [];
      const params = { api_key };
      for (let i = 0; i < lastThree.data.length; i++) {
        if (lastThree.data[i].type === 'movie') {
          let movieRecs = await axios.get(`https://api.themoviedb.org/3/movie/${lastThree.data[i].moviedb_id}/recommendations`, { params });
          const formattedMovies = formatData(movieRecs.data.results, 'movie');
          arr = arr.concat(formattedMovies);
        }
        if (lastThree.data[i].type === 'tv') {
          let tvRecs = await axios.get(`https://api.themoviedb.org/3/tv/${lastThree.data[i].moviedb_id}/recommendations`, { params });
          const formattedTv = formatData(tvRecs.data.results, 'tv');
          arr = arr.concat(formattedTv);
        }
      }
      res.send(arr);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports.getAllMedia = (req, res) => {
  const id_token = req.params.token_id;

  axios
    .get(`${url}/db/getAllMedia/${id_token}`)
    .then(userMedias => {
      console.log("DB RESPONSE TO SERVER:************", userMedias);
      res.send(userMedias.data);
    })
    .catch(err => {
      console.log("i done messed up", err);
      res.sendStatus(500);
    });
};

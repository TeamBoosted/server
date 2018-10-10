const express = require('express');
const router = express.Router();
const { getByTvTitle, getTvRecc } = require('../api/tv.js');
const { getMovieByTitle, getMovieRecc, getManyMovieReccs } = require('../api/movies.js');
const { saveMediumToDb, getLastThreeMedia } = require('../api/db.js');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);
const client = redis.createClient();

client.on('error', console.log);

//TV Routes
router
  .route('/info/tv/:query')
  .get(getByTvTitle);

router
  .route('/rec/tv/:tvId')
  .get(getTvRecc);
  
//Movie Routes
router
  .route('/info/movies/:query')
  .get(getMovieByTitle);

router
  .route('/rec/manyMovies/:movieId0&:movieId1&:movieId2')
  .get(getManyMovieReccs)

router
  .route('/rec/movies/:movieId')
  .get(getMovieRecc);

//DB Routes
router
  .route('/db/addMedium')
  .post(saveMediumToDb);

router
  .route('/db/getLastThreeMedia')
  .post(getLastThreeMedia);

module.exports = router;
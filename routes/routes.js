const express = require('express');
const router = express.Router();
const { getByTvTitle, getTvRecc } = require('../api/tv.js');
const { getMovieByTitle, getMovieRecc, getManyMovieReccs } = require('../api/movies.js');
const { saveMediumToDb } = require('../api/db.js');

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
  .route('/rec/movies/:movieId')
  .get(getMovieRecc);

// router
//   .route('/rec/movies/:movieId0&:movieId1&:movieId2')
//   .get(getManyMovieReccs)

//DB Routes
router
  .route('/db/addMedium')
  .post(saveMediumToDb);

module.exports = router;
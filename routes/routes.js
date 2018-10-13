const express = require('express');
const router = express.Router();
const { getByTvTitle, getTvRecc } = require('../api/tv.js');
const { getMovieByTitle, getMovieRecc, getManyMovieReccs } = require('../api/movies.js');
const { saveMediumToDb, getLastThreeMedia } = require('../api/db.js');
const {getBooksByTitle} = require('../api/books.js')

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

  //Book Routes
// router
//   .route('/info/books/:query')
//   .get(getBooksByTitle);
  

//DB Routes
router
  .route('/db/addMedium')
  .post(saveMediumToDb);

router
  .route('/db/getLastThreeMedia')
  .post(getLastThreeMedia);

module.exports = router;
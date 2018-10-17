const express = require('express');
const router = express.Router();
const { getByTvTitle, getTvRecc, tvRecByGenre } = require('../api/tv.js');
const {
  getMovieByTitle,
  getMovieRecc,
  getManyMovieReccs,
  movieRecByGenre
} = require('../api/movies.js');
const { saveMediumToDb, getLastThreeMedia, getAllMedia } = require('../api/db.js');
const { getPersonality } = require('../api/watson.js');
const { getBooksByTitle, getBookRecsByGenre } = require('../api/books.js');

//TV Routes
router.route('/info/tv/:query').get(getByTvTitle);

router.route('/rec/tv/:tvId').get(getTvRecc);
router.route('/rec/tv/genre/:genreId').get(tvRecByGenre);

//Movie Routes
router.route('/info/movies/:query').get(getMovieByTitle);

router
  .route('/rec/manyMovies/:movieId0&:movieId1&:movieId2')
  .get(getManyMovieReccs);

router.route('/rec/movies/:movieId').get(getMovieRecc);

router.route('/rec/movies/genre/:genreId').get(movieRecByGenre);

// Book Routes
router.route('/info/books/:query').get(getBooksByTitle);

router.route('/db/getBookRecsByGenre/:genre_id').get(getBookRecsByGenre);

//DB Routes
router.route('/db/addMedium').post(saveMediumToDb);

router.route('/db/getLastThreeMedia').post(getLastThreeMedia);

router.route('/db/getAllMedia/:token_id').get(getAllMedia)

//WatsonRoutes

router.route('/watson/getPersonality').post(getPersonality);

module.exports = router;

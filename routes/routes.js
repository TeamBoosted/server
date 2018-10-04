const express = require('express');
const router = express.Router();
const { getByTvTitle, getTvRecc } = require('../api/tv.js');
const { getMovieByTitle, getMovieRecc } = require('../api/movies.js');

router
.route('/info/tv/:query')
.get(getByTvTitle);

router
.route('/rec/tv/:tvId')
.get(getTvRecc);

router
.route('/info/movies/:query')
.get(getMovieByTitle);

router
.route('/rec/movies/:movieId')
.get(getMovieRecc);

module.exports = router;
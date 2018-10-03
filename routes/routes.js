const express = require('express');
const router = express.Router();
const { getByTvTitle } = require('../api/tv.js');
const { getMovieByTitle } = require('../api/movies.js')

router
.route('/info/tv/:query')
.get(getByTvTitle);

router
.route('/info/movies/:query')
.get(getMovieByTitle)

module.exports = router;
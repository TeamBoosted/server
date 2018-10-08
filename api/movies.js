const { get } = require('axios');
const api_key = process.env.MOVIE_API_KEY;
const { formatData } = require('../helpers/helper.js');

module.exports.getMovieByTitle = (req, res) => {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const { query } = req.params;
  const params = {
    query,
    api_key
  };
  get(url, { params })
    .then(response => {
      const data = response.data.results;
      const formatted = formatData(data, 'movie');
      res.send(formatted);
    })
    .catch(console.log);
}

module.exports.getMovieRecc = (req, res) => {
  const movie_id = req.params.movieId;
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations`;
  const params = {
    api_key
  };

  get(url, { params })
    .then(response => {
      const data = response.data.results;
      const formatted = formatData(data, 'movie');
      const formatBody = [];
      for (let i = 0; i < 5; i++) {
        formatBody.push(formatted[i]);
      }
      res.send(formatBody);
    })
    .catch(console.log);
}

// module.exports.getManyMovieReccs = (req, res) => {
    // get 3n from db

    //foreach movieid.()
//   console.log('movieIds', req.params);
//   const movie_id0 = req.params.movieId0;
//   const movie_id1 = req.params.movieId1;
//   const movie_id2 = req.params.movieId2;
//   // const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations`;
//   const params = {
//     api_key
//   };

//   Promise.all([
//     get(`https://api.themoviedb.org/3/movie/${movie_id0}/recommendations`, { params }), 
//     get(`https://api.themoviedb.org/3/movie/${movie_id1}/recommendations`, { params }), 
//     get(`https://api.themoviedb.org/3/movie/${movie_id2}/recommendations`, { params })
//   ]).then(data => {
//     // console.log('response from promise all', response);
//     const body = [];
//     data.forEach(response => {
//       const results = response.data.results;
//       console.log('Response inside forEach', response);
//       let formatted = formatData(data, 'movie');
//       console.log('formatted data', formatted);
//       body.push(formatted);
//     })
//     res.send(body);
//   })
//   .catch(console.log);

//   // res.send(data);
// }

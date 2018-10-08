const { get } = require('axios');
const api_key = process.env.MOVIE_API_KEY;
const { formatData } = require('../helpers/helper.js');


module.exports.getByTvTitle = (req, res) => {
  const url = 'https://api.themoviedb.org/3/search/tv';
  const { query } = req.params;
  const params = {
    query,
    api_key
  };

  get(url, { params })
    .then(response => {
      const data = response.data.results;
      const formatted = formatData(data, 'tv');
      res.send(formatted);
    })
    .catch(console.log);
}

module.exports.getTvRecc = (req, res) => {
  const tv_id = req.params.tvId;
  const url = `https://api.themoviedb.org/3/tv/${tv_id}/recommendations`;
  const params = {
    api_key
  };

  get(url, { params })
    .then(response => {
      const data = response.data.results;
      const formatted = formatData(data, 'tv');
      const formatBody = [];
      for (let i = 0; i < 5; i++) {
        formatBody.push(formatted[i]);
      }
      res.send(formatBody);
    })
    .catch(console.log);
}
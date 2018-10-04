const { get } = require('axios');
const api_key = process.env.MOVIE_API_KEY;


module.exports.getByTvTitle = (req, res) => {
  const url = 'https://api.themoviedb.org/3/search/tv';
  const { query } = req.params;
  const params = {
    query,
    api_key
  };
  
  get(url, { params })
  .then(response => {
    res.send(response.data.results);
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
    res.send(response.data.results);
  })
  .catch(console.log);
}
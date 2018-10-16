const axios = require('axios');
const { formatUrl } = require('../helpers/helper.js');
const url = 'http://localhost:8081'

module.exports.saveMediumToDb = (req, res) => {
  const mediumObj = req.body.data.movie;
  const id_token = req.body.data.user;
  axios.post(`${url}/db/addMedium`, { mediumObj, id_token })
    .then(() => {
      const genre_ids = mediumObj.genre_id
      axios.post(`${url}/db/addGenre`, { genre_ids, id_token})
      .then(results => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      })
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports.getLastThreeMedia = (req, res) => {
  const id_token = req.body.data.id_token;
  axios
    .post('http://localhost:8081/db/getLastThreeMedia', { id_token })
      .then(data => {
        const url = formatUrl(data.data);
        axios
          .get(url)
            .then(response => {
              console.log('respose from LastThreeMedia', response);
              res.send(response.data);
            })
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
};

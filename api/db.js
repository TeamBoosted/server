const axios = require('axios');
const { formatUrl } = require('../helpers/helper.js');
const url = process.env.DB_URL || 'http://localhost:8081';

module.exports.saveMediumToDb = (req, res) => {
  const mediumObj = req.body.data.movie;
  const id_token = req.body.data.user;
  axios
    .post(`${url}/db/addMedium`, { mediumObj, id_token })
    .then(() => {
      const genre_ids = mediumObj.genre_id;
      axios
        .post(`${url}/db/addGenre`, { genre_ids, id_token })
        .then(results => {
          res.sendStatus(200);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports.getLastThreeMedia = (req, res) => {
  const id_token = req.body.data.id_token;
  axios
    .post("http://localhost:8081/db/getLastThreeMedia", { id_token })
    .then(data => {
      const url = formatUrl(data.data);
      axios.get(url).then(response => {
        console.log("respose from LastThreeMedia", response);
        res.send(response.data);
      });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports.getAllMedia = (req, res) => {
  const id_token = req.params.token_id;

  axios
    .get(`http://localhost:8081/db/getAllMedia/${id_token}`)
    .then(userMedias => {
      console.log("DB RESPONSE TO SERVER:************", userMedias);
      res.send(userMedias.data);
    })
    .catch(err => {
      console.log("i done messed up", err);
      res.sendStatus(500);
    });
};

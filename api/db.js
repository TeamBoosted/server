const axios = require('axios');

module.exports.saveMediumToDb = (req, res) => {
  let mediumObj = req.body.data.movie;
  let id_token = req.body.data.user;
  axios.post('http://localhost:8081/db/addMedium', { mediumObj, id_token })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports.getLastThreeMedia = (req, res) => {
  let id_token = req.body.data.user;
  console.log(id_token);
  axios.post('http://localhost:8081/db/getLastThreeMedia', { id_token })
    .then(data => {
      res.json(data.data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

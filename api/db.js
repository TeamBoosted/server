const axios = require('axios');

module.exports.saveMediumToDb = (req, res) => {
  let mediumObj = req.body.movie;
  let id_token = req.body.user;
  axios.post('http://localhost:8081/db/addMedium', { mediumObj, id_token })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

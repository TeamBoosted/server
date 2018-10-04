const axios = require('axios');

module.exports.saveMediumToDb = (req, res) => {
  let mediumObj = req.body;
  axios.post('http://localhost:8081/db/addMedium', mediumObj)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

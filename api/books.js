// const axios = require('axios');
// const api_key = process.env.BOOK_API_KEY;
// const { formatData, limitToFive } = require('../helpers/helper.js');
// const redis = require('redis');
// const bluebird = require('bluebird');
// bluebird.promisifyAll(redis);
// const client = redis.createClient({
//   port: process.env.REDIS_PORT,
//   host: process.env.REDIS_URL,
//   password: process.env.REDIS_PASS
// });


// module.exports.getBooksByTitle = (req, res) => {
//   const url = '`https://www.goodreads.com/search/index.xml';
//   const { query } = req.params;
//   const params = {
//     query,
//     api_key
//   };
//   client.getAsync(query)
//     .then(response => {
//       if(!response) {
//         axios
//         .get(url, { params })
//           .then(response => {
//             const data = response.data.results;
//             console.log('HERE IS BOOKS DATA:',data)
//             // const formatted = formatData(data, 'movie');
//             // client.set(query, JSON.stringify(formatted));
//             // res.send(formatted);
//           })
//       } else {
//         console.log('hello')
//         res.send(response);
//       }
//     })
//     .catch(console.log);
  
// }
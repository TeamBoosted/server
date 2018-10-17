const axios = require('axios');
const api_key = process.env.BOOK_API_KEY;
const { formatData, limitToN, formatBooks } = require('../helpers/helper.js');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);
const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_URL,
  password: process.env.REDIS_PASS
});
var parseString = require('xml2js').parseString;
const url = process.env.DB_URL || 'http://localhost:8081';


module.exports.getBooksByTitle = (req, res) => {
  let title = req.params.query
  axios
    .get(`https://www.goodreads.com/search/index.xml?key=${api_key}&q=${title}`)
    .then(data => {
      parseString(data.data, function (err, parsedData) {
        if (err) return console.log(err);
        arrayOfBooks = parsedData.GoodreadsResponse.search[0].results[0].work;
        const formatted = formatBooks(arrayOfBooks);
        const limitted = limitToN(formatted, 10);
        res.json(limitted);
      })
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
};

module.exports.getBookRecsByGenre = async (req, res) => {
  const { genre_id } = req.params;
  try {
    let bookData = await axios.get(`${url}/db/getBookRecsByGenre/${genre_id}`);
    const body = [];
    const random = (limit) => {
      return Math.floor(Math.random() * (limit));
    }
    const len = bookData.data.length;
    console.log('BookData -------------\n', bookData);
    body.push(bookData.data[random(len)]);
    body.push(bookData.data[random(len)]);
    res.send(body);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

// app.post('/books', function (req,res) {
//   let title = req.body.title
//   console.log('I AM IN POST REQUEST NOW')
//   const options = {
//     method: 'GET',
//     uri:`https://www.goodreads.com/search/index.xml?key=uSG8wKoxG3f65Jv5iClwA&q=${title}`


//   }

//   request(options, function (err,response,body){
//     if (err) {
//       console.log('SERVER-GOODREADS FAILED, HERE IS WHY: ',err)
//       return
//     } else {
//        var bod = parser.toJson(response.body)
//        let theBod = JSON.parse(bod)
//     if (theBod.GoodreadsResponse.search.results.work) {
//        console.log(theBod.GoodreadsResponse.search.results.work.length)


//       for (var i = 0; i < theBod.GoodreadsResponse.search.results.work.length; i++) {

//         let apiTitle = theBod.GoodreadsResponse.search.results.work[i].best_book.title
//         let apiAuthor = theBod.GoodreadsResponse.search.results.work[i].best_book.author.name
//         let infoLink = 'working on it'
//         let categories = 'also working on it'
//         let image = theBod.GoodreadsResponse.search.results.work[i].best_book.image_url
//         let rating = theBod.GoodreadsResponse.search.results.work[i].average_rating
//         let ratingsCount = theBod.GoodreadsResponse.search.results.work[i].ratings_count.$t
//         let publicationYear = theBod.GoodreadsResponse.search.results.work[i].original_publication_year.$t


//         insert(apiTitle, apiAuthor, infoLink, categories, image, rating, ratingsCount, publicationYear, function(err,data) {
//           if(err) {

//             console.log('DB-SERVER FAILED',err)
//             // res.status(500).send('DB SERVER FAILED',err)
//           } else {
//             console.log('DB-SERVER success! Here is data: ')
//             // res.status(200).send(data)
//           }
//         })
//       }
//       }
//     }
//   })
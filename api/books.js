const axios = require('axios');
const api_key = process.env.BOOK_API_KEY;
const { formatData, limitToFive } = require('../helpers/helper.js');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);
const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_URL,
  password: process.env.REDIS_PASS
});
var parser = require('xml2json');
const { formatBooks } = require('../helpers/helper.js');


module.exports.getBooksByTitle =  (req, res) => {
  console.log('here I am! in the getBooks request!',req.params)
  let title = req.params.query
  axios
    .get(`https://www.goodreads.com/search/index.xml?key=${api_key}&q=${title}`)
      .then(data => {

        let parsedData = parser.toJson(data.data)
        parsedData =  JSON.parse(parsedData)
        arrayOfBooks = parsedData.GoodreadsResponse.search.results.work
        console.log('------->',arrayOfBooks)

        const formatted = formatBooks(arrayOfBooks)
        res.send(formatted)
      })
      .catch(console.log)
}

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
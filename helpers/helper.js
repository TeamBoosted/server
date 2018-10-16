const limitToTwo = (array) => {
  const limitted = [];
  if (array.length <= 2) {
    return [...array];
  }
  for (let i = 0; i < 2; i++) {
    limitted.push(array[i]);
  }
  return limitted;
}

module.exports.formatData = (res, type) => {
  const formatted = [];
  res.map(i => {
    let theImage = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${i.poster_path}`
    return formatted.push({
      title: i.title || i.name,
      image:  theImage,
      synopsis: i.overview,
      moviedb_id: i.id,
      popularity: i.popularity,
      vote_avg: i.vote_average,
      vote_count: i.vote_count,
      genre_id: i.genre_ids,
      type
    })
  })
  const data = limitToTwo(formatted)
  return data;
}

module.exports.formatTV = (res, type) => {
  const formatted = [];
  res.map(i => {
    let theImage = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${i.poster_path}`
    return formatted.push({
      title: i.name,
      image: theImage,
      synopsis: i.overview,
      moviedb_id: i.id,
      popularity: i.popularity,
      vote_avg: i.vote_average,
      vote_count: i.vote_count,
      type
    })
  })
  const data = limitToTwo(formatted)
  return data;
}


module.exports.formatBooks = (res, type) => {
  const formatted = [];
  res.map(i => {
    return formatted.push({
      title: i.best_book[0].title[0],
      author: i.best_book[0].author[0].name[0],
      image: i.best_book[0].image_url[0],
      rating: i.average_rating[0],
      ratingsCount: i.ratings_count[0]._,
      publicationYear: i.original_publication_year[0]._,
      type: 'book'
    })
  })
  const data = limitToTwo(formatted)
  return data;
}

// let author = parsedData.GoodreadsResponse.search.results.work[i].best_book.author.name
//     let image = parsedData.GoodreadsResponse.search.results.work[i].best_book.image_url
//     let rating = parsedData.GoodreadsResponse.search.results.work[i].average_rating
//     let ratingsCount = parsedData.GoodreadsResponse.search.results.work[i].ratings_count.$t
//     let publicationYear = parsedData.GoodreadsResponse.search.results.work[i].original_publication_year.$t


module.exports.formatUrl = (arr) => {
  return `/api/rec/manyMovies/${arr[0].moviedb_id}&${arr[1].moviedb_id}&${arr[2].moviedb_id}`;
}

module.exports.formatBookData = (res, type) => {
  const formatted = [];
  res.map(i => {
    return formatted.push({
      title: i.title,
      image: i.poster_path,
      synopsis: i.overview,
      moviedb_id: i.id,
      popularity: i.popularity,
      vote_avg: i.vote_average,
      vote_count: i.vote_count,
      type
    })
  })
  const data = limitToTwo(formatted)
  return data;
}


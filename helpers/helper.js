const limitToFive = (array) => {
  const limitted = [];
  if (array.length < 5) {
    return [...array];
  }
  for (let i = 0; i < 5; i++) {
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
  const data = limitToFive(formatted)
  return data;
}

module.exports.formatTV = (res, type) => {
  const formatted = [];
  res.map(i => {
    let theImage = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${i.poster_path}`
    return formatted.push({
      title: i.name,
      image:  theImage,
      synopsis: i.overview,
      moviedb_id: i.id,
      popularity: i.popularity,
      vote_avg: i.vote_average,
      vote_count: i.vote_count,
      type
    })
  })
  const data = limitToFive(formatted)
  return data;
}


module.exports.formatBooks = (res, type) => {
  const formatted = [];
  res.map(i => {
    return formatted.push({
      title: i.best_book.title,
      author: 'null',
      image: i.best_book.image_url,
      rating: i.average_rating,
      ratingsCount: i.ratings_count.$t,
      publicationYear: i.original_publication_year.$t,
      type: 'book'
    })
  })
  const data = limitToFive(formatted)
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
  const data = limitToFive(formatted)
  return data;
}


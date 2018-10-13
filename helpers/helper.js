module.exports.formatData = (res, type) => {
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
  return formatted;
}

module.exports.limitToFive = (array) => {
  const limitted = [];
  if (array.length < 5) {
    return [...array];
  }
  for (let i = 0; i < 5; i++) {
    limitted.push(array[i]);
  }
  return limitted;
}

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
  return formatted;
}
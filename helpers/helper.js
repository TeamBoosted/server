module.exports.formatData = (res, type) => {
  const formatted = [];
  res.map(i => {
    return formatted.push({
      title: i.title,
      type,
      image: i.poster_path,
      synopsis: i.overview,
      moviedb_id: i.id,
      popularity: i.popularity,
      vote_avg: i.vote_average,
      vote_count: i.vote_count
    })
  })
  return formatted;
} 
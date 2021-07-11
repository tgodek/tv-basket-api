const Movie = require("../models/Movie");

module.exports.new_movie_post = async (req, res) => {
  try {
    const movie = new Movie({
      title: req.body.title,
      description: req.body.description,
      releaseDate: req.body.releaseDate,
      poster: req.body.poster,
    });

    const newMovie = await movie.save();
    res.json(newMovie);
  } catch (e) {
    res.send(e);
  }
};

module.exports.all_movies_get = async (_, res) => {
  try {
    const allMovies = await Movie.find();
    res.json(allMovies);
  } catch (e) {
    res.send(e);
  }
};

module.exports.popular_movie_get = async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.json(allMovies);
  } catch (e) {
    res.send(e);
  }
};

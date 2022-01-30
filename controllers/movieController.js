require("dotenv").config();
const User = require("../models/User");
const MovieDB = require("node-themoviedb");
const movieHelper = require("../helper/movieHelper");

const mdb = new MovieDB(process.env.API_KEY)

module.exports.discover_movies_get = async (req, res) => {
  try {
    const args = {
      query: {
        page: req.query.page,
      }
    };
    const discoverMovies = await mdb.discover.movie(args);
    res.json(discoverMovies);
  } catch (e) {
    res.send(e);
  }
};

module.exports.top_movies_get = async (req, res) => {
  try {
    const args = {
      query: {
        page: req.query.page,
      },
    };
    const popularMovies = await mdb.movie.getTopRated(args);
    res.json(popularMovies);
  } catch (e) {
    res.send(e);
  }
};

module.exports.popular_movies_get = async (req, res) => {
  try {
    const args = {
      query: {
        page: req.query.page,
      },
    };
    const popularMovies = await mdb.movie.getPopular(args);
    res.json(popularMovies);
  } catch (e) {
    res.send(e);
  }
};

module.exports.movie_info = async (req, res) => {
  try {
    const args = {
      pathParameters: {
        movie_id: req.query.id,
      }
    };
    const discoverMovies = await mdb.movie.getDetails(args);
    res.json(discoverMovies);
  } catch (e) {
    res.send(e);
  }
};

module.exports.movie_add_to_watchlist = async (req, res) => {
  try {
    const loggedInUser = req.body.userId;
    const movie = req.body.movieId;

    const result = await movieHelper.check_if_movie_exists(loggedInUser, movie, 1);

    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

module.exports.movie_add_to_tracked = async (req, res) => {
  try {
    const loggedInUser = req.body.userId;
    const movie = req.body.movieId;

    const result = await movieHelper.check_if_movie_exists(loggedInUser, movie, 2);

    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

module.exports.movie_remove_from_watchlist = async (req, res) => {
  try {
    const loggedInUser = req.body.userId;
    const movie = req.body.movieId;

    const result = await movieHelper.check_if_movie_exists(loggedInUser, movie, 3);

    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

module.exports.movie_remove_from_tracked = async (req, res) => {
  try {
    const loggedInUser = req.body.userId;
    const movie = req.body.movieId;

    const result = await movieHelper.check_if_movie_exists(loggedInUser, movie, 4);

    res.send(result);
  } catch (e) {
    res.send(e);
  }
};
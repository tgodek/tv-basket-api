//const Movie = require("../models/Movie");

require("dotenv").config();
const MovieDB = require("node-themoviedb");

const mdb = new MovieDB(process.env.API_KEY)

module.exports.top_movies_post = async (req, res) => {
  try {
    const args = {
      query: {
        page: req.body.page, //getting page body value from POST method, TMDB has it's own pagination which passes through our backend
        limit: 5,
      },
    };
    const popularMovies = await mdb.movie.getTopRated(args);
    res.json(popularMovies);
  } catch (e) {
    res.send(e);
  }
};

module.exports.popular_movies_post = async (req, res) => {
  try {
    const args = {
      query: {
        page: req.body.page,
      },
    };
    const popularMovies = await mdb.movie.getPopular(args);
    res.json(popularMovies);
  } catch (e) {
    res.send(e);
  }
};

module.exports.discover_movies_post = async(req, res) => {
  try {
    const args = {
      query: {
        page: req.body.page,
      }
    };
    const discoverMovies = await mdb.discover.movie(args);
    res.json(discoverMovies);
  } catch (e) {
    res.send(e);
  }
};


//this function is probably no more needed since with this version
//we started using TMDb API
//this function used to creat/add new movies to our movie database
//since adding movies/shows is really tedious job
/*module.exports.new_movie_post = async (req, res) => {
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
};*/
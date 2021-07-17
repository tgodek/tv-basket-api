require("dotenv").config();
const Movie = require("../models/Movie");
const User = require("../models/User");
const userController = require("../controllers/userController");
const MovieDB = require("node-themoviedb");

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

module.exports.movie_search = async (req, res) => {
  try {
    const args = {
      query: {
        query: req.query.query,
        page: req.query.page,
      }
    };
    const discoverMovies = await mdb.search.movies(args);
    res.json(discoverMovies);
  } catch (e) {
    res.send(e);
  }
};

module.exports.movie_add_to_watchlist = async (req, res) => {
  try {
    var loggedIn = await User.find({ _id: req.body.user});
    var movie = req.body.movie;

  } catch (e) {
    res.send(e);
  }
};

module.exports.movie_add_to_tracked = async (req, res) => {
  try {
    const me = await User.findOne({ _id: req.body.userId });
    const movie = req.body.movieId;

    //TODO check if movie is already in the list
    me.trackedMovies.push(movie);
    me.save(function (err, result) {
      if(err) res.send(err);
      else res.send("Movie marked as watched!");
    });
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
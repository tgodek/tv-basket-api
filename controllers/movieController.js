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
    const operation = 1;

    movieHelper.check_if_movie_exists(loggedInUser, movie, operation);
    //const me = await User.findOne({ _id: req.body.userId });
    //const movieWatchlist = loggedInUser.watchlistMovies;

    /*if(!movieWatchlist.includes(movie)) {
      loggedInUser.watchlistMovies.push(movie);
      loggedInUser.save(function (err) {
        if(err) res.send(err);
        else res.status(201).send("Movie added to watchlist!");
     });
    } else {
      res.status(400).send("Movie already added to watchlist!")
    }*/
  } catch (e) {
    res.send(e);
  }
};

module.exports.movie_add_to_tracked = async (req, res) => {
  try {
    const me = await User.findOne({ _id: req.body.userId });
    const movie = req.body.movieId;
    const trackedMovieList = me.trackedMovies;

    //need also make that watchlist and tracked movies are 2 exclusive list
    //this means that the same movie cannot be in both lists at the same time
    /***********************************************************************/
    //we can make something like, if a user wants to add a movie to watchlist
    //and the movie is in movies tracked list, remove it from that, and add it to
    //watchlist, same for opposite case
    /***********************************************************************/
    //this can also be applied to the function that starts on line 80
    if(!trackedMovieList.includes(movie)) {
      me.trackedMovies.push(movie);
      me.save(function (err) {
        if(err) res.send(err);
        else res.status(201).send("Movie marked as watched!");
      });
    } else {
      res.status(400).send("Movie already marked as watched!")
    }
  } catch (e) {
    res.send(e);
  }
};

module.exports.movie_remove_from_watchlist = async (req, res) => {
  try {
    const me = await User.findOne({ _id: req.body.userId });
    const movie = req.body.movieId;
    const movieWatchlist = me.watchlistMovies;

    if(movieWatchlist.includes(movie)) {
      me.watchlistMovies.pull(movie);
      me.save(function (err) {
        if(err) res.send(err);
        else res.status(201).send("Movie removed from watchlist!");
      });
    } else {
      res.status(400).send("Movie isn't in watchlist yet!")
    }

  } catch (e) {
    res.send(e);
  }
};

module.exports.movie_remove_from_tracked = async (req, res) => {
  try {
    const me = await User.findOne({ _id: req.body.userId });
    const movie = req.body.movieId;
    const trackedMovieList = me.trackedMovies;

    if(trackedMovieList.includes(movie)) {
      me.trackedMovies.pull(movie);
      me.save(function (err) {
        if(err) res.send(err);
        else res.status(201).send("Movie removed from watched list!");
      });
    } else {
      res.status(400).send("Movie isn't marked as watched yet!")
    }

  } catch (e) {
    res.send(e);
  }
};
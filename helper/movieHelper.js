const User = require("../models/User");

module.exports.check_if_movie_exists = async (userId, movie, operation) => {
    const loggedInUser = await User.findById({_id: userId});
    const movieWatchlist = loggedInUser.watchlistMovies;
    const movieTrackedlist = loggedInUser.trackedMovies;
    let returnString = "";

    //1 == add to watchlist
    //2 == add to tracked list
    //3 == remove from watchlist
    //4 == remove from tracked list
    /////////////////////////////////////////////////
    //probably replace the ugly code and spread it through
    //multiple functions, e.g. every case has it's own function
    switch(operation) {
        case 1:
            if(!movieWatchlist.includes(movie)){
                if(!movieTrackedlist.includes(movie)) {
                    loggedInUser.watchlistMovies.push(movie);
                    loggedInUser.save();
                    returnString = "Movie added to watchlist";
                } else {
                    returnString = "Movie is already in another list";
                }
            } else {
                returnString = "Movie is already in watchlist";
            }
            break;
        case 2:
            if(!movieTrackedlist.includes(movie)){
                if(!movieWatchlist.includes(movie)) {
                    loggedInUser.trackedMovies.push(movie);
                    loggedInUser.save();
                    returnString = "Movie added as watched";
                } else {
                    returnString = "Movie is already in another list";
                }
            } else {
                returnString = "Movie is already marked as watched";
            }
            break;
        case 3:
            if(movieWatchlist.includes(movie)) {
                loggedInUser.watchlistMovies.pull(movie);
                loggedInUser.save();
                returnString = "Movie removed from watchlist!";
            } else {
                returnString = "Movie is not in the watchlist yet!";
            }
            break;
        case 4:
            if(movieTrackedlist.includes(movie)) {
                loggedInUser.trackedMovies.pull(movie);
                loggedInUser.save();
                returnString = "Movie removed from watched!";
            } else {
                returnString = "Movie is not marked as watched yet!";
            }
            break;
        default:
            returnString = "Something went wrong!";
    }

    return returnString;
};
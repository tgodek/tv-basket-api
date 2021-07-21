const User = require("../models/User");

module.exports.check_if_movie_exists = async (userId, movie, operation) => {
    const loggedInUser = await User.findById({_id: userId});
    const movieWatchlist = loggedInUser.watchlistMovies;
    const movieTrackedlist = loggedInUser.trackedMovies;

    //1 == add to watchlist
    //2 == add to tracked list
    //3 == remove from watchlist
    //4 == remove from tracked list   
    ////////////////////////////////////
    //replace console.log with return so we 
    //can return the result (res) when we call this function
    /////////////////////////////////////////////////
    //probably replace the ugly code and spread it through
    //multiple functions, e.g. every case has it's own function
    switch(operation) {
        case 1:
            if(!movieWatchlist.includes(movie)){
                if(!movieTrackedlist.includes(movie)) {
                    loggedInUser.watchlistMovies.push(movie);
                    loggedInUser.save();
                    console.log("Movie added to watchlist");
                } else {
                    console.log("Movie is already in another list");
                }
            } else {
                console.log("Movie is already in watchlist");
            }
            break;
        case 2:
            if(!movieTrackedlist.includes(movie)){
                if(!movieWatchlist.includes(movie)) {
                    loggedInUser.trackedMovies.push(movie);
                    loggedInUser.save();
                    console.log("Movie added as watched");
                } else {
                    console.log("Movie is already in another list");
                }
            } else {
                console.log("Movie is already marked as watched");
            }
            break;
        case 3:
            if(movieWatchlist.includes(movie)) {
                loggedInUser.watchlistMovies.pull(movie);
                loggedInUser.save();
            } else {
                console.log("Movie is not in the watchlist yet!")
            }
            break;
        case 4:
            if(movieTrackedlist.includes(movie)) {
                loggedInUser.trackedMovies.pull(movie);
                loggedInUser.save();
            } else {
                console.log("Movie is not marked as watched yet!")
            }
            break;
        default:
            console.log("Something went wrong!");
    }
};
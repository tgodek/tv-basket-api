const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    trackedMovies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    trackedShows: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Show'
        }
    ],
    trackedEpisodes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Episode'
        }
    ],
});

module.exports = mongoose.model('User', userSchema);
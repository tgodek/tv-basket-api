const mongoose = require('mongoose');

const showSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genres: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre'
        }
    ],
    description: {
        type: String
    },
    seasons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Season'
        }
    ],
    poster: {
        type: String
    },
    actors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        }
    ],
    producers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        }
    ],
    creators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        }
    ],
    network: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Network'
    },
    popularity: {
        type: Number,
        default: 0
    },
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rating'
        }
    ],
    budget: {
        type: Decimal128
    }
});

module.exports = mongoose.model('Show', showSchema);
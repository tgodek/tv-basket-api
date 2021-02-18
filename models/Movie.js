const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
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
    releaseDate: {
        type: Date,
        required: true
    },
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
    directors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        }
    ],
    writers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        }
    ],
    productionCos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductionCo'
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

module.exports = mongoose.model('Movie', movieSchema);
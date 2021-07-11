const mongoose = require('mongoose');

const episodeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Episode', episodeSchema);
const mongoose = require('mongoose');

const seasonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    episodes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Episode'
        }
    ]
});

module.exports = mongoose.model('Season', seasonSchema);
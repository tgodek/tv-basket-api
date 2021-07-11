const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    grade: {
        type: Decimal128,
        required: true
    }
});

module.exports = mongoose.model('Rating', ratingSchema);
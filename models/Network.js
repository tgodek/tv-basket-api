const mongoose = require('mongoose');

const networkSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Network', networkSchema);
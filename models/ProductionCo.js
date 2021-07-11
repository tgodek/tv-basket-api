const mongoose = require('mongoose');

const productionCoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('ProductionCo', productionCoSchema);
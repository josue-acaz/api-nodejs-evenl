'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Amenitie', schema);
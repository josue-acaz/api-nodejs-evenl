'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Review', schema);
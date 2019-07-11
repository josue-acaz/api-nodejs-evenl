'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    code:{
        type: String,
        required: true
    },
    bookedDate: {
        type: Date,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    totalPaid: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Booking', schema);
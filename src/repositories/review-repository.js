'use strict'

const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.get = async() => {
    const res = await Review.find({
            available: true
    }, 'rating description');
    return res;
}

exports.getById = async(id) => {
    const res = await Review
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var Review = new Review(data);
    await Review.save()
}

exports.update = async(id, data) => {
    await Review.findByIdAndUpdate(id, {
        $set: {
            rating: data.rating,
            description: data.description
        }
    });
}

exports.delete = async(id) => {
    await Review.findOneAndRemove(id);
}
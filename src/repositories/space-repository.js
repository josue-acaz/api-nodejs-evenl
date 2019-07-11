'use strict'

const mongoose = require('mongoose');
const Space = mongoose.model('Space');

exports.get = async() => {
    const res = await Space.find({
            available: true
    }, 'name price slug');
    return res;
}

exports.getBySlug = async(slug) => {
    const res = await Space
        .findOne({
            slug: slug,
            available: true
        }, 'name description price slug tags');
    return res;
}

exports.getById = async(id) => {
    const res = await Space
        .findById(id);
    return res;
}


exports.getByTag = async(tag) => {
    const res = await Space
        .find({
            tags: tag,
            available: true
        }, 'name description price slug tags');
    return res;
}

exports.create = async(data) => {
    var space = new Space(data);
    await space.save()
}

exports.update = async(id, data) => {
    await Space.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
}

exports.delete = async(id) => {
    await Space.findOneAndRemove(id);
}
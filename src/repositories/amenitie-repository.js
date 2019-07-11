'use strict'

const mongoose = require('mongoose');
const Amenitie = mongoose.model('Amenitie');

exports.get = async() => {
    const res = await Amenitie.find({
            available: true
    }, 'description');
    return res;
}

exports.getById = async(id) => {
    const res = await Amenitie
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var Amenitie = new Amenitie(data);
    await Amenitie.save()
}

exports.update = async(id, data) => {
    await Amenitie.findByIdAndUpdate(id, {
        $set: {
            description: data.description
        }
    });
}

exports.delete = async(id) => {
    await Amenitie.findOneAndRemove(id);
}
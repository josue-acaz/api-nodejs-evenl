'use strict'

const mongoose = require('mongoose');
const Owner = mongoose.model('Owner');

exports.create = async(data) => {
    var owner = new Owner(data);
    await owner.save();
}

exports.authenticate = async(data) => {
    const res = await Owner.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async(id) => {
    const res = await Owner.findById(id);
    return res;
}

'use strict'

const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');

exports.get = async() => {
    const res = await Booking.find({
            available: true
    }, 'code checkIn checkOut totalPaid');
    return res;
}

exports.getByCode = async(code) => {
    const res = await Booking
        .findOne({
            code: code,
            status: true
        }, 'code checkIn checkOut totalPaid status');
    return res;
}

exports.getById = async(id) => {
    const res = await Booking
        .findById(id);
    return res;
}

exports.create = async(data) => {
    var Booking = new Booking(data);
    await Booking.save()
}

exports.update = async(id, data) => {
    await Booking.findByIdAndUpdate(id, {
        $set: {
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            totalPaid: data.totalPaid,
            status: data.status
        }
    });
}

exports.delete = async(id) => {
    await Booking.findOneAndRemove(id);
}
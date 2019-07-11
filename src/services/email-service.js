'use strict'

var config = require('../config');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.sendgridKey);

exports.send = async(to, subject, body) => {
    sgMail.send({
        to: to,
        from: 'admin@evenl.io',
        subject: subject,
        text: 'and easy to do anywhere, even with Node.js',
        html: body
    });
}
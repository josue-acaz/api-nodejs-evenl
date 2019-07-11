'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const router = express.Router();

// Conecta ao banco de dados
mongoose.connect(config.connectionString);

// Carrega os Models
const Space = require('./models/space');
const Owner = require('./models/owner');
const Customer = require('./models/customer');
const Booking = require('./models/booking');
const Amenitie = require('./models/amenitie');
const Review = require('./models/review');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const spaceRoute = require('./routes/space-route');
const ownerRoute = require('./routes/owner-route');
const customerRoute = require('./routes/customer-route');
const bookingRoute = require('./routes/booking-route');
const amenitieRoute = require('./routes/amenitie-route');
const reviewRoute = require('./routes/review-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*'); // Tem acesso a partir de qualquer URL
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/spaces', spaceRoute); // ESPAÇOS
app.use('/owners', ownerRoute);  // PROPRIETÁRIOS
app.use('/customers', customerRoute); // CLIENTES
app.use('/bookings', bookingRoute); // RESERVAS
app.use('/amenities', amenitieRoute); // FACILIDADES
app.use('/reviews', reviewRoute); // CLASSIFICAÇÕES

module.exports = app;

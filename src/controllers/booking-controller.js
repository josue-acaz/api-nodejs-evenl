'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/booking-repository');
var config = require('../config');

exports.get = async(req, res, next) => {
    try{
        var data = await repository.get();
        console.log(data);
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByCode = async(req, res, next) => {
    try{
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async(req, res, next) => {
    try{
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.code, 5, 'O nome deve conter no mínimo 5 caracteres');

    // Verifica se os dados são válidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        // CREATE --> ./models/booking.js
        await repository.create({
            code: req.body.code, // DEVE SER GERADO RANDOMICAMENTE (Código da reserva)
            bookedDate: req.body.bookedDate,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            totalPaid: req.body.totalPaid,
            status: true
        });

        
        res.status(201).send({ // VER QUESTÕES DE PAGAMENTO
            message: 'Reserva efetuada com sucesso!'
        });
    } catch(e){
        console.log(e); // DEBUG
        res.status(500).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};

exports.put = async(req, res, next) => {
    try{
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Reserva atualizada com sucesso!'
        });
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Reserva deletada com sucesso!'
        });
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
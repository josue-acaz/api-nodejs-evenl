'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/review-repository');
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
    contract.hasMinLen(req.body.description, 10, 'O nome deve conter no mínimo 10 caracteres');

    // Verifica se os dados são válidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        // CREATE --> ./models/review.js
        await repository.create({
            rating: req.body.rating,
            description: req.body.description
        });

        
        res.status(201).send({ // VER QUESTÕES DE PAGAMENTO
            message: 'Classificação adicionada com sucesso!'
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
            message: 'Classificação atualizada com sucesso!'
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
            message: 'Classificação excluida com sucesso!'
        });
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
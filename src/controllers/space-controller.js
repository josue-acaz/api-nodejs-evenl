'use strict'

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/space-repository');
const azure = require('azure-storage');
const guid = require('guid');
var config = require('../config');
const authService = require('../services/auth-service'); // ACHO QUE NÃO É NECESSÁRIO

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

exports.getBySlug = async(req, res, next) => {
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

exports.getByTag = async(req, res, next) => {
    try{
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter no mínimo 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'Slug conter no mínimo 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter no mínimo 3 caracteres');

    // Verifica se os dados são válidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        // Cria o Blob Service
        const blobSvc = azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        // Salva a imagem
        await blobSvc.createAppendBlobFromText('product-images', filename, buffer, {
             contentType: type
        }, function (error, result, response){
             if(error){
                 filename = 'default-product.png' // Alterar nome do espaço
             }
        });

        // CREATE --> ./models/space.js
        await repository.create({
            name: req.body.name,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            available: true,
            tags: req.body.tags,
            image: 'https://evenlstore.blob.core.windows.net/product-images/' + filename
        });

        
        res.status(201).send({
            message: 'Espaço cadastrado com sucesso!'
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
            message: 'Espaço atualizado com sucesso!'
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
            message: 'Espaço removido com sucesso!'
        });
    } catch(e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
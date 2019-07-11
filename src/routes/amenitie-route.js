'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/amenitie-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/admin/:id', controller.getById);

// Só poderá criar, editar e deletar um produto quem for administrador
// Quem estiver logado no sistema
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/:id', authService.isAdmin, controller.delete);

module.exports = router;

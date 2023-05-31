const express = require('express');
const MUrouter = express.Router();
const moduloUController = require('../../controllers/modulo.usuario.controller');
const usuarioController = require('../../controllers/usuario.controller');

MUrouter
    .get('/', moduloUController.getAllModules)

    .get('/:id_usuario', moduloUController.getModuleUser)

    .get('/modulos/:id_usuario', moduloUController.getViewModules);
/*
    .post('/:idUsuario', usuarioController.saveUser)

    .patch('/:idUsuario', usuarioController.updateUser)

    .patch('/:idUsuario', usuarioController.inactivateUser)

    .post('/:login', authController.login);

*/

module.exports = MUrouter;
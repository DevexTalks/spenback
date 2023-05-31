const express = require('express');
const commonRouter = express.Router();
const commonController = require('../../controllers/common.controller');

commonRouter
    .get('/', commonController.getCargaMasiva)

    .get('/:id_tipo', commonController.getLookupByType)
    
    .get('/preliquidation/:ID', commonController.getPreliquidation);
/*
    .get('/:id_usuario', moduloUController.getModuleUser)

    .get('/modulos/:id_usuario', moduloUController.getViewModules);

    .post('/:idUsuario', usuarioController.saveUser)

    .patch('/:idUsuario', usuarioController.updateUser)

    .patch('/:idUsuario', usuarioController.inactivateUser)

    .post('/:login', authController.login);

*/

module.exports = commonRouter;
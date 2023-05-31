const express = require('express');
const AUrouter = express.Router();
const adminUController = require('../../controllers/admin.usuario.controller');

AUrouter
    .get('/', adminUController.getAllUsers)

    .post('/create', adminUController.createUser)
    
    .post('/disable', adminUController.disableUser)
    
    .put('/update/:id_usuario', adminUController.updateUser)

    .put('/update_preliquidation',adminUController.updatePreliquidation);
/*
    .get('/:id_usuario', moduloUController.getModuleUser)

    .get('/modulos/:id_usuario', moduloUController.getViewModules);

    .post('/:idUsuario', usuarioController.saveUser)

    .patch('/:idUsuario', usuarioController.updateUser)

    .patch('/:idUsuario', usuarioController.inactivateUser)

    .post('/:login', authController.login);

*/

module.exports = AUrouter;
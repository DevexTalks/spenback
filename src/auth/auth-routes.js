const express = require('express');
const authRouter = express.Router();
const authController = require('./auth.controller');

authRouter
    .get('/', authController.getAllLogins)

    .post('/login', authController.login)

    .get('/:id_usuario', authController.getPerfilByUsuario)

    .post('/saveLog', authController.saveLogin)

    .post('/logout', authController.saveLogout);
/*
    .get('/', moduloUController.getAllModules)

    .get('/:id_usuario', moduloUController.getModuleUser)

    .get('/modulos/:id_usuario', moduloUController.getViewModules);

    .post('/:idUsuario', usuarioController.saveUser)

    .patch('/:idUsuario', usuarioController.updateUser)

    .patch('/:idUsuario', usuarioController.inactivateUser)

    .post('/:login', authController.login);

*/

module.exports = authRouter;
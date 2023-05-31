const express = require('express');
const router = express.Router();
const usuarioController = require('../../controllers/usuario.controller');
const authController = require('../../auth/auth.controller');

router
    .get('/', usuarioController.getAllUsers)

    .get('/:id_usuario', usuarioController.getUser)
/*
    .post('/:idUsuario', usuarioController.saveUser)

    .patch('/:idUsuario', usuarioController.updateUser)

    .patch('/:idUsuario', usuarioController.inactivateUser)

    .post('/:login', authController.login);

*/

module.exports = router;
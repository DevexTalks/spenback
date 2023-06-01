const express = require('express');
const AUrouter = express.Router();
const adminUController = require('../../controllers/admin.usuario.controller');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene todos los usuarios registrados en el sistema, excluyendo el usuario "admin.neps". Los usuarios se ordenan por fecha de creación descendente.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       409:
 *         description: Error en la consulta de la base de datos
 *     tags:
 *       - Usuarios
 */
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
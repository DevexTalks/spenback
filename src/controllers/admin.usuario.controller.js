const express = require("express");
let date = new Date();

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
const getAllUsers = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(409).send({ message: "Something is wrong" });
    conn.query(
      "select * from neps_op_usuario where id_usuario != 'admin.neps' order by srio_fecha_creacion desc",
      (err, rows) => {
        if (err) return res.status(409).send({ message: `${err}` });
        res.json(rows);
      }
    );
  });
};

/**
 * @swagger
 * /api/v1/admin-usuario/create:
 *   post:
 *     summary: Crea un nuevo usuario administrativo.
 *     tags: [Admin Usuario]
 *     requestBody:
 *       description: Datos del usuario a crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: string
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               tipoDoc:
 *                 type: string
 *               doc:
 *                 type: string
 *               celular:
 *                 type: string
 *               password:
 *                 type: string
 *               perfil:
 *                 type: string
 *             example:
 *               idUsuario: "admin123"
 *               nombre: "John Doe"
 *               email: "johndoe@example.com"
 *               tipoDoc: "Cédula"
 *               doc: "123456789"
 *               celular: "1234567890"
 *               password: "password123"
 *               perfil: "Administrador"
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente.
 *       409:
 *         description: Error al crear el usuario.
 */
const createUser = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(409).send({ message: "Something is wrong" });
    conn.query(
      "insert into neps_op_usuario (id_usuario, srio_nombre, srio_correo, srio_tipo_doc, srio_numero_doc, srio_numero_tel, srio_password, srio_perfil, srio_estado, srio_fecha_creacion) values (?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.idUsuario,
        req.body.nombre,
        req.body.email,
        req.body.tipoDoc,
        req.body.doc,
        req.body.celular,
        req.body.password,
        req.body.perfil,
        "ACTIVO",
        date,
      ],
      (err, rows) => {
        if (err) return res.status(409).send({ message: `${err}` });
        return res.json(rows);
      }
    );
  });
};

const updateUser = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(409).send({ message: "Something is wrong" });
    conn.query(
      "update neps_op_usuario set ? where id_usuario = ?",
      [req.body, req.params.id_usuario],
      (err, rows) => {
        if (err) return res.status(409).send({ message: `${err}` });
        return res.json(rows);
      }
    );
  });
};

const disableUser = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(409).send({ message: "Something is wrong" });
    conn.query(
      "update neps_op_usuario set srio_estado = ? where id_usuario = ?",
      [req.body.estado, req.body.id_usuario],
      (err, rows) => {
        if (err) return res.status(409).send({ message: `${err}` });
        return res.json(rows);
      }
    );
  });
};

const getModuleUser = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(409).send({ message: "Something is wrong" });
    conn.query(
      "select * from neps_rel_modulo_usuario where id_usuario = ?",
      [req.params.id_usuario],
      (err, rows) => {
        if (err) return res.status(409).send({ message: `${err}` });
        res.json(rows);
      }
    );
  });
};
const getViewModules = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(409).send({ message: "Something is wrong" });
    conn.query(
      `select v.* from neps_rel_modulo_usuario u 
       inner join neps_op_vista_modulos v on u.mdlo_codigo = v.id_modulo
       where u.id_usuario = ?`,
      [req.params.id_usuario],
      (err, rows) => {
        if (err) return res.status(409).send({ message: `${err}` });
        res.json(rows);
      }
    );
  });
};

const saveUser = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(409).send({ message: "Something is wrong" });

    conn.query("");
  });
};
const inactivateUser = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(409).send({ message: "Something is wrong" });

    conn.query("");
  });
};
const updatePreliquidation = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(409).send({ message: "Something is wrong" });

    const { ID } = req.body;
    const newStatus = "CARGA"; // Nuevo valor para la columna status

    conn.query(
      "UPDATE neps_op_preliquidacion SET status = ? WHERE id_usuario = ?",
      [newStatus, ID],
      (err, result) => {
        if (err) return res.status(409).send({ message: `${err}` });
        return res.json(result);
      }
    );
  });
};

module.exports = {
  getAllUsers,
  createUser,
  disableUser,
  getViewModules,
  inactivateUser,
  updateUser,
  updatePreliquidation,
};

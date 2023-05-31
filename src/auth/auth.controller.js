const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisefy } = require('util');
var perfilResult;
const SECRET_KEY = 'secretkey123456';
const date = new Date();
const nodemailer = require('nodemailer');


const sendRecovery = (req, res) => {

  req.getConnection((err, conn) => {
    if (err) return res.status(409).send({ message: 'Something is wrong' });
    conn.query('update neps_op_usuario set srio_password = ? where srio_correo = ?',
      ['TUp1N@JB', req.body.email], (err, rows) => {
        if (err) return res.status(409).send({ message: `${err}` });
        const message = {
          from: "cristian.garcia@pearsolutions.com.co",
          to: req.body.email,
          subject: "Recuperemos tu Cuenta",
          text: "",
          html: "Ingresa "
        }
      })
  })
 
}

const getAllLogins = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.status(409).send({ message: 'Something is wrong' });

    conn.query('select u.id_usuario as id_usuario, u.srio_numero_doc as numero_doc, l.lgin_fecha_ingreso as fecha_ingreso, u.srio_perfil as perfil, l.lgin_accion as accion from neps_op_login l inner join neps_op_usuario u on u.id_usuario = l.id_usuario', (err, rows) => {
      if (err) return res.status(409).send({ message: `${err}` });
      res.json(rows);
    });
  })
}

const login = (req, res) => {
  req.getConnection((err, conn) => {
    console.log(req.body);
    if (err) return res.status(409).send({ message: 'Something is wrong' });
    conn.query('select * from neps_op_usuario where id_usuario = ? and srio_password = ? and srio_estado = ?', [req.body.id_usuario, req.body.password, 'ACTIVO'], (err, rows) => {
      if (err) return res.status(409).send({ message: `${err}` });
      if (rows <= 0) {
        return res.status(409).send({
          message: 'Usuario o contraseña incorrectos'
        });
      }
      res.json(rows);
    })
  })
};

const saveLogin = (req, res) => {
  req.getConnection((err, conn) => {
    console.log(req.body[0].id_usuario);
    conn.query('insert into neps_op_login (id_usuario, lgin_fecha_ingreso, lgin_perfil, lgin_accion) values (?,?,?,?)', [req.body[0].id_usuario, date, req.body[0].srio_perfil, 'INGRESO'], (err, rows) => {
      if (err) return res.status(409).send({ message: `${err}` });
    });
  })
};

const saveLogout = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('insert into neps_op_login (id_usuario, lgin_fecha_ingreso, lgin_perfil, lgin_accion) values (?,?,?,?)', [req.body.id_usuario, date, req.body.perfil, 'SALIDA'], (err, rows) => {
      if (err) return res.status(409).send({ message: `${err}` });
    });
  })
};

const getPerfilByUsuario = (req, res) => {
  req.getConnection((err, conn) => {
    console.log(req.body.id_usuario);
    conn.query('select srio_perfil from neps_op_usuario where id_usuario = ?', [req.body.id_usuario], (err, rows) => {
      if (err) return res.status(409).send({ message: `${err}` });
      if (rows <= 0) {
        return res.status(409).send({
          message: 'Usuario o contraseña incorrectos'
        });
      }
      res.json(rows);
    })
  })
};

module.exports = {
  login,
  saveLogin,
  getPerfilByUsuario,
  saveLogout,
  getAllLogins
};









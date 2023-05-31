const express = require('express');

const getAllModules = (req, res) => {
    req.getConnection((err, conn) => {
       if(err) return res.status(409).send({ message: 'Something is wrong' });
       
       conn.query('select * from neps_rel_modulo_usuario', (err, rows) => {
        if(err) return res.status(409).send({ message: `${err}` });
        res.json(rows);
       });
    })
} 
const getModuleUser = (req, res) => {
    req.getConnection((err, conn) => {
       if(err) return res.status(409).send({ message: 'Something is wrong' });
       conn.query('select * from neps_rel_modulo_usuario where id_usuario = ?',[req.params.id_usuario], (err, rows) => {
        if(err) return res.status(409).send({ message: `${err}` });
        res.json(rows);
       } );
    })
}
const getViewModules = (req, res) => {
    req.getConnection((err, conn) => {
       if(err) return res.status(409).send({ message: 'Something is wrong' });
       conn.query(`select v.* from neps_rel_modulo_usuario u 
       inner join neps_op_vista_modulos v on u.mdlo_codigo = v.id_modulo
       where u.id_usuario = ?`,[req.params.id_usuario], (err, rows) => {
        if(err) return res.status(409).send({ message: `${err}` });
        res.json(rows);
       } );
    })
}

const saveUser = (req, res) => {
    req.getConnection((err, conn) => {
       if(err) return res.status(409).send({ message: 'Something is wrong' });
       
       conn.query('');
    })
}
const inactivateUser = (req, res) => {
    req.getConnection((err, conn) => {
       if(err) return res.status(409).send({ message: 'Something is wrong' });
       
       conn.query('');
    })
}
const updateUser = (req, res) => {
    req.getConnection((err, conn) => {
       if(err) return res.status(409).send({ message: 'Something is wrong' });
       
       conn.query('');
    })
}
    
module.exports = {
    getAllModules,
    getModuleUser,
    getViewModules,
    inactivateUser,
    updateUser
};
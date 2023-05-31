const express = require('express');

const getAllUsers = (req, res) => {
    req.getConnection((err, conn) => {
       if(err) return res.status(409).send({ message: 'Something is wrong' });
       
       conn.query('select * from neps_op_usuario', (err, rows) => {
        if(err) return res.status(409).send({ message: `${err}` });
        res.json(rows);
       });
    })
} 
const getUser = (req, res) => {
    req.getConnection((err, conn) => {
       if(err) return res.status(409).send({ message: 'Something is wrong' });
       conn.query('select * from neps_op_usuario where id_usuario = ?',[req.params.id_usuario], (err, rows) => {
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
    getAllUsers,
    getUser,
    saveUser,
    inactivateUser,
    updateUser
};
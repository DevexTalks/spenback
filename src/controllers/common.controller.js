const express = require('express');

const getAllUsers = (req, res) => {
    req.getConnection((err, conn) => {
       if(err) return res.status(409).send({ message: 'Something is wrong' });
       
       conn.query('select * from neps_op_usuario where id_usuario != \'admin.neps\'', (err, rows) => {
        if(err) return res.status(409).send({ message: `${err}` });
        res.json(rows);
       });
    })
}

const getLookupByType = (req, res) => {
    req.getConnection((err, conn) => {
       if(err) return res.status(409).send({ message: 'Something is wrong' });
       conn.query('select * from neps_op_lookup_codes where id_tipo = ?',[req.params.id_tipo], (err, rows) => {
        if(err) return res.status(409).send({ message: `${err}` });
        res.json(rows);
       } );
    })
}

const getCargaMasiva = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(409).send({ message: 'Something is wrong' });
        conn.query('select * from neps_rel_carga_conf', (err, rows) => {
            if (err) return res.status(409).send({ message: `${err}` });
            res.json(rows);
        });
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

const getPreliquidation = (req,res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(409).send({ message: 'Something is wrong' });
    
        conn.query(
            'SELECT status FROM neps_op_preliquidacion WHERE id_usuario = ?',
            [req.params.ID],
            (err, result) => {
                if (err) return res.status(409).send({ message: `${err}` });

                if (result.length > 0) {
                    const status = result[0].status; // Obtener el valor de la columna status
                    return res.send({status}); // Retornar el valor como respuesta
                } else {
                    return res.send('No se encontró el registro'); // Manejar el caso cuando no se encuentre el registro
                }
            }
        );
    });
}
    
module.exports = {
    getAllUsers,
    getLookupByType,
    getCargaMasiva,
    getViewModules,
    inactivateUser,
    updateUser,
    getPreliquidation
};
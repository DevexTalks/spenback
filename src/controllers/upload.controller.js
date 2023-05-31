const express = require('express');
const multer = require('multer');
const fs = require('fs');
const db = require('../config/database');
const readline = require('readline');
const path = require('path');
let fileNameBD;
const { exec } = require('child_process');

let date = new Date();

const storage = multer.diskStorage({
    filename: function (res, file, cb) {
        const ext = file.originalname.split(".").pop();
        const fileName = file.originalname.split("}").pop();
        const justName = fileName.split(".").splice(0, fileName.split(".").length-1).join(".");
        const ID = file.originalname.split('___').pop();
        console.log(ID.replace('.txt',''));
        cb(null, `${justName}.${ext}`);
    },
    destination: function (res, file, cb) {
        const fileName = file.originalname.split("}");
        fileName.pop();
        cb(null, `./public/${fileName}`);
    },
});


const up = multer({ storage });

const uploadtoFTP = (req, res) => {
    const file = req.file.filename;
    console.log(file)

    /* let ID = file.split('___').pop();
    ID = ID.replace('.txt','');

    const rutaScript = './public/python/main.py';

    const parametros = [ID];

    const comando = `python ${rutaScript} ${parametros.join(' ')}`;

    // Ejecutar el comando y capturar la salida
    exec(comando, (error, stdout, stderr) => {

        if (error) {
        console.error(`Error al ejecutar el script de Python: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error en la salida del script de Python: ${stderr}`);
            return;
        }        
        // Procesar la salida del script
        const resultado = JSON.parse(stdout.trim());
        console.log(resultado);      
    }); */

    res.send({ data: "OK" });
}

const startProcess = (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.status(409).send({ message: 'Something is wrong' });
    
        const { ID } = req.body;
        const newStatus = 'PRE'; // Nuevo valor para la columna status
    
        conn.query(
            'UPDATE neps_op_preliquidacion SET status = ? WHERE id_usuario = ?',
            [newStatus, ID],
            (err, result) => {
                if (err) return res.status(409).send({ message: `${err}` });
                return res.json(result);
            }
        );
    });


    /* const rootPath = `./public`;

    fs.readFile('src/config/FileTypes.json', (err, data) => {
        if (err) throw err;

        const roots = JSON.parse(data);
        for (let i = 0; i < roots.length; i++) {
            const tarjet = rootPath + '/' + roots[i].name + '/';
            fs.readdir(`${tarjet}`, (err, files) => {
                if (err) {
                    console.log(err);
                } else {
                    files.forEach(file => {
                        const fileName = tarjet + file;

                        let lector = readline.createInterface(
                            {
                                input: fs.createReadStream(fileName)
                            }
                        );
                        var c = 0;
                        lector.on('line', linea => {
                            if (c > 0) {
                                
                                let iline = linea.split("|");
                                //guardar en bd

                                fs.readFile('src/config/TablesName.json', (err, data,) => {
                                    if (err) throw err;

                                    const allSql = JSON.parse(data);
                                    const csql = allSql.filter(sentence => sentence.name === roots[i].name);
                         
                                            console.log('reading: ' + fileName + c)
                                            try {
                                                req.getConnection((err, conn) => {
                                                    if (err) return res.status(409).send({ message: 'Something is wrong' });
                                                    conn.query(csql[0].sql,
                                                        [iline], (err, rows) => {
                                                            if (err) return console.log(err);
                                                            return 0;
                                                        })
                                                })
                                            } catch (err) {
                                                console.log(err);
                                            }
                                       
                                });

                            }
                            c++;
                            lector.close();
                        })

                    })
                }
            })
        }
    }); */
}

const getUploadedFiles = (req, res) => {
    const rootPath = `./public`;
    const tarjet = rootPath + '/' + req.params.foldername + '/';
    console.log(tarjet);
    fs.readdir(`${tarjet}`, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            return res.json(files);
        }
    })
}

const deleteFile = (req, res) => {
    const rootPath = `./public`;
    const tarjet = rootPath + '/' + req.body.foldername + '/' + req.body.filename;
    console.log(tarjet);
    try {
        fs.unlinkSync(tarjet)
        console.log('File removed')
        return res.json('something');
    } catch (err) {
        console.error('Something wrong happened removing the file', err)
    }
}

const createUser = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(409).send({ message: 'Something is wrong' });
        conn.query(
            'insert into neps_op_usuario (id_usuario, srio_nombre, srio_correo, srio_tipo_doc, srio_numero_doc, srio_numero_tel, srio_password, srio_perfil, srio_estado, srio_fecha_creacion) values (?,?,?,?,?,?,?,?,?,?)',
            [req.body.idUsuario, req.body.nombre, req.body.email, req.body.tipoDoc, req.body.doc, req.body.celular,
            req.body.password, req.body.perfil, 'ACTIVO', date], 
            (err, rows) => {
                if (err) return res.status(409).send({ message: `${err}` });
                return res.json(rows);
            })
    })
};

const convertToJSON = () => {
    fileName = "./public/ABX Unificado Mes/afiliaciones_cotizantes_precierre.txt.txt"
    let lector = readline.createInterface(
        {
            input: fs.createReadStream(fileName)
        }
    );

    var i = 0;
    lector.on('line', linea => {
        if (i > 0 && i <= 2) {
            let data = linea.split("|");
            console.log(data);
        }
        i++;
    })
}

function getFilenames() {
    let sql = 'select crga_nombre_archivo from neps_rel_carga_conf';
    db.query(sql, (err, results) => {
        if (err) throw err;
        const rootPath = `./public`;
        let root = rootPath + '/';

        db.end();
    });
}




module.exports = {
    uploadtoFTP,
    up,
    startProcess,
    getFilenames,
    getUploadedFiles,
    deleteFile
};
const express = require('express'); // Crear una app express
const mysql = require('mysql'); // Interactuar con la BD
const myconn = require('express-myconnection') // Conectar Express con MySQL

const V1SwaggerDocs = require('./v1/swaggerConfig');

const v1UsuarioRouter = require('./v1/routes/usuario-routes');
const v1ModuloUsuarioRouter = require('./v1/routes/modulo-usuario');
const v1AdminUsuarioRouter = require('./v1/routes/admin-usuario');
const v1CommonRouter = require('./v1/routes/common-routes');
const v1UploadRouter = require('./v1/routes/upload');
const authRouter = require('./auth/auth-routes');

const dbOptions = require('./config/config');
const cors = require('cors');

// Configuraciones Iniciales
const app = express(); // Creacion de instancia de app express
const PORT = process.env.PORT || 5000; // Puerto de ejecucion
app.use(cors()); // Middleware de solicitud con acceso CORS

app.use(express.static("./public")); // No es util
app.use(myconn(mysql,dbOptions, 'single' )); // Conexion a DB
app.use(express.json()) // Middleware de análisis de cuerpo de solicitud

app.use('/api/v1/usuario-routes', v1UsuarioRouter);
app.use('/api/v1/modulo-usuario', v1ModuloUsuarioRouter);
app.use('/api/v1/admin-usuario', v1AdminUsuarioRouter);
app.use('/api/v1/common-routes', v1CommonRouter);
app.use('/api/v1/upload', v1UploadRouter);
app.use('/api/auth-routes', authRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    V1SwaggerDocs(app, PORT);   
})


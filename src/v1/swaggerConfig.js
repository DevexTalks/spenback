const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
// Opciones de configuración para Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend - Software Nueva EPS",
      version: "1.0.0",
      description:
        "A continuacion se detallan las rutas y metodos del API Backend para Nueva EPS",
    },
    servers: [
      {
        url: "http://localhost:5000", // URL base de la API
      },
    ],
    components: {
      schemas: {
        Usuario: {
          type: "object",
          properties: {
            // ... propiedades del esquema Usuario ...
          },
        },
      },
    },
  },
  apis: [
    "src/v1/routes/admin-usuario.js",
    "src/v1/routes/common-routes.js",
    "src/v1/routes/modulo-usuario.js",
    "src/v1/routes/upload.js",
    "src/v1/routes/usuario-routes.js",
  ],
};

// Generar la documentación de Swagger
const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  console.log(
    "📚 Documentacion Backend disponible en http://localhost:5000/api-docs/ "
  );
};

module.exports = swaggerDocs;

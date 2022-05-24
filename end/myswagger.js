const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        // openapi: '3.0.0',
        info: {
            title: 'Hello Swagger',
            version: '1.0.0',
        },
        contact: {
            name: 'Amazing'
        },
        servers: ['http://localhost:3000']
    },
    apis: ['index.js', './routes/*.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;
const mongoose = require('mongoose');

module.exports = function(uri) {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected', function() {
        console.log('Mongoose conectado em ' + uri);
    });
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose desconectado de ' + uri);
    });
    mongoose.connection.on('error', function(error) {
        console.log('Erro de conexão: ' + error);
    });
}
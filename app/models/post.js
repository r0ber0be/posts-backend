const mongoose = require('mongoose');

module.exports = function() {
    let schema = mongoose.Schema({
        titulo: {
            type: "String",
            required: true,
        },
        texto: {
            type: "String",
            required: true
        },
        likes: {
            type: "Number",
            required: false
        },
        id_usuario: {
            type: mongoose.Schema.ObjectId,
            ref: "Usuario"
        },
        
    });
    return mongoose.model('Post', schema);
}();
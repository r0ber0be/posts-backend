const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.logar = function(req, res) {
    /*email ao invés de matricula
    Os dois códigos equivalem
    function logar(usuario) {
        if (!bcrypt.compareSync(req.body.senha, usuario.senha)) {
            falhar();
        } else {
            res.status(200).send("Acesso permitido");
        }
    }
    function falhar() {
        res.status(401).send("Acesso negado");
    }
    //essa é a primeira linha executada
    Usuario.findOne({ email: req.body.email }).exec().then(logar, falhar);
    */
    Usuario.findOne({ email: req.body.email })
        .then(function(usuario) {
            if (bcrypt.compareSync(req.body.senha, usuario.senha)) {
                let token = jwt.sign({ id_usuario: usuario._id }, "senha_secreta");
                res.status(200).json({ token: token, nome: usuario.nome });
            } else {
                res.status(401).send("Acesso negado");
            }
        })
        .catch(function(error) {
            res.status(401).send("Acesso negado")
        });
}

module.exports.checar = function(req, res, next) {
    let token = req.headers.token;
    jwt.verify(token, "senha_secreta", function(error, decoded) {
        if (error) {
            res.status(401).send("Token inválido.");
        } else {
            next(); //vai para o endpoint da requisição
        }
    });
}
const Usuario = require('../models/usuario');
const viewUsuario = require('../views/usuarios');
const Post = require('../models/post');
const viewPost = require('../views/posts');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.inserirUsuario = function(req, res) {
    //o mesmo que /let usuario = req.body;
    let usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10),
    }
    console.log(usuario)
    console.log(Usuario)
    let promise = Usuario.create(usuario);
    promise.then(function(usuario) {
        res.status(200).json(viewUsuario.render(usuario));
    }).catch(function(error) {
        res.status(400).json({ mensagem: "Um erro ocorreu." })
    });
}

module.exports.listarUsuarios = function(req, res) {
    let promise = Usuario.find().exec();
    promise.then(function(usuarios) {
        res.status(200).json(viewUsuario.renderMany(usuarios));
    }).catch(function(error) {
        res.status(404).json({ mensagem: "Um erro ocorreu." });
    });
}

module.exports.buscarUsuarioPorId = function(req, res) {
    let id = req.params.id;
    let promise = Usuario.findById(id).exec();
    promise.then(function(usuario) {
        res.status(200).json(viewUsuario.render(usuario));
    }).catch(function(error) {
        res.status(400).json({ mensagem: "Um erro ocorreu." });
    })
}

module.exports.removerUsuario = function(req, res) {
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let userId = payload.id_usuario;
    let userReqId = req.params.id;

    if (userId != userReqId) {
        falhar();
    } else {
        let promise = Usuario.findByIdAndDelete(userReqId);
        promise.then(function(usuario) {
            res.status(200).json(viewUsuario.render(usuario));
        }).catch(function(error) {
            falhar();
        });
    }

    function falhar() {
        res.status(400).json({ mensagem: "Um erro ocorreu." });
    }
}

module.exports.obterPosts = function(req, res) {
    let id = req.params.id;
    let promise = Post.find({ id_usuario: id }).exec();
    promise.then(function(posts) {
        res.status(200).json(viewPost.renderMany(posts));
    }).catch(function(error) {
        res.status(404).json({ mensagem: "Um erro ocorreu" });
    });
}
const Comentario = require('../models/comentario');
const viewComentario = require('../views/comentarios');
const jwt = require('jsonwebtoken');

module.exports.inserirComentario = function(req, res) {
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let comentario = {
        texto: req.body.texto,
        id_post: req.body.id_post,
        id_usuario: payload.id_usuario
    }

    let promise = Comentario.create(comentario);
    promise.then(function(comentario) {
        res.status(201).json(viewComentario.render(comentario));
    }).catch(function(error) {
        res.status(500).json({ mensagem: "Um erro ocorreu" })
    });
}

module.exports.listarComentarios = function(req, res) {
    let promise = Comentario.find().exec();
    promise.then(function(comentarios) {
        res.status(200).json(viewComentario.renderMany(comentarios));
    }).catch(function(error) {
        res.status(404).json({ mensagem: "Um erro ocorreu" });
    });
}

module.exports.buscarComentarioPorId = function(req, res) {
    let id = req.params.id;
    let promise = Comentario.findById(id);
    promise.then(function(comentario) {
        res.status(200).json(viewComentario.render(comentario));
    }).catch(function(error) {
        res.status(404).json({ mensagem: "Um erro ocorreu" });
    });
}

module.exports.deletarComentarioPorId = function(req, res) {
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let comentarioDelete = {
        _id: req.params.id,
        id_usuario: payload.id_usuario
    }

    let promise = Comentario.findOneAndDelete(comentarioDelete);
    promise.then(function(comentario) {
        res.status(200).json(viewComentario.render(comentario));
    }).catch(function(erro) {
        res.status(404).json({ mensagem: "Um erro ocorreu" });
    });
}
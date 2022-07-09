const Post = require('../models/post');
const viewPost = require('../views/posts');
const Comentario = require('../models/comentario');
const viewComentario = require('../views/comentarios');
const jwt = require('jsonwebtoken');

module.exports.inserirPost = function(req, res) {
    let token = req.headers.token;
    let payload = jwt.decode(token);
    //deve estar de acordo com o model de Post
    let post = {
        titulo: req.body.titulo,
        texto: req.body.texto,
        likes: 0,
        id_usuario: payload.id_usuario
    }
    let promise = Post.create(post);
    promise.then(function(post) {
        res.status(201).json(viewPost.render(post));
    }).catch(function(error) {
        console.log(error)
        res.status(400).json({ mensagem: "Um erro ocorreu." })
    });
}

module.exports.listarPosts = function(req, res) {
    let promise = Post.find().exec();
    promise.then(function(posts) {
        res.status(200).json(viewPost.renderMany(posts));
    }).catch(function(error) {
        res.status(404).json({ mensagem: "Um erro ocorreu" })
    });
}

module.exports.buscarPostPorId = function(req, res) {
    let id = req.params.id;
    let promise = Post.findById(id).exec();
    promise.then(function(post) {
        res.status(200).json(viewPost.render(post));
    }).catch(function(error) {
        res.status(404).json({ mensagem: "Um erro ocorreu" });
    });
}

module.exports.obterComentarios = function(req, res) {
    let id = req.params.id;
    let promise = Comentario.find({ id_post: id }).exec();
    promise.then(function(comentarios) {
        console.log(comentarios);
        res.status(200).json(viewComentario.renderMany(comentarios));
    }).catch(function(error) {
        res.status(404).json({ mensagem: "Um erro ocorreu" });
    });
}

module.exports.deletePostPorId = function(req, res) {
    let token = req.headers.token;
    let payload = jwt.decode(token);
    let postDelete = {
        _id: req.params.id,
        id_usuario: payload.id_usuario,
    }

    //Os parâmetros para findOne devem ser um objeto
    let promise = Post.findOneAndDelete(postDelete).exec();
    console.log(promise);
    promise.then(function(post) {
        res.status(200).json(viewPost.render(post));
    }).catch(function(error) {
        res.status(404).json({ mensagem: "Um erro ocorreu" });
    });
}
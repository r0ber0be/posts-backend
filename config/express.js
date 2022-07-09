const routerUsuarios = require('../app/routes/usuarios');
const routerPosts = require('../app/routes/posts');
const routerComentarios = require('../app/routes/comentarios');
const express = require('express');
const cors = require("cors");

module.exports = function() {
    let app = express();
    app.use(
        cors({
            origin: '*',
        })
    );
    app.set('port', 8393);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static('./public'));

    routerUsuarios(app);
    routerPosts(app);
    routerComentarios(app);
    return app;
}
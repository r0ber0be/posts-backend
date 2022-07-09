const controller = require('../controllers/comentarios');
const controllerAuth = require('../controllers/auth');

module.exports = function(app) {
    app.use('/api/comentarios', controllerAuth.checar);
    app.post('/api/comentarios', controller.inserirComentario);
    app.get('/api/comentarios', controller.listarComentarios);
    app.get('/api/comentarios/:id', controller.buscarComentarioPorId);
    app.delete('/api/comentarios/:id', controller.deletarComentarioPorId);
}
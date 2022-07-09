function render(post) {
    return {
        id: post.id,
        titulo: post.titulo,
        texto: post.texto,
        likes: post.likes,
        id_usuario: post.id_usuario,
        nome_usuario: post.id_usuario.nome
    }
}
module.exports.render = render;

function renderMany(posts) {
    return posts.map(render);
}
module.exports.renderMany = renderMany;
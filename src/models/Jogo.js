class Jogo {
    constructor(id, titulo, descricao, preco, estoque, plataformas, nota, categoria, comentarios) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.preco = preco;
        this.estoque = estoque;
        this.plataformas = plataformas;
        this.nota = nota;
        this.categoria = categoria;
        this.comentarios = comentarios;
    }
}

module.exports = Jogo;

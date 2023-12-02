const pool = require('../db/dbConection');
const Jogo = require('../models/Jogo');

class JogoRepository {
    async getAllJogos() {
        const { rows } = await pool.query('SELECT * FROM jogos');
        return rows.map(row => new Jogo(
            row.id,
            row.titulo,
            row.descricao,
            row.preco,
            row.estoque,
            row.plataformas,
            row.nota,
            row.categoria,
            row.comentarios
        ));
    }
}

module.exports = JogoRepository;

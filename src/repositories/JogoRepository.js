const { pool } = require("../db/dbConection");
const Jogo = require("../models/Jogo");

class JogoRepository {
  async getAllJogos() {
    try {
      const { rows } = await pool.query("SELECT * FROM jogos");
      return rows.map(
        (row) =>
          new Jogo(
            row.id,
            row.titulo,
            row.descricao,
            row.preco,
            row.estoque,
            row.plataformas,
            row.nota,
            row.categoria,
            row.comentarios,
            row.urlimagem
          )
      );
    } catch (error) {
      throw new Error(`Erro ao buscar jogos: ${error.message}`);
    }
  }
  async listarProdutosPorEstoque() {
    const { rows } = await pool.query(`
      SELECT *
      FROM jogos
      ORDER BY estoque ASC;
    `);
  
    return rows.map(row => ({
      id: row.id,
      titulo: row.titulo,
      descricao: row.descricao,
      preco: row.preco,
      estoque: row.estoque,
      plataformas: row.plataformas,
      nota: row.nota,
      categorias: row.categorias,
      comentarios: row.comentarios,
      urlimagem: row.urlimagem
    }));
  }
  async getJogoById(id) {
    try {
      const { rows } = await pool.query("SELECT * FROM jogos WHERE id = $1", [
        id,
      ]);
      if (rows.length === 0) {
        return null;
      }
      const jogo = new Jogo(
        rows[0].id,
        rows[0].titulo,
        rows[0].descricao,
        rows[0].preco,
        rows[0].estoque,
        rows[0].plataformas,
        rows[0].nota,
        rows[0].categoria,
        rows[0].comentarios,
        rows[0].urlimagem
      );
      return jogo;
    } catch (error) {
      throw new Error(`Erro ao buscar jogo por ID: ${error.message}`);
    }
  }
  async deletarJogo(id) {
    const result = await pool.query("DELETE FROM jogos WHERE id = $1", [id]);
    return result.rowCount > 0;
  }
  async editarJogo(jogo) {
    const { id, titulo, descricao, preco, estoque, plataformas, nota, categorias, comentarios, urlImagem } = jogo;
    const result = await pool.query(
      "UPDATE jogos SET titulo = $1, descricao = $2, preco = $3, estoque = $4, plataformas = $5, nota = $6, categorias = $7, comentarios = $8, urlimagem = $9 WHERE id = $10 RETURNING *",
      [titulo, descricao, preco, estoque, plataformas, nota, categorias, comentarios, urlImagem, id]
    );
    return new Jogo(
      result.rows[0].id,
      result.rows[0].titulo,
      result.rows[0].descricao,
      result.rows[0].preco,
      result.rows[0].estoque,
      result.rows[0].plataformas,
      result.rows[0].nota,
      result.rows[0].categorias,
      result.rows[0].comentarios,
      result.rows[0].url_imagem
    );
  }

  async postNewComentario(jogoId, comentario) {
    try {
      const result = await pool.query(
        "UPDATE jogos SET comentarios = array_append(comentarios, $1) WHERE id = $2 RETURNING *",
        [comentario, jogoId]
      );
      if (result.rows.length === 0) {
        throw new Error("Jogo não encontrado para adicionar o comentário.");
      }
      const updatedJogo = new Jogo(
        result.rows[0].id,
        result.rows[0].titulo,
        result.rows[0].descricao,
        result.rows[0].preco,
        result.rows[0].estoque,
        result.rows[0].plataformas,
        result.rows[0].nota,
        result.rows[0].categorias,
        result.rows[0].comentarios,
        result.rows[0].urlimagem
      );
      return updatedJogo;
    } catch (error) {
      throw new Error(`Erro ao adicionar comentário ao jogo: ${error.message}`);
    }
  }

  async postNota(jogoId, nota) {
    try {
      const result = await pool.query(
        "UPDATE jogos SET nota = $1 WHERE id = $2 RETURNING *",
        [nota, jogoId]
      );
      if (result.rows.length === 0) {
        throw new Error("Jogo não encontrado para atualizar a nota.");
      }
      const updatedJogo = new Jogo(
        result.rows[0].id,
        result.rows[0].titulo,
        result.rows[0].descricao,
        result.rows[0].preco,
        result.rows[0].estoque,
        result.rows[0].plataformas,
        result.rows[0].nota,
        result.rows[0].categorias,
        result.rows[0].comentarios,
        result.rows[0].urlimagem
      );
      return updatedJogo;
    } catch (error) {
      throw new Error(`Erro ao atualizar a nota do jogo: ${error.message}`);
    }
  }

  async post(jogo) {
    try {
      const {
        titulo,
        descricao,
        preco,
        estoque,
        plataformas,
        nota,
        categorias,
        comentarios,
        urlImagem
      } = jogo;
      const result = await pool.query(
        "INSERT INTO jogos (titulo, descricao, preco, estoque, plataformas, nota, categorias, comentarios, urlImagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
        [
          titulo,
          descricao,
          preco,
          estoque,
          plataformas,
          nota,
          categorias,
          comentarios,
          urlImagem
        ]
      );
      const newJogo = new Jogo(
        result.rows[0].id,
        result.rows[0].titulo,
        result.rows[0].descricao,
        result.rows[0].preco,
        result.rows[0].estoque,
        result.rows[0].plataformas,
        result.rows[0].nota,
        result.rows[0].categorias,
        result.rows[0].comentarios,
        result.rows[0].urlimagem
      );
      return newJogo;
    } catch (error) {
      throw new Error(`Erro ao adicionar novo jogo: ${error.message}`);
    }
  }
}

module.exports = JogoRepository;

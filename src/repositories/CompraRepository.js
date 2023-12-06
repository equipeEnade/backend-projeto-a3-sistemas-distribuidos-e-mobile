const { pool } = require("../db/dbConection");
const Compra = require("../models/Compra");

class CompraRepository {

  async getAllCompras() {
    const { rows } = await pool.query("SELECT * FROM compras");
    return rows.map(
      (row) =>
        new Compra(row.id, row.id_usuario, row.id_produto, row.preco)
    );
  }

  async getProdutosMaisComprados() {
  const { rows } = await pool.query(`
    SELECT p.*
    FROM jogos p
    JOIN (
      SELECT id_produto, COUNT(id_produto) AS total_compras
      FROM compras
      GROUP BY id_produto
      ORDER BY total_compras DESC
    ) c ON p.id = c.id_produto;
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
async getProdutosCompradosPorCliente(idCliente) {
  const { rows } = await pool.query(`
    SELECT p.*
    FROM jogos p
    JOIN compras c ON p.id = c.id_produto
    WHERE c.id_usuario = $1;
  `, [idCliente]);

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
async getInfoGastosUsuario(idUsuario) {
  const { rows } = await pool.query(`
    SELECT 
      SUM(c.preco) AS valor_total_gasto,
      COUNT(c.id) AS numero_itens_comprados,
      AVG(c.preco) AS valor_medio_gasto
    FROM compras c
    WHERE c.id_usuario = $1;
  `, [idUsuario]);

  if (rows.length === 0) {
    return {
      valor_total_gasto: 0,
      numero_itens_comprados: 0,
      valor_medio_gasto: 0
    };
  }

  return {
    valor_total_gasto: parseFloat(rows[0].valor_total_gasto),
    numero_itens_comprados: parseInt(rows[0].numero_itens_comprados),
    valor_medio_gasto: parseFloat(rows[0].valor_medio_gasto)
  };
}
  async deletarCompra(id) {
    const result = await pool.query("DELETE FROM compras WHERE id = $1", [id]);
    return result.rowCount > 0;
  }
  async cadastrarCompra(compra) {
    const { id_usuario, id_produto, preco } = compra;
    const result = await pool.query(
      "INSERT INTO compras (id_usuario, id_produto, preco) VALUES ($1, $2, $3) RETURNING *",
      [id_usuario, id_produto, preco]
    );
    return new Compra(
      result.rows[0].id,
      result.rows[0].id_usuario,
      result.rows[0].id_produto,
      result.rows[0].preco
    );
  }
  async editarCompra(compra) {
    const { id, id_usuario, id_produto, preco } = compra;
    const result = await pool.query(
      "UPDATE compras SET id_usuario = $1, id_produto = $2, preco = $3 WHERE id = $4 RETURNING *",
      [id_usuario, id_produto, preco, id]
    );
    return new Compra(
      result.rows[0].id,
      result.rows[0].id_usuario,
      result.rows[0].id_produto,
      result.rows[0].preco
    );
  }
  async findCompraByID(id) {
    const { rows } = await pool.query("SELECT * FROM compras WHERE id = $1", [id]);
    if (rows.length === 0) {
      return null;
    }
    const compra = rows[0];
    return new Compra(compra.id, compra.id_usuario, compra.id_produto, compra.preco);
  }
  async findComprasByUsuarioId(id_usuario) {
    const { rows } = await pool.query("SELECT * FROM compras WHERE id_usuario = $1", [id_usuario]);
    return rows.map(
      (row) =>
        new Compra(row.id, row.id_usuario, row.id_produto, row.preco)
    );
  }
  async findComprasByProdutoId(id_produto) {
    const { rows } = await pool.query("SELECT * FROM compras WHERE id_produto = $1", [id_produto]);
    return rows.map(
      (row) =>
        new Compra(row.id, row.id_usuario, row.id_produto, row.preco)
    );
  }
}

module.exports = CompraRepository;

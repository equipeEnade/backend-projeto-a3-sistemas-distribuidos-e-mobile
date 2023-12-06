const { pool } = require("../db/dbConection");
const Usuario = require("../models/Usuario");

class UsuarioRepository {

  async getAllUsuarios() {
    const { rows } = await pool.query("SELECT * FROM usuarios");
    return rows.map(
      (row) =>
        new Usuario(row.id, row.nome, row.email, row.senha, row.role)
    );
  }
  async deletarUsuario(id) {
    const result = await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
    return result.rowCount > 0;
  }
  async cadastrarUsuario(usuario) {
    const { nome, email, senha, role } = usuario;
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, senha, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, email, senha, role]
    );
    return new Usuario(
      result.rows[0].id,
      result.rows[0].nome,
      result.rows[0].email,
      result.rows[0].senha,
      result.rows[0].role
    );
  }
  async editarUsuario(usuario) {
    const { id, nome, email, senha, role } = usuario;
    const result = await pool.query(
      "UPDATE usuarios SET nome = $1, email = $2, senha = $3, role = $4 WHERE id = $5 RETURNING *",
      [nome, email, senha, role, id]
    );
    return new Usuario(
      result.rows[0].id,
      result.rows[0].nome,
      result.rows[0].email,
      result.rows[0].senha,
      result.rows[0].role
    );
  }
  async findUsuarioByID(id) {
    const { rows } = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    const usuario = rows[0];
    return new Usuario(usuario.id, usuario.nome, usuario.email, null ,usuario.role);
  }
}

module.exports = UsuarioRepository;

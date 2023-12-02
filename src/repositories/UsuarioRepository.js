const { pool } = require("../db/dbConection");
const Usuario = require("../models/Usuario");

class UsuarioRepository {
  async getAllUsuarios() {
    const { rows } = await pool.query("SELECT * FROM usuarios");
    return rows.map(
      (row) =>
        new Usuario(row.id, row.nome, row.email, row.role)
    );
  }
  async deletarUsuario(id) {
    const result = await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
    return result.rowCount > 0;
  }

  async cadastrarUsuario(usuario) {
    const { nome, email, role } = usuario;
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, role) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, role]
    );
    return new Usuario(
      result.rows[0].id,
      result.rows[0].nome,
      result.rows[0].email,
      result.rows[0].role
    );
  }

  async editarUsuario(usuario) {
    const { id, nome, email, role } = usuario;
    const result = await pool.query(
      "UPDATE usuarios SET nome = $1, email = $2, role = $3 WHERE id = $4 RETURNING *",
      [nome, email, role, id]
    );
    return new Usuario(
      result.rows[0].id,
      result.rows[0].nome,
      result.rows[0].email,
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
    return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.role);
  }
}

module.exports = UsuarioRepository;

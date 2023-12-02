const { pool, config } = require("./dbConection");
const pgtools = require("pgtools");
const Usuario = require("../models/Usuario");
const Jogo = require("../models/Jogo");

async function setupDatabase() {
  try {
    const databaseExists = await pgtools
      .createdb(config, "db-enade-keys")
      .then(() => {
        console.log("Banco de dados criado com sucesso.");
        createTables();
        return true;
      })
      .catch((err) => {
        if (err.name === "duplicate_database") {
          console.log("Banco de dados encontrado.");
          return true;
        }
        return false;
      });

    if (!databaseExists) {
      console.log("Erro ao encontrar o banco de dados");
    } else {
      console.log("Conexão com o banco de dados bem sucedida!");
    }
  } catch (err) {
    console.error("Erro ao configurar o banco de dados:", err);
  }
}

function createTables() {
  try {
    pool.query(`
            CREATE TABLE usuarios (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100),
                email VARCHAR(55) UNIQUE,
                senha VARCHAR(255),
                role VARCHAR(5)
            )
        `);

    console.log("Tabela de usuários criada com sucesso.");

    pool.query(`
            CREATE TABLE jogos (
                id SERIAL PRIMARY KEY,
                titulo VARCHAR(100),
                descricao TEXT,
                preco NUMERIC,
                estoque INTEGER,
                plataformas VARCHAR(100) ARRAY,
                nota NUMERIC,
                categorias VARCHAR(100) ARRAY,
                comentarios TEXT[]
            )
        `);

    console.log("Tabela de jogos criada com sucesso.");
  } catch (err) {
    console.error("Erro ao criar tabelas:", err);
  }
}

module.exports = setupDatabase;

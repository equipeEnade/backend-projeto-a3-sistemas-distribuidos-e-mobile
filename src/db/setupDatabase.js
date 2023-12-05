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

async function createTables() {
  try {
    await pool.query(`
            CREATE TABLE usuarios (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100),
                email VARCHAR(55) UNIQUE,
                senha VARCHAR(255),
                role VARCHAR(5)
            )
        `);

    console.log("Tabela de usuários criada com sucesso.");

    await pool.query(`
            CREATE TABLE jogos (
                id SERIAL PRIMARY KEY,
                titulo VARCHAR(100),
                descricao TEXT,
                preco NUMERIC,
                estoque INTEGER,
                plataformas VARCHAR(100) ARRAY,
                nota NUMERIC,
                categorias VARCHAR(100) ARRAY,
                comentarios TEXT[],
                urlimagem TEXT
            )
        `);

    console.log("Tabela de jogos criada com sucesso.");

    await pool.query(`
            CREATE TABLE compras (
                id SERIAL PRIMARY KEY,
                id_usuario INTEGER REFERENCES usuarios(id),
                id_produto INTEGER REFERENCES jogos(id),
                preco NUMERIC
            )
        `);

    console.log("Tabela de compras criada com sucesso.");

    await pool.query(`
            INSERT INTO jogos (titulo, descricao, preco, estoque, plataformas, nota, categorias, comentarios, urlimagem)
            VALUES
                ('Cyberpunk 2077', 'Ação e RPG futurístico', 59.99, 100, ARRAY['PC', 'PS4', 'Xbox One'], 4.2, ARRAY['Ação', 'RPG', 'Futurista'], ARRAY['Jogo aguardado'], 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9706269e-b96b-477a-ba8f-a3f1c587e798/dekr8fg-70a4de9d-772e-426e-9a5e-ee52df0a0602.png/v1/fill/w_256,h_256/cyberpunk_2077_neon_square_icon_by_ylfaer_dekr8fg-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjU2IiwicGF0aCI6IlwvZlwvOTcwNjI2OWUtYjk2Yi00NzdhLWJhOGYtYTNmMWM1ODdlNzk4XC9kZWtyOGZnLTcwYTRkZTlkLTc3MmUtNDI2ZS05YTVlLWVlNTJkZjBhMDYwMi5wbmciLCJ3aWR0aCI6Ijw9MjU2In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.E98Lni24o_6PBsJzcT0Fh5MaMVOrPHoo7PVDZgL9sIk'),
                
                ('The Last of Us Part II', 'Ação e sobrevivência', 49.99, 80, ARRAY['PS4'], 4.8, ARRAY['Ação', 'Aventura', 'Sobrevivência'], ARRAY['História emocionante'], 'https://m.media-amazon.com/images/I/717Oo9v0e-L._UC256,256_CACC,256,256_.jpg'),
                
                ('God of War', 'Ação e aventura mitológica', 39.99, 120, ARRAY['PS4'], 4.9, ARRAY['Ação', 'Aventura', 'Mitológico'], ARRAY['Game of the Year'], 'https://steamuserimages-a.akamaihd.net/ugc/1536247828044099789/7FC9FF77C4A704D7E00C00E8786C3A1737D8DFB0/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'),
                
                ('Uncharted 4: A Thiefs End', 'Aventura e ação', 29.99, 60, ARRAY['PS4'], 4.7, ARRAY['Aventura', 'Ação'], ARRAY['Gráficos incríveis'], 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzZRuKkQBLxkZ8T5wD1ZMV2PFTBAKLjmArpOGOAuG7dXJVYYMg3Dfm8krmgnR81pBEGNY&usqp=CAU'),
                
                ('Horizon Zero Dawn', 'Ação e mundo aberto', 34.99, 90, ARRAY['PS4', 'PC'], 4.6, ARRAY['Ação', 'Aventura', 'Mundo Aberto'], ARRAY['Ambientação única'], 'https://www.truetrophies.com/boxart/Game_5225.png'),
                
                ('Bloodborne', 'Ação e RPG', 44.99, 110, ARRAY['PS4'], 4.8, ARRAY['Ação', 'RPG', 'Desafiador'], ARRAY['Experiência intensa'], 'https://cdn2.steamgriddb.com/file/sgdb-cdn/icon/5ef9f5ae91440a6e6cb56e870819466a.ico'),
                
                ('Red Dead Redemption 2', 'Ação no velho oeste', 49.99, 75, ARRAY['PS4', 'Xbox One', 'PC'], 4.8, ARRAY['Ação', 'Aventura', 'Mundo Aberto'], ARRAY['Gráficos impressionantes'], 'https://www.techpowerup.com/review/red-dead-redemption-2-fsr-2-community-patch-tested/images/small.png'),
                
                ('Hades', 'Ação e roguelike', 24.99, 100, ARRAY['PC', 'Nintendo Switch'], 4.9, ARRAY['Ação', 'Roguelike', 'Mitologia'], ARRAY['Altamente viciante'], 'https://cdn2.steamgriddb.com/file/sgdb-cdn/icon/33f57f79648ec1697ef41b85f0706428.png'),
                
                ('The Legend of Zelda: Breath of the Wild', 'Aventura e mundo aberto', 59.99, 85, ARRAY['Nintendo Switch'], 4.9, ARRAY['Aventura', 'Mundo Aberto', 'Fantasia'], ARRAY['Inovador'], 'https://amiibo.life/assets/games/eshop_icons/switch/the-legend-of-zelda-breath-of-the-wild-7d2d0eb308e06f13afc957a63bfc27054d59255aa02f027dd5e4bee1bb21314d.png'),
                
                ('Dark Souls III', 'Ação e RPG desafiador', 39.99, 95, ARRAY['PC', 'PS4', 'Xbox One'], 4.7, ARRAY['Ação', 'RPG', 'Desafiador'], ARRAY['Jogo de alta dificuldade'], 'https://production-gameflipusercontent.fingershock.com/us-east-1:1e00a3a0-5c40-4d22-8968-c0cbd14031b8/605adba4-8468-4360-a974-0cd7e8b4446c/eff89631-34dd-4667-a7be-787c0890ef27/320x320.jpg');
        `);

    console.log("Import de 10 jogos feito com sucesso.");

    await pool.query(`
                INSERT INTO usuarios (nome, email, senha, role)
                VALUES 
                  ('Catureba The King', 'catureba@gmail.com', 'adminsenha', 'ADMIN'),
                  ('Usuário 1', 'usuario1@example.com', 'senha1', 'USER'),
                  ('Usuário 2', 'usuario2@example.com', 'senha2', 'USER'),
                  ('Usuário 3', 'usuario3@example.com', 'senha3', 'USER'),
                  ('Usuário 4', 'usuario4@example.com', 'senha4', 'USER'),
                  ('Usuário 5', 'usuario5@example.com', 'senha5', 'USER'),
                  ('Usuário 6', 'usuario6@example.com', 'senha6', 'USER'),
                  ('Usuário 7', 'usuario7@example.com', 'senha7', 'USER'),
                  ('Usuário 8', 'usuario8@example.com', 'senha8', 'USER'),
                  ('Usuário 9', 'usuario9@example.com', 'senha9', 'USER');
        `);

    console.log("Import de 10 usuarios feito com sucesso.");
  } catch (err) {
    console.error("Erro ao criar tabelas:", err);
  }
}

module.exports = setupDatabase;

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const usuarioController = require('./src/controllers/UsuarioController');
const jogoController = require('./src/controllers/JogoController');
const pool = require('./src/db/dbConection');
const setupDatabase = require('./src/db/setupDatabase');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/usuarios', usuarioController);
app.use('/api/jogos', jogoController);

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

setupDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao configurar o banco de dados:', err);
    });

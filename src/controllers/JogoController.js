const express = require('express');
const router = express.Router();
const JogoService = require('../services/JogoService');

const jogoService = new JogoService();

router.get('/', async (req, res) => {
    try {
        const jogos = await jogoService.getAllJogos();
        res.json(jogos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const jogoId = req.params.id;
        const jogo = await jogoService.getJogoById(jogoId);
        if (!jogo) {
            res.status(404).json({ message: 'Jogo não encontrado' });
            return;
        }
        res.json(jogo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await jogoService.deletarJogo(id);
        if (deleted) {
            res.json({ message: 'Jogo deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Jogo não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/plataformas/:plataformas', async (req, res) => {
    try {
        const plataformas = req.params.plataformas;
        const jogos = await jogoService.getJogosByPlataformas(plataformas);
        res.json(jogos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/categorias/:categorias', async (req, res) => {
    try {
        const categoria = req.params.categorias;
        const jogos = await jogoService.getJogosByCategorias(categoria);
        res.json(jogos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/comentar/:jogoId', async (req, res) => {
    try {
        const jogoId = req.params.jogoId;
        const { comentario } = req.body;
        if (!comentario) {
            res.status(400).json({ message: 'Comentário inválido' });
            return;
        }
        const jogo = await jogoService.postNewComentario(jogoId, comentario);
        res.json(jogo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const novoJogo = req.body;
        const jogo = await jogoService.put(novoJogo);
        res.json(jogo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/votar/:jogoId/:nota', async (req, res) => {
    try {
        const jogoId = req.params.jogoId;
        const nota = req.params.nota;
        if (nota<0) {
            res.status(400).json({ message: 'Nota invalida' });
            return;
        }
        const jogo = await jogoService.postNota(jogoId, nota);
        res.status(200).json({ message: 'Seu voto foi aceito' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const novoJogo = req.body;
        const jogo = await jogoService.postNewJogo(novoJogo);
        res.json(jogo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

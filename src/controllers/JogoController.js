const express = require('express');
const router = express.Router();
const JogoService = require('../services/JogoService');

router.get('/', async (req, res) => {
    try {
        const jogos = await JogoService.getAllJogos();
        res.json(jogos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

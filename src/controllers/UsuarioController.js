const express = require('express');
const UsuarioService = require('../services/UsuarioService');

const router = express.Router();
const usuarioService = new UsuarioService();

router.get('/', async (req, res) => {
    try {
        const usuarios = await usuarioService.getAllUsuarios();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await usuarioService.deletarUsuario(id);
        if (deleted) {
            res.json({ message: 'Usuário deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const novoUsuario = req.body;
    try {
        const usuarioCriado = await usuarioService.cadastrarUsuario(novoUsuario);
        res.status(201).json(usuarioCriado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const usuarioAtualizado = req.body;
    usuarioAtualizado.id = id;
    try {
        const updatedUsuario = await usuarioService.editarUsuario(usuarioAtualizado);
        res.json(updatedUsuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await usuarioService.findUsuarioByID(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const login = req.body;
    try {
        const response = await usuarioService.login(login);
        if(response != false){
            res.status(201).json( {
                mensagem: "Login bem sucedido",
                id: response
            } );
        }else res.status(401).json( {error: "Usuario não encontrado"} );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

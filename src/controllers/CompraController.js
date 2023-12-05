const express = require('express');
const router = express.Router();
const CompraService = require('../services/CompraService');

const compraService = new CompraService();

router.get('/', async (req, res) => {
    try {
        const compras = await compraService.getAllCompras();
        res.json(compras);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await compraService.deletarCompra(id);
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
    const novocompra = req.body;
    try {
        const compraCriado = await compraService.cadastrarCompra(novocompra);
        res.status(201).json(compraCriado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const compraAtualizado = req.body;
    compraAtualizado.id = id;
    try {
        const updatedcompra = await compraService.editarCompra(compraAtualizado);
        res.json(updatedcompra);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const compra = await compraService.findCompraByID(id);
        if (compra) {
            res.json(compra);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/usuario/:id', async (req, res) => {
    const id_usuario = req.params.id;
    try {
        const compra = await compraService.findComprasByUsuarioId(id_usuario);
        if (compra) {
            res.json(compra);
        } else {
            res.status(401).json({ message: 'Nenhuma compra vinculada a este usuario foi encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/produto/:id', async (req, res) => {
    const id_produto = req.params.id;
    try {
        const compra = await compraService.findComprasByProdutoId(id_produto);
        if (compra) {
            res.json(compra);
        } else {
            res.status(401).json({ message: 'Nenhuma compra vinculada a este produto foi encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

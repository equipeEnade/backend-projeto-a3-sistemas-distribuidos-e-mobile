const CompraRepository = require('../repositories/CompraRepository');
const JogoRepository = require('../repositories/JogoRepository');


class CompraService {
    constructor() {
        this.compraRepository = new CompraRepository();
        this.JogoRepository = new JogoRepository();
    }

    async getAllCompras() {
        return await this.compraRepository.getAllCompras();
    }

    async deletarCompra(id) {
        return await this.compraRepository.deletarCompra(id);
    }

    async cadastrarCompra(compra) {
        const produto = await this.JogoRepository.getJogoById(compra.id_produto)
        compra.preco = produto.preco;
        return await this.compraRepository.cadastrarCompra(compra);
    }

    async editarCompra(compra) {
        const produto = await this.JogoRepository.getJogoById(compra.id_produto)
        compra.preco = produto.preco;
        return await this.compraRepository.editarCompra(compra);
    }

    async findCompraByID(id) {
        return await this.compraRepository.findCompraByID(id);
    }

    async findComprasByUsuarioId(id_usuario) {
        return await this.compraRepository.findComprasByUsuarioId(id_usuario);
    }

    async findComprasByProdutoId(id_produto) {
        return await this.compraRepository.findComprasByProdutoId(id_produto);
    }

    // Se precisar de lógica específica para a service de compras, adicione aqui.
}

module.exports = CompraService;

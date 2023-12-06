const CompraRepository = require("../repositories/CompraRepository");
const JogoRepository = require("../repositories/JogoRepository");

class CompraService {
  constructor() {
    this.compraRepository = new CompraRepository();
    this.JogoRepository = new JogoRepository();
  }

  async getAllCompras() {
    return await this.compraRepository.getAllCompras();
  }
  async getProdutosMaisComprados() {
    return await this.compraRepository.getProdutosMaisComprados();
  }
  async getProdutosCompradosPorCliente(id_produto) {
    return await this.compraRepository.getProdutosCompradosPorCliente(id_produto);
  }
  async getInfoGastosUsuario(id_produto) {
    return await this.compraRepository.getInfoGastosUsuario(id_produto);
  }
  async deletarCompra(id) {
    return await this.compraRepository.deletarCompra(id);
  }
  async cadastrarCompra(compra) {
    const produto = await this.JogoRepository.getJogoById(compra.id_produto);

    if (produto.estoque <= 0) return false;
        
    produto.estoque--;
    this.JogoRepository.editarJogo(produto);

    compra.preco = produto.preco;
    return await this.compraRepository.cadastrarCompra(compra);
  }
  async editarCompra(compra) {
    const produto = await this.JogoRepository.getJogoById(compra.id_produto);
    compra.preco = produto.preco;
    return await this.compraRepository.editarCompra(compra);
  }
  async findCompraByID(id) {
    return await this.compraRepository.findCompraByID(id);
  }
  async findComprasByUsuarioId(id_usuario) {
    return await this.compraRepository.getProdutosCompradosPorCliente(id_usuario);
  }
  async findMediaComprasByUsuarioId(id_usuario) {

    return await this.compraRepository.findMediaComprasByUsuarioId(id_usuario);
  }
  async findComprasByProdutoId(id_produto) {
    return await this.compraRepository.findComprasByProdutoId(id_produto);
  }
  async findProdutosMaisCompradosByProdutoId(id_produto) {
    return await this.compraRepository.findProdutosMaisCompradosByProdutoId(id_produto);
  }
}

module.exports = CompraService;

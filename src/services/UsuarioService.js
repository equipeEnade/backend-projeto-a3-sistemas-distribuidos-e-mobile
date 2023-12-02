const UsuarioRepository = require('../repositories/UsuarioRepository');

class UsuarioService {
    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async getAllUsuarios() {
        return await this.usuarioRepository.getAllUsuarios();
    }

    async deletarUsuario(id) {
        return await this.usuarioRepository.deletarUsuario(id);
    }

    async cadastrarUsuario(usuario) {
        return await this.usuarioRepository.cadastrarUsuario(usuario);
    }

    async editarUsuario(usuario) {
        return await this.usuarioRepository.editarUsuario(usuario);
    }

    async findUsuarioByID(id) {
        return await this.usuarioRepository.findUsuarioByID(id);
    }

}

module.exports = UsuarioService;

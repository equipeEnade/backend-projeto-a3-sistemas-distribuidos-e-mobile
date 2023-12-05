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
        usuario.role = "USER"
        return await this.usuarioRepository.cadastrarUsuario(usuario);
    }

    async editarUsuario(usuario) {
        usuario.role = "USER"
        return await this.usuarioRepository.editarUsuario(usuario);
    }

    async findUsuarioByID(id) {
        return await this.usuarioRepository.findUsuarioByID(id);
    }

    async login(login) {
        const usuarios = await this.usuarioRepository.getAllUsuarios();
        var usuario
        usuarios.forEach(element => {
            if(login.senha == element.senha && login.email == element.email) {
                usuario = element
            }
        });
        return usuario? usuario.id : false
    }

}

module.exports = UsuarioService;

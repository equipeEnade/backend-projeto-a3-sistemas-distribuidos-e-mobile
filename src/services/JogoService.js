const JogoRepository = require('../repositories/JogoRepository');

class JogoService {
    constructor() {
        this.jogoRepository = new JogoRepository();
    }

    async getAllJogos() {
        try {
            return await this.jogoRepository.getAllJogos();
        } catch (error) {
            throw new Error(`Erro ao buscar todos os jogos: ${error.message}`);
        }
    }

    async put(jogo) {
        return await this.jogoRepository.editarJogo(jogo);
    }

    async getJogoById(id) {
        try {
            return await this.jogoRepository.getJogoById(id);
        } catch (error) {
            throw new Error(`Erro ao buscar jogo por ID: ${error.message}`);
        }
    }
    async deletarJogo(id) {
        return await this.jogoRepository.deletarJogo(id);
    }

    async getJogosByPlataformas(plataformas) {
        try {
            return await this.jogoRepository.getJogosByPlataformas(plataformas);
        } catch (error) {
            throw new Error(`Erro ao buscar jogos por plataformas: ${error.message}`);
        }
    }

    async getJogosByCategorias(categoria) {
        try {
            return await this.jogoRepository.getJogosByCategorias(categoria);
        } catch (error) {
            throw new Error(`Erro ao buscar jogos por categoria: ${error.message}`);
        }
    }

    async postNewComentario(jogoId, comentario) {
        try {
            return await this.jogoRepository.postNewComentario(jogoId, comentario);
        } catch (error) {
            throw new Error(`Erro ao adicionar comentário ao jogo: ${error.message}`);
        }
    }

    async postNewJogo(jogo) {
        jogo.nota = null
        try {
            return await this.jogoRepository.post(jogo);
        } catch (error) {
            throw new Error(`Erro ao adicionar novo jogo: ${error.message}`);
        }
    }
    async postNota(idJogo, nota) {
        try {
            return await this.jogoRepository.postNota(idJogo, nota);
        } catch (error) {
            throw new Error(`Erro ao dar nota ao jogo: ${error.message}`);
        }
    }
}

module.exports = JogoService;

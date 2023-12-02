const JogoRepository = require('../repositories/JogoRepository');

class JogoService {
    constructor() {
        this.jogoRepository = new JogoRepository();
    }

    async getAllJogos() {
        return await this.jogoRepository.getAllJogos();
    }
}

module.exports = JogoService;

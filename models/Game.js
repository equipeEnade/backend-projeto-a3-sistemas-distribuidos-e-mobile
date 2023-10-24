const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageURL: String,
    genre: String,
    releaseDate: Date,
    developer: String,
    platform: [String]
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game

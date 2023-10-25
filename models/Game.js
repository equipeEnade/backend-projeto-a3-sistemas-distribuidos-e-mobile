const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageURL: String,
    genre: [String],
    releaseDate: Date,
    developer: String,
    platform: [String],
    status: String,
    rate: Number
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game

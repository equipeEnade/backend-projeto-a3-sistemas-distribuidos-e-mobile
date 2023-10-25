const router = require("express").Router();
const Game = require("../models/Game");
const path = "/";

router.get(`${path}`, async (req, res) => {
  const {
    name,
    price,
    description,
    genre,
    releaseDate,
    developer,
    platform,
    imageURL,
    status,
    rate,
  } = req.query;

  let query = {};

  if (name) query.name = name;
  if (price) query.price = price;
  if (description) query.description = description;
  if (genre) query.genre = genre;
  if (releaseDate) query.releaseDate = releaseDate;
  if (developer) query.developer = developer;
  if (platform) query.platform = platform;
  if (imageURL) query.imageURL = imageURL;
  if (status) query.status = status;
  if (rate) query.rate = rate;

  let games = [];
  try {
    games = await Game.find(query)
    res.json({
      Message: "Games",
      Games: games,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(`${path}`, async (req, res) => {
  const {
    name,
    price,
    description,
    genre,
    releaseDate,
    developer,
    platform,
    imageURL,
    status,
    rate,
  } = req.body;

  const gameToPost = {
    name,
    price,
    description,
    genre,
    releaseDate,
    developer,
    platform,
    imageURL,
    status,
    rate,
  };
  try {
    await Game.create(gameToPost);

    res.status(201).json({
      Message: "Game Created!",
      Data: gameToPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "We were unable to register the data",
      error: error,
    });
  }
});

router.delete(`${path}:id`, async (req, res) => {
  const gameId = req.params.id;

  try {
    const game = await Game.findByIdAndDelete(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the game" });
  }
});

router.put(`${path}:id`, async (req, res) => {
  const gameId = req.params.id;
  const newData = req.body;

  try {
    const game = await Game.findByIdAndUpdate(gameId, newData, { new: true });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json({ message: "Game updated successfully", updatedGame: game });
  } catch (error) {
    res.status(500).json({ error: "Error updating the game" });
  }
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const USER = "EnadeUser";
const PASSWORD = "mBNYm8C13vlHuXZx";
const Game = require("./models/Game");
const path = "/api/v1"
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get(`${path}/get`, (req, res) => {
    
  res.status(200).json({
    Message: "Hello World",
  });
});

app.get(`${path}/get/games`, async (req, res) => {
    try {
      const games = await Game.find();
      res.json({
        Message: "Games",
        Games: games,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error when searching for games' });
    }
  });

app.post(`${path}/post`, async (req, res) => {
  const {name,price,description,genre,releaseDate,developer,platform,imageURL,} = req.body;
  const gameToPost = {name,price,description,genre,releaseDate,developer,platform,imageURL,};

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

mongoose
  .connect(
    `mongodb+srv://${USER}:${PASSWORD}@db-enade-games.z7obtth.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(2004);
    console.log("Connection Successful");
  })
  .catch((error) => {
    console.log(error);
  });

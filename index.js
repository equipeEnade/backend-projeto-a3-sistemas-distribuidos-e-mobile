const express = require("express");
const mongoose = require("mongoose");
const app = express();
const USER = "EnadeUser";
const PASSWORD = "mBNYm8C13vlHuXZx";
const path = "/api/v1"
const gameRoutes = require('./routes/gameRoutes')
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(`${path}/game`, gameRoutes)
//app.use(`${path}/user`, userRoutes)


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

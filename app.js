const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // <--- Adicionado aqui
require("dotenv").config();

const app = express();
const port = 3000;

// Habilita o CORS
app.use(cors());
app.use(express.json());

const Film = mongoose.model("Film", {
  title: String,
  descripition: String,
  image_url: String,
  trailer_url: String,
});

app.get("/", async (req, res) => {
  const films = await Film.find();
  res.send(films);
});

app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    descripition: req.body.descripition,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  });
  await film.save();
  res.send(film);
});

app.listen(port, () => {
  mongoose.connect(process.env.MONGODB_URI);
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});

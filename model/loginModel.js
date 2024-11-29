const mongoose = require("mongoose");

const filmeShema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
});

const Filme = mongoose.model("Filme", filmeShema);

module.exports = Filme;

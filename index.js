const express = require("express");
const rotas = require("./routes/loginRotas");
const servidor = express();
const cors = require("cors");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();

servidor.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Banco conectado"))
  .catch((erro) => console.log);

servidor.use(express.json());

servidor.post("/login", (req, res, next) => {
  const { usuario, senha } = req.body;

  if (usuario === "Nicolas" && senha === "12345678") {
    const SECRET = process.env.SECRET;

    const id = 1;
    const token = jwt.sign({ id }, SECRET, {
      expiresIn: 99999,
    });
    return res.json({ autenticacao: true, toke: token });
  }
  return res.status(500).send("Usuario ou senha incorreto.");
});

function verificaToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(500)
      .json({ autenticacao: false, mensagem: "Token inválido" });
  }

  const SECRET = process.env.SECRET;

  jwt.verify(token, SECRET, function (error, decoded) {
    if (error) {
      res
        .status(500)
        .json({ autenticacao: false, mensagem: "Fala ao validar o Token" });
    }

    req.usuarioId = decoded.id;
    next();
  });
}

//Adicionando Rotas dos Filmes
servidor.use(verificaToken);
servidor.use(rotas);

servidor.listen(3003, () => {
  console.log("Servidor Iniciado");
});

const express = require("express");
const rotas = express.Router();

const mongoose = require("mongoose");
const Filme = require("../model/loginModel");

//Buscando Informações com metodo GET
rotas.get("/filmes", async (req, res) => {
  try {
    const filmes = await Filme.find();
    res.send(filmes);
  } catch (error) {
    res.status(500).send("Houve algum erro na busca do registro");
  }
});

//Inserindo Novas Informações com metodo POST
rotas.post("/filmes", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const novoFilme = new Filme({
      nome: nome,
      email: email,
      senha: senha,
    });

    await novoFilme.save();
    res.send("Registro inserido no banco com sucesso");
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocorreu algum erro ao inserir dados no banco");
  }
});

//Alterar Informações com metodo PUT
rotas.put("/filmes/:id", async (req, res) => {
  const filmeId = req.params.id;
  const { nome, email, senha } = req.body;

  try {
    //Encontrar e atualizar o filme pelo ID
    const filme = await Filme.findByIdAndUpdate(filmeId, {
      nome: nome,
      email: email,
      senha: senha,
    });

    if (!filme) {
      return res.status(404).send("Login não encontrado");
    }
    res.send("Login alterado com sucesso");
  } catch (error) {
    res.send(error);
  }
});

//Deletando registro com metodo DELETE
rotas.delete("/filmes/:id", async (req, res) => {
  const filmeId = req.params.id;

  try {
    const loginDeletado = await Filme.findByIdAndDelete(filmeId);

    if (!filmeDeletado) {
      res.status(404).send("Login não encontrado");
    }
    res.send("Login Deletado com sucesso");
  } catch (error) {
    res.status(500).send("Error ao deletar usuario!");
  }
});

module.exports = rotas;

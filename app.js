import express from 'express';
import fs from "node:fs";
import path from "node:path";

const __dirname = import.meta.dirname;

const { PORT = 3000 } = process.env;

const app = express();

let users = []
let cards = []

const file = path.join(__dirname, 'data', 'users.json')
  fs.readFile(file, (error, data)=>{
    if (error) {
      console.log('Erro Leitura', error);
      users = {error:'Arquivo nao encontrado'}
    } else {
      users = JSON.parse(data);
    }
  })

const fileCard = path.join(__dirname, 'data', 'cards.json')
  fs.readFile(fileCard, (error, data)=>{
    if (error) {
      console.log('Erro Leitura', error);
      cards = {error:'Arquivo nao encontrado'}
    } else {
      cards = JSON.parse(data);
    }
  })

app.get('/users', (req, res) => {
  if (users.error) {
    res.status(404).send({ "message": "Usuário não encontrado" });
  }
  return res.json(users);
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  const user = users.find((u) => u._id == id)
  if (!user) {
    res.status(404).send({ "message": "ID do usuário não encontrado" });
  }
  res.json(user || {error: 'User ${id} not found'});
})

app.get('/cards', (req, res) => {
  if (cards.error) {
    res.status(404).send({ "message": "Cartões não encontrado" });
  }
  return res.json(cards);
})

app.use("/", (req, res) => {
  res.send({ message: 'Bem-Vindo a API do Projeto Around da Tripleten' });
});

app.use((req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT,()=> {
  console.log("Aplicativo executando na porta " + PORT)
})
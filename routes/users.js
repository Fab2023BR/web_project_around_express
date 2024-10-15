import { Router } from "express";
import fs from "node:fs";
import path from "node:path";
import { v4 } from "uuid";

const __dirname = import.meta.dirname;
const router = Router()
let users = []

const file = path.join(__dirname, '..', 'data', 'users.json')
  fs.readFile(file, (error, data)=>{
    if (error) {
      console.log('Erro Leitura', error);
      users = {error:'Arquivo nao encontrado'}
    } else {
      users = JSON.parse(data)
    }
  })

router.get('/', (req, res) => {
  if (users.error) {
    res.status(404)
  }
  return res.json(users)
})

router.get('/id', (req, res) => {
  const { id } = req.params
  const user = users.find((u) => u.id ==id)
  if (!user) {
    res.status(404)
  }
  res.json(user || {error: 'User ${id} not found'})
})

router.post('/id', (req, res) => {
  const body = req.body;
  if (body.name.length > 5) {

  }
  const newUser = { id: v4(), ...body }
  users.push(newUser)
  res.status(201).json(newUser)
})

router.put('/id', (req, res) => {
  const { id } = req.params
  const body = req.body
  const user = users.find((u) => u.id ==id)
  if (!user) {
    return res.status(404).json({error: 'User ${id} not found'})
  }
  for (const key in body) {
    user[key] = body[key]
  }
  //garante que atualiza todas as chaves
  res.json(user || {error: 'User ${id} not found'})
})

export { router }
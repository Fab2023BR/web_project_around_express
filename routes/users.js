import { Router } from 'express';
import { v4 } from 'uuid';
import users from '../data/users.json' assert { type: 'json' };

const router = Router();

router.get('/', (req, res) => {
  if (users.error) {
    return res.status(404).send({ message: 'Usuário não encontrado' });
  }
  return res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u._id === id);
  if (!user) {
    return res.status(404).send({ message: 'ID do usuário não encontrado' });
  }
  return res.json(user);
});

router.post('/', (req, res) => {
  const { body } = req;
  const newUser = { id: v4(), ...body };
  users.push(newUser);
  return res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: `Usuário com o Id: ${id} não encontrado` });
  }
  for (const key in body) {
    user[key] = body[key];
  }
  // garante que atualiza todas as chaves
  return res.json(user);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: `Usuário com o Id: ${id} não encontrado` });
  }
  users.splice(users.indexOf(user), 1);
  return res.json(204).json();
});

export default router;

import { Router } from 'express';
import cards from '../data/cards.json' assert { type: 'json' };

const router = Router();

router.get('/', (req, res) => {
  if (cards.error) {
    return res.status(404).send({ message: 'Cartões não encontrado' });
  }
  return res.json(cards);
});

export default router;

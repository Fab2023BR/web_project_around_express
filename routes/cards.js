import { Router } from 'express';
import { getCards, createCard, deleteCardById } from '../controllers/cards.js';
const router = Router();

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);

export default router;

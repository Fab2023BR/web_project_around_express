import { Router } from 'express';
import { getCards, createCard, deleteCardById, likeCard, dislikeCard } from '../controllers/cards.js';
const router = Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:userId', likeCard);
router.delete('/:userId', dislikeCard);

export default router;

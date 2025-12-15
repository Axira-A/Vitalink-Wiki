import { Router } from 'express';
import { getArticle, createArticle, updateArticle, getHistory } from '../controllers/wikiController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/:slug', getArticle);
router.post('/', authenticateToken, createArticle);
router.put('/:slug', authenticateToken, updateArticle);
router.get('/:slug/history', getHistory);

export default router;

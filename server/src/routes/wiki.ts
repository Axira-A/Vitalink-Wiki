import { Router } from 'express';
import { getArticle, createArticle, updateArticle, getHistory, saveDraft, getCategories } from '../controllers/wikiController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/categories', getCategories);
router.get('/:slug', getArticle);
router.post('/', authenticateToken, createArticle);
router.put('/:slug', authenticateToken, updateArticle);
router.post('/:slug/draft', authenticateToken, saveDraft);
router.get('/:slug/history', getHistory);

export default router;

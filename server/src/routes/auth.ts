import { Router } from 'express';
import { register, login, me, activate } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/activate', activate);
router.get('/me', authenticateToken, me);

export default router;

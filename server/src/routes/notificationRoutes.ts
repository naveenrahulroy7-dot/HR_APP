import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', protect, getNotifications);
router.post('/read', protect, markAsRead);

export default router;

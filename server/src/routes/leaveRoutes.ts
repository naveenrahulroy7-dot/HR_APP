import express from 'express';
import {
    getAllLeaveRequests,
    getMyLeaveRequests,
    getAllLeaveBalances,
    getMyLeaveBalances,
    submitLeaveRequest,
    actionLeaveRequest,
} from '../controllers/leaveController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllLeaveRequests);
router.get('/my', protect, getMyLeaveRequests);
router.post('/', protect, submitLeaveRequest);
router.put('/:id/action', protect, actionLeaveRequest);

router.get('/balances', protect, getAllLeaveBalances);
router.get('/balances/my', protect, getMyLeaveBalances);

export default router;

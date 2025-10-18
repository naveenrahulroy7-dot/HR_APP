import express from 'express';
import { 
    getHolidays, 
    createHoliday, 
    updateHoliday, 
    deleteHoliday 
} from '../controllers/holidayController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getHolidays)
    .post(protect, createHoliday);

router.route('/:id')
    .put(protect, updateHoliday)
    .delete(protect, deleteHoliday);

export default router;

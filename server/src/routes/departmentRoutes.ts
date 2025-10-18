import express from 'express';
import {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
} from '../controllers/departmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getDepartments)
    .post(protect, createDepartment);

router.route('/:id')
    .put(protect, updateDepartment)
    .delete(protect, deleteDepartment);

export default router;

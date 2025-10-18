import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controllers/departmentController.js';

const router = express.Router();

router.route('/')
  .get(protect, getDepartments)
  .post(protect, createDepartment);

router.route('/:id')
  .put(protect, updateDepartment)
  .delete(protect, deleteDepartment);

export default router;

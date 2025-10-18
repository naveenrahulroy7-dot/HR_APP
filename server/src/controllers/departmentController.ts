import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import prisma from '../db.js';

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
export const getDepartments = asyncHandler(async (req: Request, res: Response) => {
    const departments = await prisma.department.findMany({
        orderBy: { name: 'asc' }
    });
    res.json(departments);
});

// @desc    Create a new department
// @route   POST /api/departments
// @access  Private (Admin/HR)
export const createDepartment = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, headId } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Department name is required');
    }

    const department = await prisma.department.create({
        data: {
            name,
            description,
            headId: headId || null,
        }
    });
    res.status(201).json(department);
});

// @desc    Update a department
// @route   PUT /api/departments/:id
// @access  Private (Admin/HR)
export const updateDepartment = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, headId } = req.body;
    const department = await prisma.department.update({
        where: { id: req.params.id },
        data: {
            name,
            description,
            headId: headId || null,
        }
    });
    res.json(department);
});

// @desc    Delete a department
// @route   DELETE /api/departments/:id
// @access  Private (Admin/HR)
export const deleteDepartment = asyncHandler(async (req: Request, res: Response) => {
    const departmentId = req.params.id;

    const employeeCount = await prisma.employee.count({
        where: { departmentId }
    });

    if (employeeCount > 0) {
        res.status(400);
        throw new Error('Cannot delete department with employees');
    }

    await prisma.department.delete({
        where: { id: departmentId }
    });

    res.json({ message: 'Department removed' });
});

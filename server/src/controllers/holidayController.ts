import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import prisma from '../db.js';

// @desc    Get all holidays
// @route   GET /api/holidays
// @access  Private
export const getHolidays = asyncHandler(async (req: Request, res: Response) => {
    const holidays = await prisma.holiday.findMany({
        orderBy: { date: 'asc' }
    });
    res.json(holidays);
});

// @desc    Create a holiday
// @route   POST /api/holidays
// @access  Private (Admin/HR)
export const createHoliday = asyncHandler(async (req: Request, res: Response) => {
    const { name, date, description, isOptional } = req.body;
    const holiday = await prisma.holiday.create({
        data: { name, date: new Date(date), description, isOptional: isOptional || false }
    });
    res.status(201).json(holiday);
});

// @desc    Update a holiday
// @route   PUT /api/holidays/:id
// @access  Private (Admin/HR)
export const updateHoliday = asyncHandler(async (req: Request, res: Response) => {
    const { name, date, description, isOptional } = req.body;
    const holiday = await prisma.holiday.update({
        where: { id: req.params.id },
        data: { name, date: new Date(date), description, isOptional }
    });
    res.json(holiday);
});

// @desc    Delete a holiday
// @route   DELETE /api/holidays/:id
// @access  Private (Admin/HR)
export const deleteHoliday = asyncHandler(async (req: Request, res: Response) => {
    await prisma.holiday.delete({ where: { id: req.params.id } });
    res.json({ message: 'Holiday removed' });
});

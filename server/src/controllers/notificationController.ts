import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import prisma from '../db.js';

// @desc    Get my notifications
// @route   GET /api/notifications
// @access  Private
export const getMyNotifications = asyncHandler(async (req: any, res: Response) => {
    const notifications = await prisma.notification.findMany({
        where: { employeeId: req.user.id },
        orderBy: { createdAt: 'desc' },
    });
    res.json(notifications);
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = asyncHandler(async (req: any, res: Response) => {
    const notification = await prisma.notification.update({
        where: { id: req.params.id },
        data: { isRead: true }
    });
    res.json(notification);
});

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllAsRead = asyncHandler(async (req: any, res: Response) => {
    await prisma.notification.updateMany({
        where: { 
            employeeId: req.user.id,
            isRead: false 
        },
        data: { isRead: true }
    });
    res.json({ message: 'All notifications marked as read' });
});

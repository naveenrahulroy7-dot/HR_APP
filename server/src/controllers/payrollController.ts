import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import prisma from '../db.js';
import { AttendanceStatus, EmployeeStatus, PayrollStatus } from '@prisma/client';

// @desc    Get all payroll records
// @route   GET /api/payroll
// @access  Private (Admin/HR)
export const getAllPayroll = asyncHandler(async (req: Request, res: Response) => {
    const records = await prisma.payrollRecord.findMany({
        orderBy: [{ year: 'desc' }, { month: 'desc' }]
    });
    res.json(records);
});

// @desc    Get my payroll records
// @route   GET /api/payroll/my
// @access  Private
export const getMyPayroll = asyncHandler(async (req: any, res: Response) => {
    const records = await prisma.payrollRecord.findMany({
        where: { employeeId: req.user.id },
        orderBy: [{ year: 'desc' }, { month: 'desc' }]
    });
    res.json(records);
});

// @desc    Generate payroll for a given month and year
// @route   POST /api/payroll/generate
// @access  Private (Admin/HR)
export const generatePayroll = asyncHandler(async (req: Request, res: Response) => {
    const { month, year } = req.body;

    const existingPayroll = await prisma.payrollRecord.findFirst({
        where: { month, year }
    });
    if (existingPayroll) {
        res.status(400);
        throw new Error(`Payroll for this period has already been generated.`);
    }

    const employeesToProcess = await prisma.employee.findMany({
        where: { status: EmployeeStatus.Active }
    });

    const newPayrollRecords = [];

    for (const emp of employeesToProcess) {
        if (!emp.salary) continue;
        
        const annualSalary = emp.salary;
        const basicSalary = annualSalary / 12;
        const allowances = basicSalary * 0.2; // 20% allowances

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const absentDays = await prisma.attendance.count({
            where: {
                employeeId: emp.id,
                date: { gte: startDate, lte: endDate },
                status: AttendanceStatus.Absent
            }
        });

        // Assuming 22 working days in a month for deduction calculation
        const absenceDeduction = absentDays * (basicSalary / 22);
        const providentFund = basicSalary * 0.12;
        const tax = basicSalary > 50000 ? (basicSalary - 50000) * 0.1 : 0;
        
        const totalDeductions = absenceDeduction + providentFund + tax;
        const netSalary = basicSalary + allowances - totalDeductions;

        const record = await prisma.payrollRecord.create({
            data: {
                employeeId: emp.id,
                month,
                year,
                basicSalary: parseFloat(basicSalary.toFixed(2)),
                allowances: parseFloat(allowances.toFixed(2)),
                deductions: parseFloat(totalDeductions.toFixed(2)),
                netSalary: parseFloat(netSalary.toFixed(2)),
                status: PayrollStatus.Pending,
            }
        });
        newPayrollRecords.push(record);
    }
    
    res.status(201).json(newPayrollRecords);
});


// @desc    Mark a payroll record as paid
// @route   POST /api/payroll/:id/mark-paid
// @access  Private (Admin/HR)
export const markAsPaid = asyncHandler(async (req: Request, res: Response) => {
    const updatedRecord = await prisma.payrollRecord.update({
        where: { id: req.params.id },
        data: { status: PayrollStatus.Paid }
    });
    res.json(updatedRecord);
});

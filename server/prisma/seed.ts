import { PrismaClient, UserRole, EmployeeStatus, EmployeeType, LeaveStatus, LeaveType, AttendanceStatus, PayrollStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';

const prisma = new PrismaClient();

const generateAvatar = (name: string): string => {
    const initials = (name || '?').trim().split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect width="100%" height="100%" fill="#3B82F6" /><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="60" font-family="sans-serif" font-weight="600">${initials}</text></svg>`;
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

async function main() {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await prisma.notification.deleteMany();
    await prisma.payrollRecord.deleteMany();
    await prisma.leaveRequest.deleteMany();
    await prisma.leaveBalance.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.department.deleteMany();
    await prisma.holiday.deleteMany();

    console.log('✨ Cleared existing data');

    // Create Departments
    const departments = await Promise.all([
        prisma.department.create({
            data: {
                name: 'Engineering',
                description: 'Software development and technical operations',
            }
        }),
        prisma.department.create({
            data: {
                name: 'Human Resources',
                description: 'HR management and employee relations',
            }
        }),
        prisma.department.create({
            data: {
                name: 'Marketing',
                description: 'Marketing and brand management',
            }
        }),
        prisma.department.create({
            data: {
                name: 'Sales',
                description: 'Sales and business development',
            }
        }),
        prisma.department.create({
            data: {
                name: 'Finance',
                description: 'Finance and accounting',
            }
        }),
    ]);

    console.log('✅ Created departments');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    // Create Employees
    const employees = [
        {
            name: 'Admin User',
            email: 'admin@hrms.com',
            phone: '+1-555-0101',
            role: UserRole.Admin,
            departmentId: departments[1].id, // HR
            salary: 120000,
            employeeType: EmployeeType.FullTime,
            status: EmployeeStatus.Active,
        },
        {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@hrms.com',
            phone: '+1-555-0102',
            role: UserRole.HR,
            departmentId: departments[1].id,
            salary: 90000,
            employeeType: EmployeeType.FullTime,
            status: EmployeeStatus.Active,
        },
        {
            name: 'Michael Chen',
            email: 'michael.chen@hrms.com',
            phone: '+1-555-0103',
            role: UserRole.Manager,
            departmentId: departments[0].id, // Engineering
            salary: 110000,
            employeeType: EmployeeType.FullTime,
            status: EmployeeStatus.Active,
        },
        {
            name: 'Emily Rodriguez',
            email: 'emily.rodriguez@hrms.com',
            phone: '+1-555-0104',
            role: UserRole.Employee,
            departmentId: departments[0].id,
            salary: 85000,
            employeeType: EmployeeType.FullTime,
            status: EmployeeStatus.Active,
        },
        {
            name: 'David Kim',
            email: 'david.kim@hrms.com',
            phone: '+1-555-0105',
            role: UserRole.Employee,
            departmentId: departments[2].id, // Marketing
            salary: 75000,
            employeeType: EmployeeType.FullTime,
            status: EmployeeStatus.Active,
        },
        {
            name: 'Jessica Martinez',
            email: 'jessica.martinez@hrms.com',
            phone: '+1-555-0106',
            role: UserRole.Employee,
            departmentId: departments[3].id, // Sales
            salary: 80000,
            employeeType: EmployeeType.FullTime,
            status: EmployeeStatus.Active,
        },
        {
            name: 'Robert Taylor',
            email: 'robert.taylor@hrms.com',
            phone: '+1-555-0107',
            role: UserRole.Employee,
            departmentId: departments[4].id, // Finance
            salary: 95000,
            employeeType: EmployeeType.FullTime,
            status: EmployeeStatus.Active,
        },
        {
            name: 'Amanda White',
            email: 'amanda.white@hrms.com',
            phone: '+1-555-0108',
            role: UserRole.Employee,
            departmentId: departments[0].id, // Engineering
            salary: 70000,
            employeeType: EmployeeType.Contract,
            status: EmployeeStatus.Active,
        },
        {
            name: 'Chris Anderson',
            email: 'chris.anderson@hrms.com',
            phone: '+1-555-0109',
            role: UserRole.Employee,
            departmentId: departments[2].id, // Marketing
            salary: 65000,
            employeeType: EmployeeType.PartTime,
            status: EmployeeStatus.Active,
        },
        {
            name: 'Lisa Thompson',
            email: 'lisa.thompson@hrms.com',
            phone: '+1-555-0110',
            role: UserRole.Employee,
            departmentId: departments[3].id, // Sales
            salary: 50000,
            employeeType: EmployeeType.Intern,
            status: EmployeeStatus.Active,
        },
    ];

    const createdEmployees = [];
    for (const emp of employees) {
        const mfaSecret = speakeasy.generateSecret({ length: 20 }).base32;
        const employee = await prisma.employee.create({
            data: {
                ...emp,
                employeeId: `EMP${String(createdEmployees.length + 1).padStart(4, '0')}`,
                passwordHash,
                mfaSecret,
                isMfaSetup: false,
                avatarUrl: generateAvatar(emp.name),
                joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            }
        });
        createdEmployees.push(employee);

        // Create leave balances for each employee
        await prisma.leaveBalance.createMany({
            data: [
                { employeeId: employee.id, type: 'Annual', total: 20, used: Math.floor(Math.random() * 5), pending: 0 },
                { employeeId: employee.id, type: 'Sick', total: 10, used: Math.floor(Math.random() * 3), pending: 0 },
                { employeeId: employee.id, type: 'Casual', total: 5, used: Math.floor(Math.random() * 2), pending: 0 },
                { employeeId: employee.id, type: 'Unpaid', total: 99, used: 0, pending: 0 },
            ]
        });
    }

    console.log('✅ Created employees with leave balances');

    // Create Holidays
    const currentYear = new Date().getFullYear();
    await prisma.holiday.createMany({
        data: [
            { name: 'New Year\'s Day', date: new Date(currentYear, 0, 1), description: 'Start of the new year' },
            { name: 'Martin Luther King Jr. Day', date: new Date(currentYear, 0, 15), description: 'Honoring MLK' },
            { name: 'Presidents\' Day', date: new Date(currentYear, 1, 19), description: 'Honoring US presidents' },
            { name: 'Memorial Day', date: new Date(currentYear, 4, 27), description: 'Honoring fallen soldiers' },
            { name: 'Independence Day', date: new Date(currentYear, 6, 4), description: 'US Independence Day' },
            { name: 'Labor Day', date: new Date(currentYear, 8, 2), description: 'Celebrating workers' },
            { name: 'Thanksgiving', date: new Date(currentYear, 10, 28), description: 'Thanksgiving Day' },
            { name: 'Christmas Day', date: new Date(currentYear, 11, 25), description: 'Christmas celebration' },
            { name: 'Good Friday', date: new Date(currentYear, 3, 7), description: 'Religious holiday', isOptional: true },
            { name: 'Diwali', date: new Date(currentYear, 10, 12), description: 'Festival of lights', isOptional: true },
        ]
    });

    console.log('✅ Created holidays');

    // Create Attendance Records for the last 30 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (const employee of createdEmployees) {
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            // Skip weekends
            if (date.getDay() === 0 || date.getDay() === 6) continue;
            
            // Random attendance status (90% present, 5% late, 5% absent)
            const rand = Math.random();
            let status = AttendanceStatus.Present;
            if (rand > 0.95) status = AttendanceStatus.Absent;
            else if (rand > 0.90) status = AttendanceStatus.Late;
            
            if (status === AttendanceStatus.Present || status === AttendanceStatus.Late) {
                const clockIn = new Date(date);
                clockIn.setHours(9, Math.floor(Math.random() * 30), 0);
                
                const clockOut = new Date(date);
                clockOut.setHours(17, Math.floor(Math.random() * 60), 0);
                
                await prisma.attendance.create({
                    data: {
                        employeeId: employee.id,
                        date,
                        clockIn,
                        clockOut,
                        status,
                    }
                });
            } else {
                await prisma.attendance.create({
                    data: {
                        employeeId: employee.id,
                        date,
                        status,
                    }
                });
            }
        }
    }

    console.log('✅ Created attendance records');

    // Create some Leave Requests
    for (let i = 0; i < 15; i++) {
        const employee = createdEmployees[Math.floor(Math.random() * createdEmployees.length)];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 60));
        const days = Math.floor(Math.random() * 5) + 1;
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + days - 1);
        
        const leaveTypes = [LeaveType.Annual, LeaveType.Sick, LeaveType.Casual];
        const leaveType = leaveTypes[Math.floor(Math.random() * leaveTypes.length)];
        
        const statuses = [LeaveStatus.Pending, LeaveStatus.Approved, LeaveStatus.Rejected];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        await prisma.leaveRequest.create({
            data: {
                employeeId: employee.id,
                type: leaveType,
                startDate,
                endDate,
                days,
                reason: `${leaveType} leave for personal reasons`,
                status,
            }
        });
    }

    console.log('✅ Created leave requests');

    // Create Payroll Records for the last 3 months
    const currentDate = new Date();
    for (let i = 0; i < 3; i++) {
        const month = currentDate.getMonth() - i;
        const year = currentDate.getFullYear();
        
        for (const employee of createdEmployees) {
            if (!employee.salary) continue;
            
            const basicSalary = employee.salary / 12;
            const allowances = basicSalary * 0.2;
            const deductions = basicSalary * 0.15;
            const netSalary = basicSalary + allowances - deductions;
            
            await prisma.payrollRecord.create({
                data: {
                    employeeId: employee.id,
                    month: month < 0 ? month + 12 : month + 1,
                    year: month < 0 ? year - 1 : year,
                    basicSalary: parseFloat(basicSalary.toFixed(2)),
                    allowances: parseFloat(allowances.toFixed(2)),
                    deductions: parseFloat(deductions.toFixed(2)),
                    netSalary: parseFloat(netSalary.toFixed(2)),
                    status: i === 0 ? PayrollStatus.Pending : PayrollStatus.Paid,
                    paidDate: i === 0 ? null : new Date(year, month, 28),
                }
            });
        }
    }

    console.log('✅ Created payroll records');

    // Create Notifications
    for (const employee of createdEmployees.slice(0, 5)) {
        await prisma.notification.createMany({
            data: [
                {
                    employeeId: employee.id,
                    title: 'Welcome to HRMS',
                    message: 'Welcome to the HR Management System. Please update your profile.',
                    type: 'info',
                    isRead: false,
                },
                {
                    employeeId: employee.id,
                    title: 'Leave Request Update',
                    message: 'Your leave request has been approved.',
                    type: 'success',
                    isRead: false,
                },
            ]
        });
    }

    console.log('✅ Created notifications');

    console.log('🎉 Seeding completed successfully!');
    console.log('\n📧 Login credentials:');
    console.log('Admin: admin@hrms.com / password123');
    console.log('HR: sarah.johnson@hrms.com / password123');
    console.log('Manager: michael.chen@hrms.com / password123');
    console.log('Employee: emily.rodriguez@hrms.com / password123');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

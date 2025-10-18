export enum UserRole {
    Admin = 'Admin',
    HR = 'HR',
    Manager = 'Manager',
    Employee = 'Employee',
}

export enum EmployeeStatus {
    Active = 'Active',
    Inactive = 'Inactive',
}

export enum EmployeeType {
    Permanent = 'Permanent',
    Contract = 'Contract',
    Intern = 'Intern',
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  isMfaSetup: boolean;
  mfaSecret?: string;
  employeeId: string;
  phone: string;
  departmentId: string;
  joinDate: string;
  status: EmployeeStatus;
  employeeType: EmployeeType;
  salary: number;
}

export interface Department {
  id: string;
  name: string;
  managerId?: string;
}

export enum AttendanceStatus {
    Present = 'Present',
    Absent = 'Absent',
    Leave = 'Leave',
    HalfDay = 'Half-Day',
    NotMarked = 'Not Marked',
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  status: AttendanceStatus;
  clockIn?: string;
  clockOut?: string;
  workHours?: number;
}

export enum LeaveType {
    Annual = 'Annual',
    Sick = 'Sick',
    Casual = 'Casual',
    Unpaid = 'Unpaid',
}

export enum LeaveStatus {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected',
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  days: number;
}

export interface LeaveBalanceItem {
    type: LeaveType;
    total: number;
    used: number;
    pending: number;
}

export interface LeaveBalance {
    employeeId: string;
    balances: LeaveBalanceItem[];
}

export enum PayrollStatus {
    Paid = 'Paid',
    Generated = 'Generated',
    Pending = 'Pending',
}

export interface PayrollRecord {
    id: string;
    employeeId: string;
    month: number;
    year: number;
    basic: number;
    allowances: {
        hra: number;
        special: number;
    };
    deductions: {
        tax: number;
        providentFund: number;
        absence: number;
    };
    grossPay: number;
    netPay: number;
    status: PayrollStatus;
}

export interface Holiday {
  date: string;
  name: string;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    link?: string;
}

export enum TaskStatus {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Done = 'Done',
}

export enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    assigneeId: string;
    assignerId: string;
    assigneeName: string;
    assigneeAvatar: string;
}

# HRMS - Human Resource Management System

A comprehensive, production-ready full-stack HRMS application built with modern technologies.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js** with Express
- **TypeScript** - Type-safe JavaScript
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Speakeasy** - MFA/2FA support

## 📋 Features

### Core Modules
1. **Employee Management**
   - CRUD operations for employees
   - Role-based access control (Admin, HR, Manager, Employee)
   - Employee profiles with avatars
   - Department assignments

2. **Attendance Management**
   - Clock in/out functionality
   - Attendance tracking and history
   - Manual attendance updates (Admin/HR)
   - Real-time attendance status

3. **Leave Management**
   - Multiple leave types (Annual, Sick, Casual, Unpaid, Maternity, Paternity)
   - Leave balance tracking
   - Leave request approval workflow
   - Leave history and reporting

4. **Payroll Management**
   - Automated payroll generation
   - Salary calculations with allowances and deductions
   - Payroll history
   - Payment status tracking

5. **Department Management**
   - Department CRUD operations
   - Department head assignments
   - Employee distribution

6. **Holiday Management**
   - Company-wide holiday calendar
   - Optional holidays support
   - Holiday CRUD operations

7. **Authentication & Security**
   - JWT-based authentication
   - Multi-factor authentication (MFA)
   - Role-based access control
   - Secure password hashing

8. **Notifications**
   - Real-time notifications
   - Read/unread status tracking
   - Notification history

## 🛠️ Setup Instructions

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 13 (or use Docker)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hrms-fullstack-monorepo
```

### 2. Set Up PostgreSQL Database

#### Option A: Using Docker (Recommended)
```bash
# Start PostgreSQL and pgAdmin
docker-compose up -d

# Check if containers are running
docker ps
```

PostgreSQL will be available at `localhost:5432`
pgAdmin UI will be available at `http://localhost:5050` (admin@hrms.com / admin)

#### Option B: Local PostgreSQL Installation
Install PostgreSQL on your system and create a database:
```sql
CREATE DATABASE hrms_db;
```

### 3. Install Dependencies
```bash
# Install all dependencies (client + server)
npm install

# Or install individually
npm install --prefix client
npm install --prefix server
```

### 4. Configure Environment Variables

The `.env` file is already created in the `server` directory with default values. You can modify it if needed:

```bash
cd server
# Edit .env file with your database credentials
```

Default configuration:
- Database: `postgresql://postgres:postgres@localhost:5432/hrms_db`
- JWT Secret: Pre-configured (change in production)
- Port: 3001

### 5. Initialize Database

```bash
# Generate Prisma Client, push schema, and seed data
npm run db:setup
```

This will:
1. Generate Prisma Client
2. Create database tables
3. Seed initial data (employees, departments, holidays, etc.)

### 6. Start the Application

```bash
# Start both frontend and backend concurrently
npm run dev
```

Or start them separately:
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:client
```

### 7. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **API Health Check**: http://localhost:3001/api/health
- **pgAdmin**: http://localhost:5050 (if using Docker)

## 👥 Default Login Credentials

After seeding, you can log in with these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hrms.com | password123 |
| HR | sarah.johnson@hrms.com | password123 |
| Manager | michael.chen@hrms.com | password123 |
| Employee | emily.rodriguez@hrms.com | password123 |

## 📁 Project Structure

```
hrms-fullstack-monorepo/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── types.ts        # TypeScript types
│   │   └── main.tsx        # Entry point
│   ├── public/
│   └── package.json
│
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Database seeding script
│   ├── uploads/            # File uploads directory
│   └── package.json
│
├── docker-compose.yml      # Docker configuration
├── package.json            # Root package.json
└── README.md              # This file
```

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build both applications
- `npm run db:setup` - Initialize database with schema and seed data
- `npm run db:reset` - Reset database (WARNING: Deletes all data)
- `npm run db:studio` - Open Prisma Studio (Database GUI)

### Server
- `npm run dev --prefix server` - Start backend in development mode
- `npm run build --prefix server` - Build backend
- `npm run start --prefix server` - Start production server
- `npm run prisma:generate --prefix server` - Generate Prisma Client
- `npm run prisma:migrate --prefix server` - Run database migrations
- `npm run db:seed --prefix server` - Seed database

### Client
- `npm run dev --prefix client` - Start frontend in development mode
- `npm run build --prefix client` - Build frontend for production
- `npm run preview --prefix client` - Preview production build

## 🗄️ Database Schema

### Main Tables
- **Employee** - Employee information and authentication
- **Department** - Department structure
- **Attendance** - Daily attendance records
- **LeaveRequest** - Leave applications
- **LeaveBalance** - Leave balance tracking
- **PayrollRecord** - Payroll information
- **Holiday** - Company holidays
- **Notification** - User notifications

## 🔒 Security Features

1. **Password Security**
   - Passwords hashed using bcrypt
   - Minimum password requirements enforced

2. **Authentication**
   - JWT-based stateless authentication
   - Token expiration handling
   - Refresh token support

3. **Multi-Factor Authentication (MFA)**
   - TOTP-based 2FA
   - QR code generation for authenticator apps

4. **Authorization**
   - Role-based access control (RBAC)
   - Protected routes
   - API endpoint authorization

5. **Data Protection**
   - SQL injection prevention (Prisma ORM)
   - XSS protection
   - CORS configuration

## 🚀 Deployment

### Production Build

```bash
# Build both applications
npm run build

# Start production server
npm start
```

### Environment Variables for Production

Update `server/.env` with production values:
```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-super-secret-production-jwt-key"
NODE_ENV=production
PORT=3001
CLIENT_URL=https://your-frontend-domain.com
```

### Deployment Platforms

#### Backend
- **Heroku**: Add PostgreSQL addon and deploy
- **Railway**: Connect GitHub and deploy
- **DigitalOcean App Platform**: Deploy with managed database
- **AWS EC2**: Deploy with RDS PostgreSQL

#### Frontend
- **Vercel**: Connect GitHub and deploy
- **Netlify**: Build and deploy
- **AWS S3 + CloudFront**: Static hosting

#### Full-Stack
- **Docker**: Use provided docker-compose.yml
- **Kubernetes**: Create deployment manifests
- **VPS**: Deploy both on single server

## 📊 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update profile
- `PUT /api/auth/me/password` - Change password
- `POST /api/auth/setup-mfa` - Setup MFA
- `POST /api/auth/verify-mfa` - Verify MFA token

#### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `POST /api/employees/avatar` - Upload avatar

#### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

#### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/my` - Get my attendance
- `GET /api/attendance/today` - Get today's attendance
- `POST /api/attendance/clockin` - Clock in
- `POST /api/attendance/clockout` - Clock out
- `PUT /api/attendance/status` - Update attendance status

#### Leave Management
- `GET /api/leaves` - Get all leave requests
- `GET /api/leaves/my` - Get my leave requests
- `POST /api/leaves` - Submit leave request
- `PUT /api/leaves/:id/action` - Approve/Reject leave
- `GET /api/leaves/balances` - Get all leave balances
- `GET /api/leaves/balances/my` - Get my leave balances

#### Payroll
- `GET /api/payroll` - Get all payroll records
- `GET /api/payroll/my` - Get my payroll
- `POST /api/payroll/generate` - Generate payroll
- `POST /api/payroll/:id/mark-paid` - Mark as paid

#### Holidays
- `GET /api/holidays` - Get all holidays
- `POST /api/holidays` - Create holiday
- `PUT /api/holidays/:id` - Update holiday
- `DELETE /api/holidays/:id` - Delete holiday

#### Notifications
- `GET /api/notifications` - Get my notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps  # If using Docker
# OR
sudo systemctl status postgresql  # If using system PostgreSQL

# Test database connection
cd server
npx prisma db pull
```

### Port Already in Use
```bash
# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Prisma Client Issues
```bash
cd server
npx prisma generate
```

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules client/node_modules server/node_modules
npm install
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📧 Support

For issues and questions:
- Create an issue on GitHub
- Contact the development team

## 🎉 Acknowledgments

Built with modern best practices and production-ready architecture.

---

**Happy coding! 🚀**

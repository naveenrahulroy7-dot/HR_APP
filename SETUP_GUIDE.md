# HRMS Setup Guide - Complete Instructions

## 🎯 Quick Start (Recommended)

This guide will help you set up the complete HRMS application with PostgreSQL database.

## Prerequisites

Before starting, ensure you have:

- ✅ **Node.js** >= 18.0.0
- ✅ **npm** >= 9.0.0
- ✅ **PostgreSQL** >= 13 (or Docker)

Check your installations:
```bash
node --version   # Should show v18 or higher
npm --version    # Should show v9 or higher
```

---

## 📦 Database Setup Options

### Option 1: Using Docker (Easiest - Recommended)

**Step 1:** Install Docker
- **Mac**: Download [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
- **Windows**: Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
- **Linux**: 
  ```bash
  sudo apt-get update
  sudo apt-get install docker.io docker-compose
  sudo systemctl start docker
  sudo systemctl enable docker
  ```

**Step 2:** Start PostgreSQL
```bash
# From the project root directory
docker-compose up -d postgres

# Verify it's running
docker ps
```

You should see `hrms_postgres` container running.

**Step 3:** (Optional) Start pgAdmin for database management
```bash
docker-compose up -d pgadmin
```
Access pgAdmin at: http://localhost:5050
- Email: admin@hrms.com
- Password: admin

### Option 2: Install PostgreSQL Locally

#### macOS
```bash
# Using Homebrew
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb hrms_db
```

#### Ubuntu/Debian Linux
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user and create database
sudo -u postgres psql
CREATE DATABASE hrms_db;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE hrms_db TO postgres;
\q
```

#### Windows
1. Download [PostgreSQL installer](https://www.postgresql.org/download/windows/)
2. Run installer and follow the wizard
3. Remember the password you set for the `postgres` user
4. Open pgAdmin 4 (installed with PostgreSQL)
5. Create a new database named `hrms_db`

### Option 3: Use Cloud PostgreSQL (For Remote Development)

#### Free Options:
1. **Neon** (https://neon.tech) - Serverless PostgreSQL
   - Sign up for free account
   - Create a new project
   - Copy the connection string

2. **Supabase** (https://supabase.com)
   - Sign up for free account
   - Create a new project
   - Go to Settings > Database > Connection string
   - Copy the connection string

3. **Railway** (https://railway.app)
   - Sign up with GitHub
   - Create new project > Add PostgreSQL
   - Copy the connection string

**Update your connection string:**
Edit `server/.env` and replace the DATABASE_URL:
```env
DATABASE_URL="your-cloud-postgresql-connection-string"
```

---

## 🚀 Application Setup

### Step 1: Install Dependencies

```bash
# From the project root
npm install

# This will install both client and server dependencies
```

If you face issues, install them separately:
```bash
npm install --prefix client
npm install --prefix server
```

### Step 2: Configure Environment

The `.env` file is already created in `server/` directory with default values.

**If you're using local PostgreSQL with different credentials**, edit `server/.env`:
```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/hrms_db?schema=public"
```

**If you're using cloud PostgreSQL**, replace with your cloud connection string.

### Step 3: Initialize Database

```bash
# From the project root
npm run db:setup
```

This command will:
1. ✅ Generate Prisma Client
2. ✅ Push database schema (create all tables)
3. ✅ Seed initial data (employees, departments, holidays, etc.)

You should see output like:
```
🌱 Seeding database...
✨ Cleared existing data
✅ Created departments
✅ Created employees with leave balances
✅ Created holidays
✅ Created attendance records
✅ Created leave requests
✅ Created payroll records
✅ Created notifications
🎉 Seeding completed successfully!

📧 Login credentials:
Admin: admin@hrms.com / password123
HR: sarah.johnson@hrms.com / password123
Manager: michael.chen@hrms.com / password123
Employee: emily.rodriguez@hrms.com / password123
```

### Step 4: Start the Application

```bash
# Start both frontend and backend
npm run dev
```

Or start them separately in different terminals:

**Terminal 1 - Backend:**
```bash
npm run dev:server
```
Output: `🚀 Server running on http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev:client
```
Output: `Local: http://localhost:5173/`

### Step 5: Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api

---

## 🔐 Login Credentials

After seeding, use these credentials to log in:

| Role | Email | Password | Access Level |
|------|-------|----------|-------------|
| **Admin** | admin@hrms.com | password123 | Full system access |
| **HR** | sarah.johnson@hrms.com | password123 | Employee & leave management |
| **Manager** | michael.chen@hrms.com | password123 | Team management |
| **Employee** | emily.rodriguez@hrms.com | password123 | Self-service portal |

---

## 🔧 Troubleshooting

### Issue: "Port 5432 already in use"

**Solution 1:** Another PostgreSQL instance is running
```bash
# Find process using port 5432
lsof -i :5432
# OR
sudo netstat -tulpn | grep 5432

# Stop the process or use a different port
```

**Solution 2:** Use a different port in docker-compose.yml
```yaml
ports:
  - "5433:5432"  # Change 5432 to 5433
```
Update `server/.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/hrms_db?schema=public"
```

### Issue: "Port 3001 already in use"

```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Issue: "Port 5173 already in use"

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Issue: "Cannot connect to database"

**Check if PostgreSQL is running:**

Docker:
```bash
docker ps | grep postgres
```

Local installation:
```bash
# Mac/Linux
pg_isready -h localhost -p 5432

# Or check service status
sudo systemctl status postgresql  # Linux
brew services list  # Mac
```

**Test connection manually:**
```bash
cd server
npx prisma db pull
```

### Issue: "Prisma Client not generated"

```bash
cd server
npx prisma generate
```

### Issue: "Module not found"

```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules server/node_modules
npm install
```

### Issue: Database schema changes needed

```bash
# After modifying prisma/schema.prisma
cd server
npx prisma db push
npx prisma generate
```

---

## 📊 Database Management

### View Database with Prisma Studio

```bash
npm run db:studio
```
Opens Prisma Studio at http://localhost:5555

### Reset Database (WARNING: Deletes all data)

```bash
npm run db:reset
```

### Re-seed Database

```bash
cd server
npm run db:seed
```

### Create Database Backup

```bash
# Docker
docker exec hrms_postgres pg_dump -U postgres hrms_db > backup.sql

# Local
pg_dump -U postgres hrms_db > backup.sql
```

### Restore Database

```bash
# Docker
cat backup.sql | docker exec -i hrms_postgres psql -U postgres -d hrms_db

# Local
psql -U postgres -d hrms_db < backup.sql
```

---

## 🔍 Verification Checklist

After setup, verify everything is working:

- [ ] PostgreSQL is running (port 5432)
- [ ] Backend server is running (port 3001)
- [ ] Frontend is running (port 5173)
- [ ] Can access http://localhost:5173
- [ ] Can access http://localhost:3001/api/health
- [ ] Can login with admin@hrms.com / password123
- [ ] Dashboard loads with data
- [ ] Can view employees list
- [ ] Can view departments

---

## 🌐 API Testing

### Health Check
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{"status":"healthy","timestamp":"2024-10-18T..."}
```

### Login Test
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hrms.com","password":"password123"}'
```

### Get Employees (with token)
```bash
curl http://localhost:3001/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚀 Production Deployment

### Environment Variables for Production

Create `server/.env.production`:
```env
DATABASE_URL="your-production-postgres-url"
JWT_SECRET="super-secret-production-key-min-32-chars"
NODE_ENV=production
PORT=3001
CLIENT_URL=https://your-frontend-domain.com
```

### Build for Production

```bash
# Build both applications
npm run build
```

### Start Production Server

```bash
# Start backend
npm start
```

### Deploy Frontend

Build output is in `client/dist/`. Deploy to:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **AWS S3**: Upload `client/dist/` to S3 bucket

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🆘 Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review error messages carefully
3. Check database connection
4. Verify all dependencies are installed
5. Ensure ports are not in use
6. Try restarting the services

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ No error messages in server terminal
2. ✅ No error messages in client terminal
3. ✅ Can access the login page
4. ✅ Can log in successfully
5. ✅ Dashboard shows employee data, charts, and statistics
6. ✅ All navigation links work
7. ✅ Can perform CRUD operations (create/read/update/delete)

---

**Need more help?** Create an issue on GitHub or contact the development team.

**Happy coding! 🎉**

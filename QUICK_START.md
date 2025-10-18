# 🚀 Quick Start Guide - HRMS Backend

## Fastest Way to Get Running (5 minutes)

### Option 1: Using Cloud Database (Recommended - No Docker Needed)

**Step 1:** Get a free PostgreSQL database
- Go to https://neon.tech or https://supabase.com
- Sign up (free, no credit card)
- Create a new project
- Copy your database connection string

**Step 2:** Configure the project
```bash
cd server
# Edit .env file and paste your database URL
nano .env  # or use any text editor
```

Update this line:
```env
DATABASE_URL="paste-your-connection-string-here"
```

**Step 3:** Install and setup
```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push
npm run db:seed
```

**Step 4:** Start the server
```bash
npm run dev
```

**Done!** 🎉 Server running on http://localhost:3001

### Option 2: Using Docker

```bash
# Start PostgreSQL
docker-compose up -d postgres

# Install and setup
cd server
npm install
npx prisma generate
npx prisma db push
npm run db:seed

# Start server
npm run dev
```

## Test Your Setup

### 1. Health Check
```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{"status":"healthy","timestamp":"..."}
```

### 2. Login Test
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hrms.com","password":"password123"}'
```

You should get a token back!

### 3. Use the API

You can now:
- Use Postman/Insomnia to test all endpoints
- Connect any frontend application
- Build mobile apps
- Integrate with other systems

## Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hrms.com | password123 |
| HR | sarah.johnson@hrms.com | password123 |
| Manager | michael.chen@hrms.com | password123 |
| Employee | emily.rodriguez@hrms.com | password123 |

## API Endpoints

Base URL: `http://localhost:3001/api`

- **Auth**: `/auth/login`, `/auth/me`
- **Employees**: `/employees`
- **Departments**: `/departments`
- **Attendance**: `/attendance/clockin`, `/attendance/clockout`
- **Leave**: `/leaves`, `/leaves/balances`
- **Payroll**: `/payroll`, `/payroll/generate`
- **Holidays**: `/holidays`
- **Notifications**: `/notifications`

Full documentation in `README.md`

## Troubleshooting

**Can't connect to database?**
- Check your DATABASE_URL in `.env`
- Verify PostgreSQL is running (if using Docker: `docker ps`)
- Try using a cloud database instead

**Port already in use?**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

**Module errors?**
```bash
cd server
rm -rf node_modules
npm install
```

## Next Steps

1. ✅ Test API with Postman/Insomnia
2. ✅ Connect your frontend
3. ✅ Deploy to production

**Need help?** Check `SETUP_GUIDE.md` for detailed instructions.

---

**Ready for Production!** 🎉

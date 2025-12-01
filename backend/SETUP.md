# Backend Setup Guide

## Option 1: PostgreSQL (Recommended for Production)

### Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Create Database

```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL shell:
CREATE DATABASE lifequest;
CREATE USER snarky404 WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE lifequest TO snarky404;
\q
```

### Update .env
Make sure your `.env` has:
```
DATABASE_URL="postgresql://snarky404:password@localhost:5432/lifequest?schema=public"
```

### Set up database
```bash
npx prisma generate
npm run db:migrate
npm run db:seed
```

## Option 2: SQLite (Quick Start for Development)

### Update schema.prisma
Change the datasource to:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

### Update .env
Change DATABASE_URL to:
```
DATABASE_URL="file:./dev.db"
```

### Set up database
```bash
npx prisma generate
npm run db:push
npm run db:seed
```

## Starting the Server

```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on http://localhost:3000

## Testing the API

### Health Check
```bash
curl http://localhost:3000/health
```

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Current Status

✅ Backend structure created
✅ All routes and controllers implemented
✅ Prisma schema defined
✅ Dependencies installed
⏳ Database setup needed (choose PostgreSQL or SQLite above)
⏳ Run migrations
⏳ Start server

## Next Steps

1. Choose database option (PostgreSQL or SQLite)
2. Follow setup instructions for chosen option
3. Run migrations: `npm run db:migrate` or `npm run db:push`
4. Seed database: `npm run db:seed`
5. Start server: `npm run dev`
6. Update frontend to use API endpoints


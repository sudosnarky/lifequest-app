# LifeQuest Backend API

Backend API for LifeQuest - A real-life RPG for students that gamifies productivity and personal development.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT + bcrypt
- **Validation:** express-validator

## Features

- 🔐 JWT Authentication
- 👤 User profiles with XP and leveling system
- 📝 Daily and weekly quest management
- 🏆 Achievement system
- 📊 Category-based leaderboards
- 🎯 5 life categories: Academics, Fitness, Creativity, Exploration, Wellness
- 🔒 Secure password hashing
- ⚡ Rate limiting
- 🛡️ Security headers with Helmet

## Setup

### Prerequisites

- Node.js 16+ and npm
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

3. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npm run db:migrate

# Seed the database (optional)
npm run db:seed
```

4. Start the server:
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users (Protected)
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update profile
- `POST /api/users/me/avatar` - Update avatar
- `POST /api/users/me/xp` - Gain experience
- `POST /api/users/me/badges` - Add badge
- `GET /api/users/me/stats` - Get user stats

### Quests (Protected)
- `GET /api/quests` - Get all quests (supports filters)
- `GET /api/quests/:id` - Get single quest
- `POST /api/quests` - Create quest
- `PUT /api/quests/:id` - Update quest
- `DELETE /api/quests/:id` - Delete quest
- `POST /api/quests/:id/complete` - Complete quest
- `POST /api/quests/daily/reset` - Reset daily quests
- `POST /api/quests/weekly/reset` - Reset weekly quests

### Leaderboard (Protected)
- `GET /api/leaderboard` - Get overall leaderboard
- `GET /api/leaderboard/category/:category` - Get category leaderboard
- `GET /api/leaderboard/me` - Get current user's ranks

### Achievements (Protected)
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/me` - Get user's unlocked achievements
- `POST /api/achievements/:id/unlock` - Unlock achievement

## Database Schema

### User
- Profile information (email, username, name)
- Avatar customization
- Level and XP tracking
- Category-specific XP (academics, fitness, creativity, exploration, wellness)

### Quest
- Title, description, category
- Type (daily/weekly)
- Difficulty (easy/medium/hard/epic)
- Completion tracking and streaks

### Achievement
- Title, description, icon
- Category and requirements
- XP rewards

### Badge
- User-earned badges

## Development

### Prisma Studio
View and edit database data:
```bash
npm run db:studio
```

### Database Migration
Create a new migration:
```bash
npx prisma migrate dev --name migration_name
```

### Seed Data
The seed script creates:
- 3 test users (alex@test.com, jordan@test.com, sam@test.com)
- All with password: `password123`
- 7 achievements across different categories
- Sample quests for testing

## Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with configurable expiration
- Rate limiting (100 requests per 15 minutes by default)
- Helmet security headers
- CORS configuration
- Input validation with express-validator

## Environment Variables

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/lifequest
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:8081
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## License

MIT


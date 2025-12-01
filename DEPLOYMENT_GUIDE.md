# LifeQuest Deployment Guide

## Pre-Deployment Checklist

### ✅ Completed
- [x] PostgreSQL database setup and running
- [x] Backend API fully functional (Node.js + Express + Prisma)
- [x] Frontend integrated with backend APIs
- [x] Authentication flow (login/register)
- [x] User management with API
- [x] Quest CRUD operations via API
- [x] Leaderboard integration
- [x] Achievement system
- [x] TypeScript compilation successful
- [x] No critical errors

## Deployment Steps

### 1. Backend Deployment (API Server)

#### Option A: Railway (Recommended - Easy & Free Tier)

1. **Prepare the backend**:
   ```bash
   cd backend
   # Ensure package.json has correct start script
   ```

2. **Create Railway account**: https://railway.app

3. **Deploy**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Node.js
   - Add environment variables:
     - `DATABASE_URL` (Railway provides PostgreSQL)
     - `JWT_SECRET` (generate: `openssl rand -base64 32`)
     - `NODE_ENV=production`
     - `PORT=3000`
     - `ALLOWED_ORIGINS=*` (update with your domains)

4. **Setup PostgreSQL**:
   - In Railway, click "+ New" → "Database" → "PostgreSQL"
   - Copy the DATABASE_URL to environment variables
   - Run migrations: `npx prisma migrate deploy`
   - Seed database: `npm run db:seed`

5. **Note your API URL**: `https://your-app.railway.app`

#### Option B: Render

1. **Create account**: https://render.com
2. **New Web Service**:
   - Connect GitHub repo
   - Build Command: `cd backend && npm install && npx prisma generate`
   - Start Command: `cd backend && npm start`
3. **Add PostgreSQL database**
4. **Environment Variables**: Same as Railway
5. **Deploy**

#### Option C: AWS/DigitalOcean (Advanced)
- Requires server setup, PM2, Nginx
- See separate AWS deployment guide

### 2. Frontend Deployment

#### Update API URL
Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = __DEV__ 
  ? 'http://172.21.244.33:3000/api'
  : 'https://your-app.railway.app/api'; // ← UPDATE THIS
```

#### Option A: Expo Go (Testing)
```bash
# Already configured - just run:
npx expo start
```
Scan QR code with Expo Go app.

#### Option B: Build APK (Android)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Build APK
eas build --platform android --profile preview

# Or build for production
eas build --platform android --profile production
```

Download APK from Expo dashboard and install on device.

#### Option C: Build IPA (iOS)
```bash
# Requires Apple Developer Account ($99/year)
eas build --platform ios --profile production
```

#### Option D: Web Build
```bash
# Build for web
npx expo export:web

# Deploy static files to:
# - Vercel
# - Netlify  
# - GitHub Pages
```

### 3. Environment Configuration

#### Backend `.env` (Production)
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/lifequest
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=https://your-frontend.com,exp://your-expo-app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend API Config
- Development: Uses `172.21.244.33:3000`
- Production: Update to your deployed API URL

### 4. Testing Deployment

1. **Test API**:
   ```bash
   curl https://your-api.railway.app/health
   curl -X POST https://your-api.railway.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"alex@test.com","password":"password123"}'
   ```

2. **Test Mobile App**:
   - Open in Expo Go
   - Try logging in with test account
   - Create a quest
   - Complete a quest
   - Check leaderboard
   - View achievements

### 5. Post-Deployment

#### Monitor
- Check Railway/Render logs for errors
- Monitor API response times
- Watch database connection pool

#### Backups
```bash
# Backup PostgreSQL database
pg_dump $DATABASE_URL > backup.sql

# Or use Railway/Render automated backups
```

#### Updates
```bash
# Push changes to GitHub
git push origin main

# Railway/Render auto-deploy on push
# Or manually redeploy in dashboard
```

## Production Considerations

### Security
- [x] Passwords hashed with bcrypt
- [x] JWT authentication
- [x] Rate limiting enabled
- [ ] HTTPS enforced (handled by hosting)
- [ ] CORS configured properly
- [ ] Environment variables secured

### Performance
- [ ] Add Redis for caching (optional)
- [ ] Enable gzip compression (included)
- [ ] CDN for static assets
- [ ] Database indexing (already configured)

### Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] API monitoring (UptimeRobot)
- [ ] Analytics (Mixpanel/Amplitude)

## Troubleshooting

### API Connection Fails
- Check `ALLOWED_ORIGINS` includes your app domain
- Verify API_BASE_URL in `src/services/api.ts`
- Check Railway/Render logs

### Database Errors
- Run migrations: `npx prisma migrate deploy`
- Check DATABASE_URL format
- Verify PostgreSQL is running

### Build Errors
- Clear cache: `npx expo start --clear`
- Remove node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`

## Quick Deploy Commands

### Deploy Backend to Railway
```bash
cd backend
railway login
railway init
railway up
railway run npx prisma migrate deploy
railway run npm run db:seed
```

### Build Android APK
```bash
eas build --platform android --profile preview
```

### Deploy Web Version
```bash
npx expo export:web
# Upload `web-build/` folder to hosting
```

## Cost Estimates

| Service | Free Tier | Paid |
|---------|-----------|------|
| Railway | 500 hours/month | $5+/month |
| Render | 750 hours/month | $7+/month |
| Expo | Unlimited | $29/month for teams |
| PostgreSQL | 1GB (Railway) | $5+/month |

**Recommended for Students**: Railway free tier is perfect for getting started!

## Support

- Backend logs: Check Railway/Render dashboard
- Frontend logs: `npx expo start` console
- Database: `npx prisma studio` (development)
- API testing: Use the `backend/test-api.sh` script

## Next Steps

1. Deploy backend to Railway/Render
2. Update frontend API URL
3. Build APK with EAS
4. Test thoroughly with real users
5. Setup monitoring and analytics
6. Add more achievements and features!

---

**Ready to deploy!** Start with Railway for the quickest path to production.


# 🔧 Troubleshooting Guide

Common issues and their solutions.

## Installation Issues

### ❌ npm install fails

**Problem:** Dependencies won't install

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json

# Reinstall
npm run install:all
```

### ❌ Node version error

**Problem:** "Unsupported engine" error

**Solution:**
```bash
# Check your Node version
node --version

# Should be 18.0.0 or higher
# Update Node.js from nodejs.org
```

## Database Issues

### ❌ MongoDB connection failed

**Problem:** "MongoServerError: connect ECONNREFUSED"

**Solutions:**

1. **MongoDB not running:**
```bash
# Start MongoDB
mongod

# Or on Windows:
net start MongoDB

# Or with Homebrew (Mac):
brew services start mongodb-community
```

2. **Wrong connection string:**
```javascript
// Check backend/.env
MONGODB_URI=mongodb://localhost:27017/newyear-gifts
```

3. **MongoDB not installed:**
```bash
# Install MongoDB Community Edition
# Visit: https://www.mongodb.com/try/download/community
```

### ❌ Seed script fails

**Problem:** Error running seedData.js

**Solutions:**
```bash
# Make sure MongoDB is running first
mongod

# Then run seed script
cd backend
node scripts/seedData.js

# If still fails, check .env file exists
cp .env.example .env
```

## Server Issues

### ❌ Port already in use

**Problem:** "EADDRINUSE: address already in use :::5000"

**Solutions:**

1. **Change port:**
```bash
# Edit backend/.env
PORT=5001
```

2. **Kill process using port:**
```bash
# On Mac/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### ❌ CORS errors

**Problem:** "Access-Control-Allow-Origin" error

**Solution:**
```javascript
// Check backend/server.js has:
app.use(cors())

// Or configure specific origin:
app.use(cors({
  origin: 'http://localhost:3000'
}))
```

### ❌ API not responding

**Problem:** Frontend can't reach backend

**Solutions:**

1. **Check backend is running:**
```bash
# Should see: "Server running on http://localhost:5000"
cd backend
npm run dev
```

2. **Check proxy in vite.config.js:**
```javascript
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

3. **Test API directly:**
```bash
curl http://localhost:5000/api/health
```

## Frontend Issues

### ❌ Blank white screen

**Problem:** App doesn't load

**Solutions:**

1. **Check browser console for errors**

2. **Clear browser cache:**
```
Ctrl+Shift+Delete (Windows)
Cmd+Shift+Delete (Mac)
```

3. **Rebuild:**
```bash
cd frontend
rm -rf node_modules dist
npm install
npm run dev
```

### ❌ Styles not loading

**Problem:** No Tailwind styles

**Solutions:**

1. **Check Tailwind is configured:**
```bash
# Should exist:
frontend/tailwind.config.js
frontend/postcss.config.js
```

2. **Check index.css imports Tailwind:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Restart dev server:**
```bash
cd frontend
npm run dev
```

### ❌ Images not loading

**Problem:** Broken image icons

**Solution:**
```javascript
// Using Unsplash API - images may fail if:
// 1. No internet connection
// 2. Unsplash rate limit reached

// Replace with local images or different CDN
```

## Web3/Blockchain Issues

### ❌ MetaMask not detected

**Problem:** "Please install MetaMask" error

**Solutions:**

1. **Install MetaMask:**
   - Visit: https://metamask.io
   - Install browser extension
   - Create/import wallet

2. **Check browser compatibility:**
   - Chrome, Firefox, Brave, Edge supported
   - Safari needs MetaMask mobile app

### ❌ Wallet won't connect

**Problem:** Connection fails

**Solutions:**

1. **Unlock MetaMask:**
   - Click MetaMask icon
   - Enter password

2. **Check network:**
   - Switch to correct network (Ethereum Mainnet or Sepolia)

3. **Clear MetaMask cache:**
   - MetaMask → Settings → Advanced → Reset Account

### ❌ Transaction fails

**Problem:** Blockchain transaction error

**Solutions:**

1. **Insufficient gas:**
   - Get testnet ETH from faucet
   - Sepolia faucet: https://sepoliafaucet.com

2. **Wrong network:**
   - Switch to network where contract is deployed

3. **Contract not deployed:**
   - Deploy smart contract first
   - Update CONTRACT_ADDRESS in Web3Context.jsx

### ❌ Contract address error

**Problem:** "Contract not found"

**Solution:**
```javascript
// Update in frontend/src/context/Web3Context.jsx
const CONTRACT_ADDRESS = 'your-deployed-contract-address'

// Make sure contract is deployed to current network
```

## Email Issues

### ❌ Emails not sending

**Problem:** Order confirmation emails fail

**Solutions:**

1. **Email not configured (optional feature):**
```bash
# Check backend/.env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

2. **Gmail app password:**
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password
   - Use that password in .env

3. **Skip email (optional):**
   - Emails are optional
   - Orders work without email
   - Check console for "Email not configured" message

## Authentication Issues

### ❌ Company login fails

**Problem:** "Invalid credentials"

**Solutions:**

1. **Check credentials:**
```
Default login:
Email: contact@giftco.com
Password: password123
```

2. **Database not seeded:**
```bash
cd backend
node scripts/seedData.js
```

3. **JWT secret missing:**
```bash
# Check backend/.env
JWT_SECRET=your-secret-key
```

### ❌ Token expired

**Problem:** "Invalid token" error

**Solution:**
```bash
# Logout and login again
# Or clear localStorage:
localStorage.removeItem('companyToken')
```

## Build/Production Issues

### ❌ Build fails

**Problem:** npm run build error

**Solutions:**

1. **Check for TypeScript errors:**
```bash
# Even though using JS, check for issues
npm run build -- --debug
```

2. **Clear cache and rebuild:**
```bash
cd frontend
rm -rf node_modules dist .vite
npm install
npm run build
```

### ❌ Production env variables

**Problem:** App works locally but not in production

**Solution:**
```bash
# Set environment variables in deployment platform:
# Vercel/Netlify: Add in dashboard
# Railway/Render: Add in settings

# Required:
MONGODB_URI=your-atlas-connection-string
JWT_SECRET=your-production-secret
```

## Performance Issues

### ❌ Slow loading

**Problem:** App is slow

**Solutions:**

1. **Check network tab in DevTools**

2. **Optimize images:**
```javascript
// Use smaller images or lazy loading
<img loading="lazy" src="..." />
```

3. **Check database queries:**
```javascript
// Add indexes in MongoDB
// Check backend console for slow queries
```

### ❌ Memory leaks

**Problem:** Browser becomes slow over time

**Solutions:**

1. **Check for unmounted component updates:**
```javascript
// Use cleanup in useEffect
useEffect(() => {
  // ...
  return () => {
    // cleanup
  }
}, [])
```

2. **Clear browser cache and restart**

## Development Issues

### ❌ Hot reload not working

**Problem:** Changes don't reflect

**Solutions:**

1. **Restart dev server:**
```bash
# Stop with Ctrl+C
# Start again
npm run dev
```

2. **Check file watchers:**
```bash
# Increase file watchers (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### ❌ ESLint errors

**Problem:** Linting errors

**Solution:**
```bash
# Disable ESLint temporarily
# Or fix errors shown in console
```

## Still Having Issues?

### Debug Checklist

1. ✅ Node.js 18+ installed?
2. ✅ MongoDB running?
3. ✅ All dependencies installed?
4. ✅ .env file configured?
5. ✅ Database seeded?
6. ✅ Both servers running?
7. ✅ Browser console checked?
8. ✅ Network tab checked?

### Get Help

1. **Check logs:**
   - Browser console (F12)
   - Backend terminal
   - MongoDB logs

2. **Test components individually:**
   - Test API with Postman/curl
   - Test frontend without backend
   - Test database connection

3. **Start fresh:**
```bash
# Nuclear option - start from scratch
rm -rf node_modules frontend/node_modules backend/node_modules
rm -rf frontend/dist
npm run install:all
cd backend && node scripts/seedData.js
cd .. && npm run dev
```

### Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| ECONNREFUSED | Can't connect to server | Start the server |
| EADDRINUSE | Port in use | Change port or kill process |
| MongoServerError | Database issue | Check MongoDB running |
| 401 Unauthorized | Auth failed | Check token/credentials |
| 404 Not Found | Route doesn't exist | Check API endpoint |
| CORS error | Cross-origin blocked | Configure CORS |
| Cannot find module | Missing dependency | npm install |

---

**Still stuck? Check:**
- README.md for setup instructions
- QUICKSTART.md for step-by-step guide
- GitHub issues (if applicable)

Most issues are solved by ensuring MongoDB is running and all dependencies are installed! 🚀

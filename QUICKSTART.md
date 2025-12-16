# ⚡ Quick Start Guide

Get your New Year Gift Platform running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- Terminal/Command Prompt

## Step-by-Step Setup

### 1️⃣ Install Dependencies (2 min)
```bash
npm run install:all
```

### 2️⃣ Configure Backend (1 min)
```bash
cd backend
cp .env.example .env
```

Edit `.env` if needed (defaults work for local development)

### 3️⃣ Seed Database (1 min)
```bash
node scripts/seedData.js
```

This creates sample companies and 20+ gifts. Note the login credentials shown in console.

### 4️⃣ Start Development Servers (1 min)
```bash
cd ..
npm run dev
```

This starts both frontend and backend concurrently.

## 🎉 You're Done!

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🧪 Test It Out

1. **Browse Gifts:** Visit homepage, click "Browse All Gifts"
2. **Filter:** Try filtering by category or price
3. **View Details:** Click any gift card
4. **Place Order:** Click "Order Now", fill form, submit
5. **Track Order:** Copy order ID, go to "Track Order" page
6. **Company Login:** Go to `/company/dashboard`
   - Email: `contact@giftco.com`
   - Password: `password123`
7. **Update Status:** Change order status in dashboard

## 🔗 Optional: Web3 Setup

1. Install MetaMask browser extension
2. Click "Connect Wallet" in navbar
3. Deploy smart contract (see blockchain/deploy.js)
4. Update CONTRACT_ADDRESS in frontend/src/context/Web3Context.jsx
5. Enable blockchain tracking when ordering

## 📝 Default Logins

**Company Accounts:**
- GiftCo: `contact@giftco.com` / `password123`
- LuxuryGifts: `info@luxurygifts.com` / `password123`
- TechGifts: `hello@techgifts.com` / `password123`
- FashionHub: `support@fashionhub.com` / `password123`
- HomeEssentials: `care@homeessentials.com` / `password123`

## 🐛 Common Issues

**MongoDB not running?**
```bash
mongod
```

**Port 3000 or 5000 in use?**
- Change PORT in backend/.env
- Change port in frontend/vite.config.js

**Dependencies error?**
```bash
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

## 🚀 Next Steps

- Read README.md for full documentation
- Check PROJECT_OVERVIEW.md for architecture details
- See DEPLOYMENT.md for production deployment
- Customize colors in tailwind.config.js
- Add your own gifts via company dashboard or database

## 💡 Pro Tips

- Use React DevTools to inspect component state
- Check browser console for Web3 connection status
- MongoDB Compass for visual database management
- Postman for API testing

**Happy coding! 🎁✨**

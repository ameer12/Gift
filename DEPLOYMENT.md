# 🚀 Deployment Guide

## Quick Deploy Steps

### 1. Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### 2. Backend (Railway)
```bash
cd backend
railway login
railway init
railway up
```

### 3. Database (MongoDB Atlas)
- Create free cluster at mongodb.com/cloud/atlas
- Get connection string
- Update backend .env

### 4. Smart Contract (Sepolia Testnet)
```bash
cd blockchain
# Get testnet ETH from faucet
npx hardhat run deploy.js --network sepolia
```

## Environment Setup

Set these in your deployment platform:
- `MONGODB_URI`
- `JWT_SECRET`
- `EMAIL_USER` (optional)
- `EMAIL_PASS` (optional)

## Post-Deployment
1. Run seed script to populate database
2. Update frontend CONTRACT_ADDRESS
3. Test all features
4. Monitor logs

Done! Your platform is live! 🎉

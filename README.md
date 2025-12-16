# 🎁 GiftGalaxy - Premium Gift Platform 2026

**GiftGalaxy** - A stunning, modern, full-stack gift ordering platform with React, Node.js, and Web3 blockchain integration for transparent order tracking.

## ✨ Features

### Frontend
- 🎨 **Premium UI/UX** - Glassmorphism, neumorphism, smooth animations
- 🎯 **Smart Filtering** - Real-time gift filtering by category, price, company
- 🔍 **Advanced Search** - Full-text search across thousands of gifts
- 🌙 **Dark/Light Mode** - Toggle between themes
- 🌐 **Multi-language Support** - Internationalization ready
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Lightning Fast** - Optimized performance with lazy loading

### Backend
- 🚀 **RESTful API** - Clean, documented endpoints
- 🔐 **Authentication** - JWT-based company authentication
- 📧 **Email Notifications** - Order confirmations
- 🏢 **Company Dashboard** - Order management for suppliers
- 📊 **Real-time Stats** - Order analytics

### Blockchain
- ⛓️ **Web3 Integration** - MetaMask wallet connection
- 🔒 **Smart Contract** - Solidity contract for order tracking
- 📜 **Transparent Tracking** - Immutable order status updates
- 🎫 **Blockchain Receipts** - Verifiable transaction hashes

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Framer Motion (animations)
- Zustand (state management)
- Ethers.js (Web3)
- React Router
- Axios

**Backend:**
- Node.js + Express
- JSON File Database
- JWT Authentication
- Nodemailer
- bcrypt

**Blockchain:**
- Solidity ^0.8.19
- Ethers.js
- MetaMask Integration

## 📦 Installation

### Prerequisites
- Node.js 18+
- MetaMask browser extension (for Web3 features - optional)

### Quick Start

1. **Clone and Install**
```bash
# Install all dependencies
npm run install:all
```

2. **Setup Environment**
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and other configs
```

3. **Seed Database**
```bash
cd backend
node scripts/seedData.js
```

4. **Run Development Servers**
```bash
# From root directory
npm run dev

# Or run separately:
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

5. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 Usage

### For Customers
1. Browse gifts on the catalog page
2. Filter by category, price, or company
3. View detailed gift information
4. Place order with 1-click checkout
5. Optional: Connect Web3 wallet for blockchain tracking
6. Track order status in real-time

### For Companies
1. Login at `/company/dashboard`
2. View incoming orders
3. Update order status (Pending → Processing → Shipped → Delivered)
4. Status updates are recorded on blockchain (if enabled)

**Default Company Credentials:**
- Email: `contact@giftco.com`
- Password: `password123`

(See console output after running seed script for all company credentials)

## 📁 Project Structure

```
newyear-gift-platform/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React contexts (Theme, Web3)
│   │   ├── store/          # Zustand store
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── utils/              # Helper functions
│   ├── scripts/            # Database seeding
│   ├── server.js
│   └── package.json
├── blockchain/
│   ├── OrderTracking.sol   # Smart contract
│   └── deploy.js           # Deployment script
├── package.json
└── README.md
```

## 🔗 API Endpoints

### Gifts
- `GET /api/gifts` - Get all gifts (with filters)
- `GET /api/gifts/:id` - Get single gift with related items
- `GET /api/gifts/meta/categories` - Get all categories
- `GET /api/gifts/meta/companies` - Get all companies

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderId` - Get order details
- `PATCH /api/orders/:orderId` - Update blockchain hash

### Company
- `POST /api/company/login` - Company login
- `GET /api/company/orders` - Get company orders (auth required)
- `PATCH /api/company/orders/:orderId` - Update order status (auth required)

## 🔐 Smart Contract

The `OrderTracking.sol` contract provides:
- Order creation with customer address
- Status updates (Pending → Processing → Shipped → Delivered)
- Event emissions for tracking
- Access control for authorized companies

### Deployment

```bash
cd blockchain

# Install Hardhat (recommended)
npm install --save-dev hardhat

# Compile contract
npx hardhat compile

# Deploy to testnet
npx hardhat run deploy.js --network sepolia
```

## 🎨 Design Features

- **Glassmorphism** - Frosted glass effect cards
- **Neumorphism** - Soft 3D shadows
- **Micro-animations** - Smooth hover effects
- **Gradient Text** - Luxury gold gradients
- **Floating Elements** - Animated background decorations
- **Skeleton Screens** - Loading states
- **Custom Scrollbar** - Themed scrollbar design

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/Heroku)
```bash
cd backend
# Set environment variables
# Deploy with your platform's CLI
```

### Database
Data is stored in JSON files in `backend/data/` directory.
For production, consider migrating to a proper database like MongoDB or PostgreSQL.

### Smart Contract (Ethereum/Polygon)
1. Get testnet ETH from faucet
2. Update blockchain/.env with private key
3. Run deployment script
4. Update contract address in frontend

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=5000
JWT_SECRET=your-secret-key
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Frontend (update in Web3Context.jsx):**
```javascript
const CONTRACT_ADDRESS = 'your-deployed-contract-address'
```

## 📱 Progressive Web App

The app is PWA-ready. To enable:
1. Add manifest.json to frontend/public
2. Register service worker
3. Configure caching strategy

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🎉 Credits

Built with ❤️ for New Year 2026

- UI Inspiration: Modern luxury e-commerce
- Icons: React Icons
- Fonts: Google Fonts (Inter, Playfair Display)
- Images: Unsplash API

## 📞 Support

For issues or questions:
- Open GitHub issue
- Email: support@newyeargifts.com

---

**Happy New Year! 🎊 May your gifts bring joy! 🎁**

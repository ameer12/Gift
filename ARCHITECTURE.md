# 🏗️ System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                    (React + Vite + Web3)                     │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Home   │  │ Catalog  │  │  Order   │  │ Tracking │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           State Management (Zustand)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │    Context (Theme, Web3, Authentication)             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │ (Axios)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│                  (Node.js + Express + MongoDB)               │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Gift Routes │  │ Order Routes │  │Company Routes│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Middleware (Auth, CORS)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Models (Company, Gift, Order)                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Mongoose ODM
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        DATABASE                              │
│                        (MongoDB)                             │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  companies   │  │    gifts     │  │    orders    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘

                    ┌─────────────────┐
                    │   BLOCKCHAIN    │
                    │   (Ethereum)    │
                    │                 │
                    │  Smart Contract │
                    │ OrderTracking   │
                    └─────────────────┘
                            ▲
                            │ Web3/Ethers.js
                            │
                    ┌───────┴────────┐
                    │   MetaMask     │
                    │   (Wallet)     │
                    └────────────────┘
```

## Data Flow

### 1. Customer Orders Gift

```
Customer → Frontend (Order Page)
    ↓
    Fill delivery info + payment method
    ↓
    POST /api/orders
    ↓
Backend validates → Creates order in MongoDB
    ↓
    Assigns to correct company (based on gift)
    ↓
    [Optional] Records on blockchain via Web3
    ↓
    Sends confirmation email
    ↓
    Returns order ID to frontend
    ↓
Customer sees confirmation + tracking link
```

### 2. Company Updates Order Status

```
Company → Login to Dashboard
    ↓
    POST /api/company/login (JWT token)
    ↓
    GET /api/company/orders (with auth)
    ↓
Backend returns company's orders
    ↓
Company changes status dropdown
    ↓
    PATCH /api/company/orders/:id
    ↓
Backend updates order status in MongoDB
    ↓
    [Optional] Updates blockchain status
    ↓
Status change reflected in tracking page
```

### 3. Customer Tracks Order

```
Customer → Tracking Page
    ↓
    Enters order ID
    ↓
    GET /api/orders/:orderId
    ↓
Backend fetches order from MongoDB
    ↓
    [Optional] Fetches status from blockchain
    ↓
    Returns order with current status
    ↓
Frontend displays visual timeline
```

## Component Hierarchy

```
App
├── ThemeProvider
│   └── Web3Provider
│       ├── Router
│       │   ├── Navbar
│       │   │   ├── Logo
│       │   │   ├── Navigation Links
│       │   │   ├── Theme Toggle
│       │   │   ├── Wallet Connect Button
│       │   │   └── Cart Icon
│       │   │
│       │   ├── Routes
│       │   │   ├── HomePage
│       │   │   │   ├── Hero Section
│       │   │   │   ├── Search Bar
│       │   │   │   ├── Category Grid
│       │   │   │   ├── Features Section
│       │   │   │   └── CTA Section
│       │   │   │
│       │   │   ├── CatalogPage
│       │   │   │   ├── FilterSidebar
│       │   │   │   └── GiftCard[] (grid)
│       │   │   │
│       │   │   ├── GiftDetailPage
│       │   │   │   ├── Image Gallery
│       │   │   │   ├── Gift Info
│       │   │   │   ├── Company Badge
│       │   │   │   ├── Order Button
│       │   │   │   └── Related Gifts
│       │   │   │
│       │   │   ├── OrderPage
│       │   │   │   ├── Delivery Form
│       │   │   │   ├── Payment Selection
│       │   │   │   └── Order Summary
│       │   │   │
│       │   │   ├── TrackingPage
│       │   │   │   ├── Search Box
│       │   │   │   ├── Order Info Card
│       │   │   │   └── Status Timeline
│       │   │   │
│       │   │   └── CompanyDashboard
│       │   │       ├── Login Form
│       │   │       ├── Stats Cards
│       │   │       └── Orders Table
│       │   │
│       │   └── Footer
│       │       ├── Links
│       │       └── Social Icons
│       │
│       └── ToastContainer
```

## State Management

### Zustand Store
```javascript
{
  cart: [],              // Shopping cart items
  filters: {             // Catalog filters
    category: '',
    priceRange: [0, 10000],
    company: '',
    sortBy: 'popular'
  },
  actions: {
    addToCart,
    removeFromCart,
    setFilters,
    resetFilters
  }
}
```

### Theme Context
```javascript
{
  isDark: true,          // Dark/light mode
  language: 'en',        // Current language
  toggleTheme(),
  changeLanguage()
}
```

### Web3 Context
```javascript
{
  account: null,         // Connected wallet address
  provider: null,        // Ethers provider
  contract: null,        // Smart contract instance
  isConnecting: false,
  connectWallet(),
  disconnectWallet(),
  createOrderOnChain(),
  getOrderStatus()
}
```

## Database Schema Relationships

```
Company (1) ──────< (N) Gift
    │
    │
    └──────< (N) Order

Order (1) ──────> (1) Gift (embedded)
Order (1) ──────> (1) CustomerInfo (embedded)
```

## API Request/Response Examples

### Create Order
```javascript
// Request
POST /api/orders
{
  giftId: "507f1f77bcf86cd799439011",
  customerInfo: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St",
    city: "New York",
    zipCode: "10001"
  },
  useBlockchain: true
}

// Response
{
  orderId: "NYG1704123456789ABC",
  order: { /* full order object */ }
}
```

### Get Gifts with Filters
```javascript
// Request
GET /api/gifts?category=Electronics&priceRange=[0,500]&sortBy=price-low

// Response
[
  {
    _id: "...",
    name: "Wireless Headphones",
    price: 149.99,
    category: "Electronics",
    company: "TechGifts",
    image: "...",
    rating: 4.5,
    reviews: 234
  },
  // ... more gifts
]
```

## Security Layers

```
┌─────────────────────────────────────┐
│  Frontend Input Validation          │
├─────────────────────────────────────┤
│  HTTPS/TLS Encryption               │
├─────────────────────────────────────┤
│  CORS Configuration                 │
├─────────────────────────────────────┤
│  JWT Authentication                 │
├─────────────────────────────────────┤
│  Backend Input Validation           │
├─────────────────────────────────────┤
│  Password Hashing (bcrypt)          │
├─────────────────────────────────────┤
│  MongoDB Injection Prevention       │
├─────────────────────────────────────┤
│  Environment Variables              │
└─────────────────────────────────────┘
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────┐
│                    PRODUCTION                         │
│                                                       │
│  ┌────────────────┐         ┌────────────────┐      │
│  │   Vercel/      │         │   Railway/     │      │
│  │   Netlify      │◄───────►│   Render       │      │
│  │   (Frontend)   │   API   │   (Backend)    │      │
│  └────────────────┘         └────────────────┘      │
│                                      │               │
│                                      ▼               │
│                             ┌────────────────┐      │
│                             │  MongoDB Atlas │      │
│                             │   (Database)   │      │
│                             └────────────────┘      │
│                                                       │
│  ┌────────────────────────────────────────────┐     │
│  │  Ethereum Network (Sepolia/Mainnet)        │     │
│  │  Smart Contract Deployed                   │     │
│  └────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────┘
```

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend Framework | React 18 | UI components |
| Build Tool | Vite | Fast development |
| Styling | Tailwind CSS | Utility-first CSS |
| Animations | Framer Motion | Smooth animations |
| State | Zustand | Global state |
| Routing | React Router | Navigation |
| HTTP Client | Axios | API requests |
| Web3 | Ethers.js | Blockchain interaction |
| Backend Framework | Express | REST API |
| Database | MongoDB | Data storage |
| ODM | Mongoose | Schema modeling |
| Auth | JWT | Token authentication |
| Password | bcrypt | Hashing |
| Email | Nodemailer | Notifications |
| Smart Contract | Solidity | Blockchain logic |
| Blockchain | Ethereum | Decentralized ledger |

## Performance Optimizations

1. **Frontend**
   - Code splitting (React.lazy)
   - Image lazy loading
   - Debounced search
   - Memoized components
   - Virtual scrolling ready

2. **Backend**
   - Database indexing
   - Query optimization
   - Connection pooling
   - Caching headers
   - Compression middleware

3. **Database**
   - Indexed fields (orderId, category, price)
   - Text search index
   - Compound indexes
   - Lean queries

## Scalability Considerations

- **Horizontal Scaling**: Stateless backend allows multiple instances
- **Database Sharding**: MongoDB supports sharding for large datasets
- **CDN**: Static assets can be served via CDN
- **Caching**: Redis can be added for session/data caching
- **Load Balancing**: Multiple backend instances behind load balancer
- **Microservices**: Can split into order, gift, company services

This architecture supports thousands of concurrent users and millions of gifts! 🚀

# 📦 Order & Delivery Flow

## Complete Order-to-Delivery Process

```
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 1: CUSTOMER ORDERS                       │
└─────────────────────────────────────────────────────────────────┘

Customer browses catalog → Selects gift → Clicks "Order Now"
                                ↓
                    Fills out delivery form:
                    ✓ Name
                    ✓ Email
                    ✓ Phone
                    ✓ Full Address
                    ✓ City
                    ✓ Zip Code
                                ↓
                    Submits order


┌─────────────────────────────────────────────────────────────────┐
│              STEP 2: AUTOMATIC COMPANY ROUTING                   │
└─────────────────────────────────────────────────────────────────┘

System automatically:
  1. Identifies which company supplies this gift
  2. Creates order with customer's delivery address
  3. Assigns order to that specific company
  4. Sends email confirmation to customer
  5. (Optional) Records on blockchain

Example:
  Gift: "Wireless Headphones" 
  Supplier: TechGifts
  → Order automatically sent to TechGifts


┌─────────────────────────────────────────────────────────────────┐
│           STEP 3: COMPANY RECEIVES ORDER                         │
└─────────────────────────────────────────────────────────────────┘

Company logs into dashboard and sees:

╔═══════════════════════════════════════════════════════════════╗
║  Order ID: NYG1733456789ABC                                   ║
║                                                               ║
║  Gift: Wireless Headphones                                    ║
║  Price: $149.99                                               ║
║                                                               ║
║  CUSTOMER & DELIVERY ADDRESS:                                 ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║  Name:    John Doe                                            ║
║  Phone:   +1 (555) 123-4567                                   ║
║  Email:   john@example.com                                    ║
║                                                               ║
║  Address: 123 Main Street, Apt 4B                             ║
║  City:    New York, NY 10001                                  ║
║                                                               ║
║  Status: [Pending ▼]  [View Full Details]                     ║
╚═══════════════════════════════════════════════════════════════╝


┌─────────────────────────────────────────────────────────────────┐
│              STEP 4: COMPANY PROCESSES ORDER                     │
└─────────────────────────────────────────────────────────────────┘

Company updates status as they process:

Status Options:
  ⏳ Pending      → Order received, not started yet
  📦 Processing   → Preparing the gift for shipment
  🚚 Shipped      → Gift is on the way to customer
  ✅ Delivered    → Customer received the gift

Each status update is:
  ✓ Saved to database
  ✓ Visible to customer in tracking page
  ✓ (Optional) Recorded on blockchain


┌─────────────────────────────────────────────────────────────────┐
│              STEP 5: COMPANY SHIPS TO ADDRESS                    │
└─────────────────────────────────────────────────────────────────┘

Company:
  1. Packages the gift
  2. Uses customer's delivery address from dashboard
  3. Ships via their preferred courier
  4. Updates status to "Shipped"
  5. Updates to "Delivered" when confirmed


┌─────────────────────────────────────────────────────────────────┐
│              STEP 6: CUSTOMER TRACKS ORDER                       │
└─────────────────────────────────────────────────────────────────┘

Customer can track order anytime:
  1. Goes to "Track Order" page
  2. Enters Order ID
  3. Sees real-time status:

     ✅ Order Placed      (Completed)
     ✅ Processing        (Completed)
     🚚 Shipped          (Current)
     ⏳ Delivered        (Pending)

  4. Sees delivery address confirmation
  5. (Optional) Blockchain verification
```

## 🔄 Data Flow Diagram

```
┌──────────────┐
│   Customer   │
│  (Frontend)  │
└──────┬───────┘
       │ 1. Places order with delivery address
       ↓
┌──────────────────────┐
│   Backend API        │
│  POST /api/orders    │
└──────┬───────────────┘
       │ 2. Finds gift details
       │ 3. Gets company ID from gift
       │ 4. Creates order with:
       │    - Customer delivery address
       │    - Company ID (auto-assigned)
       │    - Gift details
       ↓
┌──────────────────────┐
│   JSON Database      │
│   orders.json        │
└──────┬───────────────┘
       │ Order saved with:
       │ {
       │   orderId: "NYG...",
       │   companyId: "xyz123",
       │   customerInfo: {
       │     name: "John Doe",
       │     address: "123 Main St",
       │     city: "New York",
       │     zipCode: "10001",
       │     phone: "+1555...",
       │     email: "john@..."
       │   },
       │   gift: {...},
       │   status: 0
       │ }
       ↓
┌──────────────────────┐
│  Company Dashboard   │
│  (Frontend)          │
└──────────────────────┘
       │ Company logs in
       │ GET /api/company/orders
       │ (filtered by companyId)
       ↓
   Sees ONLY their orders
   with full delivery addresses
```

## 📋 What Companies See

### Dashboard Table View:
```
┌─────────────┬──────────────────┬─────────────────────┬──────────┬──────────┬──────────┐
│  Order ID   │      Gift        │  Customer & Address │   Date   │  Status  │  Actions │
├─────────────┼──────────────────┼─────────────────────┼──────────┼──────────┼──────────┤
│ NYG1733...  │ [IMG] Wireless   │ John Doe            │ 12/05/25 │ Pending  │ [Status] │
│             │ Headphones       │ +1 555-1234         │          │          │ [Details]│
│             │ $149.99          │ 123 Main St         │          │          │          │
│             │                  │ New York, 10001     │          │          │          │
└─────────────┴──────────────────┴─────────────────────┴──────────┴──────────┴──────────┘
```

### Full Details View (Click "View Full Details"):
```
╔════════════════════════════════════════════════════════════╗
║                    FULL ORDER DETAILS                      ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  Order ID: NYG1733456789ABC                                ║
║                                                            ║
║  CUSTOMER INFORMATION:                                     ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║  Name:     John Doe                                        ║
║  Email:    john@example.com                                ║
║  Phone:    +1 (555) 123-4567                               ║
║                                                            ║
║  DELIVERY ADDRESS:                                         ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║  Street:   123 Main Street, Apt 4B                         ║
║  City:     New York                                        ║
║  Zip:      10001                                           ║
║                                                            ║
║  GIFT DETAILS:                                             ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ║
║  Product:  Wireless Headphones                             ║
║  Price:    $149.99                                         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

## 🎯 Key Features

### Automatic Routing
✅ **No manual assignment needed**
- System automatically knows which company supplies each gift
- Orders are instantly routed to the correct company
- Each company only sees their own orders

### Complete Address Information
✅ **Everything needed for delivery**
- Customer name
- Phone number
- Email address
- Full street address
- City and zip code

### Real-Time Updates
✅ **Status tracking**
- Company updates status
- Customer sees updates immediately
- Optional blockchain verification

### Security
✅ **Company isolation**
- Companies only see their own orders
- JWT authentication required
- Secure API endpoints

## 🚀 How to Test

1. **Place an Order:**
   ```
   Visit: http://localhost:3000
   Browse gifts → Select one → Order Now
   Fill delivery address → Submit
   ```

2. **View as Company:**
   ```
   Visit: http://localhost:3000/company/dashboard
   Login: contact@giftco.com / password123
   See orders with full delivery addresses
   ```

3. **Update Status:**
   ```
   In company dashboard:
   Change status dropdown → Pending → Processing → Shipped → Delivered
   ```

4. **Track Order:**
   ```
   Visit: http://localhost:3000/tracking
   Enter Order ID
   See status timeline
   ```

## 💡 Summary

The system is **fully automated**:

1. ✅ Customer enters delivery address
2. ✅ Order automatically goes to correct company
3. ✅ Company sees full delivery address
4. ✅ Company ships to that address
5. ✅ Customer tracks delivery status

**No manual routing needed - it's all automatic!** 🎉

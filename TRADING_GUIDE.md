# Trading Functionality Guide

## Overview

The Finovate dashboard now supports full buy and sell functionality for stocks. Users can purchase stocks from the watchlist and sell stocks they own, with automatic holdings management.

## Features

### 1. Buy Stocks
- View stocks in the watchlist with real-time prices
- Click "Buy" button on any stock
- Price is auto-populated from the watchlist
- Enter quantity to purchase
- Total cost is calculated automatically
- Holdings are created or updated upon purchase

### 2. Sell Stocks
- Click "Sell" button on stocks in your watchlist
- Price is auto-populated from the watchlist
- System checks your current holdings
- Available quantity is displayed
- Cannot sell more than you own
- Holdings are updated or removed upon sale

### 3. Holdings Management
- **New Purchase**: Creates a new holding with the purchase price as average
- **Repeat Purchase**: Updates average price using weighted average formula
- **Sell Some**: Reduces quantity in holdings
- **Sell All**: Removes the holding completely

## How It Works

### Backend Logic

#### Buy Flow
1. Order is saved to database with userId
2. System checks if user already owns the stock
3. If yes: Calculate new weighted average price and update quantity
4. If no: Create new holding with current price as average
5. Return success message

#### Sell Flow
1. Order is saved to database with userId
2. System checks if user owns the stock
3. Validates user has enough quantity
4. Reduces quantity from holdings
5. If quantity becomes 0, removes the holding
6. Return success message

### Average Price Calculation

When buying more of a stock you already own:

```
New Average = (Old Qty × Old Avg + New Qty × New Price) / Total Qty
```

**Example:**
- Own: 10 shares @ ₹100 avg
- Buy: 5 more @ ₹120
- New Average: (10×100 + 5×120) / 15 = ₹106.67

## Database Schema

### Orders Collection
```javascript
{
  userId: ObjectId,      // Reference to user
  name: String,          // Stock symbol (e.g., "INFY")
  qty: Number,           // Quantity
  price: Number,         // Price per share
  mode: String,          // "BUY" or "SELL"
  date: Date            // Order timestamp
}
```

### Holdings Collection
```javascript
{
  userId: ObjectId,      // Reference to user
  name: String,          // Stock symbol
  qty: Number,           // Current quantity owned
  avg: Number,           // Average purchase price
  price: Number,         // Current/last price
  net: String,          // Net gain/loss percentage
  day: String           // Day change percentage
}
```

## User Interface

### Buy Window
- **Title**: Shows stock name (e.g., "Buy INFY")
- **Quantity Field**: Enter number of shares to buy
- **Price Field**: Auto-filled from watchlist (editable)
- **Total Display**: Shows total cost (Qty × Price)
- **Buttons**: Buy (confirm) / Cancel

### Sell Window
- **Title**: Shows stock name (e.g., "Sell INFY")
- **Available Quantity**: Shows how many shares you own
- **Quantity Field**: Enter number of shares to sell (max = owned)
- **Price Field**: Auto-filled from watchlist (editable)
- **Total Display**: Shows total value
- **Buttons**: Sell (confirm) / Cancel

## API Endpoints

### POST /newOrder
**Headers**: `Authorization: Bearer <token>`

**Request:**
```json
{
  "name": "INFY",
  "qty": 10,
  "price": 1555.45,
  "mode": "BUY"
}
```

**Success Response (201):**
```json
{
  "message": "Order placed successfully"
}
```

**Error Responses:**
- 400: `{ "message": "Insufficient quantity to sell" }`
- 400: `{ "message": "You don't own this stock" }`
- 401: Token missing or invalid
- 500: Server error

### GET /allHoldings
**Headers**: `Authorization: Bearer <token>`

**Response (200):**
```json
[
  {
    "_id": "...",
    "userId": "...",
    "name": "INFY",
    "qty": 10,
    "avg": 1500.0,
    "price": 1555.45,
    "net": "+3.70%",
    "day": "-1.60%"
  }
]
```

### GET /orders
**Headers**: `Authorization: Bearer <token>`

**Response (200):**
```json
[
  {
    "_id": "...",
    "userId": "...",
    "name": "INFY",
    "qty": 10,
    "price": 1555.45,
    "mode": "BUY",
    "date": "2025-10-27T11:35:00.000Z"
  }
]
```

## Usage Examples

### Example 1: First-Time Buy
1. User sees INFY at ₹1555.45 in watchlist
2. Clicks "Buy" button
3. Price auto-fills to ₹1555.45
4. Enters quantity: 10
5. Total shows: ₹15,554.50
6. Clicks "Buy"
7. Success: New holding created with 10 shares @ ₹1555.45 avg

### Example 2: Buying More
1. User already owns 10 INFY @ ₹1500 avg
2. Sees INFY now at ₹1600
3. Buys 5 more @ ₹1600
4. New average: (10×1500 + 5×1600) / 15 = ₹1533.33
5. Holdings updated: 15 shares @ ₹1533.33 avg

### Example 3: Selling Partial
1. User owns 15 INFY shares
2. Clicks "Sell" on INFY
3. Available quantity shows: 15
4. Enters quantity: 5
5. Clicks "Sell"
6. Holdings updated: 10 shares remaining

### Example 4: Selling All
1. User owns 10 INFY shares
2. Sells all 10 shares
3. Holding is removed from database
4. Stock no longer appears in Holdings section

## Validation & Error Handling

### Buy Validation
- ✅ Quantity must be positive
- ✅ Price must be positive
- ✅ User must be authenticated

### Sell Validation
- ✅ User must own the stock
- ✅ User must have sufficient quantity
- ✅ Quantity and price must be positive
- ✅ User must be authenticated

### Error Messages
- "Please enter valid quantity and price" - Invalid input
- "You don't own this stock" - Trying to sell unowned stock
- "Insufficient quantity to sell" - Trying to sell more than owned
- "Failed to place order" - Server/network error
- "Access token required" - Not logged in
- "Invalid or expired token" - Session expired

## Testing Steps

### Test Buy Functionality
1. Login to dashboard
2. Find a stock in watchlist (e.g., INFY)
3. Click "Buy" button
4. Verify price is pre-filled correctly
5. Enter quantity (e.g., 5)
6. Verify total is calculated correctly
7. Click "Buy"
8. Check "Holdings" tab - should show new holding
9. Check "Orders" tab - should show buy order

### Test Repeated Buy
1. Buy same stock again (e.g., 3 more INFY)
2. Check Holdings - quantity should increase
3. Check average price is updated correctly

### Test Sell Functionality
1. Go to a stock you own
2. Click "Sell" button
3. Verify available quantity is shown
4. Enter quantity less than owned (e.g., 2)
5. Click "Sell"
6. Check Holdings - quantity should decrease
7. Check Orders - should show sell order

### Test Sell All
1. Sell all remaining quantity of a stock
2. Check Holdings - stock should be removed
3. Try to sell same stock again - should show error

### Test Error Cases
1. Try to sell stock you don't own - should show error
2. Try to sell more than you own - should show "Insufficient quantity"
3. Try to buy/sell with quantity 0 or negative - should show validation error

## Troubleshooting

### Issue: Price not auto-populating
**Solution**: Stock may not be in watchlist data. Check `dashboard/src/data/data.js`

### Issue: "You don't own this stock" when selling
**Solution**: 
- Make sure you bought the stock first
- Check Holdings tab to verify ownership
- Ensure you're logged in with correct account

### Issue: Holdings not updating after buy/sell
**Solution**: 
- Page should reload automatically
- If not, manually refresh the page
- Check browser console for errors
- Verify backend is running

### Issue: 401 Unauthorized error
**Solution**:
- Token expired - login again
- Clear localStorage and login fresh
- Check JWT_SECRET is set in backend

### Issue: Average price calculation seems wrong
**Solution**: 
- Formula: (old_qty × old_avg + new_qty × new_price) / total_qty
- Check previous average in Holdings tab
- Verify all quantities and prices are correct

## Production Considerations

- [ ] Add transaction rollback on errors
- [ ] Implement real-time price updates
- [ ] Add order confirmation dialog
- [ ] Implement order cancellation
- [ ] Add trading limits (max buy/sell per day)
- [ ] Show portfolio value and profit/loss
- [ ] Add trade history with pagination
- [ ] Implement stop-loss and limit orders
- [ ] Add market vs limit order types
- [ ] Calculate and display capital gains tax

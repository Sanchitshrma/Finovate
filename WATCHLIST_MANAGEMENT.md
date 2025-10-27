# Watchlist Management Feature

## Overview

Users can now add and remove stocks from their personal watchlist. Each user has their own customized watchlist stored in the database, separate from other users.

## Features

✅ **Add Stocks** - Search and add stocks from available options
✅ **Remove Stocks** - Delete stocks from watchlist with confirmation
✅ **User-Specific** - Each user has their own watchlist
✅ **Persistent** - Watchlist saved to database
✅ **Real-Time Prices** - Added stocks show live prices
✅ **Empty State** - Friendly UI when watchlist is empty

## How It Works

### Backend (MongoDB + Express)

#### Database Schema
```javascript
{
  userId: ObjectId,      // Reference to user
  symbol: String,        // Stock symbol (e.g., "INFY")
  addedAt: Date         // When added to watchlist
}
```

**Unique Index**: Ensures one user can't add same stock twice

#### API Endpoints

**GET /watchlist**
- Returns array of stock symbols for authenticated user
- Requires JWT token
- Response: `["INFY", "TCS", "RELIANCE"]`

**POST /watchlist**
- Adds stock to user's watchlist
- Requires JWT token and `{ symbol: "INFY" }` in body
- Validates: symbol required, no duplicates
- Response: Success message with symbol

**DELETE /watchlist/:symbol**
- Removes stock from user's watchlist
- Requires JWT token
- Response: Success or 404 if not found

### Frontend (React)

#### Components

1. **WatchList Component** (`WatchList.js`)
   - Fetches user's watchlist from API
   - Displays stocks with real-time prices
   - Shows "+ Add Stock" button
   - Shows empty state if no stocks
   - Handles add/remove operations

2. **AddStockModal Component** (`AddStockModal.js`)
   - Modal dialog for adding stocks
   - Search functionality to filter stocks
   - Displays available stocks with prices
   - Prevents adding duplicates

3. **WatchListItem Component**
   - Individual stock in watchlist
   - Hover shows delete button (×)
   - Confirmation before removal

## User Experience

### Adding Stocks

```
1. Click "+ Add Stock" button at top of watchlist
2. Modal opens with search box
3. Type to filter stocks (e.g., "INF")
4. Click "+ Add" next to desired stock
5. Modal closes, stock appears in watchlist
6. Real-time prices start updating
```

### Removing Stocks

```
1. Hover over stock in watchlist
2. Red "×" button appears on right
3. Click × button
4. Confirmation dialog: "Remove INFY from watchlist?"
5. Click OK
6. Stock removed from watchlist
```

### Empty Watchlist

```
┌─────────────────────────────┐
│  + Add Stock          0 / 50│
├─────────────────────────────┤
│                             │
│   Your watchlist is empty   │
│                             │
│  [+ Add your first stock]   │
│                             │
└─────────────────────────────┘
```

### With Stocks

```
┌─────────────────────────────┐
│  + Add Stock          3 / 50│
├─────────────────────────────┤
│  INFY        ▲ +1.23%   [×] │
│  ₹1,555.45                  │
├─────────────────────────────┤
│  TCS         ▼ -0.54%   [×] │
│  ₹3,194.80                  │
├─────────────────────────────┤
│  RELIANCE    ▲ +2.10%   [×] │
│  ₹2,112.40                  │
└─────────────────────────────┘
```

## Technical Details

### State Management

```javascript
// WatchList component state
const [watchlist, setWatchlist] = useState([]);
const [userWatchlistSymbols, setUserWatchlistSymbols] = useState([]);
const [loading, setLoading] = useState(false);
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
```

### Data Flow

```
1. Component Mounts
   ↓
2. fetchUserWatchlist() - GET /watchlist
   ↓
3. updatePrices(symbols) - Fetch real-time prices
   ↓
4. Display in UI
   ↓
5. Auto-refresh every 30 seconds
```

### Add Stock Flow

```
User clicks "+ Add"
   ↓
AddStockModal opens
   ↓
User searches and selects stock
   ↓
POST /watchlist { symbol: "INFY" }
   ↓
Backend validates and saves
   ↓
Frontend refetches watchlist
   ↓
Prices update
   ↓
Modal closes
```

### Remove Stock Flow

```
User hovers over stock
   ↓
Delete button (×) appears
   ↓
User clicks ×
   ↓
Confirmation dialog
   ↓
User confirms
   ↓
DELETE /watchlist/INFY
   ↓
Backend removes from database
   ↓
Frontend refetches watchlist
   ↓
Stock removed from UI
```

## Error Handling

### Backend Validation

- **Missing symbol**: 400 Bad Request
- **Duplicate stock**: 400 "Stock already in watchlist"
- **Stock not found**: 404 "Stock not found in watchlist"
- **Auth required**: 401 "Access token required"

### Frontend Handling

- Network errors: Shows error message
- Duplicate: Displays "Stock already in watchlist"
- Delete confirmation: Prevents accidental removal

## Security

- ✅ All endpoints protected with JWT authentication
- ✅ User can only access their own watchlist
- ✅ Symbol validation (uppercase conversion)
- ✅ Unique constraint prevents duplicates

## Database Indexes

```javascript
// Compound index on userId + symbol
{ userId: 1, symbol: 1 }, { unique: true }
```

**Benefits:**
- Fast lookup for user's watchlist
- Prevents duplicate entries
- Efficient queries

## Available Stocks

Stocks are sourced from `dashboard/src/data/data.js`:

- ADANIENT
- BAJFINANCE
- HDFCBANK
- ITC
- LT
- COALINDIA
- IOC
- POWERGRID
- SBIN
- TATAMOTORS
- INFY
- ONGC
- TCS
- KPITTECH
- QUICKHEAL
- WIPRO
- M&M
- RELIANCE
- HUL

## Styling

### Color Scheme
- **Add Button**: Purple (#667eea)
- **Delete Button**: Red (#dc2626)
- **Empty State**: Gray text (#9ca3af)
- **Modal Overlay**: Semi-transparent black

### Animations
- Modal: Fade in + slide up (0.3s)
- Buttons: Hover color transitions (0.2s)
- Delete button: Appears on hover

## Testing

### Test Adding Stocks

1. Login to dashboard
2. Watchlist should be empty initially
3. Click "+ Add Stock" button
4. Search for "INFY"
5. Click "+ Add" next to INFY
6. Verify INFY appears in watchlist
7. Try adding INFY again - should show error

### Test Removing Stocks

1. Add multiple stocks to watchlist
2. Hover over a stock
3. Verify × button appears
4. Click × button
5. Verify confirmation dialog
6. Confirm removal
7. Verify stock removed from watchlist

### Test Persistence

1. Add stocks to watchlist
2. Logout
3. Login again
4. Verify watchlist persists (same stocks)

### Test User Isolation

1. Login as User A
2. Add stocks to watchlist
3. Logout
4. Login as User B
5. Verify empty watchlist (User B's is separate)

## API Examples

### Add Stock
```bash
curl -X POST http://localhost:8000/watchlist \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"symbol":"INFY"}'
```

### Get Watchlist
```bash
curl http://localhost:8000/watchlist \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Remove Stock
```bash
curl -X DELETE http://localhost:8000/watchlist/INFY \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### Issue: Empty watchlist not loading

**Solution:**
1. Check if logged in (token in localStorage)
2. Check browser console for API errors
3. Verify backend is running
4. Check MongoDB connection

### Issue: Can't add stocks

**Solution:**
1. Check if modal opens
2. Verify stocks appear in modal
3. Check browser console for errors
4. Verify JWT token is valid

### Issue: Stocks don't persist after refresh

**Solution:**
1. Check if API call succeeds (Network tab)
2. Verify data saved in MongoDB
3. Check if userId is correctly set
4. Verify watchlist fetch on component mount

### Issue: Duplicate error when adding stock

**Solution:**
This is expected! Stock is already in your watchlist.
Remove it first, then add again if needed.

## Future Enhancements

- [ ] Drag and drop to reorder stocks
- [ ] Import/export watchlist
- [ ] Multiple watchlists per user
- [ ] Share watchlist with other users
- [ ] Watchlist templates (e.g., "Tech Stocks")
- [ ] Add notes to watchlist items
- [ ] Price alerts for watchlist stocks
- [ ] Custom grouping/categories
- [ ] Bulk add stocks
- [ ] Watchlist analytics

## Files Modified/Created

### Backend
- ✅ `backend/schemas/WatchlistSchema.js` (new)
- ✅ `backend/models/WatchlistModel.js` (new)
- ✅ `backend/index.js` (added routes)

### Frontend
- ✅ `dashboard/src/components/AddStockModal.js` (new)
- ✅ `dashboard/src/components/AddStockModal.css` (new)
- ✅ `dashboard/src/components/WatchList.js` (updated)
- ✅ `dashboard/src/index.css` (added styles)

## Performance Considerations

- Watchlist fetched once on mount
- Price updates reuse cached symbols
- API calls minimized with smart refetching
- Modal lazy-loaded (conditional rendering)
- Database queries optimized with indexes

## Best Practices

1. **Always confirm before delete** - Prevents accidental removal
2. **Show loading states** - User feedback during operations
3. **Handle errors gracefully** - Display user-friendly messages
4. **Validate on both sides** - Frontend + backend validation
5. **Use proper indexes** - Fast database queries
6. **Clean up intervals** - Prevent memory leaks

The watchlist management feature is now fully functional! 🎉📊

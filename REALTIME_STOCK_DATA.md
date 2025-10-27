# Real-Time Stock Data Integration

## Overview

The Finovate dashboard now supports real-time stock price updates across all components. Stock prices automatically refresh at configurable intervals, showing live market data in the watchlist, holdings, and positions.

## Features

✅ **Real-time Price Updates** - Automatic price refresh every 30 seconds (configurable)
✅ **Multiple API Providers** - Support for Alpha Vantage, Finnhub, or simulated data
✅ **Smart Caching** - 1-minute cache to avoid API rate limits
✅ **Fallback Mechanism** - Simulated data when API is unavailable
✅ **Loading Indicators** - Visual feedback during price updates
✅ **Error Handling** - Graceful degradation on API failures
✅ **Profit/Loss Calculation** - Real-time P&L based on live prices

## Architecture

### Stock Service (`dashboard/src/services/stockService.js`)

The centralized service handles all stock price operations:

- **getStockPrice(symbol, fallbackPrice)** - Fetch price for single stock
- **getBatchStockPrices(symbols, fallbackPrices)** - Fetch multiple stocks efficiently
- **calculateProfitLoss(avgPrice, currentPrice)** - Calculate gain/loss
- **formatPrice(price)** - Format price for display
- **clearPriceCache()** - Clear cache manually

### Components with Real-Time Updates

1. **WatchList** - Updates every 30 seconds (configurable)
2. **Holdings** - Updates every 60 seconds
3. **Positions** - Updates every 60 seconds

## Configuration

### Dashboard Environment Variables (`dashboard/.env`)

```bash
# Stock API Provider
# Options: 'alpha_vantage', 'finnhub', 'simulated'
REACT_APP_STOCK_API_PROVIDER=simulated

# Alpha Vantage API Key
# Get free key: https://www.alphavantage.co/support/#api-key
REACT_APP_ALPHA_VANTAGE_KEY=demo

# Finnhub API Key
# Get free key: https://finnhub.io/register
REACT_APP_FINNHUB_KEY=

# Price refresh interval (seconds)
REACT_APP_PRICE_REFRESH_INTERVAL=30
```

## API Providers

### 1. Alpha Vantage (Recommended for Indian Stocks)

**Setup:**
1. Get free API key from https://www.alphavantage.co/support/#api-key
2. Set in `.env`:
   ```
   REACT_APP_STOCK_API_PROVIDER=alpha_vantage
   REACT_APP_ALPHA_VANTAGE_KEY=your_key_here
   ```

**Limits:**
- Free tier: 25 requests/day
- 5 API calls per minute
- Supports NSE/BSE stocks with `.BSE` or `.NS` suffix

**Example:**
- INFY → INFY.BSE (Bombay Stock Exchange)
- TCS → TCS.BSE

### 2. Finnhub

**Setup:**
1. Get free API key from https://finnhub.io/register
2. Set in `.env`:
   ```
   REACT_APP_STOCK_API_PROVIDER=finnhub
   REACT_APP_FINNHUB_KEY=your_key_here
   ```

**Limits:**
- Free tier: 60 calls/minute
- Supports global stocks including NSE India

**Example:**
- INFY → INFY.NS (National Stock Exchange)

### 3. Simulated Mode (Default)

**Setup:**
```
REACT_APP_STOCK_API_PROVIDER=simulated
```

**How it works:**
- Generates realistic price movements (-2% to +2%)
- No API calls required
- Perfect for development/testing
- Marks data as simulated

## How It Works

### 1. WatchList Updates

```javascript
// Updates every 30 seconds
1. Fetch all stock symbols from static watchlist
2. Call getBatchStockPrices() with symbols
3. Update each stock with new price, change%, and direction
4. Re-render with updated data
5. Show loading indicator (🔄) during update
```

### 2. Holdings Updates

```javascript
// Updates every 60 seconds
1. Fetch user holdings from backend
2. Extract stock symbols
3. Call getBatchStockPrices() for all holdings
4. Update prices and recalculate profit/loss
5. Update net% based on average price vs current price
```

### 3. Positions Updates

```javascript
// Updates every 60 seconds
1. Fetch user positions from backend
2. Extract stock symbols
3. Call getBatchStockPrices() for all positions
4. Update prices and day change%
5. Recalculate profit/loss
```

## Price Caching Strategy

### Why Cache?
- API rate limits (Alpha Vantage: 5 calls/min)
- Reduce network calls
- Faster response times

### How It Works
```javascript
Cache Duration: 60 seconds (1 minute)

Request Flow:
1. Check if price is in cache AND < 60s old
2. If yes: return cached price
3. If no: fetch from API → cache → return

Cache Structure:
{
  symbol: {
    data: { price, change, changePercent, timestamp },
    timestamp: Date.now()
  }
}
```

## Profit/Loss Calculation

### Formula
```
Value Difference = Current Price - Average Price
Percentage = (Value Difference / Average Price) × 100
Is Profit = Value Difference >= 0
```

### Example
```javascript
Holdings:
- Average Price: ₹1500
- Current Price: ₹1650
- Difference: ₹150
- Percentage: +10%
- Status: PROFIT ✅

Holdings:
- Average Price: ₹2000
- Current Price: ₹1800
- Difference: -₹200
- Percentage: -10%
- Status: LOSS ❌
```

## Visual Indicators

### Loading States
- **WatchList**: 🔄 icon appears during refresh
- **Holdings**: 🔄 icon in title during update
- **Positions**: 🔄 icon in title during update

### Price Colors
- **Green/Up Arrow**: Positive change
- **Red/Down Arrow**: Negative change

### Data Status
- Simulated data is marked with `isSimulated: true`
- Can show "(Simulated)" badge if needed

## Testing

### Test with Simulated Data

1. **Default mode** (no configuration needed):
   ```bash
   cd dashboard
   npm start
   ```

2. **Verify updates**:
   - Open dashboard
   - Watch WatchList - prices should change every 30 seconds
   - Buy a stock
   - Go to Holdings - prices update every 60 seconds
   - Observe P&L changes with price movements

### Test with Real API

1. **Get API key** from Alpha Vantage or Finnhub

2. **Update `.env`**:
   ```bash
   REACT_APP_STOCK_API_PROVIDER=alpha_vantage
   REACT_APP_ALPHA_VANTAGE_KEY=your_actual_key
   ```

3. **Restart dashboard**:
   ```bash
   npm start
   ```

4. **Monitor console** for API calls and responses

## Troubleshooting

### Issue: Prices not updating

**Solutions:**
1. Check browser console for errors
2. Verify `.env` file is loaded (`console.log(process.env)`)
3. Check API provider is set correctly
4. Test with simulated mode first

### Issue: API rate limit exceeded

**Solutions:**
1. Increase `REACT_APP_PRICE_REFRESH_INTERVAL` to 60 or 120 seconds
2. Reduce number of stocks in watchlist
3. Switch to simulated mode temporarily
4. Upgrade to paid API tier

### Issue: Indian stocks not working

**Solutions:**
1. Verify stock symbols have correct suffix:
   - Alpha Vantage: `.BSE` (e.g., INFY.BSE)
   - Finnhub: `.NS` (e.g., INFY.NS)
2. Check if API provider supports Indian markets
3. Try different API provider

### Issue: Simulated data too volatile

**Solutions:**
1. Adjust random range in `getSimulatedPrice()`:
   ```javascript
   // Current: -2% to +2%
   const changePercent = (Math.random() * 4 - 2);
   
   // Reduce to -1% to +1%
   const changePercent = (Math.random() * 2 - 1);
   ```

### Issue: Loading indicators stuck

**Solutions:**
1. Check if API call is failing silently
2. Verify error handling in catch blocks
3. Check network tab in browser DevTools
4. Ensure `finally` block sets `setLoading(false)`

## Performance Optimization

### Current Implementation
- ✅ Batch API calls (all stocks in one call)
- ✅ 1-minute cache to reduce API load
- ✅ Configurable refresh intervals
- ✅ Automatic cleanup of intervals on unmount

### Recommendations for Production
- [ ] Use WebSocket connections for real-time updates
- [ ] Implement exponential backoff for failed requests
- [ ] Add retry logic with max attempts
- [ ] Show "last updated" timestamp
- [ ] Add manual refresh button
- [ ] Persist cache to localStorage
- [ ] Implement service workers for background updates

## API Cost Comparison

| Provider | Free Tier | Requests/Min | Requests/Day | Indian Stocks | Notes |
|----------|-----------|--------------|--------------|---------------|-------|
| **Alpha Vantage** | ✅ | 5 | 500 | ✅ | Best for Indian market |
| **Finnhub** | ✅ | 60 | Unlimited | ✅ | Good limits, reliable |
| **Simulated** | ✅ | Unlimited | Unlimited | ✅ | No real data |

## Best Practices

### 1. API Key Security
- Never commit API keys to git
- Use environment variables
- Rotate keys periodically
- Monitor usage limits

### 2. Error Handling
- Always provide fallback data
- Show user-friendly error messages
- Log errors for debugging
- Don't break UI on API failure

### 3. User Experience
- Show loading states
- Cache aggressively
- Update incrementally
- Provide manual refresh option

### 4. Testing
- Test with simulated data first
- Gradually roll out real API
- Monitor API costs
- Have fallback provider ready

## Future Enhancements

- [ ] WebSocket integration for true real-time updates
- [ ] Historical price charts
- [ ] Price alerts and notifications
- [ ] Multiple currency support
- [ ] Market hours detection (pause updates after hours)
- [ ] Portfolio value tracking over time
- [ ] Intraday price graphs
- [ ] Top gainers/losers widget
- [ ] Market indices (Nifty, Sensex)
- [ ] News integration per stock

## Resources

- **Alpha Vantage Documentation**: https://www.alphavantage.co/documentation/
- **Finnhub Documentation**: https://finnhub.io/docs/api
- **Indian Stock Symbols**: https://www.nseindia.com/
- **BSE Stock List**: https://www.bseindia.com/

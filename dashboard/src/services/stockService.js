import axios from 'axios';

// Stock API Configuration
const API_PROVIDER = process.env.REACT_APP_STOCK_API_PROVIDER || 'alpha_vantage';
const ALPHA_VANTAGE_KEY = process.env.REACT_APP_ALPHA_VANTAGE_KEY || 'demo';
const FINNHUB_KEY = process.env.REACT_APP_FINNHUB_KEY || '';

// Cache for API calls to avoid rate limits
const priceCache = new Map();
const CACHE_DURATION = 60000; // 1 minute

/**
 * Get real-time stock price from Alpha Vantage
 */
const getAlphaVantagePrice = async (symbol) => {
  try {
    // Alpha Vantage uses different symbols for Indian stocks
    // NSE stocks need .BSE or .NS suffix
    const apiSymbol = `${symbol}.BSE`; // Bombay Stock Exchange
    
    const response = await axios.get(
      `https://www.alphavantage.co/query`,
      {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: apiSymbol,
          apikey: ALPHA_VANTAGE_KEY,
        },
      }
    );

    const quote = response.data['Global Quote'];
    if (quote && quote['05. price']) {
      return {
        symbol: symbol,
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: quote['10. change percent'],
        timestamp: new Date(),
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
};

/**
 * Get real-time stock price from Finnhub
 */
const getFinnhubPrice = async (symbol) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote`,
      {
        params: {
          symbol: `${symbol}.NS`, // NSE India
          token: FINNHUB_KEY,
        },
      }
    );

    if (response.data && response.data.c) {
      return {
        symbol: symbol,
        price: response.data.c, // Current price
        change: response.data.d, // Change
        changePercent: `${response.data.dp}%`, // Change percent
        timestamp: new Date(),
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
};

/**
 * Simulated real-time data with realistic price movements
 * Used as fallback when API is unavailable or for demo purposes
 */
const getSimulatedPrice = (symbol, basePrice) => {
  // Generate realistic random price movement (-2% to +2%)
  const changePercent = (Math.random() * 4 - 2);
  const change = basePrice * (changePercent / 100);
  const newPrice = basePrice + change;

  return {
    symbol: symbol,
    price: parseFloat(newPrice.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: `${changePercent.toFixed(2)}%`,
    isSimulated: true,
    timestamp: new Date(),
  };
};

/**
 * Main function to get stock price
 * Implements caching and fallback strategies
 */
export const getStockPrice = async (symbol, fallbackPrice = null) => {
  // Check cache first
  const cached = priceCache.get(symbol);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  let priceData = null;

  // Try API based on provider
  if (API_PROVIDER === 'alpha_vantage' && ALPHA_VANTAGE_KEY !== 'demo') {
    priceData = await getAlphaVantagePrice(symbol);
  } else if (API_PROVIDER === 'finnhub' && FINNHUB_KEY) {
    priceData = await getFinnhubPrice(symbol);
  }

  // Fallback to simulated data if API fails
  if (!priceData && fallbackPrice) {
    priceData = getSimulatedPrice(symbol, fallbackPrice);
  }

  // Cache the result
  if (priceData) {
    priceCache.set(symbol, {
      data: priceData,
      timestamp: Date.now(),
    });
  }

  return priceData;
};

/**
 * Get multiple stock prices in batch
 */
export const getBatchStockPrices = async (symbols, fallbackPrices = {}) => {
  const promises = symbols.map((symbol) =>
    getStockPrice(symbol, fallbackPrices[symbol])
  );

  const results = await Promise.allSettled(promises);

  return results.map((result, index) => {
    if (result.status === 'fulfilled' && result.value) {
      return result.value;
    }
    // Return fallback or simulated data
    return getSimulatedPrice(symbols[index], fallbackPrices[symbols[index]] || 100);
  });
};

/**
 * Clear price cache
 */
export const clearPriceCache = () => {
  priceCache.clear();
};

/**
 * Get historical daily adjusted prices for up to the last `years` years.
 * Uses Alpha Vantage when configured; otherwise generates a simulated series.
 */
export const getHistoricalDaily = async (symbol, years = 5) => {
  const end = new Date();
  const start = new Date();
  // Support fractional years by converting to months
  const months = Math.max(1, Math.round((years || 5) * 12));
  start.setMonth(end.getMonth() - months);

  // Try provider-specific historical first so it matches watchlist provider
  // Alpha Vantage (daily adjusted)
  if (API_PROVIDER === 'alpha_vantage' && ALPHA_VANTAGE_KEY && ALPHA_VANTAGE_KEY !== 'demo') {
    try {
      const apiSymbol = `${symbol}.BSE`;
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'TIME_SERIES_DAILY_ADJUSTED',
          symbol: apiSymbol,
          outputsize: 'full',
          apikey: ALPHA_VANTAGE_KEY,
        },
      });
      const series = response.data['Time Series (Daily)'] || {};
      const rows = Object.entries(series)
        .map(([date, o]) => ({ date: new Date(date), close: parseFloat(o['5. adjusted close']) }))
        .filter(({ date }) => date >= start && date <= end)
        .sort((a, b) => a.date - b.date);

      if (rows.length > 0) {
        // Anchor last point to current price if available
        const latest = await getStockPrice(symbol, rows[rows.length - 1].close);
        if (latest?.price && Math.abs(latest.price - rows[rows.length - 1].close) / rows[rows.length - 1].close > 0.01) {
          rows.push({ date: new Date(), close: parseFloat(latest.price) });
        }
        return rows;
      }
    } catch (e) {
      console.error('Failed to fetch historical from Alpha Vantage:', e);
    }
  }

  // Finnhub daily candles (NSE suffix .NS)
  if (API_PROVIDER === 'finnhub' && FINNHUB_KEY) {
    try {
      const from = Math.floor(start.getTime() / 1000);
      const to = Math.floor(end.getTime() / 1000);
      const apiSymbol = `${symbol}.NS`;
      const { data } = await axios.get('https://finnhub.io/api/v1/stock/candle', {
        params: { symbol: apiSymbol, resolution: 'D', from, to, token: FINNHUB_KEY },
      });
      if (data && data.s === 'ok' && Array.isArray(data.c) && Array.isArray(data.t)) {
        const rows = data.t.map((ts, i) => ({ date: new Date(ts * 1000), close: parseFloat(data.c[i]) }))
          .filter(({ date }) => date >= start && date <= end)
          .sort((a,b) => a.date - b.date);
        if (rows.length > 0) {
          // Anchor to latest real-time price
          const latest = await getStockPrice(symbol, rows[rows.length - 1].close);
          if (latest?.price && Math.abs(latest.price - rows[rows.length - 1].close) / rows[rows.length - 1].close > 0.01) {
            rows.push({ date: new Date(), close: parseFloat(latest.price) });
          }
          return rows;
        }
      }
    } catch (e) {
      console.error('Failed to fetch historical from Finnhub:', e);
    }
  }

  // Fallback: generate a realistic random walk around a base price
  const base = 100 + Math.random() * 200;
  const days = years * 252; // trading days
  const rows = [];
  let price = base;
  const date = new Date(start);
  while (date <= end) {
    // Skip weekends to simulate markets
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      const drift = 0.0002; // small average up drift
      const vol = 0.015; // daily vol ~1.5%
      const rnd = (Math.random() - 0.5) * 2; // [-1, 1]
      price = price * (1 + drift + vol * rnd);
      rows.push({ date: new Date(date), close: parseFloat(price.toFixed(2)) });
    }
    date.setDate(date.getDate() + 1);
  }
  // Anchor fallback to current if available
  try {
    const latest = await getStockPrice(symbol, rows[rows.length - 1]?.close || base);
    if (latest?.price) rows.push({ date: new Date(), close: parseFloat(latest.price) });
  } catch {}
  return rows.slice(-days);
};

/**
 * Calculate profit/loss percentage
 */
export const calculateProfitLoss = (avgPrice, currentPrice) => {
  const diff = currentPrice - avgPrice;
  const percent = (diff / avgPrice) * 100;
  return {
    value: diff,
    percent: percent.toFixed(2),
    isProfit: diff >= 0,
  };
};

/**
 * Format price for display
 */
export const formatPrice = (price) => {
  return `₹${parseFloat(price).toFixed(2)}`;
};

/**
 * Format change percentage for display
 */
export const formatChangePercent = (percent, isProfit) => {
  const sign = isProfit ? '+' : '';
  return `${sign}${percent}%`;
};

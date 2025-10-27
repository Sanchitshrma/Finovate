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

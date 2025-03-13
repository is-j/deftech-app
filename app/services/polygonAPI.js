
import { POLYGON_API_KEY } from '@env';

const BASE_URL = 'https://api.polygon.io';


export const getStockQuote = async (symbol) => {
  try {
    console.log(`Fetching quote for ${symbol}`);
    const startTime = Date.now();
    
    const response = await fetch(
      `${BASE_URL}/v2/aggs/ticker/${symbol}/prev?apiKey=${POLYGON_API_KEY}`
    );
    
    console.log(`Received response for ${symbol} after ${(Date.now() - startTime)/1000} seconds`);
    const data = await response.json();
    console.log(`Parsed JSON for ${symbol} after ${(Date.now() - startTime)/1000} seconds`);
    
    return data;
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    throw error;
  }
};


export const getCompanyDetails = async (symbol) => {
  try {
    console.log(`Fetching company details for ${symbol}`);
    const response = await fetch(
      `${BASE_URL}/v3/reference/tickers/${symbol}?apiKey=${POLYGON_API_KEY}`
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching company details for ${symbol}:`, error);
    throw error;
  }
};


export const getHistoricalData = async (symbol, from, to) => {
  try {
    console.log(`Fetching historical data for ${symbol}`);
    const response = await fetch(
      `${BASE_URL}/v2/aggs/ticker/${symbol}/range/1/day/${from}/${to}?apiKey=${POLYGON_API_KEY}`
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error);
    throw error;
  }
};


export const getStockNews = async (symbol, limit = 10) => {
  try {
    console.log(`Fetching news for ${symbol}`);
    const response = await fetch(
      `${BASE_URL}/v2/reference/news?ticker=${symbol}&limit=${limit}&apiKey=${POLYGON_API_KEY}`
    );
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching news for ${symbol}:`, error);
    throw error;
  }
};

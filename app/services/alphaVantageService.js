

import { ALPHA_VANTAGE_API_KEY } from '@env';

const BASE_URL = 'https://www.alphavantage.co/query';

export const getDailyStockData = async (symbol) => {
    try {
        console.log(`Fetching daily data for ${symbol}`);
        const response = await fetch(
            `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        const data = await response.json();

        if (data['Error Message']) {
            throw new Error(data['Error Message']);
        }

        return data;
    } catch (error) {
        console.error(`Error fetching stock data for ${symbol}:`, error);
        throw error;
    }
};

export const getCompanyOverview = async (symbol) => {
    try {
        console.log(`Fetching company overview for ${symbol}`);
        const response = await fetch(
            `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(`Error fetching company overview for ${symbol}:`, error);
        throw error;
    }
};

export const getQuote = async (symbol) => {
    try {
        console.log(`Fetching quote for ${symbol}`);
        const response = await fetch(
            `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
        );

        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
        throw error;
    }
};
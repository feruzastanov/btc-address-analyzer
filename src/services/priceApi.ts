import { fetchWithRetry } from '../utils/api';

const BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
const BINANCE_KLINES_URL = 'https://api.binance.com/api/v3/klines';

export async function getCurrentBTCPrice(): Promise<number> {
  try {
    const response = await fetchWithRetry(BINANCE_API_URL);
    const data = await response.json();
    return parseFloat(data.price);
  } catch (error) {
    console.error('Failed to fetch BTC price:', error);
    throw error;
  }
}

export async function getBTCPriceHistory(days = 7): Promise<{ labels: string[]; prices: number[] }> {
  try {
    const interval = '1d';
    const limit = days;
    const endTime = Date.now();
    const startTime = endTime - (days * 24 * 60 * 60 * 1000);

    const response = await fetchWithRetry(
      `${BINANCE_KLINES_URL}?symbol=BTCUSDT&interval=${interval}&limit=${limit}&startTime=${startTime}&endTime=${endTime}`
    );
    
    const data = await response.json();
    
    return {
      labels: data.map((item: any[]) => new Date(item[0]).toLocaleDateString()),
      prices: data.map((item: any[]) => parseFloat(item[4]))
    };
  } catch (error) {
    console.error('Failed to fetch BTC price history:', error);
    throw error;
  }
}
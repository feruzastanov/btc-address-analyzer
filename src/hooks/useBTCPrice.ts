import { useState, useEffect } from 'react';
import { getCurrentBTCPrice } from '../services/priceApi';

export function useBTCPrice() {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setLoading(true);
        const currentPrice = await getCurrentBTCPrice();
        setPrice(currentPrice);
        setError(null);
      } catch (err) {
        setError('Failed to fetch current BTC price');
        setPrice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  return { price, loading, error };
}
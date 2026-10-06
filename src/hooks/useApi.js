import { useState, useEffect, useCallback } from "react";
import { apiRequest } from "../config/api";

/**
 * Custom hook to fetch API data with automatic fallback support
 * @param {string} endpoint - API route (e.g. '/api/hero')
 * @param {any} fallbackData - Static fallback data if request fails or while loading
 * @param {boolean} enabled - Whether to fetch automatically
 */
export function useApi(endpoint, fallbackData = null, enabled = true) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;
    setLoading(true);
    setError(null);
    try {
      const result = await apiRequest(endpoint);
      setData(result);
      return result;
    } catch (err) {
      console.warn(`[useApi] Error fetching ${endpoint}, using fallback:`, err.message);
      setError(err);
      if (fallbackData !== null) {
        setData(fallbackData);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, fallbackData]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [fetchData, enabled]);

  return { data, loading, error, refetch: fetchData, setData };
}

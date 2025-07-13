import { useState, useCallback } from 'react';
import api from '../services/api';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (apiCall, ...params) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(...params);
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.userMessage || err.message || 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((url) => execute(() => api.get(url)), [execute]);
  const post = useCallback((url, data) => execute(() => api.post(url, data)), [execute]);
  const put = useCallback((url, data) => execute(() => api.put(url, data)), [execute]);
  const del = useCallback((url) => execute(() => api.delete(url)), [execute]);

  return {
    loading,
    error,
    data,
    execute,
    get,
    post,
    put,
    delete: del
  };
};

export default useApi;

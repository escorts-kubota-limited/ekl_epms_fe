import { useCallback, useState } from 'react';
import axios from 'axios';

export function useApi(baseUrl = '') {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const callApi = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
    setData(null);

    const controller = new AbortController();
    const { signal } = controller;
    let response ;

    try {
      console.log("console.", options);

       response = await axios({
        method: options.method || 'GET',
        url: baseUrl + endpoint,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        data: options.body || undefined,
        signal,
      });

      console.log(" 200 response : ",response);

      setData(response.data);
      return response.data;
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      } else {
        console.log("400 response : ",response);

        const message =
          err.response?.data?.message ||
          err.message ||
          'API request failed';
        setError(message);
        throw new Error(message);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [baseUrl]);

  return { data, error, loading, callApi };
}

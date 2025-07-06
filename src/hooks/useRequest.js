import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';

const BASE_API_URL = import.meta.env.VITE_API_URL || '';

export default function useRequest(endpoint, options = { method: 'GET', headers: {} }) {
  const navigate = useNavigate();
  const { notify } = useNotifications();

  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getQueryString = (filters = {}) => {
    const query = Object.entries(filters)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return query ? `?${query}` : '';
  };

  const fetchData = async (body = null, extraUrl = '') => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const res = await fetch(`${BASE_API_URL}/api/v1${endpoint}${extraUrl}`, {
        method: options.method || 'GET',
        headers,
        body: options.method !== 'GET' && body ? JSON.stringify(body) : null,
      });

      setResponse(res);

      const contentType = res.headers.get('Content-Type');
      const isJson = contentType && contentType.includes('application/json');
      const responseData = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        const message = responseData?.error || res.statusText || 'Unknown error';

        switch (res.status) {
          case 401:
            navigate('/auth/login');
            notify('🔒 Please login to continue', 'info');
            break;
          case 400:
            notify('❌ Invalid request.', 'error');
            break;
          case 404:
            notify('🔍 Resource not found.', 'error');
            break;
          case 500:
            notify('💥 Server error. Try again later.', 'error');
            break;
          default:
            notify(message, 'error');
        }

        throw new Error(message);
      }

      setData(responseData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, response, error, loading, fetchData, getQueryString };
}

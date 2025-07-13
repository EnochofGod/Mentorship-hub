import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function HealthCheckPage() {
  const [status, setStatus] = useState('Checking...');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try a public endpoint
    api.post('/auth/login', { email: 'fake@fake.com', password: 'fake' })
      .then(() => setStatus('Backend is reachable (login endpoint responded).'))
      .catch(err => {
        if (err.response) {
          setStatus(`Backend responded with status ${err.response.status}`);
          setError(err.userMessage || err.message || JSON.stringify(err.response.data));
        } else if (err.request) {
          setStatus('No response from backend. Check CORS, server status, or network.');
        } else {
          setStatus('Error setting up request.');
        }
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Backend Health Check</h1>
        <p className="mb-2">Status: <span className="font-mono">{status}</span></p>
        {error && <p className="text-red-600">Error: {error}</p>}
        <p className="mt-4 text-gray-500">If you see a 401 or 400, your backend is reachable. If you see a CORS or network error, check your server and API URL.</p>
      </div>
    </div>
  );
}

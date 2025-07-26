import React, { useEffect, useState } from 'react';
import api from '../services/api';

function MyRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/requests/sent')
      .then(res => setRequests(res.data))
      .catch(err => setError(err.userMessage || err.message || 'Failed to load requests'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Mentorship Requests</h1>
      {loading ? <p>Loading...</p> : error ? <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p> : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req.id} className="border rounded p-4 bg-white shadow">
              <p><strong>Mentor:</strong> {req.mentor?.profile?.name || req.mentorId}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Message:</strong> {req.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyRequestsPage;

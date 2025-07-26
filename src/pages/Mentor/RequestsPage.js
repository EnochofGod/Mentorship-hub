import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function MentorRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/requests/received')
      .then(res => setRequests(res.data))
      .catch(err => setError(err.userMessage || err.message || 'Failed to load requests'))
      .finally(() => setLoading(false));
  }, []);

  const handleAction = async (id, status) => {
    setSuccess('');
    setError('');
    try {
      await api.put(`/requests/${id}`, { status });
      setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status } : r));
      setSuccess('Request updated successfully!');
    } catch (err) {
      setError(err.userMessage || err.message || 'Failed to update request');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Incoming Mentorship Requests</h1>
      {loading ? <p>Loading...</p> : (
      <>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{success}</div>}
      <ul className="space-y-4">
      {requests.map(req => (
      <li key={req.id} className="border rounded p-4 bg-white shadow">
      <p><strong>Mentee:</strong> {req.mentee?.name || req.menteeId}</p>
      <p><strong>Message:</strong> {req.message}</p>
      <p><strong>Status:</strong> {req.status}</p>
      {req.status === 'PENDING' && (
      <div className="mt-2 space-x-2">
      <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={() => handleAction(req.id, 'ACCEPTED')}>Accept</button>
      <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleAction(req.id, 'REJECTED')}>Reject</button>
      </div>
      )}
      </li>
      ))}
      </ul>
      </>
      )}
          </div>
  );
}

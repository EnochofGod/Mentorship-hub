import React, { useEffect, useState } from 'react';
import { requests } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';

export default function MenteeRequestsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSentRequests = async () => {
      if (!user) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await requests.getSentRequests();
        setSentRequests(res.data);
        setError(null);
      } catch (err) {
        setError(
          err.userMessage || err.message || 'Failed to load requests. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSentRequests();
  }, [user]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Mentorship Requests
      </h1>
      {loading && <p className="text-lg text-gray-700">Loading your requests...</p>}
      {error && <p className="text-lg text-red-600">{error}</p>}
      {!loading && !error && sentRequests.length === 0 && (
        <p className="text-lg text-gray-700">
          You have not sent any mentorship requests yet.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sentRequests.map((req) => (
          req.status === 'ACCEPTED' ? (
            <button
              key={req.id}
              className="bg-white rounded-lg shadow-md p-6 border-2 border-green-400 hover:border-indigo-500 transition-colors w-full text-left"
              onClick={() => navigate(`/mentors/${parseInt(req.mentorId, 10)}/book`)}
            >
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                Request to {req.mentor?.profile?.name || req.mentorId}
              </h2>
              <p className="text-gray-600">Status: {req.status}</p>
              <p className="text-gray-600">Sent: {new Date(req.createdAt).toLocaleString()}</p>
              <span className="text-indigo-600 underline mt-2 inline-block">Book a session with this mentor</span>
            </button>
          ) : (
            <div key={req.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                Request to {req.mentor?.profile?.name || req.mentorId}
              </h2>
              <p className="text-gray-600">Status: {req.status}</p>
              <p className="text-gray-600">Sent: {new Date(req.createdAt).toLocaleString()}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FaUserShield } from 'react-icons/fa';

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin/sessions')
      .then(res => setSessions(res.data))
      .catch(err => setError(err.userMessage || err.message || 'Failed to load sessions'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 py-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <div className="flex flex-col items-center">
        <FaUserShield size={48} className="text-indigo-600 mb-4" />
        <h1 className="text-2xl font-extrabold text-indigo-700 mb-2">Sessions Management</h1>
        <p className="text-gray-600">View and manage all mentorship sessions here.</p>
      </div>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">All Sessions</h1>
        {loading ? <p>Loading...</p> : error ? <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p> : (
          <ul className="space-y-4">
            {sessions.map(session => (
              <li key={session.id} className="border rounded p-4 bg-white shadow">
                <p><strong>Mentor:</strong> {session.mentorId}</p>
                <p><strong>Mentee:</strong> {session.menteeId}</p>
                <p><strong>Scheduled:</strong> {new Date(session.scheduledTime).toLocaleString()}</p>
                <p><strong>Mentee Feedback:</strong> {session.feedbackMentee || 'N/A'}</p>
                <p><strong>Mentor Feedback:</strong> {session.feedbackMentor || 'N/A'}</p>
                <p><strong>Rating:</strong> {session.ratingMentee || 'N/A'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

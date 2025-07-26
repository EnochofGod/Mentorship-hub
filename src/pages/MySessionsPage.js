import React, { useEffect, useState } from 'react';
import api from '../services/api';

function MySessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    api.get('/sessions/mentee')
      .then(res => setSessions(res.data))
      .catch(err => setError(err.userMessage || err.message || 'Failed to load sessions'))
      .finally(() => setLoading(false));
  }, []);

  const handleFeedback = async (sessionId) => {
    if (!feedback[sessionId]?.rating || feedback[sessionId].rating < 1 || feedback[sessionId].rating > 5) {
      alert('Please provide a rating between 1 and 5.');
      return;
    }
    try {
      await api.put(`/sessions/${sessionId}/feedback`, {
        rating: feedback[sessionId]?.rating,
        feedback: feedback[sessionId]?.text,
        role: 'Mentee',
      });
      alert('Feedback submitted!');
    } catch (err) {
      alert(err.userMessage || err.message || 'Failed to submit feedback');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Sessions</h1>
      {loading ? <p>Loading...</p> : error ? <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p> : (
        <ul className="space-y-4">
          {sessions.map(session => (
            <li key={session.id} className="border rounded p-4 bg-white shadow">
              <p><strong>Mentor:</strong> {session.mentor?.profile?.name || session.mentorId}</p>
              <p><strong>Scheduled:</strong> {new Date(session.scheduledTime).toLocaleString()}</p>
              <div className="mt-2">
                <label className="block font-semibold">Rate this session:</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={feedback[session.id]?.rating || ''}
                  onChange={e => setFeedback(f => ({ ...f, [session.id]: { ...f[session.id], rating: e.target.value } }))}
                  className="border px-2 py-1 mr-2 w-16"
                />
                <input
                  type="text"
                  placeholder="Leave a comment"
                  value={feedback[session.id]?.text || ''}
                  onChange={e => setFeedback(f => ({ ...f, [session.id]: { ...f[session.id], text: e.target.value } }))}
                  className="border px-2 py-1 mr-2"
                />
                <button
                  className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  onClick={() => handleFeedback(session.id)}
                >Submit</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MySessionsPage;

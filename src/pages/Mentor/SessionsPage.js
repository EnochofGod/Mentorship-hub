import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function MentorSessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/sessions/mentor')
      .then(res => setSessions(res.data))
      .catch(err => setError(err.userMessage || err.message || 'Failed to load sessions'))
      .finally(() => setLoading(false));
  }, []);

  const handleFeedback = async (sessionId) => {
    setSuccess('');
    setError('');
    const intSessionId = parseInt(sessionId, 10);
    if (!feedback[intSessionId]?.text || feedback[intSessionId].text.length < 3) {
      setError('Please enter at least 3 characters of feedback.');
      return;
    }
    try {
      await api.put(`/sessions/${intSessionId}/feedback`, {
        feedback: feedback[intSessionId]?.text,
        role: 'Mentor',
      });
      setSuccess('Feedback submitted!');
    } catch (err) {
      setError(err.userMessage || err.message || 'Failed to submit feedback');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Sessions</h1>
      {loading ? <p>Loading...</p> : (
        <>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{success}</div>}
          <ul className="space-y-4">
            {sessions.map(session => (
            <li key={session.id} className="border rounded p-4 bg-white shadow">
              <p><strong>Mentee:</strong> {session.menteeId}</p>
              <p><strong>Scheduled:</strong> {new Date(session.scheduledTime).toLocaleString()}</p>
              <div className="mt-2">
                <label className="block font-semibold">Leave feedback:</label>
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
        </>
      )}
          </div>
  );
}

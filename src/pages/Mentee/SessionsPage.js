import React, { useEffect, useState } from 'react';
import { sessions } from '../../services/api';

export default function MenteeSessionsPage() {
  const [mySessions, setMySessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await sessions.getMenteeSessions();
        // Filter for upcoming sessions only
        const now = new Date();
        setMySessions(res.data.filter(s => new Date(s.scheduledTime) > now));
      } catch (err) {
        setError(err.userMessage || err.message || 'Failed to load sessions.');
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Upcoming Sessions</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && mySessions.length === 0 && (
        <p>No upcoming sessions.</p>
      )}
      <ul className="space-y-4">
        {mySessions.map(session => (
          <li key={session.id} className="border rounded p-4 bg-white shadow">
            <p><strong>Mentor:</strong> {session.mentor?.name || (Number.isInteger(session.mentorId) ? session.mentorId : 'N/A')}</p>
            <p><strong>Scheduled:</strong> {new Date(session.scheduledTime).toLocaleString()}</p>
            <p><strong>Status:</strong> {session.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

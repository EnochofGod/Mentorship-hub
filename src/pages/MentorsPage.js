import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function MentorsPage() {
  const { isAuthenticated, user } = useAuth();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    api.get('/users/mentors')
      .then(res => setMentors(res.data))
      .catch(() => setError('Failed to load mentors'))
      .finally(() => setLoading(false));
  }, []);

  const handleRequest = async (mentorId) => {
    try {
      await api.post('/requests', { mentorId });
      alert('Mentorship request sent!');
    } catch {
      alert('Failed to send request');
    }
  };

  const filtered = filter
    ? mentors.filter(m => m.skills && m.skills.includes(filter))
    : mentors;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Find a Mentor</h1>
      <input
        type="text"
        placeholder="Filter by skill..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="border px-2 py-1 mb-4"
      />
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(mentor => (
            <li key={mentor.id} className="border rounded p-4 bg-white shadow">
              <h2 className="font-bold text-lg">{mentor.name}</h2>
              <p>{mentor.bio}</p>
              <p><strong>Skills:</strong> {mentor.skills?.join(', ')}</p>
              {isAuthenticated && user.role === 'Mentee' && (
                <button
                  className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                  onClick={() => handleRequest(mentor.id)}
                >
                  Request Mentorship
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MentorsPage;

import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { FaUserCheck } from 'react-icons/fa';

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ mentorId: '', menteeId: '' });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/admin/matches')
      .then(res => setMatches(res.data))
      .catch(err => setError(err.userMessage || err.message || 'Failed to load matches'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleAssign = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!form.mentorId || !form.menteeId) {
      setError('Please provide both Mentor ID and Mentee ID.');
      return;
    }
    try {
      const res = await api.post('/admin/assign', form);
      setMatches(m => [...m, res.data]);
      setForm({ mentorId: '', menteeId: '' });
      setSuccess('Mentor assigned!');
    } catch (err) {
      setError(err.userMessage || err.message || 'Failed to assign mentor');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 py-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <div className="flex flex-col items-center">
        <FaUserCheck size={48} className="text-indigo-600 mb-4" />
        <h1 className="text-2xl font-extrabold text-indigo-700 mb-2">Matches Management</h1>
        <p className="text-gray-600">View and manage all mentorship matches here.</p>
      </div>
      <div className="container mx-auto py-8">
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{success}</div>}
        <form onSubmit={handleAssign} className="mb-6 flex gap-2 items-end">
          <div>
            <label className="block">Mentor ID</label>
            <input name="mentorId" value={form.mentorId} onChange={handleChange} className="border px-2 py-1" required />
          </div>
          <div>
            <label className="block">Mentee ID</label>
            <input name="menteeId" value={form.menteeId} onChange={handleChange} className="border px-2 py-1" required />
          </div>
          <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded">Assign Mentor</button>
        </form>
        {loading ? <p>Loading...</p> : error ? <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</p> : (
          <ul className="space-y-4">
            {matches.map(match => (
              <li key={match.id} className="border rounded p-4 bg-white shadow">
                <p><strong>Mentor:</strong> {match.mentor?.name || match.mentorId}</p>
                <p><strong>Mentee:</strong> {match.mentee?.name || match.menteeId}</p>
                <p><strong>Status:</strong> {match.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

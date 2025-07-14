import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function AvailabilityPage() {
  const [slots, setSlots] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [form, setForm] = useState({ dayOfWeek: '', startTime: '', endTime: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/availability/me')
      .then(res => setSlots(res.data))
      .catch(err => setError(err.userMessage || err.message || 'Failed to load availability'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!form.dayOfWeek) {
      setError('Day is required');
      return;
    }
    if (!form.startTime || !form.endTime) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      // Send dayOfWeek as is for backend compatibility
      const payload = { ...form, mentorId: user.id };
      const res = await api.post('/availability', payload);
      setSlots(slots => [...slots, res.data]);
      setForm({ dayOfWeek: '', startTime: '', endTime: '' });
      setSuccess('Availability slot added!');
    } catch (err) {
      setError(err.userMessage || err.message || 'Failed to set availability');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Availability</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2 items-end">
        <div>
          <label className="block">Day of Week</label>
          <select name="dayOfWeek" value={form.dayOfWeek} onChange={handleChange} className="border px-2 py-1" required>
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div>
          <label className="block">Start Time</label>
          <input name="startTime" type="time" value={form.startTime} onChange={handleChange} className="border px-2 py-1" required />
        </div>
        <div>
          <label className="block">End Time</label>
          <input name="endTime" type="time" value={form.endTime} onChange={handleChange} className="border px-2 py-1" required />
        </div>
        <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded">Add Slot</button>
      </form>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <ul className="space-y-2">
          {slots.map(slot => (
            <li key={slot.id} className="border rounded p-2 bg-white shadow">
              {slot.dayOfWeek}: {slot.startTime} - {slot.endTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

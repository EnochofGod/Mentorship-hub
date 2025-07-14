import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users, availability, sessions } from '../../services/api';

export default function BookSessionPage() {
  const { mentorId: mentorIdParam } = useParams();
  const mentorId = parseInt(mentorIdParam, 10);
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const mentorRes = await users.getUserProfileById(mentorId);
        setMentor(mentorRes.data);
        // Assume you have an endpoint to get a mentor's availability by ID
        const slotsRes = await availability.getMentorAvailabilityById(mentorId);
        setSlots(slotsRes.data);
      } catch (err) {
        setError('Failed to load mentor or slots.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mentorId]);

  const handleBook = async (slotId) => {
    setBooking(true);
    setError(null);
    setSuccess('');
    try {
      await sessions.scheduleSession({ mentorId, slotId });
      setSuccess('Session booked successfully!');
      setTimeout(() => navigate('/mentee/my-sessions'), 1500);
    } catch (err) {
      setError('Failed to book session.');
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Book a Session</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
      {mentor && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Mentor: {mentor.profile?.name || mentor.name}</h2>
        </div>
      )}
      <ul className="space-y-4">
        {slots.map(slot => (
          <li key={slot.id} className="border rounded p-4 bg-white shadow flex items-center justify-between">
            <span>
              {(() => {
                const start = new Date(slot.start);
                const end = new Date(slot.end);
                const validStart = !isNaN(start.getTime());
                const validEnd = !isNaN(end.getTime());
                return validStart && validEnd
                  ? `${start.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                  : 'Invalid slot date';
              })()}
            </span>
            <button
              className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50"
              onClick={() => handleBook(slot.id)}
              disabled={booking}
            >Book</button>
          </li>
        ))}
      </ul>
      {!loading && slots.length === 0 && <p>No available slots.</p>}
    </div>
  );
}

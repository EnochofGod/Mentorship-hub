import React, { useEffect, useState } from "react";
import { sessions } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

function MySessionsPage() {
  const { user } = useAuth();
  const [mySessions, setMySessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMySessions = async () => {
      if (!user) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await sessions.getMenteeSessions();
        setMySessions(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch mentee sessions:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load sessions. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMySessions();
  }, [user]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Mentorship Sessions
      </h1>
      {loading && (
        <p className="text-lg text-gray-700">Loading your sessions...</p>
      )}
      {error && <p className="text-lg text-red-600">{error}</p>}
      {!loading && !error && mySessions.length === 0 && (
        <p className="text-lg text-gray-700">
          You don't have any upcoming or past sessions.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mySessions
          // Filter out sessions that are not scheduled in the future
          .filter(session => {
            if (!session.scheduledTime) return false;
            const sessionDate = new Date(session.scheduledTime);
            return sessionDate > new Date();
          })
          // Render a card for each upcoming session
          .map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
      </div>

/**
 * SessionCard displays details and allows the mentee to leave feedback and a rating for a session.
 */
function SessionCard({ session }) {
  const [feedback, setFeedback] = useState(session.feedbackMentee || '');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [rating, setRating] = useState(session.rating || '');

  /**
   * Submit feedback and rating for this session to the backend.
   */
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess('');
    setError('');
    try {
      await fetch(`/api/sessions/${session.id}/feedback`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackMentee: feedback, rating })
      });
      setSuccess('Feedback and rating saved!');
    } catch (err) {
      setError('Failed to save feedback.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="mb-2">
        <strong>Mentor:</strong> {session.mentor?.profile?.name || session.mentor?.name || session.mentorId}
      </div>
      <div className="mb-2">
        <strong>Mentee:</strong> {session.mentee?.profile?.name || session.mentee?.name || session.menteeId}
      </div>
      <div className="mb-2">
        <strong>Scheduled:</strong> {session.scheduledTime ? new Date(session.scheduledTime).toLocaleString() : 'N/A'}
      </div>
      <div className="mb-2">
        <strong>Mentee Feedback:</strong> {session.feedbackMentee ? session.feedbackMentee : 'N/A'}
      </div>
      <div className="mb-2">
        <strong>Mentor Feedback:</strong> {session.feedbackMentor ? session.feedbackMentor : 'N/A'}
      </div>
      <div className="mb-2">
        <strong>Rating:</strong> {session.rating ? session.rating : 'N/A'}
      </div>
      <form onSubmit={handleFeedbackSubmit} className="mt-4">
        <label className="block text-gray-700 font-semibold mb-1">Your Feedback:</label>
        <textarea
          className="w-full border rounded p-2 mb-2"
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          rows={2}
          placeholder="Leave your feedback for this session..."
        />
        <label className="block text-gray-700 font-semibold mb-1 mt-2">Your Rating:</label>
        <select
          className="w-full border rounded p-2 mb-2"
          value={rating}
          onChange={e => setRating(e.target.value)}
        >
          <option value="">Select rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Feedback & Rating'}
        </button>
        {success && <p className="text-green-600 mt-2">{success}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}
      </div>
    </div>
  );
}

export default MySessionsPage;

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
        {mySessions.map((session) => (
          <div key={session.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              Session with {session.mentor?.profile?.name || session.mentorId}
            </h2>
            <p className="text-gray-600">
              Date: {new Date(session.startTime).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Time: {new Date(session.startTime).toLocaleTimeString()} -{" "}
              {new Date(session.endTime).toLocaleTimeString()}
            </p>
            <p className="text-gray-600">Status: {session.status}</p>
            {/* Add more session details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MySessionsPage;

import React, { useEffect, useState } from 'react';
import { sessions, requests, users } from '../../services/api';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [sessionCount, setSessionCount] = useState(null);
  const [requestCount, setRequestCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch user profile from backend
        const userRes = await users.getCurrentUserProfile();
        setUser(userRes.data);
        // Fetch activity data based on role
        if (userRes.data.role === 'Mentor') {
          const sessRes = await sessions.getMentorSessions();
          setSessionCount(Array.isArray(sessRes.data) ? sessRes.data.length : 0);
          const reqRes = await requests.getReceivedRequests();
          setRequestCount(Array.isArray(reqRes.data) ? reqRes.data.length : 0);
        } else if (userRes.data.role === 'Mentee') {
          const sessRes = await sessions.getMenteeSessions();
          setSessionCount(Array.isArray(sessRes.data) ? sessRes.data.length : 0);
          const reqRes = await requests.getSentRequests();
          setRequestCount(Array.isArray(reqRes.data) ? reqRes.data.length : 0);
        } else {
          setSessionCount(null);
          setRequestCount(null);
        }
      } catch (err) {
        setError('Failed to load profile or activity data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const profileName = user?.profile?.name || user?.name || user?.email || 'User';
  const userId = user?.id || user?._id || (user?.profile && user.profile.id) || 'N/A';

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 sm:px-6 md:px-8 py-8 w-full max-w-screen-md mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-4">Welcome to Your Dashboard</h1>
      <p className="text-lg text-gray-700 mb-2">Hello, {profileName}!</p>
      <p className="text-base text-indigo-600 font-semibold mb-2">
        Your User ID: {userId}
      </p>
      <p className="text-base text-gray-600 mb-4">Email: {user?.email}</p>
      <p className="text-base text-gray-600 mb-4">Role: {user?.role}</p>
      <div className="w-full max-w-md mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-indigo-700 mb-2">Your Activity</h2>
        {loading ? (
          <p className="text-gray-500">Loading activity...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Profile completion: <span className="font-semibold">{user?.profile ? 'Complete' : 'Incomplete'}</span></li>
            {user?.role === 'Mentor' && (
              <>
                <li>Mentorship sessions: <span className="font-semibold">{sessionCount}</span></li>
                <li>Mentorship requests received: <span className="font-semibold">{requestCount}</span></li>
              </>
            )}
            {user?.role === 'Mentee' && (
              <>
                <li>Mentorship sessions: <span className="font-semibold">{sessionCount}</span></li>
                <li>Mentorship requests sent: <span className="font-semibold">{requestCount}</span></li>
              </>
            )}
            {user?.role === 'Admin' && (
              <li>Admin users can manage all users, matches, and sessions.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;

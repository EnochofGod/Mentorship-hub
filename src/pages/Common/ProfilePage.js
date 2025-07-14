import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { users } from '../../services/api';

function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    users.getCurrentUserProfile()
      .then((res) => {
        const data = res.data;
        if (data.profile) {
          setProfile({
            ...data.profile,
            email: data.email,
            role: data.role
          });
        } else {
          setProfile(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.userMessage || err.message || 'Failed to fetch profile');
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">Loading profile...</div>;
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-160px)] text-red-600">{error}</div>;
  }
  if (!profile) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">No profile found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 sm:px-6 md:px-8 w-full max-w-screen-sm mx-auto text-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-indigo-700">{profile.name ? profile.name[0] : '?'}</span>
          </div>
          <h2 className="text-2xl font-semibold text-indigo-800 mb-1 break-words">{profile.name}</h2>
          <p className="text-gray-600 break-all">{profile.email}</p>
        </div>
        <div className="mb-4 text-left">
          <p className="text-gray-700 font-semibold">Bio:</p>
          <p className="text-gray-500">{profile.bio || 'No bio provided.'}</p>
        </div>
        <div className="mb-4 text-left">
          <p className="text-gray-700 font-semibold">Skills:</p>
          <p className="text-gray-500">{Array.isArray(profile.skills) && profile.skills.length > 0 ? profile.skills.join(', ') : 'Not specified.'}</p>
        </div>
        <div className="mb-4 text-left">
          <p className="text-gray-700 font-semibold">Goals:</p>
          <p className="text-gray-500">{profile.goals || 'Not specified.'}</p>
        </div>
        <div className="mb-4 text-left">
          <p className="text-gray-700 font-semibold">Industry:</p>
          <p className="text-gray-500">{profile.industry || 'Not specified.'}</p>
        </div>
        <button
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition w-full sm:w-auto"
          onClick={() => navigate('/profile/edit')}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;

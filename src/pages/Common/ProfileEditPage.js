import React, { useState, useEffect } from 'react';
import ProfileForm from '../../components/forms/ProfileForm';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

function ProfileEditPage() {
  const { user, updateUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get('/users/me');
        setProfileData(res.data.profile);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
      setError('No user logged in.');
    }
  }, [user]);

  const handleProfileSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const res = await api.put('/users/me/profile', formData);
      setProfileData(res.data.profile);
      updateUser(res.data.profile);
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err.userMessage || err.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profileData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4">
        <p className="text-xl text-gray-700">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-160px)] py-8">
      <div className="w-full max-w-2xl">
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4" role="alert">
            <p className="font-bold">Success!</p>
            <p className="text-sm">{successMessage}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
            <p className="font-bold">Error!</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {profileData ? (
          <ProfileForm
            onSubmit={handleProfileSubmit}
            initialData={profileData}
            loading={loading}
          />
        ) : (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-md" role="alert">
            <p>No profile data available. Please try again or contact support.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileEditPage;
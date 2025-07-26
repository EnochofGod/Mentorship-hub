
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get token from query string
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    setLocalError(null);
    if (!password || password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setLocalError('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      await api.post('/auth/reset-password', { token, password });
      setSuccess('Password reset successful! You can now log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.userMessage || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-160px)] text-red-600">Invalid or missing reset token.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-6">Reset Password</h2>
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{success}</div>}
        {(localError || error) && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{localError || error}</div>}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base transition-all"
            required
            minLength={6}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm" className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base transition-all"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}

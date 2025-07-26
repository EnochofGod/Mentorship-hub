import React, { useState } from 'react';


import api from '../../services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [localError, setLocalError] = useState(null);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    setLocalError(null);
    if (!validateEmail(email)) {
      setLocalError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess('If this email exists, a password reset link has been sent.');
    } catch (err) {
      setError(err.userMessage || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-6">Forgot Password</h2>
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{success}</div>}
        {(localError || error) && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{localError || error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base transition-all"
            required
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
}

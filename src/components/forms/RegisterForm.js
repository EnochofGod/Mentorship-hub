import React, { useState } from 'react';


function RegisterForm({ onSubmit, loading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const [role, setRole] = useState('Mentee');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);
    if (!validateEmail(email)) {
      setLocalError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }
    onSubmit({ email, password, role });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
          Register as
        </label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
        >
          <option value="Mentee">Mentee</option>
          <option value="Mentor">Mentor</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="••••••••"
        />
      </div>
      {(localError || error) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
          <p className="font-bold">Error!</p>
          <p className="text-sm">{localError || (error?.userMessage || error)}</p>
        </div>
      )}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
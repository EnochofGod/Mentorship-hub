import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm';
import { useAuth } from '../../contexts/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to profile creation if new user (no profile)
      const user = JSON.parse(localStorage.getItem('user')) || {};
      if (!user.profile) {
        navigate('/profile/edit', { replace: true });
        return;
      }
      if (user.role === 'Admin') {
        navigate('/admin/users', { replace: true });
      } else if (user.role === 'Mentor') {
        navigate('/mentor/dashboard', { replace: true });
      } else if (user.role === 'Mentee') {
        navigate('/mentee/dashboard', { replace: true });
      } else {
        navigate('/profile', { replace: true });
      }
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-2 sm:px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <div className="w-full max-w-md bg-white p-4 sm:p-8 rounded-lg shadow-xl mx-auto my-6 sm:my-12">
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
        <p className="mt-8 text-center text-gray-700 text-base">
          <a href="/forgot-password" className="font-bold text-pink-600 hover:text-indigo-500 transition-colors underline mr-4">
            Forgot password?
          </a>
          Don't have an account?{' '}
          <a href="/register" className="font-bold text-indigo-600 hover:text-pink-500 transition-colors underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
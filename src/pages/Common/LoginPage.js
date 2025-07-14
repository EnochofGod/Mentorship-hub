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
      // Redirect all users to a unified dashboard after login
      navigate('/dashboard', { replace: true });
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
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4 sm:px-6 md:px-8 w-full max-w-screen-sm mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <div className="w-full max-w-md bg-white p-4 sm:p-8 rounded-lg shadow-xl mx-auto my-6 sm:my-12">
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
        <p className="mt-8 text-center text-gray-700 text-base">
          <Link to="/forgot-password" className="font-bold text-pink-600 hover:text-indigo-500 transition-colors underline mr-4">
            Forgot password?
          </Link>
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-indigo-600 hover:text-pink-500 transition-colors underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
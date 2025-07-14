import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/forms/RegisterForm';
import { useAuth } from '../../contexts/AuthContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile/edit', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async ({ email, password, role }) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      // Use the shared API service to guarantee correct endpoint and error handling
      const { auth } = await import('../../services/api');
      await auth.register({ email, password, role });
      setSuccessMessage('Registration successful! Logging you in...');
      await login(email, password);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4 sm:px-6 md:px-8 w-full max-w-screen-sm mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <div className="w-full max-w-md bg-white p-4 sm:p-8 rounded-lg shadow-xl mx-auto my-6 sm:my-12">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Create an account
        </h2>
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4" role="alert">
            <p className="font-bold">Success!</p>
            <p className="text-sm">{successMessage}</p>
          </div>
        )}
        <RegisterForm onSubmit={handleRegister} loading={loading} error={error} />
        <p className="mt-6 text-center text-gray-600 text-sm">
          <Link to="/forgot-password" className="font-bold text-pink-600 hover:text-indigo-500 transition-colors underline mr-4">
            Forgot password?
          </Link>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;


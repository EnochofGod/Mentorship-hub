import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 sm:px-6 md:px-8 w-full max-w-screen-md mx-auto text-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6 drop-shadow-lg">
        Welcome to MentorMatch!
      </h1>
      <p className="text-lg sm:text-2xl text-gray-700 mb-10 max-w-2xl leading-relaxed font-medium">
        Your platform for connecting aspiring mentees with experienced mentors to foster growth and accelerate success.
      </p>
      {!isAuthenticated ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg text-gray-600">
            Please
            <Link to="/login" className="mx-2 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg hover:from-pink-500 hover:to-indigo-500 transition-all">Login</Link>
            or
            <Link to="/register" className="mx-2 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold shadow-lg hover:from-indigo-500 hover:to-pink-500 transition-all">Register</Link>
            to get started.
          </p>
        </div>
      ) : (
        <div className="text-lg text-gray-700 bg-white/80 rounded-xl p-6 shadow-lg inline-block">
          <p className="mb-2">You are logged in as <span className="font-semibold text-indigo-700">{user.email}</span> with role <span className="font-semibold text-indigo-700">{user.role}</span>.</p>
          <p>Go to <Link to="/dashboard" className="text-indigo-600 hover:underline font-medium">Dashboard</Link> to get started!</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
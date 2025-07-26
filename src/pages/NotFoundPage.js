import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 text-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 animate-fade-in">
      <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4 drop-shadow-lg">
        404
      </h1>
      <p className="text-3xl font-bold text-gray-700 mb-6">Page Not Found</p>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        The page you are looking for does not exist or another error occurred.
        <br />
        If you believe this is a mistake, please contact support.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-semibold rounded-full shadow-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      >
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
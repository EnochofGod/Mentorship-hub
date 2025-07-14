import React from 'react';

function DashboardPage() {
  // You can enhance this page to show different content based on user role if needed
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 sm:px-6 md:px-8 py-8 w-full max-w-screen-md mx-auto bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-4">Welcome to Your Dashboard</h1>
      <p className="text-lg text-gray-700 mb-2">Hello, {user.name || 'User'}!</p>
      <p className="text-base text-indigo-600 font-semibold mb-2">
        Your User ID: {Number.isInteger(user.id) ? user.id : 'N/A'}
      </p>
      <p className="text-base text-gray-600">This is your unified dashboard page. You can customize this page to show relevant information for all users.</p>
    </div>
  );
}

export default DashboardPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaClipboardList, FaCalendarAlt, FaClock } from 'react-icons/fa';

export default function MentorDashboardPage() {
  const actions = [
    {
      to: '/profile',
      icon: <FaUserEdit size={36} />, 
      label: 'My Profile',
    },
    {
      to: '/mentor/availability',
      icon: <FaClock size={36} />, 
      label: 'My Availability',
    },
    {
      to: '/mentor/requests',
      icon: <FaClipboardList size={36} />, 
      label: 'Requests',
    },
    {
      to: '/mentor/sessions',
      icon: <FaCalendarAlt size={36} />, 
      label: 'Sessions',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 py-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-8">Welcome, Mentor!</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-3xl">
        {actions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="group flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-6 hover:bg-indigo-50 transition-all cursor-pointer relative"
          >
            <div className="text-indigo-600 group-hover:text-indigo-800 mb-2">{action.icon}</div>
            <span className="absolute opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 bottom-2 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-200 z-10">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-gray-500 text-sm">Hover over an icon to see its purpose.</div>
    </div>
  );
}

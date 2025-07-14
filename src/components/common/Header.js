import React, { useState } from 'react';
import { FaUser, FaSignInAlt, FaUserPlus, FaKey, FaUsers, FaExchangeAlt, FaChalkboardTeacher, FaCalendarAlt, FaSearch, FaListAlt, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0 overflow-x-visible">
        <div className="flex items-center space-x-3">
          <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 font-extrabold text-2xl shadow-md">M</span>
          <Link to="/" className="text-3xl font-extrabold text-white tracking-tight hover:text-yellow-200 transition-colors">MentorMatch</Link>
        </div>
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <nav className={`fixed md:static top-0 right-0 h-full md:h-auto w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none flex flex-col md:flex-row items-start md:items-center p-8 md:p-0 transition-transform duration-300 z-40 ${menuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`} style={{maxWidth: '100vw'}}>
          <ul className="flex flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 md:space-x-8 gap-0 md:gap-0">
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/login" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)}>
                    <FaSignInAlt className="text-2xl" />
                    <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Login</span>
                    <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Login</span>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)}>
                    <FaUserPlus className="text-2xl" />
                    <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Register</span>
                    <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Register</span>
                  </Link>
                </li>
                <li>
                  <Link to="/forgot-password" className="relative flex flex-col items-center text-gray-700 hover:text-pink-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)}>
                    <FaKey className="text-2xl" />
                    <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Forgot</span>
                    <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Forgot Password</span>
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && user && (
              <>
                <li>
                  <Link to="/profile" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="My Profile">
                    <FaUser className="text-2xl" />
                    <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Profile</span>
                    <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">My Profile</span>
                  </Link>
                </li>
                {/* Admin Links */}
                {user.role === 'Admin' && (
                  <>
                    <li>
                      <Link to="/admin/users" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="Manage Users">
                        <FaUsers className="text-2xl" />
                        <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Users</span>
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Users</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/matches" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="View Matches">
                        <FaExchangeAlt className="text-2xl" />
                        <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Matches</span>
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Matches</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/sessions" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="View Sessions">
                        <FaCalendarAlt className="text-2xl" />
                        <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Sessions</span>
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Sessions</span>
                      </Link>
                    </li>
                  </>
                )}
                {/* Mentor Links */}
                {user.role === 'Mentor' && (
                  <>
                    <li>
                      <Link to="/mentor/dashboard" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="Mentor Dashboard">
                        <FaChalkboardTeacher className="text-2xl" />
                        <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Dashboard</span>
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/mentor/availability" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="Set Availability">
                        <FaCalendarAlt className="text-2xl" />
                        <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Available</span>
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">My Availability</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/mentor/requests" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="View Requests">
                        <FaListAlt className="text-2xl" />
                        <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Requests</span>
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Requests</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/mentor/sessions" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="View Sessions">
                        <FaCalendarAlt className="text-2xl" />
                        <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Sessions</span>
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Sessions</span>
                      </Link>
                    </li>
                  </>
                )}
                {/* Mentee Links */}
                {user.role === 'Mentee' && (
                  <>
                    <li>
                      <Link to="/mentee/dashboard" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="Mentee Dashboard">
                        <FaHome className="text-2xl" />
                        <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Dashboard</span>
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/mentors" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="Find Mentors">
                        <FaSearch className="text-2xl" />
                        <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Mentors</span>
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Find Mentors</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/mentee/my-requests" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="My Requests">
                        <FaListAlt className="text-2xl" />
                        <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Requests</span>
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">My Requests</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/mentee/my-sessions" className="relative flex flex-col items-center text-gray-700 hover:text-indigo-600 font-semibold transition-colors group" onClick={() => setMenuOpen(false)} title="My Sessions">
                        <FaCalendarAlt className="text-2xl" />
                        <span className="mt-1 text-xs font-medium text-gray-700 block md:hidden">Sessions</span>
                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">My Sessions</span>
                      </Link>
                    </li>
                  </>
                )}
                <li className="text-gray-800 font-medium hidden md:block">
                  Hello, {user.email} ({user.role})
                </li>
                <li>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="relative flex flex-col items-center bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-5 py-2 rounded-lg font-bold shadow-md hover:from-indigo-500 hover:to-pink-500 transition-colors group focus:outline-none"
                    title="Logout"
                    tabIndex={0}
                  >
                    <FaSignOutAlt className="text-2xl" />
                    <span className="mt-1 text-xs font-medium text-white block md:hidden">Logout</span>
                    <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none z-50 hidden md:block">Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
          <button className="md:hidden absolute top-4 right-4 text-gray-700" onClick={toggleMenu} aria-label="Close menu">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
export default Header;

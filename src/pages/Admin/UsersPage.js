import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { FaUser, FaUserCheck, FaUserShield } from 'react-icons/fa';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roleEdit, setRoleEdit] = useState({});
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/admin/users')
      .then(res => setUsers(res.data))
      .catch(err => setError(err.userMessage || err.message || 'Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = (id, role) => setRoleEdit(e => ({ ...e, [id]: role }));

  const handleRoleUpdate = async (id) => {
    setSuccess('');
    setError('');
    try {
      await api.put(`/admin/users/${id}/role`, { role: roleEdit[id] });
      setUsers(users => users.map(u => u.id === id ? { ...u, role: roleEdit[id] } : u));
      setSuccess('Role updated!');
    } catch (err) {
      setError(err.userMessage || err.message || 'Failed to update role');
    }
  };

  const actions = [
    {
      to: '/admin/users',
      icon: <FaUser size={36} />, 
      label: 'All Users',
    },
    {
      to: '/admin/matches',
      icon: <FaUserCheck size={36} />, 
      label: 'Matches',
    },
    {
      to: '/admin/sessions',
      icon: <FaUserShield size={36} />, 
      label: 'Sessions',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 py-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl">
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
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{success}</div>}
        {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">
                    <select value={roleEdit[user.id] || user.role} onChange={e => handleRoleChange(user.id, e.target.value)} className="border px-2 py-1">
                      <option value="Admin">Admin</option>
                      <option value="Mentor">Mentor</option>
                      <option value="Mentee">Mentee</option>
                    </select>
                    <button className="ml-2 px-2 py-1 bg-indigo-500 text-white rounded" onClick={() => handleRoleUpdate(user.id)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

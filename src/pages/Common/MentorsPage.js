import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const INDUSTRY_OPTIONS = [
  'Software Development',
  'Information Technology (IT) Services',
  'Cybersecurity',
  'Artificial Intelligence / Machine Learning',
  'Data Science / Analytics',
  'Cloud Computing',
  'Web Development',
  'Mobile App Development',
  'Fintech (Financial Technology)',
  'Healthtech (Healthcare Technology)',
  'Edtech (Education Technology)',
  'E-commerce',
  'Blockchain / Cryptocurrency',
  'Internet of Things (IoT)',
  'Robotics',
  'Game Development',
  'DevOps / Infrastructure',
  'Networking / Telecommunications',
  'Hardware Engineering',
  'Product Management (Tech)'
];

function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  useEffect(() => {
    api.get('/users/mentors')
      .then((res) => {
        setMentors(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.userMessage || err.message || 'Failed to fetch mentors');
        setLoading(false);
      });
  }, []);

  const handleRequest = async (mentorId) => {
    setSuccess('');
    setError('');
    try {
      await api.post('/requests', { mentorId: parseInt(mentorId, 10) });
      setSuccess('Mentorship request sent!');
    } catch (err) {
      setError(err.userMessage || err.message || 'Failed to send request');
    }
  };

  // Filter mentors by industry if selected
  const filteredMentors = industryFilter
    ? mentors.filter(m => m.profile && m.profile.industry === industryFilter)
    : mentors;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4 text-center">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6">Mentors Directory</h1>
      <div className="mb-4 w-full max-w-4xl flex flex-col sm:flex-row items-center gap-4">
        <label htmlFor="industryFilter" className="font-semibold text-gray-700">Filter by Industry:</label>
        <select
          id="industryFilter"
          value={industryFilter}
          onChange={e => setIndustryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
        >
          <option value="">All Industries</option>
          {INDUSTRY_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      {loading && <p className="text-lg text-gray-700">Loading mentors...</p>}
      {error && <p className="text-lg text-red-600">{error}</p>}
      {!loading && !error && filteredMentors.length === 0 && (
        <p className="text-lg text-gray-700">No mentors found.</p>
      )}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">{success}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full max-w-4xl">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-indigo-700">
                {mentor.profile && mentor.profile.name ? mentor.profile.name[0] : '?'}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-indigo-800 mb-2">{mentor.profile && mentor.profile.name ? mentor.profile.name : mentor.email}</h2>
            <p className="text-gray-600 mb-2">{mentor.profile && mentor.profile.skills && mentor.profile.skills.length > 0 ? mentor.profile.skills.join(', ') : 'Expertise not specified'}</p>
            <p className="text-gray-500 text-sm mb-2">{mentor.profile && mentor.profile.bio ? mentor.profile.bio : 'No bio available.'}</p>
            <p className="text-gray-500 text-sm mb-2">Industry: {mentor.profile && mentor.profile.industry ? mentor.profile.industry : 'Not specified'}</p>
            <button
              className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              onClick={() => handleRequest(mentor.id)}
            >
              Request Mentorship
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentorsPage;

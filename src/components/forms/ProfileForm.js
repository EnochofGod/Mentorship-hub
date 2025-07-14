import React, { useState, useEffect } from 'react';

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

function ProfileForm({ onSubmit, initialData, loading, error, userRole, userId, userEmail, userRoleLabel }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [goals, setGoals] = useState('');
  const [industry, setIndustry] = useState('');
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setBio(initialData.bio || '');
      setSkills(Array.isArray(initialData.skills) ? initialData.skills.join(', ') : '');
      setGoals(initialData.goals || '');
      setIndustry(initialData.industry || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);
    if (!name || name.length < 2) {
      setLocalError('Name must be at least 2 characters.');
      return;
    }
    if (bio && bio.length < 10) {
      setLocalError('Bio must be at least 10 characters.');
      return;
    }
    if (goals && goals.length < 5) {
      setLocalError('Goals must be at least 5 characters.');
      return;
    }
    const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s !== '');
    const formData = { name, bio, skills: skillsArray, goals };
    if (userRole === 'Mentor') {
      formData.industry = industry;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Your Profile</h2>
      <div className="mb-4 p-4 bg-gray-50 rounded border border-gray-200">
        <div className="mb-1 text-sm text-gray-600"><span className="font-semibold">User ID:</span> {userId || 'N/A'}</div>
        <div className="mb-1 text-sm text-gray-600"><span className="font-semibold">Email:</span> {userEmail || 'N/A'}</div>
        <div className="mb-1 text-sm text-gray-600"><span className="font-semibold">Role:</span> {userRoleLabel || userRole || 'N/A'}</div>
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
          Short Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows="3"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Tell us a little about yourself..."
        ></textarea>
      </div>
      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
          Skills (comma-separated)
        </label>
        <input
          id="skills"
          name="skills"
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., Marketing, UI/UX Design, Project Management"
        />
      </div>
      <div>
        <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
          Goals
        </label>
        <textarea
          id="goals"
          name="goals"
          rows="3"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., Improve product design skills, Learn backend development"
        ></textarea>
      </div>
      {userRole === 'Mentor' && (
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            value={industry}
            onChange={e => setIndustry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select your industry</option>
            {INDUSTRY_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}
      {(localError || error) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
          <p className="font-bold">Error!</p>
          <p className="text-sm">{localError || (error?.userMessage || error)}</p>
        </div>
      )}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving Profile...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
}


export default ProfileForm;
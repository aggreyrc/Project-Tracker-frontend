import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Github } from 'lucide-react';
import { addProject } from '../store/slices/projectsSlice';

export default function NewProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cohorts } = useSelector((state) => state.cohorts);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    github_url: '',
    type: 'Full Stack',
    cohort: user?.cohort || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const newProject = {
        name: formData.name,
        description: formData.description,
        github_url: formData.github_url,
        type: formData.type,
        cohort: formData.cohort,
        owners: [user.id],  // Send the user ID as the owner
      };

      // Dispatch addProject to save to the Redux store and backend
      await dispatch(addProject(newProject)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Github className="h-6 w-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
        </div>

        {error && (
          <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="github_url" className="block text-sm font-medium text-gray-700">
              GitHub URL
            </label>
            <input
              type="url"
              id="github_url"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Full Stack">Full Stack</option>
              <option value="Android">Android</option>
            </select>
          </div>

          <div>
            <label htmlFor="cohort" className="block text-sm font-medium text-gray-700">
              Cohort
            </label>
            <select
              id="cohort"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.cohort}
              onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
            >
              <option value="">Select a cohort</option>
              {cohorts.map((cohort) => (
                <option key={cohort.id} value={cohort.name}>
                  {cohort.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProject } from '../store/slices/projectsSlice';

export default function NewProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    github_url: '',
    type: 'Research',
    image_url: '',
    project_members: [],
  });

  const [memberData, setMemberData] = useState({
    cohort_id: '',
    student_name: '',
    role: '',
    joined_at: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddMember = () => {
    setFormData((prev) => ({
      ...prev,
      project_members: [...prev.project_members, memberData],
    }));
    setMemberData({ cohort_id: '', student_name: '', role: '', joined_at: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await dispatch(addProject(formData)).unwrap();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 text-black"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 text-black"
              />
            </div>
            <div>
              <label htmlFor="github_url" className="block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="url"
                id="github_url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 text-black"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <input
                type="text"
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 text-black"
              />
            </div>
            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
              />
            </div>
          </div>
          {/* Add Members Section */}
          <div className="border-t pt-4 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Add Project Members</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="student_name" className="block text-sm font-medium text-gray-700">
                  Student Name
                </label>
                <input
                  type="text"
                  id="student_name"
                  value={memberData.student_name}
                  onChange={(e) => setMemberData({ ...memberData, student_name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 text-black"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  value={memberData.role}
                  onChange={(e) => setMemberData({ ...memberData, role: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 text-black"
                />
              </div>
              <div>
                <label htmlFor="cohort_id" className="block text-sm font-medium text-gray-700">
                  Cohort ID
                </label>
                <input
                  type="number"
                  id="cohort_id"
                  value={memberData.cohort_id}
                  onChange={(e) => setMemberData({ ...memberData, cohort_id: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 text-black"
                />
              </div>
              <div>
                <label htmlFor="joined_at" className="block text-sm font-medium text-gray-700">
                  Joined At
                </label>
                <input
                  type="datetime-local"
                  id="joined_at"
                  value={memberData.joined_at}
                  onChange={(e) => setMemberData({ ...memberData, joined_at: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 text-black"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddMember}
              className="mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-gray-100 hover:bg-gray-200 focus:ring-indigo-500"
            >
              Add Member
            </button>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



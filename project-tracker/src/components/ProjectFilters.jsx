import React, { useState } from 'react';

export default function ProjectFilters({ onApplyFilter, availableFilters, onSearch }) {
  const [selectedFilter, setSelectedFilter] = useState({
    role: '',
    cohort: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (type, value) => {
    const updatedFilter = { ...selectedFilter, [type]: value };
    setSelectedFilter(updatedFilter);
    onApplyFilter(updatedFilter);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <h2 className="text-lg font-semibold text-gray-700">Filter Projects</h2>

      {/* Search Input */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Search Projects</label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Search by name or description"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Role Filter */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={selectedFilter.role}
          onChange={(e) => handleFilterChange('role', e.target.value)}
        >
          <option value="">Select Role</option>
          {availableFilters.roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Cohort Filter */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Cohort</label>
        <select
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={selectedFilter.cohort}
          onChange={(e) => handleFilterChange('cohort', e.target.value)}
        >
          <option value="">Select Cohort</option>
          {availableFilters.cohorts.map((cohort) => (
            <option key={cohort} value={cohort}>
              {cohort}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

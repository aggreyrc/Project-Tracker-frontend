// src/components/ProjectFilters.jsx
import React, { useState } from 'react';

export default function ProjectFilters({ onApplyFilter, availableFilters, onSearch }) {
  const [selectedFilter, setSelectedFilter] = useState({
    end_date: '',
    number_of_students: '',
    role: '',
    cohort: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (type, value) => {
    const newFilter = { end_date: '', number_of_students: '', role: '', cohort: '' };
    newFilter[type] = value;
    setSelectedFilter(newFilter);
    onApplyFilter(newFilter);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
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

      {/* Filter Options */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <select
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={selectedFilter.end_date}
          onChange={(e) => handleFilterChange('end_date', e.target.value)}
        >
          <option value="">Select End Date</option>
          {availableFilters.endDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Number of Students</label>
        <select
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          value={selectedFilter.number_of_students}
          onChange={(e) => handleFilterChange('number_of_students', e.target.value)}
        >
          <option value="">Select Number of Students</option>
          {availableFilters.numberOfStudents.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

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






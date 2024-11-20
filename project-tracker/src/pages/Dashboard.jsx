// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import ProjectFilters from '../components/ProjectFilters';
import { loadMoreProjects, fetchProjects } from '../store/slices/projectsSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { displayedProjects, loading } = useSelector((state) => state.projects);

  const [filtersVisible, setFiltersVisible] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState(null);
  const [availableFilters, setAvailableFilters] = useState({
    endDates: [],
    numberOfStudents: [],
    roles: [],
    cohorts: [],
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    const endDates = [...new Set(displayedProjects.map((proj) => proj.end_date))];
    const numberOfStudents = [
      ...new Set(displayedProjects.map((proj) => proj.number_of_students)),
    ];
    const roles = [
      ...new Set(displayedProjects.flatMap((proj) => proj.project_members.map((member) => member.role))),
    ];
    const cohorts = [
      ...new Set(displayedProjects.flatMap((proj) => proj.project_members.map((member) => member.cohort_id))),
    ];

    setAvailableFilters({ endDates, numberOfStudents, roles, cohorts });
  }, [displayedProjects]);

  const handleLoadMore = () => {
    dispatch(loadMoreProjects());
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const applyFilter = (filter) => {
    setAppliedFilter(filter);
    setFiltersVisible(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProjects = displayedProjects.filter((project) => {
    if (appliedFilter?.end_date && project.end_date !== appliedFilter.end_date) return false;
    if (
      appliedFilter?.number_of_students &&
      project.number_of_students !== parseInt(appliedFilter.number_of_students, 10)
    ) return false;
    if (appliedFilter?.role) {
      const hasRole = project.project_members.some(
        (member) => member.role === appliedFilter.role
      );
      if (!hasRole) return false;
    }
    if (appliedFilter?.cohort) {
      const hasCohort = project.project_members.some(
        (member) => member.cohort_id === parseInt(appliedFilter.cohort, 10)
      );
      if (!hasCohort) return false;
    }
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.username}! You are logged in as {user?.is_admin ? 'Admin' : 'Student'}.
          </p>
        </div>
        {(user?.is_admin || user?.role === 'student') && (
          <Link
            to="/projects/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Project
          </Link>
        )}
      </div>

      <div className="flex justify-start space-x-4 mb-6">
        <Link
          to="/tables"
          className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
        >
          View Data Tables
        </Link>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={toggleFilters}
          className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
        >
          {filtersVisible ? 'Close Filters' : 'Open Filters'}
        </button>
      </div>

      {filtersVisible && (
        <ProjectFilters
          onApplyFilter={applyFilter}
          availableFilters={availableFilters}
          onSearch={handleSearch}
        />
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-500">Loading more projects...</p>
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={handleLoadMore}
          className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Load More
        </button>
      </div>
    </div>
  );
}




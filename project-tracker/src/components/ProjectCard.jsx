import React from 'react';
import { Users, Code, Globe, Database } from 'lucide-react';

export default function ProjectCard({ project }) {
  const getProjectTypeIcon = (type) => {
    switch (type) {
      case 'Web Development':
        return <Globe className="h-12 w-12 text-indigo-600" />;
      case 'Data Science':
        return <Database className="h-12 w-12 text-green-600" />;
      case 'Software Engineering':
        return <Code className="h-12 w-12 text-blue-600" />;
      default:
        return <Code className="h-12 w-12 text-gray-600" />;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        {getProjectTypeIcon(project.type)}
      </div>

      <h2 className="text-lg font-semibold text-gray-800 text-center">{project.name}</h2>
      <p className="mt-2 text-gray-600">{project.description}</p>
      <p className="mt-4 text-sm text-gray-500">
        Cohort: {project.cohort_name} | Created on: {new Date(project.created_at).toLocaleDateString()}
      </p>

      {project.github_url && (
        <a
          href={project.github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline mt-2 block text-sm"
        >
          View on GitHub
        </a>
      )}

      <div className="flex items-center mt-4 text-gray-600">
        <Users className="h-5 w-5 mr-1" />
        <span className="text-sm font-medium">
          {project.project_members ? project.project_members.length : 0} Member
          {project.project_members && project.project_members.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}

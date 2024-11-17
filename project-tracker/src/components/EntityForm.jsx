
// src/components/EntityForm.jsx
import React, { useState, useEffect } from 'react';

const EntityForm = ({ entityType, initialData = {}, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fields = {
    Project: ['name', 'description', 'github_url', 'type', 'image_url'],
    Cohort: ['name', 'description', 'start_date', 'end_date', 'number_of_students'],
    ProjectMember: ['student_name', 'role', 'cohort_id', 'project_id', 'joined_at'],
  };

  return (
    <div className="entity-form">
      <h3>{initialData.id ? 'Edit' : 'Add'} {entityType}</h3>
      <form onSubmit={handleSubmit}>
        {fields[entityType].map((field) => (
          <div key={field}>
            <label>{field.replace('_', ' ').toUpperCase()}</label>
            <input
              type="text"
              name={field}
              value={formData[field] || ''}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EntityForm;



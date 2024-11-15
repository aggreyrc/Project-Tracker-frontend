
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


// // EntityForm.jsx
// import React, { useState, useEffect } from 'react';

// const EntityForm = ({ entityType, initialData, onSubmit, onClose }) => {
//   const [formData, setFormData] = useState(initialData || {});

//   // Update formData when initialData changes
//   useEffect(() => {
//     setFormData(initialData || {});
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <h2>{initialData ? `Edit ${entityType}` : `Add ${entityType}`}</h2>
//       {entityType === 'Project' && (
//         <>
//           <input
//             type="text"
//             name="name"
//             placeholder="Project Name"
//             value={formData.name || ''}
//             onChange={handleChange}
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description || ''}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="url"
//             name="github_url"
//             placeholder="GitHub URL"
//             value={formData.github_url || ''}
//             onChange={handleChange}
//             required
//           />
//           <select name="type" value={formData.type || 'Research'} onChange={handleChange}>
//             <option value="Research">Research</option>
//             <option value="Development">Development</option>
//           </select>
//           <input
//             type="text"
//             name="image_url"
//             placeholder="Image URL"
//             value={formData.image_url || ''}
//             onChange={handleChange}
//           />
//         </>
//       )}
//       {entityType === 'Cohort' && (
//         <>
//           <input
//             type="text"
//             name="name"
//             placeholder="Cohort Name"
//             value={formData.name || ''}
//             onChange={handleChange}
//             required
//           />
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description || ''}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="date"
//             name="start_date"
//             placeholder="Start Date"
//             value={formData.start_date || ''}
//             onChange={handleChange}
//           />
//           <input
//             type="date"
//             name="end_date"
//             placeholder="End Date"
//             value={formData.end_date || ''}
//             onChange={handleChange}
//           />
//           <input
//             type="number"
//             name="number_of_students"
//             placeholder="Number of Students"
//             value={formData.number_of_students || 0}
//             onChange={handleChange}
//             required
//           />
//         </>
//       )}
//       {entityType === 'ProjectMember' && (
//         <>
//           <input
//             type="text"
//             name="student_name"
//             placeholder="Student Name"
//             value={formData.student_name || ''}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="role"
//             placeholder="Role"
//             value={formData.role || ''}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             name="cohort_id"
//             placeholder="Cohort ID"
//             value={formData.cohort_id || ''}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="datetime-local"
//             name="joined_at"
//             placeholder="Joined At"
//             value={formData.joined_at || ''}
//             onChange={handleChange}
//           />
//         </>
//       )}
//       <button type="submit">{initialData ? 'Update' : 'Add'}</button>
//       <button type="button" onClick={onClose}>Cancel</button>
//     </form>
//   );
// };

// export default EntityForm;

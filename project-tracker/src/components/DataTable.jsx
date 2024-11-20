import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination, useSortBy } from 'react-table';
import {
  fetchCohorts,
  fetchProjects,
  fetchProjectMembers,
  editProject,
  deleteProject,
  editCohort,
  deleteCohort,
  editProjectMember,
  deleteProjectMember,
} from '../store/slices/dataSlice';
import EntityForm from './EntityForm';

export default function DataTable() {
  const dispatch = useDispatch();
  const { cohorts, projects, projectMembers, loading } = useSelector((state) => state.data);
  const { user } = useSelector((state) => state.auth);
  const [tabIndex, setTabIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntity, setCurrentEntity] = useState(null);
  const [entityType, setEntityType] = useState(null);

  useEffect(() => {
    refreshData();
  }, [dispatch]);

  const refreshData = () => {
    dispatch(fetchCohorts());
    dispatch(fetchProjects());
    dispatch(fetchProjectMembers());
  };

  const handleTabChange = (index) => setTabIndex(index);

  const openForm = (type, entity = null) => {
    setEntityType(type);
    setCurrentEntity(entity);
    setIsEditing(true);
  };

  const closeForm = () => {
    setIsEditing(false);
    setCurrentEntity(null);
    setEntityType(null);
  };

  const handleDelete = async (id, type) => {
    if (type === 'Project') await dispatch(deleteProject(id));
    else if (type === 'Cohort') await dispatch(deleteCohort(id));
    else if (type === 'ProjectMember') await dispatch(deleteProjectMember(id));

    refreshData();
  };

  const handleFormSubmit = async (data) => {
    if (currentEntity) {
      if (entityType === 'Project') await dispatch(editProject({ id: currentEntity.id, updatedData: data }));
      else if (entityType === 'Cohort') await dispatch(editCohort({ id: currentEntity.id, updatedData: data }));
      else if (entityType === 'ProjectMember') await dispatch(editProjectMember({ id: currentEntity.id, updatedData: data }));
    }

    closeForm();
    refreshData();
  };

  const columnsConfig = {
    cohorts: [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Cohort Name', accessor: 'name' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Start Date', accessor: 'start_date' },
      { Header: 'End Date', accessor: 'end_date' },
      { Header: 'Number of Students', accessor: 'number_of_students' },
      {
        Header: 'Actions',
        Cell: ({ row }) =>
          user?.is_admin && (
            <div className="space-x-2">
              <button onClick={() => openForm('Cohort', row.original)} className="text-indigo-500 hover:text-indigo-700">
                Edit
              </button>
              <button onClick={() => handleDelete(row.original.id, 'Cohort')} className="text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
          ),
      },
    ],
    projects: [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Project Name', accessor: 'name' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'GitHub URL', accessor: 'github_url' },
      { Header: 'Created At', accessor: 'created_at' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Image URL', accessor: 'image_url' },
      {
        Header: 'Actions',
        Cell: ({ row }) =>
          user?.is_admin && (
            <div className="space-x-2">
              <button onClick={() => openForm('Project', row.original)} className="text-indigo-500 hover:text-indigo-700">
                Edit
              </button>
              <button onClick={() => handleDelete(row.original.id, 'Project')} className="text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
          ),
      },
    ],
    projectMembers: [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Project ID', accessor: 'project_id' },
      { Header: 'Cohort ID', accessor: 'cohort_id' },
      { Header: 'Student Name', accessor: 'student_name' },
      { Header: 'Role', accessor: 'role' },
      { Header: 'Joined At', accessor: 'joined_at' },
      {
        Header: 'Actions',
        Cell: ({ row }) =>
          user?.is_admin && (
            <div className="space-x-2">
              <button onClick={() => openForm('ProjectMember', row.original)} className="text-indigo-500 hover:text-indigo-700">
                Edit
              </button>
              <button
                onClick={() => handleDelete(row.original.id, 'ProjectMember')}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ),
      },
    ],
  };

  const dataConfig = {
    cohorts: cohorts || [],
    projects: projects || [],
    projectMembers: projectMembers || [],
  };

  const currentTab = tabIndex === 0 ? 'cohorts' : tabIndex === 1 ? 'projects' : 'projectMembers';
  const columns = React.useMemo(() => columnsConfig[currentTab], [currentTab]);
  const data = React.useMemo(() => dataConfig[currentTab], [dataConfig, currentTab]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useSortBy,
    usePagination
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen font-roboto">
      <div className="flex justify-center mb-4 space-x-4">
        <button onClick={() => handleTabChange(0)} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
          Cohorts
        </button>
        <button onClick={() => handleTabChange(1)} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
          Projects
        </button>
        <button onClick={() => handleTabChange(2)} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
          Project Members
        </button>
      </div>

      {isEditing && (
        <EntityForm
          entityType={entityType}
          initialData={currentEntity}
          onSubmit={handleFormSubmit}
          onClose={closeForm}
        />
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full bg-white border border-gray-300 rounded shadow-md">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()} className="bg-blue-600 text-white">
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-4 py-2 text-left font-semibold border border-blue-600 cursor-pointer hover:bg-blue-700"
                    >
                      {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps()} className="bg-black text-white hover:bg-gray-700">
                    {row.cells.map((cell) => (
                      <td key={cell.column.id} {...cell.getCellProps()} className="px-4 py-2 border-t border-gray-300">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {pageIndex + 1}</span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


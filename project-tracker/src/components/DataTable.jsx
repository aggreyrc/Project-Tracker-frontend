import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination, useSortBy } from 'react-table';
import { fetchCohorts, fetchProjects, fetchProjectMembers } from '../store/slices/dataSlice';

export default function DataTable() {
  const dispatch = useDispatch();
  const { cohorts, projects, projectMembers, loading } = useSelector((state) => state.data);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCohorts());
    dispatch(fetchProjects());
    dispatch(fetchProjectMembers()); // Fetch association table data
  }, [dispatch]);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  const columnsConfig = {
    cohorts: [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Cohort Name', accessor: 'name' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Start Date', accessor: 'start_date' },
      { Header: 'End Date', accessor: 'end_date' },
      { Header: 'Number of Students', accessor: 'number_of_students' },
    ],
    projects: [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Project Name', accessor: 'name' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'GitHub URL', accessor: 'github_url' },
      { Header: 'Created At', accessor: 'created_at' },
      { Header: 'Type', accessor: 'type' },
      { Header: 'Image URL', accessor: 'image_url' },
    ],
    projectMembers: [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Project ID', accessor: 'project_id' },
      { Header: 'Cohort ID', accessor: 'cohort_id' },
      { Header: 'Student Name', accessor: 'student_name' },
      { Header: 'Role', accessor: 'role' },
      { Header: 'Joined At', accessor: 'joined_at' },
    ],
  };

  const dataConfig = {
    cohorts: cohorts || [],
    projects: projects || [],
    projectMembers: projectMembers || [],
  };

  const currentTab =
    tabIndex === 0
      ? 'cohorts'
      : tabIndex === 1
      ? 'projects'
      : tabIndex === 2
      ? 'projectMembers'
      : 'association';
      
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
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div style={{ width: '100%' }}>
      {/* Simple Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button onClick={() => handleTabChange(0)} style={{ marginRight: '10px' }}>Cohorts</button>
        <button onClick={() => handleTabChange(1)} style={{ marginRight: '10px' }}>Projects</button>
        <button onClick={() => handleTabChange(2)} style={{ marginRight: '10px' }}>Project Members</button>
      </div>

      {/* Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        style={{ padding: '10px', border: '1px solid #ddd' }}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <span>
              Page {pageIndex + 1}
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

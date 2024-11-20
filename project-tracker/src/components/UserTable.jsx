import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser } from '../store/slices/userSlice';
import { useTable, usePagination, useSortBy } from 'react-table';

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    is_admin: false,
    is_verified: false,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const openEditForm = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      is_admin: user.is_admin,
      is_verified: user.is_verified,
    });
  };

  const closeForm = () => {
    setIsEditing(false);
    setCurrentUser(null);
    setFormData({ username: '', email: '', password: '', is_admin: false, is_verified: false });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing && currentUser) {
      const updatedData = { ...formData };
      if (!formData.password) delete updatedData.password; // Don't send empty password
      dispatch(updateUser({ id: currentUser.id, updatedData }));
    } else {
      dispatch(addUser(formData));
    }
    closeForm();
  };

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Username', accessor: 'username' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Role', accessor: (row) => (row.is_admin ? 'Admin' : 'Student') },
      { Header: 'Verified', accessor: (row) => (row.is_verified ? 'Yes' : 'No') },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => openEditForm(row.original)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

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
    { columns, data: users, initialState: { pageIndex: 0, pageSize: 5 } },
    useSortBy,
    usePagination
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">User Management</h2>
      <button
        onClick={() => setIsEditing(false)}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Add User
      </button>
      <table {...getTableProps()} className="w-full border-collapse table-auto text-left">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-3 border border-gray-300 text-gray-700 font-semibold"
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
              <tr
                {...row.getRowProps()}
                className="bg-black text-white hover:bg-gray-800"
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="p-3 border border-gray-600"
                  >
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
          className="py-1 px-3 bg-indigo-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {pageIndex + 1}</span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="py-1 px-3 bg-indigo-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="mt-6 p-4 border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit User' : 'Add User'}</h3>
        <label className="block mb-2">
          Username:
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-4">
          Is Admin:
          <input
            type="checkbox"
            checked={formData.is_admin}
            onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })}
            className="ml-2"
          />
        </label>
        <label className="block mb-4">
          Is Verified:
          <input
            type="checkbox"
            checked={formData.is_verified}
            onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
            className="ml-2"
          />
        </label>
        <button type="submit" className="mr-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
          {isEditing ? 'Update' : 'Add'}
        </button>
        <button type="button" onClick={closeForm} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserTable;




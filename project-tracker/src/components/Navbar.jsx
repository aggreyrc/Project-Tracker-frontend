import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, BookMarked, User2 } from 'lucide-react';
import { logout } from '../store/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Handle user logout with confirmation
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      navigate('/'); // Redirects to home page after logout
    }
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Home Link */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookMarked className="h-8 w-8" />
              <span className="ml-4 text-white hover:text-indigo-100 px-3 py-2 rounded-md text-sm font-medium">Moringa Sch.</span>
            </Link>
            <Link
              to="/"
              className="ml-4 text-white hover:text-indigo-100 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Dashboard Link */}
                <Link
                  to="/dashboard"
                  className="text-white hover:text-indigo-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>

                {/* Conditional Link: Only for Admins */}
                {user?.is_admin && (
                  <Link
                    to="/users"
                    className="text-white hover:text-indigo-100 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Users
                  </Link>
                )}

                {/* Display User Information */}
                <div className="flex items-center space-x-2 bg-indigo-700 px-3 py-2 rounded-md">
                  <User2 className="h-5 w-5" />
                  <div className="text-sm">
                    <span className="font-medium">{user?.username}</span>
                    <span className="text-xs block text-indigo-200">
                      {user?.is_admin ? 'Admin' : 'Student'}
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="text-indigo-500 hover:text-indigo-700"
                >
                  <LogOut className="text-indigo-500 hover:text-indigo-700" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Login and Register Links */}
                <Link
                  to="/login"
                  className="text-white hover:text-indigo-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-500 text-white hover:bg-indigo-400 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}



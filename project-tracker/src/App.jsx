import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const NewProject = React.lazy(() => import('./pages/NewProject'));
const DataTable = React.lazy(() => import('./components/DataTable'));
const UserTable = React.lazy(() => import('./components/UserTable'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
            <React.Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              }
            >
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/projects/new"
                    element={
                      <ProtectedRoute>
                        <NewProject />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/tables"
                    element={
                      <ProtectedRoute>
                        <DataTable />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute>
                        <UserTable />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </React.Suspense>
            <Footer /> {/* Footer added here */}
          </div>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
}

export default App;




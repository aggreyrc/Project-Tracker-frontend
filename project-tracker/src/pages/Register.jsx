import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminSecret: '',
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [registeredRole, setRegisteredRole] = useState(''); // Track registered role
  const [registeredUsername, setRegisteredUsername] = useState(''); // Track registered username

  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (isAdmin && !formData.adminSecret) {
      setError('Admin secret code is required for admin registration');
      return;
    }

    try {
      const response = await fetch("https://phase-5-project-55r2.onrender.com/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          adminSecret: isAdmin ? formData.adminSecret : undefined,
          role: isAdmin ? 'admin' : 'student' // Set role based on isAdmin checkbox
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Registration successful! Welcome, ${formData.username}. You have registered as a ${isAdmin ? 'Admin' : 'Student'}.`);
        setError('');
        setVerificationStep(true); // Move to verification step
        setRegisteredRole(isAdmin ? 'Admin' : 'Student'); // Set role for verification message
        setRegisteredUsername(formData.username); // Set username for verification message
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to register. Please try again later.');
    }
  };

  // Handle verification code submission
  const handleVerifyCode = async () => {
    try {
      const response = await fetch("https://phase-5-project-55r2.onrender.com/verify", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          verification_code: verificationCode
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Verification successful! Welcome, ${registeredUsername}. You are registered as a ${registeredRole}. You may now proceed to log in.`);
        setError('');
        setShowLoginPrompt(true); // Show login prompt instead of automatic redirect
      } else {
        setError(data.error || 'Invalid verification code');
      }
    } catch (err) {
      setError('Failed to verify. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {verificationStep ? 'Enter Verification Code' : 'Create your account'}
        </h2>
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        {message && <p className="mt-2 text-center text-sm text-green-600">{message}</p>}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!verificationStep ? (
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="isAdmin"
                  name="isAdmin"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={() => setIsAdmin(!isAdmin)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-700">
                  Register as Admin
                </label>
              </div>

              {isAdmin && (
                <div>
                  <label htmlFor="adminSecret" className="block text-sm font-medium text-gray-700">
                    Admin Secret Code
                  </label>
                  <input
                    id="adminSecret"
                    name="adminSecret"
                    type="password"
                    required={isAdmin}
                    value={formData.adminSecret}
                    onChange={(e) => setFormData({ ...formData, adminSecret: e.target.value })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>
          ) : showLoginPrompt ? (
            <div className="text-center">
              <p className="text-sm text-green-600 mb-4">Verification successful! Welcome, {registeredUsername}. You are registered as a {registeredRole}. You may now log in.</p>
              <Link to="/login" className="text-indigo-600 hover:underline text-sm font-medium">
                Proceed to Login
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <button
                  onClick={handleVerifyCode}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Verify Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
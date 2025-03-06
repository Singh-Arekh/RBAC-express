// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Get the token and user role from localStorage (or use a more secure approach)
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null; // Decoding JWT token to get the role

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-white text-xl font-semibold">
          <Link to="/">MyApp</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-white">
          {userRole ? (
            <>
              {/* Always show Dashboard */}
              <li>
                <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
              </li>

              {/* Show All Users only for Admin */}
              {userRole === 'admin' && (
                <li>
                  <Link to="/all-users" className="hover:text-gray-200">All Users</Link>
                </li>
              )}

              {/* Show Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Show Login and Register if not logged in */}
              <li>
                <Link to="/login" className="hover:text-gray-200">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-gray-200">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

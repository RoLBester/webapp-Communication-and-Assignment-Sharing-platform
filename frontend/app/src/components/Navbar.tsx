// src/components/Navbar.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold text-blue-600">
          S T O I C Platform
        </Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link
                to="/home"
                className="mx-2 text-gray-700 hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="mx-2 text-gray-700 hover:text-blue-600"
              >
                Profile
              </Link>
              <Link
                to="/chat"
                className="mx-2 text-gray-700 hover:text-blue-600"
              >
                Chat
              </Link>
              <Link
                to="/assignments"
                className="mx-2 text-gray-700 hover:text-blue-600"
              >
                Assignments
              </Link>
              <Link
                to="/references"
                className="mx-2 text-gray-700 hover:text-blue-600"
              >
                References
              </Link>
              <Link
                to="/upload-reference"
                className="mx-2 text-gray-700 hover:text-blue-600"
              >
                Upload Reference
              </Link>
              <Link
                to="/friend-suggestions"
                className="mx-2 text-gray-700 hover:text-blue-600"
              >
                Friend Suggestions
              </Link>
              <button
                onClick={handleLogout}
                className="mx-2 text-gray-700 hover:text-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="mx-2 text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="mx-2 text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

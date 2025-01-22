// src/pages/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-6">Welcome to S T O I C</h1>
      <p className="text-lg mb-6">
        This platform allows you to manage assignments such as deadlines, chat
        with peers, upload and access references of other students, and find
        friend suggestions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/assignments"
          className="bg-blue-500 text-white py-4 px-6 rounded hover:bg-blue-600 text-center"
        >
          Manage Assignments
        </Link>
        <Link
          to="/chat"
          className="bg-green-500 text-white py-4 px-6 rounded hover:bg-green-600 text-center"
        >
          Chat with Peers
        </Link>
        <Link
          to="/references"
          className="bg-purple-500 text-white py-4 px-6 rounded hover:bg-purple-600 text-center"
        >
          Access References
        </Link>
        <Link
          to="/upload-reference"
          className="bg-indigo-500 text-white py-4 px-6 rounded hover:bg-indigo-600 text-center"
        >
          Upload Reference
        </Link>
        <Link
          to="/friend-suggestions"
          className="bg-teal-500 text-white py-4 px-6 rounded hover:bg-teal-600 text-center"
        >
          Friend Suggestions
        </Link>
        <Link
          to="/profile"
          className="bg-orange-500 text-white py-4 px-6 rounded hover:bg-orange-600 text-center"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default Home;

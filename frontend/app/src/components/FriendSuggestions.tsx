// src/components/FriendSuggestions.tsx

import React, { useEffect, useState } from 'react';
import api from '../utils/api';

interface User {
  id: number;
  name: string;
  email: string;
  program: string;
  year: number;
}

interface FriendSuggestionResponse {
  success: boolean;
  suggestions: User[];
  message?: string;
}

const FriendSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await api.get<FriendSuggestionResponse>(
        'friendSuggestion.php'
      );

      if (response.data.success) {
        setSuggestions(response.data.suggestions);
      } else {
        setError(
          response.data.message || 'Failed to fetch friend suggestions.'
        );
      }
    } catch (err: any) {
      setError('An error occurred while fetching friend suggestions.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Friend Suggestions</h2>
      {error && <p className="text-red-600">{error}</p>}
      <ul>
        {suggestions.map((user) => (
          <li key={user.id} className="mb-4 border-b pb-2">
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">
              {user.program} - {user.year}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendSuggestions;

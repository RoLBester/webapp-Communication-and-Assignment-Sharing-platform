// src/components/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

interface LoginResponse {
  success: boolean;
  token: string;
  user_id: number;
  message?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post<LoginResponse>('login.php', formData);

      if (response.data.success) {
        // Stores token and user ID in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id.toString());
        // Redirects to home page
        navigate('/home');
      } else {
        setError(response.data.message || 'Invalid login credentials.');
      }
    } catch (err: any) {
      setError('An error occurred. Check your email or password!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
            placeholder="Enter your email"
          />
        </div>
        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
            placeholder="Enter your password"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
};

export default Login;

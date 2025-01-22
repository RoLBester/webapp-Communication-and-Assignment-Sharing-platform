// src/components/Register.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

interface RegisterResponse {
  success: boolean;
  message: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    program: '',
    year: '',
    student_id: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // List of programs
  const programs = [
    'BA-AHCC',
    'BA-AMS',
    'BA-PIKA',
    'BSc-AC',
    'BSc-DSBI',
    'BBA',
    'BTB',
    'BBA-SCM',
    'BSc-AIN',
    'BA-CMCT',
    'Other',
    'No Program',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await api.post<RegisterResponse>(
        'register.php',
        formData
      );

      if (response.data.success) {
        setMessage(response.data.message);
        // Redirect to login page
        navigate('/');
      } else {
        setError(response.data.message || 'Registration failed.');
      }
    } catch (err: any) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
            placeholder="Enter your name"
          />
        </div>
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
        {/* Program */}
        <div className="mb-4">
          <label htmlFor="program" className="block text-gray-700">
            Program
          </label>
          <select
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Program</option>
            {programs.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>
        {/* Year */}
        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700">
            Year of Entrance
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
            placeholder="Enter year of entrance"
          />
        </div>
        {/* Student ID */}
        <div className="mb-4">
          <label htmlFor="student_id" className="block text-gray-700">
            Student ID
          </label>
          <input
            type="text"
            id="student_id"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
            placeholder="Enter your student ID"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

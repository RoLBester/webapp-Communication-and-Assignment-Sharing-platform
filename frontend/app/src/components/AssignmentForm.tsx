// src/components/AssignmentForm.tsx

import React, { useState, useEffect } from 'react';
import api from '../utils/api';

interface Assignment {
  id: number;
  assignment_title: string;
  course_name: string;
  deadline: string;
}

interface FetchAssignmentsResponse {
  success: boolean;
  assignments: Assignment[];
  message?: string;
}

interface AddAssignmentResponse {
  success: boolean;
  message: string;
}

const AssignmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    assignment_title: '',
    course_name: '',
    deadline: '',
  });

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetches assignments when the component mounts
  useEffect(() => {
    fetchAssignments();
  }, []);

  // Fetches assignments function
  const fetchAssignments = async () => {
    try {
      const response = await api.get<FetchAssignmentsResponse>(
        'getAssignments.php'
      );

      if (response.data.success) {
        setAssignments(response.data.assignments);
      } else {
        setError(response.data.message || 'Failed to fetch assignments.');
      }
    } catch (err: any) {
      setError('An error occurred while fetching assignments.');
    }
  };

  // Handles input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await api.post<AddAssignmentResponse>(
        'addAssignment.php',
        formData
      );

      if (response.data.success) {
        setMessage(response.data.message);
        setFormData({
          assignment_title: '',
          course_name: '',
          deadline: '',
        });
        fetchAssignments(); // Refreshes assignments list
      } else {
        setError(response.data.message || 'Failed to add assignment.');
      }
    } catch (err: any) {
      setError('An error occurred while adding assignment.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Add Assignment</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Assignment Title */}
        <div className="mb-4">
          <label htmlFor="assignment_title" className="block text-gray-700">
            Assignment Title
          </label>
          <input
            type="text"
            id="assignment_title"
            name="assignment_title"
            value={formData.assignment_title}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
            placeholder="Enter assignment title"
          />
        </div>
        {/* Course Name */}
        <div className="mb-4">
          <label htmlFor="course_name" className="block text-gray-700">
            Course Name
          </label>
          <input
            type="text"
            id="course_name"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
            placeholder="Enter course name"
          />
        </div>
        {/* Deadline */}
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700">
            Deadline
          </label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {/* Submits Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Assignment
        </button>
      </form>
      {/* Displays Assignments */}
      <h3 className="text-xl font-semibold mt-8 mb-4">Your Assignments</h3>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id} className="mb-4 border-b pb-2">
            <p className="font-medium">{assignment.assignment_title}</p>
            <p className="text-gray-600">{assignment.course_name}</p>
            <p className="text-gray-600">
              Deadline: {new Date(assignment.deadline).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentForm;

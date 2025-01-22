// src/pages/Profile.tsx

import React, { useState, useEffect } from 'react';
import api from '../utils/api';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  program: string;
  year: number;
  student_id: string;
}

interface GetUserProfileResponse {
  success: boolean;
  user: UserProfile;
  message?: string;
}

interface UpdateUserProfileResponse {
  success: boolean;
  message: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetches profile when component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetches profile function
  const fetchProfile = async () => {
    try {
      const response = await api.get<GetUserProfileResponse>(
        'getUserProfile.php'
      );

      if (response.data.success) {
        setProfile(response.data.user);
      } else {
        setError(response.data.message || 'Failed to fetch profile.');
      }
    } catch (err: any) {
      setError('An error occurred while fetching profile.');
    }
  };

  // Handles input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (profile) {
      setProfile({
        ...profile,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Handles save changes
  const handleSave = async () => {
    if (!profile) return;

    try {
      const response = await api.post<UpdateUserProfileResponse>(
        'updateUserProfile.php',
        profile
      );

      if (response.data.success) {
        setMessage('Profile updated successfully.');
        setIsEditing(false);
      } else {
        setError(response.data.message || 'Failed to update profile.');
      }
    } catch (err: any) {
      setError('An error occurred while updating profile.');
    }
  };
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

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      {profile ? (
        <div>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded"
                placeholder="Enter your name"
              />
            ) : (
              <p className="mt-1">{profile.name}</p>
            )}
          </div>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <p className="mt-1">{profile.email}</p>
          </div>
          {/* Program */}
          <div className="mb-4">
            <label htmlFor="program" className="block text-gray-700">
              Program
            </label>
            {isEditing ? (
              <select
                id="program"
                name="program"
                value={profile.program}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded"
              >
                <option value="">Select Program</option>
                {programs.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            ) : (
              <p className="mt-1">{profile.program}</p>
            )}
          </div>
          {/* Year */}
          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-700">
              Year of Entrance
            </label>
            {isEditing ? (
              <input
                type="number"
                id="year"
                name="year"
                value={profile.year}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded"
                placeholder="Enter year of entrance"
              />
            ) : (
              <p className="mt-1">{profile.year}</p>
            )}
          </div>
          {/* Student ID */}
          <div className="mb-4">
            <label htmlFor="student_id" className="block text-gray-700">
              Student ID
            </label>
            {isEditing ? (
              <input
                type="text"
                id="student_id"
                name="student_id"
                value={profile.student_id}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded"
                placeholder="Enter your student ID"
              />
            ) : (
              <p className="mt-1">{profile.student_id}</p>
            )}
          </div>
          {/* Edit and Save Buttons */}
          {isEditing ? (
            <div className="flex">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;

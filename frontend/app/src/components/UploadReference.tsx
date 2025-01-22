// src/components/UploadReference.tsx

import React, { useState } from 'react';
import api from '../utils/api';

interface UploadReferenceResponse {
  success: boolean;
  message: string;
}

const UploadReference: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tags', tags);

    try {
      const response = await api.post<UploadReferenceResponse>(
        'uploadReference.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setMessage(response.data.message);
        setFile(null);
        setTags('');
      } else {
        setError(response.data.message || 'Failed to upload file.');
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during file upload.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Upload Reference</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* File Input */}
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700">
            Select File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="mt-1 w-full"
            required
          />
        </div>
        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded"
            placeholder="Enter tags"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadReference;

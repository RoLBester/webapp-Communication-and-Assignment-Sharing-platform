// src/components/References.tsx

import React, { useEffect, useState, useCallback } from 'react';
import api from '../utils/api';

interface Reference {
  id: number;
  file_path: string;
  uploader_id: number;
  uploader_name: string;
  tags: string;
  upload_date: string;
}

interface GetReferencesResponse {
  success: boolean;
  references: Reference[];
  message?: string;
}

const References: React.FC = () => {
  const [references, setReferences] = useState<Reference[]>([]);
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const fetchReferences = useCallback(async () => {
    try {
      const response = await api.get<GetReferencesResponse>(
        'getReferences.php',
        {
          params: {
            tags: tags,
          },
        }
      );

      if (response.data.success) {
        setReferences(response.data.references);
      } else {
        setError(response.data.message || 'Failed to fetch references.');
      }
    } catch (err: any) {
      setError('An error occurred while fetching references.');
    }
  }, [tags]);

  useEffect(() => {
    fetchReferences();
  }, [fetchReferences]);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">References</h2>
      {error && <p className="text-red-600">{error}</p>}
      {/* Search by Tags */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {/* References List */}
      <ul>
        {references.map((ref) => (
          <li key={ref.id} className="mb-4 border-b pb-2">
            <a
              href={ref.file_path.replace('../public', '')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {ref.file_path.split('/').pop()}
            </a>
            <p className="text-gray-600">Uploaded by: {ref.uploader_name}</p>
            <p className="text-gray-600">Tags: {ref.tags}</p>
            <p className="text-gray-600">
              Uploaded on: {new Date(ref.upload_date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default References;

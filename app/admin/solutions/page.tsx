'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Solution {
  _id: string;
  title: string;
  slug: string;
  industry: string;
  shortDescription: string;
  publishedAt: string;
  status: string;
  featured?: boolean;
}

export default function SolutionsList() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const response = await fetch('/api/admin/solutions');
      const data = await response.json();
      setSolutions(data.solutions || []);
    } catch (error) {
      console.error('Error fetching solutions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this solution?')) return;

    setDeleteId(id);
    try {
      const response = await fetch(`/api/admin/solutions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSolutions(solutions.filter((solution) => solution._id !== id));
      } else {
        alert('Failed to delete solution');
      }
    } catch (error) {
      console.error('Error deleting solution:', error);
      alert('Error deleting solution');
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading solutions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Solutions</h1>
        <Link
          href="/admin/solutions/new"
          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
        >
          + Add New Solution
        </Link>
      </div>

      {solutions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
          <div className="text-6xl mb-4">💡</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No solutions yet</h3>
          <p className="text-gray-600 mb-6">Start by creating your first solution</p>
          <Link
            href="/admin/solutions/new"
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg font-semibold"
          >
            Create Solution
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {solutions.map((solution) => (
                <tr key={solution._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{solution.title}</div>
                    <div className="text-sm text-gray-500">{solution.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {solution.industry}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      solution.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : solution.status === 'featured'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {solution.status}
                      {solution.featured && ' ⭐'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(solution.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/solutions/${solution._id}/edit`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(solution._id)}
                      disabled={deleteId === solution._id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {deleteId === solution._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

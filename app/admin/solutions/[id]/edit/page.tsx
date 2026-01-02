'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Technology {
  category: 'Hardware' | 'Software' | 'Process' | 'Integration';
  name: string;
  description?: string;
}

interface Result {
  metric: string;
  value: string;
  description: string;
}

interface Timeline {
  phase: string;
  duration: string;
  description?: string;
}

export default function EditSolution() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    industry: '',
    shortDescription: '',
    client: {
      name: '',
      sector: '',
      size: 'large' as 'startup' | 'sme' | 'large',
      location: ''
    },
    challenge: '',
    solution: '',
    results: [] as Result[],
    technologies: [] as Technology[],
    timeline: [] as Timeline[],
    imageUrl: '',
    gallery: [] as string[],
    metaDescription: '',
    keywords: [] as string[],
    status: 'published' as 'draft' | 'published' | 'featured',
    featured: false
  });

  useEffect(() => {
    fetchSolution();
  }, []);

  const fetchSolution = async () => {
    try {
      const response = await fetch(`/api/admin/solutions/${params.id}`);
      const data = await response.json();
      if (data.solution) {
        setFormData({
          ...data.solution,
          results: data.solution.results || [],
          technologies: data.solution.technologies || [],
          timeline: data.solution.timeline || [],
          keywords: data.solution.keywords || [],
          gallery: data.solution.gallery || []
        });
      }
    } catch (error) {
      console.error('Error fetching solution:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/solutions/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Solution updated successfully!');
        router.push('/admin/solutions');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update solution');
      }
    } catch (error) {
      console.error('Error updating solution:', error);
      alert('Error updating solution');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('client.')) {
      const clientField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        client: { ...prev.client, [clientField]: value }
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addResult = () => {
    setFormData(prev => ({
      ...prev,
      results: [...prev.results, { metric: '', value: '', description: '' }]
    }));
  };

  const updateResult = (index: number, field: keyof Result, value: string) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.map((result, i) => 
        i === index ? { ...result, [field]: value } : result
      )
    }));
  };

  const removeResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index)
    }));
  };

  const addTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, { category: 'Software', name: '', description: '' }]
    }));
  };

  const updateTechnology = (index: number, field: keyof Technology, value: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.map((tech, i) => 
        i === index ? { ...tech, [field]: value } : tech
      )
    }));
  };

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading solution...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Edit Solution</h1>
        <p className="text-gray-600 mt-1">Update solution details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="featured">Featured</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">
                Featured Solution
              </label>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Client Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name
              </label>
              <input
                type="text"
                name="client.name"
                value={formData.client.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sector *
              </label>
              <input
                type="text"
                name="client.sector"
                value={formData.client.sector}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size *
              </label>
              <select
                name="client.size"
                value={formData.client.size}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="startup">Startup</option>
                <option value="sme">SME</option>
                <option value="large">Large Enterprise</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="client.location"
                value={formData.client.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Challenge *
            </label>
            <textarea
              name="challenge"
              value={formData.challenge}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Solution *
            </label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              required
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Results</h3>
            <button
              type="button"
              onClick={addResult}
              className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
            >
              + Add Result
            </button>
          </div>
          
          {formData.results.map((result, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metric
                  </label>
                  <input
                    type="text"
                    value={result.metric}
                    onChange={(e) => updateResult(index, 'metric', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    placeholder="e.g., Productivity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value
                  </label>
                  <input
                    type="text"
                    value={result.value}
                    onChange={(e) => updateResult(index, 'value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    placeholder="e.g., +40%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={result.description}
                    onChange={(e) => updateResult(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    placeholder="Brief explanation"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeResult(index)}
                className="mt-2 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Technologies</h3>
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              + Add Technology
            </button>
          </div>
          
          {formData.technologies.map((tech, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={tech.category}
                    onChange={(e) => updateTechnology(index, 'category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Process">Process</option>
                    <option value="Integration">Integration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={tech.name}
                    onChange={(e) => updateTechnology(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    placeholder="Technology name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={tech.description || ''}
                    onChange={(e) => updateTechnology(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    placeholder="Brief description"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeTechnology(index)}
                className="mt-2 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description *
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={formData.keywords.join(', ')}
              onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value.split(',').map(k => k.trim()) }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              placeholder="automation, manufacturing, IoT"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:bg-gray-400 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

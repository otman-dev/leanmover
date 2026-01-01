'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBlogArticle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    industry: '',
    author: 'Admin',
    tags: [''],
    imageUrl: '',
    imageFile: null as File | null,
    publishedAt: new Date().toISOString().split('T')[0], // Today's date
    readingTime: 5, // Default 5 minutes
    status: 'draft' as 'draft' | 'published' | 'archived',
    featured: false,
    metaDescription: '',
    keywords: [''],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'imageFile') {
          if (value) {
            submitData.append('imageFile', value as File);
          }
        } else if (key === 'tags' || key === 'keywords') {
          submitData.append(key, JSON.stringify((value as string[]).filter(k => k.trim())));
        } else {
          submitData.append(key, value as string);
        }
      });

      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        alert('Article created successfully!');
        router.push('/admin/blog');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to create article');
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Error creating article');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title
    if (name === 'title' && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleArrayChange = (index: number, value: string, field: 'tags' | 'keywords') => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'tags' | 'keywords') => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (index: number, field: 'tags' | 'keywords') => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Créer un Nouvel Article</h1>
        <p className="text-gray-600 mt-1">Ajoutez un nouvel article de blog à votre site web</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Article Information */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Informations Principales</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Ex: L'Industrie 4.0 : La Transformation Digitale au Maroc"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="industrie-4-0-transformation-maroc"
                required
              />
              <p className="text-xs text-gray-500 mt-1">URL-friendly version of the title (auto-generated)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Technologie">Technologie</option>
                <option value="Innovation">Innovation</option>
                <option value="Méthodes">Méthodes</option>
                <option value="Logistique">Logistique</option>
                <option value="Automatisation">Automatisation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secteur Industriel
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">Sélectionner un secteur</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Logistics">Logistique</option>
                <option value="Healthcare">Santé</option>
                <option value="Automotive">Automobile</option>
                <option value="Textile">Textile</option>
                <option value="Food">Agroalimentaire</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auteur *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Ahmed Benali"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de Publication *
              </label>
              <input
                type="date"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temps de Lecture (minutes) *
              </label>
              <input
                type="number"
                name="readingTime"
                value={formData.readingTime}
                onChange={handleChange}
                min="1"
                max="60"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="archived">Archivé</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image de l'Article
              </label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData(prev => ({ 
                      ...prev, 
                      imageFile: file,
                      imageUrl: file.name 
                    }));
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-1">Téléchargez l'image principale qui s'affichera dans l'article (JPG, PNG, WebP)</p>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Article à la Une</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Résumé de l'Article *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Découvrez comment l'Industrie 4.0 révolutionne le secteur industriel marocain..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">Résumé qui apparaîtra dans la liste des articles et en description</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Contenu de l'Article</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenu Principal *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={15}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm text-gray-900 placeholder-gray-500"
              placeholder="L'Industrie 4.0 représente la quatrième révolution industrielle..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">Contenu complet de l'article (Markdown supporté). Séparez les paragraphes par une ligne vide.</p>
          </div>
        </div>

        {/* Tags Section */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Tags et Mots-clés</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags de l'Article
            </label>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'tags')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Industrie 4.0"
                />
                {formData.tags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'tags')}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('tags')}
              className="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              + Ajouter un Tag
            </button>
            <p className="text-xs text-gray-500 mt-2">Tags qui apparaîtront sous l'article (ex: #Industrie4.0)</p>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Paramètres SEO</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description Meta
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Guide complet sur l'Industrie 4.0 au Maroc : technologies, opportunités et stratégies..."
            />
            <p className="text-xs text-gray-500 mt-1">Description pour les moteurs de recherche (160 caractères max)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mots-clés SEO
            </label>
            {formData.keywords.map((keyword, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'keywords')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Industrie 4.0 Maroc"
                />
                {formData.keywords.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'keywords')}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('keywords')}
              className="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              + Ajouter un Mot-clé
            </button>
            <p className="text-xs text-gray-500 mt-2">Mots-clés pour le référencement naturel</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:bg-gray-400 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
          >
            {loading ? 'Création en cours...' : 'Créer l\'Article'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

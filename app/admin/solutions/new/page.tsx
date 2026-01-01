'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewSolution() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    industry: '',
    shortDescription: '',
    challenge: '',
    solution: '',
    client: {
      name: '',
      sector: '',
      size: 'sme' as 'startup' | 'sme' | 'large',
      location: ''
    },
    results: [{ metric: '', value: '', description: '' }],
    technologies: [{ category: 'Software' as 'Hardware' | 'Software' | 'Process' | 'Integration', name: '', description: '' }],
    timeline: [{ phase: '', duration: '', description: '', status: 'completed' as 'completed' | 'in-progress' | 'planned' }],
    imageUrl: '',
    imageFile: null as File | null,
    publishedAt: new Date().toISOString().split('T')[0], // Today's date
    status: 'draft' as 'draft' | 'published' | 'featured',
    featured: false,
    metaDescription: '',
    keywords: ['']
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
        } else if (key === 'client') {
          submitData.append('client', JSON.stringify(value));
        } else if (key === 'results' || key === 'technologies' || key === 'timeline') {
          submitData.append(key, JSON.stringify(value));
        } else if (key === 'keywords') {
          submitData.append(key, JSON.stringify((value as string[]).filter(k => k.trim())));
        } else {
          submitData.append(key, value as string);
        }
      });

      const response = await fetch('/api/admin/solutions', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        alert('Solution created successfully!');
        router.push('/admin/solutions');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to create solution');
      }
    } catch (error) {
      console.error('Error creating solution:', error);
      alert('Error creating solution');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'title' && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  // Results handlers
  const handleResultChange = (index: number, field: string, value: string) => {
    const newResults = [...formData.results];
    newResults[index] = { ...newResults[index], [field]: value };
    setFormData((prev) => ({ ...prev, results: newResults }));
  };

  const addResult = () => {
    setFormData((prev) => ({
      ...prev,
      results: [...prev.results, { metric: '', value: '', description: '' }]
    }));
  };

  const removeResult = (index: number) => {
    const newResults = formData.results.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, results: newResults }));
  };

  // Technologies handlers
  const handleTechChange = (index: number, field: string, value: string) => {
    const newTech = [...formData.technologies];
    newTech[index] = { ...newTech[index], [field]: value };
    setFormData((prev) => ({ ...prev, technologies: newTech }));
  };

  const addTech = () => {
    setFormData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, { category: 'Software' as 'Hardware' | 'Software' | 'Process' | 'Integration', name: '', description: '' }]
    }));
  };

  const removeTech = (index: number) => {
    const newTech = formData.technologies.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, technologies: newTech }));
  };

  // Keywords handlers
  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...formData.keywords];
    newKeywords[index] = value;
    setFormData((prev) => ({ ...prev, keywords: newKeywords }));
  };

  const addKeyword = () => {
    setFormData((prev) => ({ ...prev, keywords: [...prev.keywords, ''] }));
  };

  const removeKeyword = (index: number) => {
    const newKeywords = formData.keywords.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, keywords: newKeywords }));
  };

  // Timeline handlers
  const handleTimelineChange = (index: number, field: string, value: string) => {
    const newTimeline = [...formData.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setFormData((prev) => ({ ...prev, timeline: newTimeline }));
  };

  const addTimeline = () => {
    setFormData((prev) => ({
      ...prev,
      timeline: [...prev.timeline, { phase: '', duration: '', description: '', status: 'planned' as 'completed' | 'in-progress' | 'planned' }]
    }));
  };

  const removeTimeline = (index: number) => {
    const newTimeline = formData.timeline.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, timeline: newTimeline }));
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Créer une Nouvelle Solution</h1>
        <p className="text-gray-600 mt-1">Ajoutez un nouveau cas d'étude de solution à votre site web</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Solution Information */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Informations Principales</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la Solution *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Ex: Automatisation d'une Ligne de Production Automobile"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="automatisation-ligne-production-automobile"
                required
              />
              <p className="text-xs text-gray-500 mt-1">URL-friendly version of the title (auto-generated)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secteur Industriel *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                required
              >
                <option value="">Sélectionner un secteur</option>
                <option value="Automobile">Automobile</option>
                <option value="Pharmaceutique">Pharmaceutique</option>
                <option value="Textile">Textile</option>
                <option value="Agroalimentaire">Agroalimentaire</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Chimique">Chimique</option>
                <option value="Cosmétique">Cosmétique</option>
                <option value="Électronique">Électronique</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="featured">Solution Phare</option>
              </select>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Solution à la Une</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Principale
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              <p className="text-xs text-gray-500 mt-1">Téléchargez l'image principale qui s'affichera dans la solution (JPG, PNG, WebP)</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description Courte *
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Mise en place d'une ligne de production automatisée pour un constructeur automobile, augmentant la productivité de 40%."
                required
              />
              <p className="text-xs text-gray-500 mt-1">Résumé qui apparaîtra dans la liste des solutions et en hero</p>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Informations Client (Optionnel)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du Client
              </label>
              <input
                type="text"
                value={formData.client.name}
                onChange={(e) => setFormData(prev => ({ ...prev, client: { ...prev.client, name: e.target.value } }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Constructeur Automobile Leader (optionnel)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secteur d'Activité
              </label>
              <input
                type="text"
                value={formData.client.sector}
                onChange={(e) => setFormData(prev => ({ ...prev, client: { ...prev.client, sector: e.target.value } }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Manufacturing, Healthcare, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taille de l'Entreprise
              </label>
              <select
                value={formData.client.size}
                onChange={(e) => setFormData(prev => ({ ...prev, client: { ...prev.client, size: e.target.value as 'startup' | 'sme' | 'large' } }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              >
                <option value="startup">Startup (&lt; 50 employés)</option>
                <option value="sme">PME (50-250 employés)</option>
                <option value="large">Grande entreprise (&gt; 250 employés)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>
              <input
                type="text"
                value={formData.client.location}
                onChange={(e) => setFormData(prev => ({ ...prev, client: { ...prev.client, location: e.target.value } }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Casablanca, Maroc"
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Détails du Projet</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Le Défi *
            </label>
            <textarea
              name="challenge"
              value={formData.challenge}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Le client faisait face à des goulots d'étranglement dans sa ligne de production, causant des retards et des coûts élevés."
              required
            />
            <p className="text-xs text-gray-500 mt-1">Décrivez le problème ou défi que le client rencontrait</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notre Solution *
            </label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Nous avons conçu et installé une solution d'automatisation complète intégrant des robots collaboratifs, un système de convoyage intelligent et un MES pour la traçabilité."
              required
            />
            <p className="text-xs text-gray-500 mt-1">Décrivez la solution mise en place pour résoudre le défi</p>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Résultats Obtenus</h3>
          
          {formData.results.map((result, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Métrique
                </label>
                <input
                  type="text"
                  value={result.metric}
                  onChange={(e) => handleResultChange(index, 'metric', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Productivité"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valeur
                </label>
                <input
                  type="text"
                  value={result.value}
                  onChange={(e) => handleResultChange(index, 'value', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="+40%"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={result.description}
                    onChange={(e) => handleResultChange(index, 'description', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Augmentation du rendement"
                  />
                  {formData.results.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResult(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addResult}
            className="w-full py-2 border-2 border-dashed border-green-300 text-green-600 rounded-lg hover:bg-green-50"
          >
            + Ajouter un Résultat
          </button>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Technologies & Solutions Utilisées</h3>
          
          {formData.technologies.map((tech, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={tech.category}
                  onChange={(e) => handleTechChange(index, 'category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                >
                  <option value="Software">Logiciel</option>
                  <option value="Hardware">Matériel</option>
                  <option value="Process">Processus</option>
                  <option value="Integration">Intégration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la Technologie
                </label>
                <input
                  type="text"
                  value={tech.name}
                  onChange={(e) => handleTechChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Robots collaboratifs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tech.description || ''}
                    onChange={(e) => handleTechChange(index, 'description', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Robots KUKA pour assemblage"
                  />
                  {formData.technologies.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTech(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addTech}
            className="w-full py-2 border-2 border-dashed border-green-300 text-green-600 rounded-lg hover:bg-green-50"
          >
            + Ajouter une Technologie
          </button>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Étapes du Projet</h3>
          
          {formData.timeline.map((phase, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phase
                </label>
                <input
                  type="text"
                  value={phase.phase}
                  onChange={(e) => handleTimelineChange(index, 'phase', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="Étude et conception"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durée
                </label>
                <input
                  type="text"
                  value={phase.duration}
                  onChange={(e) => handleTimelineChange(index, 'duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="6 semaines"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  value={phase.status}
                  onChange={(e) => handleTimelineChange(index, 'status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                >
                  <option value="completed">Terminé</option>
                  <option value="in-progress">En cours</option>
                  <option value="planned">Planifié</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={phase.description}
                    onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Analyse des besoins et conception"
                  />
                  {formData.timeline.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTimeline(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addTimeline}
            className="w-full py-2 border-2 border-dashed border-green-300 text-green-600 rounded-lg hover:bg-green-50"
          >
            + Ajouter une Étape
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Paramètres SEO</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description Meta
            </label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Découvrez comment notre solution d'automatisation a transformé la ligne de production automobile de notre client."
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
                  onChange={(e) => handleKeywordChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  placeholder="automatisation"
                />
                {formData.keywords.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeKeyword(index)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addKeyword}
              className="mt-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
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
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:bg-gray-400 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
          >
            {loading ? 'Création en cours...' : 'Créer la Solution'}
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

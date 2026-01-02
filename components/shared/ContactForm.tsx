'use client';

import { useState, FormEvent } from 'react';
import { HiMail, HiUser, HiPhone, HiOfficeBuilding, HiPencil } from 'react-icons/hi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent'
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '', priority: 'normal' });
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Une erreur est survenue lors de l\'envoi du message');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          Nom complet *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiUser className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
            placeholder="Votre nom"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiMail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
            placeholder="votre.email@exemple.com"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
          Téléphone
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiPhone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
            placeholder="+212 XX XX XX XX"
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
          Entreprise
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOfficeBuilding className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
            placeholder="Nom de votre entreprise"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
          Sujet *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiPencil className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 placeholder-gray-500"
            placeholder="Objet de votre message"
          />
        </div>
      </div>

      {/* Priority */}
      <div>
        <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
          Priorité *
        </label>
        <select
          id="priority"
          name="priority"
          required
          value={formData.priority}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900 bg-white"
        >
          <option value="low">🔴 Basse - Question générale</option>
          <option value="normal">🔵 Normale - Demande standard</option>
          <option value="high">🟠 Élevée - Projet important</option>
          <option value="urgent">🔴 Urgente - Besoin immédiat</option>
        </select>
        <p className="text-xs text-gray-600 mt-1">
          Sélectionnez la priorité selon l'urgence de votre demande
        </p>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
          placeholder="Décrivez votre projet ou vos besoins..."
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  );
}

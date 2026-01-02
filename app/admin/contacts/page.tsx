'use client';

import { useEffect, useState } from 'react';
import { ContactSubmission } from '@/types';

interface ContactStats {
  total: number;
  new: number;
  read: number;
  replied: number;
  archived: number;
}

export default function ContactSubmissions() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [stats, setStats] = useState<ContactStats>({ total: 0, new: 0, read: 0, replied: 0, archived: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`/api/admin/contacts?status=${filter}&limit=50`);
      const data = await response.json();
      setContacts(data.contacts || []);
      setStats(data.stats || { total: 0, new: 0, read: 0, replied: 0, archived: 0 });
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: ContactSubmission['status']) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const { contact } = await response.json();
        setContacts(contacts.map((c) => c._id === id ? contact : c));
        if (selectedContact?._id === id) {
          setSelectedContact(contact);
        }
        // Refetch to update stats
        fetchContacts();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleNotesChange = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      });

      if (response.ok) {
        const { contact } = await response.json();
        setContacts(contacts.map((c) => c._id === id ? contact : c));
        if (selectedContact?._id === id) {
          setSelectedContact(contact);
        }
        alert('Notes saved successfully');
      }
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) return;

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts(contacts.filter((contact) => contact._id !== id));
        if (selectedContact?._id === id) {
          setSelectedContact(null);
        }
        fetchContacts(); // Refetch to update stats
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const getStatusColor = (status: ContactSubmission['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'read':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'replied':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: ContactSubmission['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Contact Submissions
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            filter === 'all' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white hover:border-purple-300'
          }`} onClick={() => setFilter('all')}>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
          <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            filter === 'new' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'
          }`} onClick={() => setFilter('new')}>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
              <div className="text-sm text-gray-600">New</div>
            </div>
          </div>
          <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            filter === 'read' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 bg-white hover:border-yellow-300'
          }`} onClick={() => setFilter('read')}>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.read}</div>
              <div className="text-sm text-gray-600">Read</div>
            </div>
          </div>
          <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            filter === 'replied' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-green-300'
          }`} onClick={() => setFilter('replied')}>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.replied}</div>
              <div className="text-sm text-gray-600">Replied</div>
            </div>
          </div>
          <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            filter === 'archived' ? 'border-gray-500 bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'
          }`} onClick={() => setFilter('archived')}>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.archived}</div>
              <div className="text-sm text-gray-600">Archived</div>
            </div>
          </div>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
          <div className="text-6xl mb-4">📬</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No contact submissions</h3>
          <p className="text-gray-600">
            {filter !== 'all' ? `No ${filter} submissions found` : 'No submissions yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {filter === 'all' ? 'All Contacts' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Contacts`}
                <span className="ml-2 text-gray-500">({contacts.length})</span>
              </h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  onClick={() => {
                    setSelectedContact(contact);
                    setNotes(contact.notes || '');
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact?._id === contact._id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{contact.email}</p>
                      {contact.company && (
                        <p className="text-xs text-gray-500 truncate">{contact.company}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(contact.priority)}`}>
                        {contact.priority}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    <strong>{contact.subject}</strong>: {contact.message}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(contact.createdAt!).toLocaleDateString()} {new Date(contact.createdAt!).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Detail */}
          {selectedContact ? (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(selectedContact.status)}`}>
                    {selectedContact.status}
                  </span>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(selectedContact.priority)}`}>
                    {selectedContact.priority}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                    <p className="text-gray-900">{selectedContact.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <a
                      href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                      className="text-blue-600 hover:underline break-all"
                    >
                      {selectedContact.email}
                    </a>
                  </div>

                  {selectedContact.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}

                  {selectedContact.company && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Company</label>
                      <p className="text-gray-900">{selectedContact.company}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Subject</label>
                  <p className="text-gray-900 font-medium">{selectedContact.subject}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Message</label>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-900 whitespace-pre-wrap max-h-32 overflow-y-auto">
                    {selectedContact.message}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Submitted</label>
                    <p className="text-gray-900 text-sm">
                      {new Date(selectedContact.createdAt!).toLocaleString()}
                    </p>
                  </div>
                  
                  {selectedContact.repliedAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Replied</label>
                      <p className="text-gray-900 text-sm">
                        {new Date(selectedContact.repliedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Internal Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
                    rows={3}
                    placeholder="Add internal notes..."
                  />
                  <button
                    onClick={() => handleNotesChange(selectedContact._id!)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Save Notes
                  </button>
                </div>
              </div>

              <div className="border-t pt-6 mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Change Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedContact._id!, 'new')}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium transition-colors"
                    >
                      New
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedContact._id!, 'read')}
                      className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 text-sm font-medium transition-colors"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedContact._id!, 'replied')}
                      className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium transition-colors"
                    >
                      Replied
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedContact._id!, 'archived')}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                    >
                      Archive
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(selectedContact._id!)}
                  className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium transition-colors"
                >
                  Delete Submission
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-4">👈</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a Contact</h3>
              <p className="text-gray-600">
                Choose a contact from the list to view details and manage the submission
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

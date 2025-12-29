'use client';

import { useEffect, useState } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'archived';
}

export default function ContactSubmissions() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: Contact['status']) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setContacts(
          contacts.map((contact) =>
            contact.id === id ? { ...contact, status } : contact
          )
        );
        if (selectedContact?.id === id) {
          setSelectedContact({ ...selectedContact, status });
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) return;

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts(contacts.filter((contact) => contact.id !== id));
        if (selectedContact?.id === id) {
          setSelectedContact(null);
        }
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === 'all') return true;
    return contact.status === filter;
  });

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    <div className="space-y-4 sm:space-y-6">
      {/* Header and Filters */}
      <div className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Contact Submissions
        </h1>

        {/* Filter Buttons - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2">
          {['all', 'new', 'read', 'archived'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base capitalize font-medium transition-all duration-200 ${
                filter === f
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span className="hidden sm:inline">{f}</span>
              <span className="sm:hidden capitalize">{f === 'archived' ? 'arch' : f}</span>
              <span className="ml-1">({contacts.filter((c) => f === 'all' || c.status === f).length})</span>
            </button>
          ))}
        </div>
      </div>

      {filteredContacts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-12 text-center border border-gray-100">
          <div className="text-4xl sm:text-6xl mb-4">📬</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No contact submissions</h3>
          <p className="text-sm sm:text-base text-gray-600">
            {filter !== 'all' ? `No ${filter} submissions found` : 'No submissions yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {/* Contact List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{contact.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{contact.email}</p>
                      {contact.company && (
                        <p className="text-xs text-gray-500 truncate">{contact.company}</p>
                      )}
                    </div>
                    <span
                      className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${getStatusColor(
                        contact.status
                      )}`}
                    >
                      {contact.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">{contact.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(contact.submittedAt).toLocaleDateString()} {new Date(contact.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Detail - Mobile Modal Style */}
          {selectedContact && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Contact Details</h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      selectedContact.status
                    )}`}
                  >
                    {selectedContact.status}
                  </span>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close details"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Name</label>
                    <p className="text-gray-900 text-sm sm:text-base">{selectedContact.name}</p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Email</label>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-blue-600 hover:underline text-sm sm:text-base break-all"
                    >
                      {selectedContact.email}
                    </a>
                  </div>

                  {selectedContact.phone && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Phone</label>
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-blue-600 hover:underline text-sm sm:text-base"
                      >
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}

                  {selectedContact.company && (
                    <div className="sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Company</label>
                      <p className="text-gray-900 text-sm sm:text-base">{selectedContact.company}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Message</label>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-900 whitespace-pre-wrap max-h-32 overflow-y-auto">
                    {selectedContact.message}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Submitted At</label>
                  <p className="text-gray-900 text-sm">
                    {new Date(selectedContact.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 mt-4 space-y-3">
                <label className="block text-sm font-medium text-gray-700">Change Status</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedContact.id, 'new')}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium transition-colors"
                  >
                    New
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedContact.id, 'read')}
                    className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium transition-colors"
                  >
                    Read
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedContact.id, 'archived')}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                  >
                    Archive
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium transition-colors"
                >
                  Delete Submission
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

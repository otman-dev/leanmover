'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

interface RagStatus {
  database: {
    blogs: { published: number; draft: number };
    solutions: { published: number; draft: number };
  };
  vectorDb: {
    blogs: number;
    solutions: number;
    services: number;
    faqs: number;
    total: number;
  };
  sync: {
    inProgress: boolean;
    lastReason: string;
    lastStarted: string | null;
    lastCompleted: string | null;
    lastError: string | null;
    draftInVector: number;
  };
}

export default function RagPage() {
  const [status, setStatus] = useState<RagStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize token and fetch status after mount
  useEffect(() => {
    setMounted(true);
    
    // Get token from localStorage (only works after mount)
    const storedToken = localStorage.getItem('admin_token');
    setToken(storedToken);

    if (storedToken) {
      addLog('✅ Token found, starting sync...');
      fetchStatus(storedToken);
      const interval = setInterval(() => fetchStatus(storedToken), 4000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
      addLog('⚠️  No authentication token found. Please login first.');
    }
  }, []);

  function addLog(message: string) {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  }

  async function fetchStatus(authToken: string) {
    try {
      const response = await fetch('/api/admin/sync-status', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          addLog('❌ Authentication failed - please login again');
          localStorage.removeItem('admin_token');
          setToken(null);
          return;
        }
        throw new Error(`Failed to fetch status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform data to our interface
      setStatus({
        database: {
          blogs: { published: 3, draft: 0 },
          solutions: { published: 1, draft: 1 }
        },
        vectorDb: {
          blogs: data.vectorBlogs || 0,
          solutions: data.vectorSolutions || 0,
          services: data.vectorServices || 0,
          faqs: data.vectorFaqs || 0,
          total: data.vectorTotal || 0
        },
        sync: {
          inProgress: data.inProgress || false,
          lastReason: data.lastReason || '',
          lastStarted: data.lastStarted || null,
          lastCompleted: data.lastCompleted || null,
          lastError: data.lastError || null,
          draftInVector: 0
        }
      });
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSync() {
    setSyncing(true);
    addLog('Starting RAG synchronization...');
    
    try {
      if (!token) {
        addLog('❌ No authentication token found. Please login again.');
        toast.error('Authentication required');
        setSyncing(false);
        return;
      }

      const response = await fetch('/api/admin/sync-vectors', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        addLog(`❌ Sync failed: ${data.error || 'Unknown error'}`);
        if (data.details) {
          addLog(`   Details: ${data.details}`);
        }
        toast.error(data.error || 'Sync failed');
        setSyncing(false);
        return;
      }
      
      addLog(`✅ Sync completed successfully!`);
      if (data.stats?.indexed) {
        addLog(`   Total items: ${data.stats.indexed.total}`);
        addLog(`   Successful: ${data.stats.indexed.success}`);
        if (data.stats.indexed.failed > 0) {
          addLog(`   Failed: ${data.stats.indexed.failed}`);
        }
      }
      toast.success('RAG sync completed!');
      
      setTimeout(() => fetchStatus(token), 1000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      addLog(`❌ Sync failed: ${errorMsg}`);
      toast.error(`Failed to trigger sync: ${errorMsg}`);
    } finally {
      setSyncing(false);
    }
  }

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{mounted ? 'Loading RAG status...' : 'Initializing...'}</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4 text-lg">⚠️ No authentication token found</p>
          <p className="text-gray-600 mb-6">Please login to access RAG Management</p>
          <Link href="/admin/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🤖 RAG Management</h1>
          <p className="text-gray-600">Monitor and manage your Retrieval-Augmented Generation database</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={handleSync}
            disabled={syncing || status?.sync.inProgress}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
          >
            {syncing || status?.sync.inProgress ? (
              <>
                <span className="animate-spin">⟳</span>
                Syncing...
              </>
            ) : (
              <>
                <span>📤</span>
                Sync RAG Database
              </>
            )}
          </button>

          <a
            href="#logs"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
          >
            <span>📋</span>
            View Logs
          </a>
        </div>

        {/* Status Alert */}
        {status?.sync.inProgress && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-900">
              <span className="animate-spin inline-block mr-2">⟳</span>
              RAG sync in progress...
            </p>
          </div>
        )}

        {status?.sync.lastError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-900 font-semibold">Last Error:</p>
            <p className="text-red-700">{status.sync.lastError}</p>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Database Articles */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📚</span> Database Articles
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">📰 Blog Posts</p>
                <p className="text-3xl font-bold text-blue-600">{status?.database.blogs.published || 0}</p>
                <p className="text-xs text-gray-500">{status?.database.blogs.draft || 0} draft</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">💡 Solutions</p>
                <p className="text-3xl font-bold text-green-600">{status?.database.solutions.published || 0}</p>
                <p className="text-xs text-gray-500">{status?.database.solutions.draft || 0} draft</p>
              </div>
            </div>
          </div>

          {/* Vector Database Content */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🔍</span> Vector Database
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">📰 Blog chunks</span>
                <span className="font-bold text-blue-600">{status?.vectorDb.blogs || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">💡 Solution chunks</span>
                <span className="font-bold text-green-600">{status?.vectorDb.solutions || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">🔧 Service chunks</span>
                <span className="font-bold text-purple-600">{status?.vectorDb.services || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">❓ FAQ chunks</span>
                <span className="font-bold text-orange-600">{status?.vectorDb.faqs || 0}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="text-gray-900 font-semibold">Total</span>
                <span className="font-bold text-gray-900">{status?.vectorDb.total || 0}</span>
              </div>
            </div>
          </div>

          {/* Sync Status */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>⚡</span> Sync Status
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-600">Status</p>
                <p className={`text-lg font-bold ${status?.sync.inProgress ? 'text-blue-600' : 'text-green-600'}`}>
                  {status?.sync.inProgress ? '🔄 In Progress' : '✅ Ready'}
                </p>
              </div>
              {status?.sync.lastCompleted && (
                <div>
                  <p className="text-gray-600">Last Completed</p>
                  <p className="text-sm font-mono text-gray-900">
                    {new Date(status.sync.lastCompleted).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logs Section */}
        <div className="bg-white rounded-lg shadow-lg p-6" id="logs">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📋</span> Activity Logs
          </h2>
          <div className="bg-gray-900 rounded p-4 text-gray-100 font-mono text-sm max-h-64 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">No activity yet. Click "Sync RAG Database" to start.</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-gray-300">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

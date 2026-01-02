'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface UsageStats {
  requests: number;
  tokensUsed: number;
  lastRequestTime: string | null;
  currentModel: string;
  todayRequests: number;
  todayTokens: number;
  hourlyBreakdown?: Array<{
    hour: string;
    requests: number;
    tokens: number;
  }>;
  modelBreakdown?: Array<{
    model: string;
    requests: number;
    tokens: number;
  }>;
  rateLimitInfo: {
    requestsPerMinute: number;
    requestsPerDay: number;
    tokensPerMinute: number;
  };
}

interface ModelAvailability {
  model: string;
  available: boolean;
  status: string;
  lastTested: string;
}

export default function GroqUsagePage() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [modelAvailability, setModelAvailability] = useState<ModelAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  async function fetchStats() {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const response = await fetch('/api/admin/groq-usage', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      setStats(data.stats);
      setModelAvailability(data.modelAvailability || []);
      toast.success('Stats refreshed successfully');
    } catch (error) {
      console.error('Error fetching Groq stats:', error);
      toast.error('Failed to load Groq stats');
    } finally {
      setLoading(false);
    }
  }

  const handleRefresh = () => {
    setLoading(true);
    fetchStats();
  };

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Groq API stats...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">⚡ Groq API Usage</h1>
            <p className="text-gray-600">Monitor API usage and rate limits in real-time</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className={loading ? 'animate-spin' : ''}>🔄</span>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Current Active Model */}
        {stats?.currentModel && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 p-6 mb-6 rounded-r-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-4xl">🎯</span>
                <div>
                  <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Currently Active Model</p>
                  <p className="text-2xl font-bold text-gray-900 font-mono mt-1">{stats.currentModel}</p>
                  <p className="text-xs text-gray-600 mt-1">Last used in most recent chat request</p>
                </div>
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ Active
              </div>
            </div>
          </div>
        )}

        {/* Model Availability Status */}
        {modelAvailability.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🔄 Model Availability Status</h2>
            <p className="text-sm text-gray-600 mb-4">
              Real-time status of all configured fallback models. The system automatically switches when rate limits are hit.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modelAvailability.map((model, idx) => {
                const isActive = stats?.currentModel === model.model;
                const statusColors = {
                  'Available': 'bg-green-100 text-green-800 border-green-300',
                  'Rate Limited': 'bg-red-100 text-red-800 border-red-300',
                  'Possibly Rate Limited': 'bg-orange-100 text-orange-800 border-orange-300',
                  'Not Used Recently': 'bg-gray-100 text-gray-600 border-gray-300',
                  'Decommissioned': 'bg-gray-100 text-gray-800 border-gray-300',
                  'Not Found': 'bg-yellow-100 text-yellow-800 border-yellow-300',
                  'Unknown': 'bg-gray-100 text-gray-600 border-gray-300',
                };
                const statusIcons = {
                  'Available': '✅',
                  'Rate Limited': '🚫',
                  'Possibly Rate Limited': '⚠️',
                  'Not Used Recently': '💤',
                  'Decommissioned': '❌',
                  'Not Found': '❓',
                  'Unknown': '❔',
                };
                
                return (
                  <div 
                    key={idx} 
                    className={`border-2 rounded-lg p-4 ${
                      isActive 
                        ? 'border-purple-500 bg-purple-50 shadow-lg' 
                        : model.available 
                          ? 'border-green-200 bg-white' 
                          : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-mono text-xs text-gray-900 break-all">
                          {model.model}
                        </p>
                        {isActive && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-purple-200 text-purple-800 text-xs rounded-full font-semibold">
                            🎯 IN USE
                          </span>
                        )}
                      </div>
                      <span className="text-2xl ml-2">{statusIcons[model.status as keyof typeof statusIcons] || '❓'}</span>
                    </div>
                    <div className="mt-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                        statusColors[model.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800 border-gray-300'
                      }`}>
                        {model.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Uses (last hour): {(model as any).recentUses || 0}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>💡 Fallback Priority:</strong> The system tries models in order from left to right. 
                When a model is rate-limited or unavailable, it automatically switches to the next available model.
              </p>
            </div>
          </div>
        )}

        {/* Usage Statistics */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Today's Usage */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>📊</span> Today's Usage
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Requests</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.todayRequests}</p>
                  </div>
                  <span className="text-3xl">🔄</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Tokens Used</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.todayTokens.toLocaleString()}</p>
                  </div>
                  <span className="text-3xl">💎</span>
                </div>
              </div>
            </div>

            {/* All-Time Statistics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🏆</span> All-Time Statistics
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Total Requests</p>
                    <p className="text-2xl font-bold text-green-600">{stats.requests}</p>
                  </div>
                  <span className="text-3xl">📈</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Total Tokens</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.tokensUsed.toLocaleString()}</p>
                  </div>
                  <span className="text-3xl">🎯</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

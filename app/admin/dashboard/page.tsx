'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Stats {
  totalBlogs: number;
  totalSolutions: number;
  totalContacts: number;
  recentContacts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0,
    totalSolutions: 0,
    totalContacts: 0,
    recentContacts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col">
        {/* Loading Header */}
        <div className="text-center py-4 sm:py-6 lg:py-8">
          <div className="h-6 sm:h-8 lg:h-10 xl:h-12 bg-gray-200 rounded-lg animate-pulse mx-auto mb-2 w-48"></div>
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-200 rounded animate-pulse mx-auto w-64"></div>
        </div>

        {/* Loading Content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {/* Stats Loading */}
          <div className="flex-1">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg sm:shadow-xl border-2 border-gray-100 h-full">
              <div className="h-5 sm:h-6 lg:h-7 bg-gray-200 rounded animate-pulse mb-4 sm:mb-6 w-24"></div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200">
                    <div className="text-center">
                      <div className="h-6 sm:h-8 lg:h-10 bg-gray-300 rounded animate-pulse mb-2 mx-auto w-8"></div>
                      <div className="h-6 sm:h-8 lg:h-10 bg-gray-300 rounded animate-pulse mb-2 mx-auto w-12"></div>
                      <div className="h-3 sm:h-4 bg-gray-300 rounded animate-pulse mx-auto w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions Loading */}
          <div className="flex-1">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg sm:shadow-xl border-2 border-gray-100 h-full">
              <div className="h-5 sm:h-6 lg:h-7 bg-gray-200 rounded animate-pulse mb-4 sm:mb-6 w-28"></div>
              <div className="space-y-3 sm:space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="h-6 sm:h-8 lg:h-10 bg-gray-300 rounded animate-pulse w-8 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-4 sm:h-5 bg-gray-300 rounded animate-pulse mb-1 w-24"></div>
                        <div className="h-3 sm:h-4 bg-gray-300 rounded animate-pulse w-32"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statsData = [
    { title: 'Blog Articles', value: stats.totalBlogs, link: '/admin/blog', icon: '📝', color: 'from-emerald-500 to-teal-600', bgColor: 'from-emerald-50 to-teal-100', borderColor: 'border-emerald-200' },
    { title: 'Solutions', value: stats.totalSolutions, link: '/admin/solutions', icon: '⚙️', color: 'from-blue-500 to-indigo-600', bgColor: 'from-blue-50 to-indigo-100', borderColor: 'border-blue-200' },
    { title: 'Contacts', value: stats.totalContacts, link: '/admin/contacts', icon: '📧', color: 'from-purple-500 to-violet-600', bgColor: 'from-purple-50 to-violet-100', borderColor: 'border-purple-200' },
    { title: 'Recent', value: stats.recentContacts, link: '/admin/contacts', icon: '🔔', color: 'from-orange-500 to-red-600', bgColor: 'from-orange-50 to-red-100', borderColor: 'border-orange-200' },
  ];

  const quickActions = [
    { title: 'New Article', description: 'Create blog post', link: '/admin/blog/new', icon: '✏️', color: 'from-green-500 to-emerald-600' },
    { title: 'New Solution', description: 'Add solution', link: '/admin/solutions/new', icon: '➕', color: 'from-blue-500 to-indigo-600' },
    { title: 'View Contacts', description: 'Check inquiries', link: '/admin/contacts', icon: '👥', color: 'from-purple-500 to-violet-600' },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                         radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)`
      }}></div>
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4 sm:py-6 lg:py-8 relative z-10"
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-2">
          {getGreeting()}!
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">Welcome back, manage your content</p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-10 relative z-10">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg sm:shadow-xl border-2 border-gray-100 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-4 sm:mb-6 relative z-10">📊 Statistics</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={stat.link}
                    className={`block bg-gradient-to-br ${stat.bgColor} rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 border ${stat.borderColor} hover:border-opacity-60 group relative overflow-hidden`}
                  >
                    <div className="text-center relative z-10">
                      <div className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">{stat.icon}</div>
                      <div className={`text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.title}</div>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg sm:shadow-xl border-2 border-gray-100 h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-full -translate-y-16 -translate-x-16"></div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-4 sm:mb-6 relative z-10">⚡ Quick Actions</h2>
            <div className="space-y-3 sm:space-y-4 relative z-10">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link
                    href={action.link}
                    className="block bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:from-white hover:to-gray-50 transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:shadow-lg group relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`text-lg sm:text-xl lg:text-2xl flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${action.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                        {action.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors text-sm sm:text-base lg:text-lg">
                          {action.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">{action.description}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

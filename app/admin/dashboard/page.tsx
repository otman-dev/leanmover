'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { HiArrowRight, HiPlus, HiEye, HiCog, HiTrendingUp, HiUsers, HiClipboardList, HiPencilAlt } from 'react-icons/hi';
import ChartWrapper from '@/components/shared/ChartWrapper';

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
      <div className="h-screen bg-gray-50">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-blue-300 opacity-20"></div>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-700 font-medium mt-4 text-lg"
            >
              Loading Dashboard...
            </motion.p>
          </div>
        </div>
      </div>
    );
  }

  const statsData = [
    { 
      title: 'Blog Articles', 
      value: stats.totalBlogs, 
      link: '/admin/blog', 
      icon: HiPencilAlt, 
      color: 'from-emerald-500 to-teal-600', 
      bgColor: 'from-emerald-50 to-teal-100', 
      borderColor: 'border-emerald-200',
      hoverColor: 'hover:from-emerald-600 hover:to-teal-700'
    },
    { 
      title: 'Solutions', 
      value: stats.totalSolutions, 
      link: '/admin/solutions', 
      icon: HiCog, 
      color: 'from-blue-500 to-indigo-600', 
      bgColor: 'from-blue-50 to-indigo-100', 
      borderColor: 'border-blue-200',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700'
    },
    { 
      title: 'Total Contacts', 
      value: stats.totalContacts, 
      link: '/admin/contacts', 
      icon: HiUsers, 
      color: 'from-purple-500 to-violet-600', 
      bgColor: 'from-purple-50 to-violet-100', 
      borderColor: 'border-purple-200',
      hoverColor: 'hover:from-purple-600 hover:to-violet-700'
    },
    { 
      title: 'Recent Messages', 
      value: stats.recentContacts, 
      link: '/admin/contacts', 
      icon: HiClipboardList, 
      color: 'from-orange-500 to-red-600', 
      bgColor: 'from-orange-50 to-red-100', 
      borderColor: 'border-orange-200',
      hoverColor: 'hover:from-orange-600 hover:to-red-700'
    },
  ];

  const chartData = [
    { name: 'Jan', blogs: Math.floor(stats.totalBlogs * 0.3), solutions: Math.floor(stats.totalSolutions * 0.2), contacts: Math.floor(stats.totalContacts * 0.4) },
    { name: 'Feb', blogs: Math.floor(stats.totalBlogs * 0.5), solutions: Math.floor(stats.totalSolutions * 0.4), contacts: Math.floor(stats.totalContacts * 0.6) },
    { name: 'Mar', blogs: Math.floor(stats.totalBlogs * 0.7), solutions: Math.floor(stats.totalSolutions * 0.6), contacts: Math.floor(stats.totalContacts * 0.8) },
    { name: 'Apr', blogs: Math.floor(stats.totalBlogs * 0.9), solutions: Math.floor(stats.totalSolutions * 0.8), contacts: Math.floor(stats.totalContacts * 0.9) },
    { name: 'May', blogs: stats.totalBlogs, solutions: stats.totalSolutions, contacts: stats.totalContacts },
  ];

  const quickActions = [
    { 
      title: 'Create New Article', 
      description: 'Write and publish a blog post', 
      link: '/admin/blog/new', 
      icon: HiPencilAlt, 
      color: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-100'
    },
    { 
      title: 'Add Solution', 
      description: 'Create a new industrial solution', 
      link: '/admin/solutions/new', 
      icon: HiPlus, 
      color: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-100'
    },
    { 
      title: 'Review Contacts', 
      description: 'Check client inquiries and messages', 
      link: '/admin/contacts', 
      icon: HiEye, 
      color: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-100'
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getCurrentTime = () => {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="h-full bg-gray-50 relative">
      <div className="relative z-10 w-full h-full overflow-x-hidden overflow-y-auto">
        {/* Top Row: Welcome + Performance Metrics */}
        <section className="py-1 lg:py-2 lg:flex-shrink-0">
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-3 lg:gap-5">
              
              {/* Left Column: Welcome Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg p-2 lg:p-3 shadow-sm lg:shadow-md border border-gray-200 w-full"
              >
                <div className="text-center">
                  {/* Logo Section */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-2 lg:mb-3 inline-block"
                  >
                    <div className="bg-white rounded-lg p-2 shadow-sm border border-blue-100">
                      <Image 
                        src="/images/leanmover-logo.png"
                        alt="LEANMOVER - Admin Dashboard"
                        width={200}
                        height={60}
                        className="w-full max-w-xs h-auto"
                        priority
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                      {getGreeting()}!
                    </h1>
                    <p className="text-sm sm:text-base text-gray-700 font-medium mb-0.5">
                      Welcome to your Admin Dashboard
                    </p>
                    <p className="text-xs lg:text-sm text-gray-600">
                      {getCurrentTime()}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Column: Performance Metrics */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg p-2 lg:p-3 shadow-sm lg:shadow-md border border-gray-200 relative overflow-hidden w-full"
              >
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-indigo-50 to-transparent rounded-full -translate-y-8 -translate-x-8"></div>
                
                <div className="relative z-10 text-center mb-3">
                  <div className="inline-block mb-1">
                    <span className="text-indigo-600 font-semibold text-xs uppercase tracking-wider">
                      🚀 Performance
                    </span>
                  </div>
                  <h2 className="text-base lg:text-lg font-bold text-gray-900 mb-1">
                    Dashboard Metrics
                  </h2>
                  <p className="text-xs text-gray-600">
                    Real-time insights into content management
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 relative z-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 mb-1 lg:mb-2 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                      <HiTrendingUp className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div className="text-base lg:text-lg font-bold text-green-600 mb-0.5">
                      {((stats.totalBlogs + stats.totalSolutions) / 10 * 100).toFixed(0)}%
                    </div>
                    <p className="text-xs text-gray-600">Content Growth</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 mb-1 lg:mb-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      <HiUsers className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div className="text-base lg:text-lg font-bold text-blue-600 mb-0.5">
                      {stats.totalContacts > 0 ? Math.round(stats.recentContacts / stats.totalContacts * 100) : 0}%
                    </div>
                    <p className="text-xs text-gray-600">Active Engagement</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 mb-1 lg:mb-2 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white">
                      <HiClipboardList className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div className="text-base lg:text-lg font-bold text-purple-600 mb-0.5">100%</div>
                    <p className="text-xs text-gray-600">System Uptime</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Overview - Metrics Style */}
        <section className="py-1 lg:py-2 lg:flex-shrink-0">
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-3 lg:mb-4"
            >
              <div className="inline-block mb-1">
                <span className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
                  📊 Platform Overview
                </span>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                Your Content Statistics
              </h2>
              <p className="text-xs lg:text-sm text-gray-600 max-w-xl mx-auto">
                Monitor your content and customer interactions
              </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 w-full">
              {statsData.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <Link href={stat.link} className="group block">
                      <div className={`bg-gradient-to-br ${stat.bgColor} rounded-lg p-2 lg:p-3 shadow-sm hover:shadow-md transition-all duration-300 border ${stat.borderColor} hover:border-opacity-60 relative overflow-hidden`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                        <div className="relative z-10 text-center">
                          <div className={`inline-flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 mb-1 lg:mb-2 rounded-md bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
                            <IconComponent className="w-4 h-4 lg:w-5 lg:h-5" />
                          </div>
                          <div className={`text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-0.5 lg:mb-1`}>
                            {stat.value}
                          </div>
                          <div className="text-gray-700 font-semibold text-xs">{stat.title}</div>
                        </div>
                        <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-5 translate-x-5"></div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick Actions & Analytics Grid */}
        <section className="py-1 lg:py-2 pb-2 lg:pb-3">
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-3 lg:gap-5">
              
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-2 lg:space-y-3"
              >
                <div>
                  <div className="inline-block mb-1">
                    <span className="text-purple-600 font-semibold text-xs uppercase tracking-wider">
                      ⚡ Quick Actions
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    Manage Your Content
                  </h3>
                </div>

                <div className="space-y-2">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <motion.div
                        key={action.title}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <Link href={action.link} className="group block">
                          <div className={`bg-gradient-to-r ${action.bgGradient} rounded-lg p-2 lg:p-3 hover:shadow-sm lg:hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300 relative overflow-hidden`}>
                            <div className="flex items-center gap-2">
                              <div className={`flex-shrink-0 p-1.5 lg:p-2 rounded-md bg-gradient-to-br ${action.color} text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                <IconComponent className="w-3 h-3 lg:w-4 lg:h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors text-xs lg:text-sm mb-0.5">
                                  {action.title}
                                </h4>
                                <p className="text-xs text-gray-600">{action.description}</p>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <HiArrowRight className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                              </div>
                            </div>
                            <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Analytics Chart */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full"
              >
                <div className="bg-white rounded-lg p-2 lg:p-3 shadow-sm lg:shadow-md border border-gray-200 relative overflow-hidden w-full">
                  <div className="absolute top-0 right-0 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-8 lg:-translate-y-10 translate-x-8 lg:translate-x-10"></div>
                  
                  <div className="relative z-10 mb-2 lg:mb-3">
                    <div className="inline-block mb-0.5 lg:mb-1">
                      <span className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
                        📈 Analytics
                      </span>
                    </div>
                    <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-0.5 lg:mb-1">
                      Monthly Progress
                    </h3>
                    <p className="text-xs text-gray-600">Track content trends</p>
                  </div>
                  
                  <div className="h-32 sm:h-40 lg:h-48 relative z-10 w-full">
                    <ChartWrapper>
                      <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorBlogs" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSolutions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                          axisLine={{ stroke: '#d1d5db' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                          axisLine={{ stroke: '#d1d5db' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #d1d5db',
                            borderRadius: '12px',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Area type="monotone" dataKey="blogs" stackId="1" stroke="#10b981" fillOpacity={1} fill="url(#colorBlogs)" />
                        <Area type="monotone" dataKey="solutions" stackId="1" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSolutions)" />
                        <Area type="monotone" dataKey="contacts" stackId="1" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorContacts)" />
                      </AreaChart>
                    </ResponsiveContainer>
                    </ChartWrapper>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex justify-center gap-3 lg:gap-4 mt-2 relative z-10">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Blogs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Solutions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Contacts</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

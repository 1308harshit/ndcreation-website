'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { ShoppingBag, DollarSign, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Stats {
  totalOrders: number;
  revenue: number;
  activeProjects: number;
  completionRate: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    revenue: 0,
    activeProjects: 0,
    completionRate: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    const completed = bookings.filter((b: any) => b.status === 'Completed').length;
    const inProgress = bookings.filter((b: any) => b.status === 'In Progress').length;
    const totalRevenue = bookings.length * 12500; // Mock calculation
    
    setStats({
      totalOrders: bookings.length,
      revenue: totalRevenue,
      activeProjects: inProgress,
      completionRate: bookings.length > 0 ? Math.round((completed / bookings.length) * 100) : 0,
    });

    setRecentOrders(bookings.slice(-5).reverse());
  }, []);

  const statCards = [
    {
      icon: ShoppingBag,
      label: 'Total Orders',
      value: stats.totalOrders,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: DollarSign,
      label: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: TrendingUp,
      label: 'Active Projects',
      value: stats.activeProjects,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: CheckCircle,
      label: 'Completion Rate',
      value: `${stats.completionRate}%`,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[var(--deep-navy)]">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
            <p className="text-gray-400">Welcome back! Here's what's happening with your business.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
            
            {recentOrders.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No orders yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Customer</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Service</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Budget</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 text-white">{order.name}</td>
                        <td className="py-3 px-4 text-gray-300">{order.serviceType}</td>
                        <td className="py-3 px-4 text-gray-300">{order.budget}</td>
                        <td className="py-3 px-4 text-gray-300">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(order.status)}
                            <span className="text-gray-300">{order.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            <button className="glass rounded-xl p-6 border border-white/10 text-left hover:border-[var(--electric-blue)] transition-colors group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--neon-cyan)] transition-colors">
                View All Orders
              </h3>
              <p className="text-sm text-gray-400">Manage and track all customer orders</p>
            </button>
            
            <button className="glass rounded-xl p-6 border border-white/10 text-left hover:border-[var(--electric-blue)] transition-colors group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--neon-cyan)] transition-colors">
                Generate Report
              </h3>
              <p className="text-sm text-gray-400">Export analytics and performance data</p>
            </button>
            
            <button className="glass rounded-xl p-6 border border-white/10 text-left hover:border-[var(--electric-blue)] transition-colors group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--neon-cyan)] transition-colors">
                Manage Products
              </h3>
              <p className="text-sm text-gray-400">Add, edit, or remove products</p>
            </button>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

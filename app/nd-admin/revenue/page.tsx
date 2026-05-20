'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';

const COLORS = ['#0066ff', '#00d9ff', '#667eea', '#764ba2', '#f093fb'];

export default function RevenuePage() {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [serviceBreakdown, setServiceBreakdown] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [avgOrderValue, setAvgOrderValue] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Generate monthly revenue data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthlyRevenue = months.map((month, index) => ({
      month,
      revenue: Math.floor(Math.random() * 50000) + 20000,
      orders: Math.floor(Math.random() * 20) + 5,
    }));
    setMonthlyData(monthlyRevenue);

    // Service breakdown
    const services = ['AI Development', 'App Development', 'Website Development', 'SaaS Development', 'UI/UX Design'];
    const breakdown = services.map(service => ({
      name: service,
      value: Math.floor(Math.random() * 100000) + 20000,
    }));
    setServiceBreakdown(breakdown);

    // Calculate stats
    const total = monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
    const totalOrders = monthlyRevenue.reduce((sum, item) => sum + item.orders, 0);
    setTotalRevenue(total);
    setAvgOrderValue(totalOrders > 0 ? Math.floor(total / totalOrders) : 0);
    setGrowthRate(15.8); // Mock growth rate
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[var(--deep-navy)]">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Revenue Analytics</h1>
            <p className="text-gray-400">Track your financial performance and growth</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-500 mt-2">+{growthRate}% from last period</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Avg Order Value</p>
              <p className="text-3xl font-bold text-white">${avgOrderValue.toLocaleString()}</p>
              <p className="text-sm text-blue-500 mt-2">+8.2% from last period</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Growth Rate</p>
              <p className="text-3xl font-bold text-white">{growthRate}%</p>
              <p className="text-sm text-purple-500 mt-2">Month over month</p>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Revenue Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-6">Monthly Revenue</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f0f0f',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0066ff" />
                      <stop offset="100%" stopColor="#00d9ff" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Revenue Trend Line Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-6">Revenue Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f0f0f',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#00d9ff"
                    strokeWidth={3}
                    dot={{ fill: '#0066ff', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Service Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-6">Revenue by Service</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f0f0f',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-xl font-bold text-white mb-6">Service Performance</h2>
              <div className="space-y-4">
                {serviceBreakdown.map((service, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">{service.name}</span>
                      <span className="text-white font-semibold">${service.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(service.value / Math.max(...serviceBreakdown.map(s => s.value))) * 100}%` }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

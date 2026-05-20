'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Search, Trash2, Eye } from 'lucide-react';
import { ORDER_STATUS } from '@/lib/constants';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchQuery, statusFilter]);

  const loadOrders = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setOrders(bookings);
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (statusFilter !== 'All') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('bookings', JSON.stringify(updatedOrders));
  };

  const deleteOrder = (orderId: number) => {
    if (confirm('Are you sure you want to delete this order?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      localStorage.setItem('bookings', JSON.stringify(updatedOrders));
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[var(--deep-navy)]">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Orders Management</h1>
            <p className="text-gray-400">Track and manage all customer service orders</p>
          </div>

          {/* Filters */}
          <div className="glass rounded-xl p-6 border border-white/10 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by customer or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-blue)] transition-colors"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[var(--electric-blue)] transition-colors"
              >
                <option value="All">All Status</option>
                {ORDER_STATUS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl border border-white/10 overflow-hidden"
          >
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-400 text-lg">No orders found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Customer</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Email</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Service</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Budget</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 px-6 text-white font-medium">{order.name}</td>
                        <td className="py-4 px-6 text-gray-300">{order.email}</td>
                        <td className="py-4 px-6 text-gray-300">{order.serviceType}</td>
                        <td className="py-4 px-6 text-gray-300">{order.budget}</td>
                        <td className="py-4 px-6 text-gray-300">
                          {new Date(order.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                              order.status === 'Completed'
                                ? 'bg-green-500/10 border-green-500/50 text-green-500'
                                : order.status === 'In Progress'
                                ? 'bg-blue-500/10 border-blue-500/50 text-blue-500'
                                : 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500'
                            }`}
                          >
                            {ORDER_STATUS.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => alert(`Order Details:\n\nMessage: ${order.message}`)}
                              className="p-2 rounded-lg glass border border-white/10 text-gray-400 hover:text-white hover:border-[var(--electric-blue)] transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteOrder(order.id)}
                              className="p-2 rounded-lg glass border border-white/10 text-gray-400 hover:text-red-500 hover:border-red-500 transition-colors"
                              title="Delete Order"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="glass rounded-xl p-6 border border-white/10">
              <p className="text-gray-400 text-sm mb-2">Total Orders</p>
              <p className="text-3xl font-bold text-white">{orders.length}</p>
            </div>
            <div className="glass rounded-xl p-6 border border-white/10">
              <p className="text-gray-400 text-sm mb-2">In Progress</p>
              <p className="text-3xl font-bold text-blue-500">
                {orders.filter(o => o.status === 'In Progress').length}
              </p>
            </div>
            <div className="glass rounded-xl p-6 border border-white/10">
              <p className="text-gray-400 text-sm mb-2">Completed</p>
              <p className="text-3xl font-bold text-green-500">
                {orders.filter(o => o.status === 'Completed').length}
              </p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

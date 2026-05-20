'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  tags: string[];
  playStoreLink?: string;
  webLink?: string;
  downloadLink?: string;
  featured: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: 'Apps',
    tags: [],
    featured: false,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const saved = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    setProducts(saved);
  };

  const saveProducts = (newProducts: Product[]) => {
    localStorage.setItem('adminProducts', JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      const updated = products.map(p => p.id === editingProduct.id ? { ...formData, id: editingProduct.id } as Product : p);
      saveProducts(updated);
    } else {
      const newProduct = { ...formData, id: Date.now() } as Product;
      saveProducts([...products, newProduct]);
    }

    resetForm();
  };

  const deleteProduct = (id: number) => {
    if (confirm('Delete this product?')) {
      saveProducts(products.filter(p => p.id !== id));
    }
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', category: 'Apps', tags: [], featured: false });
    setEditingProduct(null);
    setShowModal(false);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[var(--deep-navy)]">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Products Management</h1>
              <p className="text-gray-400">Manage your product portfolio</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white font-semibold hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl p-6 border border-white/10"
              >
                {product.featured && (
                  <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white text-xs font-bold mb-3">
                    Featured
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 rounded text-xs bg-white/5 text-gray-300">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editProduct(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 text-gray-300 hover:text-white hover:border-[var(--electric-blue)] transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 text-gray-300 hover:text-red-500 hover:border-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No products yet. Add your first product!</p>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl glass rounded-2xl p-8 border border-white/10 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[var(--electric-blue)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[var(--electric-blue)] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[var(--electric-blue)]"
                >
                  {PRODUCT_CATEGORIES.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags?.join(', ')}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
                  className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[var(--electric-blue)]"
                  placeholder="React, AI, Cloud"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm text-gray-300">Featured Product</label>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white font-semibold hover:scale-105 transition-transform"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </ProtectedRoute>
  );
}

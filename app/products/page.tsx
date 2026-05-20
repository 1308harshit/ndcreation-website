'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import AnimatedCursor from '@/components/AnimatedCursor';
import { Search, Filter, Smartphone, Brain, Globe, Gamepad2, ExternalLink, Download } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

const allProducts = [
  {
    id: 1,
    name: 'TaskMaster Pro',
    category: 'Apps',
    description: 'AI-powered task management app with smart scheduling, productivity insights, and team collaboration features.',
    icon: Smartphone,
    tags: ['React Native', 'AI', 'Cloud', 'Real-time'],
    playStoreLink: '#',
    featured: true,
    image: '/products/taskmaster.jpg',
  },
  {
    id: 2,
    name: 'Neural Insights',
    category: 'AI',
    description: 'Advanced machine learning platform for predictive analytics, data visualization, and automated insights.',
    icon: Brain,
    tags: ['Python', 'TensorFlow', 'API', 'ML'],
    webLink: '#',
    featured: true,
    image: '/products/neural.jpg',
  },
  {
    id: 3,
    name: 'EcoCommerce',
    category: 'Websites',
    description: 'Sustainable e-commerce platform with carbon footprint tracking and eco-friendly shipping options.',
    icon: Globe,
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Analytics'],
    webLink: '#',
    featured: true,
    image: '/products/ecocommerce.jpg',
  },
  {
    id: 4,
    name: 'Cyber Quest',
    category: 'Games',
    description: 'Immersive cyberpunk RPG with stunning graphics, engaging storyline, and multiplayer battles.',
    icon: Gamepad2,
    tags: ['Unity', '3D', 'Multiplayer', 'VR'],
    downloadLink: '#',
    featured: true,
    image: '/products/cyberquest.jpg',
  },
  {
    id: 5,
    name: 'FitTrack AI',
    category: 'Apps',
    description: 'Personal fitness tracker with AI-powered workout recommendations and nutrition planning.',
    icon: Smartphone,
    tags: ['Flutter', 'AI', 'Health', 'Wearables'],
    playStoreLink: '#',
    featured: false,
    image: '/products/fittrack.jpg',
  },
  {
    id: 6,
    name: 'DataViz Pro',
    category: 'AI',
    description: 'Transform complex data into beautiful, interactive visualizations with AI-powered insights.',
    icon: Brain,
    tags: ['D3.js', 'Python', 'WebGL', 'Analytics'],
    webLink: '#',
    featured: false,
    image: '/products/dataviz.jpg',
  },
  {
    id: 7,
    name: 'Portfolio Studio',
    category: 'Websites',
    description: 'Create stunning portfolio websites with drag-and-drop builder and premium templates.',
    icon: Globe,
    tags: ['React', 'CMS', 'Templates', 'SEO'],
    webLink: '#',
    featured: false,
    image: '/products/portfolio.jpg',
  },
  {
    id: 8,
    name: 'Space Raiders',
    category: 'Games',
    description: 'Fast-paced space shooter with procedurally generated levels and competitive leaderboards.',
    icon: Gamepad2,
    tags: ['Unreal', '3D', 'Multiplayer', 'Competitive'],
    downloadLink: '#',
    featured: false,
    image: '/products/space.jpg',
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'featured') return b.featured ? 1 : -1;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <>
      <SmoothScroll />
      <AnimatedCursor />
      <Navbar />
      
      <main className="min-h-screen bg-[var(--deep-navy)] pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Our Products
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore our portfolio of innovative applications, AI tools, websites, and games.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl glass border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-blue)] transition-colors"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-3 mb-6">
              {PRODUCT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white'
                      : 'glass border border-white/10 text-gray-300 hover:border-[var(--electric-blue)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg glass border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[var(--electric-blue)] transition-colors"
              >
                <option value="featured">Featured First</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </motion.div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative glass rounded-2xl p-6 border border-white/10 overflow-hidden"
                >
                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white text-xs font-bold">
                      Featured
                    </div>
                  )}

                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--electric-blue)]/20 to-[var(--neon-cyan)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <product.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-[var(--neon-cyan)] mb-3">
                      {product.category}
                    </span>

                    {/* Product Name */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[var(--neon-cyan)] transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-4">
                      {product.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded text-xs bg-white/5 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {product.playStoreLink && (
                        <a
                          href={product.playStoreLink}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white text-sm font-medium hover:scale-105 transition-transform"
                        >
                          <Download className="w-4 h-4" />
                          Play Store
                        </a>
                      )}
                      {product.webLink && (
                        <a
                          href={product.webLink}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white text-sm font-medium hover:scale-105 transition-transform"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Site
                        </a>
                      )}
                      {product.downloadLink && (
                        <a
                          href={product.downloadLink}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white text-sm font-medium hover:scale-105 transition-transform"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-gray-400">No products found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

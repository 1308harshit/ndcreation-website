'use client';

import { motion } from 'framer-motion';
import { Brain, Calendar, Video, ExternalLink, Download, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { products as productsData } from '@/lib/products-data';

// Map product categories to icons
const iconMap: Record<string, any> = {
  'AI': Brain,
  'Apps': Smartphone,
  'Websites': Calendar,
  'Games': Video,
};

const products = productsData.map(product => ({
  ...product,
  icon: iconMap[product.category] || Brain,
}));

export default function ProductsShowcase() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep-navy)] via-[var(--charcoal-black)] to-[var(--deep-navy)]" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full glass border border-white/10 text-sm text-[var(--neon-cyan)] mb-4"
          >
            Our Products
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Built for the Future
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our portfolio of cutting-edge applications, AI tools, websites, and games.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative glass rounded-2xl p-6 border border-white/10 overflow-hidden"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--electric-blue)]/20 to-[var(--neon-cyan)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-br from-[var(--electric-blue)]/30 to-[var(--neon-cyan)]/30" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <product.icon className="w-6 h-6 text-white" />
                </div>

                {/* Category Badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-[var(--neon-cyan)] mb-3">
                  {product.category}
                </span>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--neon-cyan)] transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                  {product.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
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
                    <Link
                      href={product.playStoreLink}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white text-sm font-medium hover:scale-105 transition-transform"
                    >
                      <Download className="w-4 h-4" />
                      Play Store
                    </Link>
                  )}
                  {product.webLink && (
                    <Link
                      href={product.webLink}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white text-sm font-medium hover:scale-105 transition-transform"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Site
                    </Link>
                  )}
                  {product.downloadLink && (
                    <Link
                      href={product.downloadLink}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white text-sm font-medium hover:scale-105 transition-transform"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg glass border border-white/20 text-white font-semibold hover:border-[var(--electric-blue)] hover:scale-105 transition-all"
          >
            View All Products
            <ExternalLink className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

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
            className="inline-block px-4 py-2 rounded-full glass border border-[#B026FF]/30 text-sm text-[#FF006E] mb-4 animate-pulse-glow"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="group relative"
            >
              {/* Hexagonal Container */}
              <div className="relative card-angular-simple glass p-8 border-2 border-[#B026FF]/40 overflow-hidden hover:border-[#FF006E] transition-all duration-300 scanlines">
                {/* Intense Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#B026FF]/30 to-[#FF006E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                
                {/* Holographic Shine */}
                <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon with Hexagonal Background */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 mb-6 card-angular-simple bg-gradient-to-br from-[#B026FF] to-[#FF006E] flex items-center justify-center glow-purple"
                  >
                    <product.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Category Badge - Angular */}
                  <div className="inline-block px-4 py-1 mb-4 card-angular-simple bg-[#B026FF]/20 border border-[#B026FF]/50">
                    <span className="text-xs font-bold text-[#FF006E] uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Name - Gaming Font */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-pink transition-colors uppercase tracking-wide">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Tech Stack Tags - Angular */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-white/5 text-gray-300 border border-[#B026FF]/30 card-angular-simple hover:border-[#FF006E] hover:text-[#FF006E] transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons - Angular with Glitch */}
                  <div className="flex gap-3">
                    {product.playStoreLink && (
                      <Link
                        href={product.playStoreLink}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 card-angular-simple bg-gradient-to-r from-[#B026FF] to-[#FF006E] text-white text-sm font-bold uppercase tracking-wide hover:scale-110 transition-all animate-pulse-glow hover:animate-glitch"
                      >
                        <Download className="w-4 h-4" />
                        Get
                      </Link>
                    )}
                    {product.webLink && (
                      <Link
                        href={product.webLink}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 card-angular-simple bg-gradient-to-r from-[#B026FF] to-[#FF006E] text-white text-sm font-bold uppercase tracking-wide hover:scale-110 transition-all animate-pulse-glow hover:animate-glitch"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {product.playStoreLink ? 'Web' : 'Launch'}
                      </Link>
                    )}
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FF006E] opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#B026FF] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button - Angular Gaming Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-10 py-5 card-angular-simple glass border-2 border-[#B026FF]/50 text-white font-bold text-lg uppercase tracking-wider hover:border-[#FF006E] hover:scale-110 transition-all glow-purple hover:animate-glitch"
          >
            View All Products
            <ExternalLink className="w-6 h-6" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

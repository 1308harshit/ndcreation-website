'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import dynamic from 'next/dynamic';
import Logo from './Logo';

// Dynamically import 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

export default function Hero() {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9] as const,
      },
    },
  };

  const words = BRAND.tagline.split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Floating Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-10 w-96 h-96 bg-[var(--electric-blue)] rounded-full blur-3xl opacity-30"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--neon-cyan)] rounded-full blur-3xl opacity-30"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10"
        >
          <Sparkles className="w-4 h-4 text-[var(--neon-cyan)]" />
          <span className="text-sm text-gray-300">Welcome to the Future</span>
        </motion.div>

        {/* Animated Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 flex justify-center"
        >
          <Logo showText={false} animated={true} className="scale-150" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white via-[var(--electric-blue)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
            {BRAND.name}
          </span>
        </motion.h1>

        {/* Animated Tagline */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 h-20 flex items-center justify-center gap-3 flex-wrap">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate="visible"
              variants={textVariants}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          {BRAND.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/products"
            className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-[var(--electric-blue)]/50"
          >
            <span className="relative z-10">Explore Products</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--electric-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          <Link
            href={`https://wa.me/${BRAND.whatsapp.replace(/\+/g, '')}?text=Hi, I'm interested in booking a service`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 rounded-lg glass border border-white/20 text-white font-semibold overflow-hidden transition-all hover:scale-105 hover:border-[var(--electric-blue)]"
          >
            <span className="relative z-10">Book a Service</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--electric-blue)]/10 to-[var(--neon-cyan)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: '500+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '50+', label: 'Team Members' },
            { value: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-lg p-6 border border-white/10"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition-colors"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

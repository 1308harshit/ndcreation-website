'use client';

import { motion } from 'framer-motion';
import { Zap, Lightbulb, TrendingUp, Award, Cpu } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance and rapid development cycles to get your product to market faster.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Cutting-edge technologies and creative solutions that push boundaries.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description: 'Built to grow with your business, from startup to enterprise scale.',
  },
  {
    icon: Award,
    title: 'Premium Engineering',
    description: 'World-class code quality, best practices, and attention to detail.',
  },
  {
    icon: Cpu,
    title: 'AI-First Workflow',
    description: 'Leveraging artificial intelligence to deliver smarter, more efficient solutions.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep-navy)] to-[var(--charcoal-black)]" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-10 w-64 h-64 bg-[var(--electric-blue)] rounded-full blur-3xl"
      />

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
            Why Choose Us
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Excellence in Every Detail
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We combine technical expertise with creative innovation to deliver exceptional results.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative glass rounded-2xl p-8 border border-white/10 text-center"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--electric-blue)]/20 to-[var(--neon-cyan)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center shadow-lg shadow-[var(--electric-blue)]/50"
                >
                  <reason.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--neon-cyan)] transition-colors">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '99.9%', label: 'Uptime Guarantee' },
            { value: '<24h', label: 'Response Time' },
            { value: '100+', label: 'Technologies' },
            { value: '15+', label: 'Years Experience' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

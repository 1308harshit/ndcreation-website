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
        className="absolute top-1/4 right-10 w-64 h-64 bg-[#B026FF] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 left-10 w-80 h-80 bg-[#FF006E] rounded-full blur-3xl"
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
            className="inline-block px-4 py-2 rounded-full glass border border-[#B026FF]/30 text-sm text-[#FF006E] mb-4"
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

        {/* Reasons Grid - Angular Gaming Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="group relative"
            >
              {/* Angular Card */}
              <div className="relative card-angular-simple glass p-8 border-2 border-[#B026FF]/40 text-center overflow-hidden hover:border-[#FF006E] transition-all duration-300 scanlines">
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#B026FF]/30 to-[#FF006E]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                
                {/* Holographic Effect */}
                <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon - Angular with Rotation */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 mx-auto mb-6 card-angular-simple bg-gradient-to-br from-[#B026FF] to-[#FF006E] flex items-center justify-center shadow-lg glow-purple"
                  >
                    <reason.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Title - Gaming Font */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-pink transition-colors uppercase tracking-wide">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FF006E] opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#B026FF] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Counter - Angular Cards */}
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
              whileHover={{ scale: 1.1, y: -5 }}
              className="relative card-angular-simple glass p-6 border-2 border-[#B026FF]/40 text-center hover:border-[#FF006E] transition-all glow-purple"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#B026FF] to-[#FF006E] bg-clip-text text-transparent mb-2 uppercase">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

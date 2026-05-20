'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Smartphone, 
  Globe, 
  Cloud, 
  Palette, 
  Gamepad2, 
  Zap, 
  Bot,
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 1,
    name: 'AI Development',
    description: 'Custom AI solutions, machine learning models, and intelligent automation systems.',
    icon: Brain,
    features: ['Machine Learning', 'NLP', 'Computer Vision', 'Predictive Analytics'],
  },
  {
    id: 2,
    name: 'App Development',
    description: 'Native and cross-platform mobile applications with stunning UI and performance.',
    icon: Smartphone,
    features: ['iOS & Android', 'React Native', 'Flutter', 'Progressive Web Apps'],
  },
  {
    id: 3,
    name: 'Website Development',
    description: 'Modern, responsive websites built with cutting-edge technologies.',
    icon: Globe,
    features: ['Next.js', 'React', 'E-commerce', 'CMS Integration'],
  },
  {
    id: 4,
    name: 'SaaS Development',
    description: 'Scalable cloud-based software solutions for businesses of all sizes.',
    icon: Cloud,
    features: ['Multi-tenant', 'API Development', 'Cloud Infrastructure', 'Analytics'],
  },
  {
    id: 5,
    name: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that users love to interact with.',
    icon: Palette,
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    id: 6,
    name: 'Game Development',
    description: 'Immersive gaming experiences across platforms with stunning graphics.',
    icon: Gamepad2,
    features: ['Unity', 'Unreal Engine', '2D & 3D', 'Multiplayer'],
  },
  {
    id: 7,
    name: 'Automation Systems',
    description: 'Streamline workflows and boost productivity with intelligent automation.',
    icon: Zap,
    features: ['Process Automation', 'RPA', 'Workflow Optimization', 'Integration'],
  },
  {
    id: 8,
    name: 'AI Agents',
    description: 'Intelligent agents that handle tasks, answer questions, and assist users.',
    icon: Bot,
    features: ['Chatbots', 'Virtual Assistants', 'Task Automation', 'NLP Integration'],
  },
];

export default function ServicesSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--charcoal-black)]" />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(var(--electric-blue) 1px, transparent 1px), linear-gradient(90deg, var(--electric-blue) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

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
            Our Services
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              What We Offer
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Enterprise-grade solutions tailored to your business needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group relative glass rounded-2xl p-6 border border-white/10 overflow-hidden cursor-pointer"
            >
              {/* Animated Border Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--electric-blue)] via-[var(--neon-cyan)] to-[var(--electric-blue)] animate-pulse" 
                     style={{ padding: '1px', borderRadius: '1rem' }}>
                  <div className="w-full h-full bg-[var(--charcoal-black)] rounded-2xl" />
                </div>
              </div>

              <div className="relative z-10">
                {/* Icon with Glow */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center mb-4 shadow-lg shadow-[var(--electric-blue)]/50"
                >
                  <service.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Service Name */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--neon-cyan)] transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1 h-1 rounded-full bg-[var(--neon-cyan)]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Book Service Button */}
                <Link
                  href={`https://wa.me/917069984184?text=Hi, I'm interested in ${encodeURIComponent(service.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-[var(--electric-blue)] group-hover:text-[var(--neon-cyan)] transition-colors"
                >
                  Book Service
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-[var(--electric-blue)]/50"
          >
            Explore All Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

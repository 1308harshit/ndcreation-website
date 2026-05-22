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
      
      {/* Animated Grid Background - Purple/Pink */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#B026FF 1px, transparent 1px), linear-gradient(90deg, #B026FF 1px, transparent 1px)`,
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
            className="inline-block px-4 py-2 rounded-full glass border border-[#B026FF]/30 text-sm text-[#FF006E] mb-4 animate-pulse-glow"
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

        {/* Services Grid - Angular Gaming Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.08, y: -10 }}
              className="group relative"
            >
              {/* Angular Card with Scanlines */}
              <div className="relative card-angular-simple glass p-8 border-2 border-[#B026FF]/40 overflow-hidden hover:border-[#FF006E] transition-all duration-300 scanlines cursor-pointer">
                {/* Intense Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#B026FF]/40 to-[#FF006E]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl" />
                
                {/* Holographic Shine Effect */}
                <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon - Angular with Rotation */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.3 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 mb-6 card-angular-simple bg-gradient-to-br from-[#B026FF] to-[#FF006E] flex items-center justify-center glow-purple"
                  >
                    <service.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Service Name - Gaming Font */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-neon-pink transition-colors uppercase tracking-wide">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List - Angular Bullets */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-xs text-gray-300">
                        <div className="w-2 h-2 card-angular-simple bg-gradient-to-br from-[#B026FF] to-[#FF006E]" />
                        <span className="uppercase tracking-wide">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Book Service Button - Angular */}
                  <Link
                    href={`https://wa.me/917069984184?text=Hi, I'm interested in ${encodeURIComponent(service.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 card-angular-simple bg-gradient-to-r from-[#B026FF] to-[#FF006E] text-white text-sm font-bold uppercase tracking-wider hover:scale-110 transition-all animate-pulse-glow hover:animate-glitch"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#FF006E] opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#B026FF] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA - Angular Gaming Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-12 py-5 card-angular-simple bg-gradient-to-r from-[#B026FF] to-[#FF006E] text-white font-bold text-lg uppercase tracking-wider hover:scale-110 transition-all animate-pulse-glow hover:animate-glitch"
          >
            Explore All Services
            <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

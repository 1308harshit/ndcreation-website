'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import AnimatedCursor from '@/components/AnimatedCursor';
import { 
  Brain, Smartphone, Globe, Cloud, Palette, Gamepad2, Zap, Bot,
  Check, X, ChevronDown, ChevronUp
} from 'lucide-react';
import { SERVICE_TYPES } from '@/lib/constants';

const services = [
  {
    id: 1,
    name: 'AI Development',
    description: 'Custom AI solutions, machine learning models, and intelligent automation systems tailored to your business needs.',
    icon: Brain,
    features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Deep Learning'],
    pricing: 'Starting at $5,000',
  },
  {
    id: 2,
    name: 'App Development',
    description: 'Native and cross-platform mobile applications with stunning UI, seamless performance, and scalable architecture.',
    icon: Smartphone,
    features: ['iOS & Android', 'React Native', 'Flutter', 'Progressive Web Apps', 'App Store Optimization'],
    pricing: 'Starting at $8,000',
  },
  {
    id: 3,
    name: 'Website Development',
    description: 'Modern, responsive websites built with cutting-edge technologies for optimal performance and user experience.',
    icon: Globe,
    features: ['Next.js & React', 'E-commerce Solutions', 'CMS Integration', 'SEO Optimization', 'Performance Tuning'],
    pricing: 'Starting at $3,000',
  },
  {
    id: 4,
    name: 'SaaS Development',
    description: 'Scalable cloud-based software solutions with multi-tenant architecture and enterprise-grade security.',
    icon: Cloud,
    features: ['Multi-tenant Architecture', 'API Development', 'Cloud Infrastructure', 'Analytics Dashboard', 'Subscription Management'],
    pricing: 'Starting at $15,000',
  },
  {
    id: 5,
    name: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that users love, backed by research and data-driven design decisions.',
    icon: Palette,
    features: ['User Research', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing', 'Brand Identity'],
    pricing: 'Starting at $2,500',
  },
  {
    id: 6,
    name: 'Game Development',
    description: 'Immersive gaming experiences across platforms with stunning graphics and engaging gameplay mechanics.',
    icon: Gamepad2,
    features: ['Unity & Unreal Engine', '2D & 3D Games', 'Multiplayer Systems', 'Game Design', 'Cross-platform'],
    pricing: 'Starting at $10,000',
  },
  {
    id: 7,
    name: 'Automation Systems',
    description: 'Streamline workflows and boost productivity with intelligent automation and process optimization.',
    icon: Zap,
    features: ['Process Automation', 'RPA Solutions', 'Workflow Optimization', 'System Integration', 'Custom Scripts'],
    pricing: 'Starting at $4,000',
  },
  {
    id: 8,
    name: 'AI Agents',
    description: 'Intelligent agents that handle tasks, answer questions, and assist users with natural conversations.',
    icon: Bot,
    features: ['Chatbots', 'Virtual Assistants', 'Task Automation', 'NLP Integration', '24/7 Support'],
    pricing: 'Starting at $6,000',
  },
];

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. A simple website might take 2-4 weeks, while a complex SaaS platform could take 3-6 months. We provide detailed timelines during consultation.',
  },
  {
    question: 'Do you offer ongoing support and maintenance?',
    answer: 'Yes! We offer comprehensive support packages including bug fixes, updates, security patches, and feature enhancements. Support plans start at $500/month.',
  },
  {
    question: 'Can you work with our existing tech stack?',
    answer: 'Absolutely. We have expertise across 100+ technologies and can seamlessly integrate with your existing systems or recommend optimal solutions.',
  },
  {
    question: 'What is your development process?',
    answer: 'We follow an agile methodology with regular sprints, continuous feedback, and iterative development. You\'ll have full visibility and input throughout the project.',
  },
  {
    question: 'Do you sign NDAs?',
    answer: 'Yes, we take confidentiality seriously and are happy to sign NDAs before discussing your project details.',
  },
];

export default function ServicesPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: '',
    budget: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    if (service) {
      setSelectedService(service);
      setFormData((prev) => ({ ...prev, serviceType: service }));
    }
  }, []);

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    setFormData((prev) => ({ ...prev, serviceType: serviceName }));
    setShowBookingModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'Pending',
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    setFormSubmitted(true);
    setTimeout(() => {
      setShowBookingModal(false);
      setFormSubmitted(false);
      setFormData({ name: '', email: '', serviceType: '', budget: '', message: '' });
    }, 2000);
  };

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
                Our Services
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Enterprise-grade solutions tailored to your business needs. Let's build something amazing together.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="group relative glass rounded-2xl p-8 border border-white/10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--electric-blue)]/10 to-[var(--neon-cyan)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[var(--neon-cyan)] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-sm text-gray-400 mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-[var(--neon-cyan)] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="text-lg font-bold text-[var(--electric-blue)] mb-4">
                    {service.pricing}
                  </div>

                  <button
                    onClick={() => handleBookService(service.name)}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white font-semibold hover:scale-105 transition-transform"
                  >
                    Book Service
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold text-white">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[var(--neon-cyan)]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass rounded-2xl p-8 border border-white/10 relative"
          >
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--electric-blue)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-6">Book a Service</h3>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <p className="text-xl text-white font-semibold mb-2">Booking Submitted!</p>
                <p className="text-gray-400">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-blue)] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-blue)] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Service Type</label>
                  <select
                    required
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[var(--electric-blue)] transition-colors"
                  >
                    <option value="">Select a service</option>
                    {SERVICE_TYPES.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range</label>
                  <select
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[var(--electric-blue)] transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="< $5,000">Less than $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="> $50,000">More than $50,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg glass border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-blue)] transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white font-semibold hover:scale-105 transition-transform"
                >
                  Submit Booking
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}

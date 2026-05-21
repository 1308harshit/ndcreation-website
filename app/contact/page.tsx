'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import AnimatedCursor from '@/components/AnimatedCursor';
import { Mail, Phone, MapPin, Send, Check, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Save to localStorage
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({ ...formData, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Send to WhatsApp with clear formatting
    const whatsappMessage = `🌐 *NEW MESSAGE FROM NDCREATIONS WEBSITE*%0A━━━━━━━━━━━━━━━━━━━━━━%0A%0A👤 *Sender Details:*%0A• Name: ${formData.name}%0A• Email: ${formData.email}%0A%0A📋 *Subject:*%0A${formData.subject}%0A%0A💬 *Message:*%0A${formData.message}%0A%0A━━━━━━━━━━━━━━━━━━━━━━%0A📅 Sent: ${new Date().toLocaleString()}%0A🌐 Source: NDcreations Contact Form`;
    window.open(`https://wa.me/917069984184?text=${whatsappMessage}`, '_blank');

    // Send to Email with clear formatting
    const emailSubject = `[NDcreations Website] New Contact: ${formData.subject} - From ${formData.name}`;
    const emailBody = `NEW MESSAGE FROM NDCREATIONS WEBSITE%0A━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%0A%0ASENDER INFORMATION:%0A━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%0AName: ${formData.name}%0AEmail: ${formData.email}%0A%0AREPLY TO: ${formData.email}%0A%0ASUBJECT:%0A━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%0A${formData.subject}%0A%0AMESSAGE:%0A━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%0A${formData.message}%0A%0A━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━%0ATimestamp: ${new Date().toLocaleString()}%0ASource: NDcreations Contact Form%0AWebsite: https://ndcreation-website.vercel.app`;
    window.open(`mailto:ndcreation139@gmail.com?subject=${emailSubject}&body=${emailBody}&reply-to=${formData.email}`, '_blank');

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 3000);
  };

  return (
    <>
      <SmoothScroll />
      <AnimatedCursor />
      <Navbar />
      
      <main className="min-h-screen bg-[var(--deep-navy)] pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can help bring your vision to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass rounded-2xl p-8 border border-white/10"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Send us a message</h2>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center mx-auto mb-4">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-2xl text-white font-semibold mb-2">Message Sent!</p>
                  <p className="text-gray-400">We'll respond within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg glass border ${errors.name ? 'border-red-500 animate-shake' : 'border-white/10'} bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-blue)] transition-all`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg glass border ${errors.email ? 'border-red-500 animate-shake' : 'border-white/10'} bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-blue)] transition-all`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg glass border ${errors.subject ? 'border-red-500 animate-shake' : 'border-white/10'} bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-blue)] transition-all`}
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                        {errors.subject}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg glass border ${errors.message ? 'border-red-500 animate-shake' : 'border-white/10'} bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--electric-blue)] transition-all resize-none`}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white font-semibold hover:scale-105 transition-transform"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="glass rounded-2xl p-8 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <a href="mailto:ndcreation139@gmail.com" className="text-white hover:text-[var(--neon-cyan)] transition-colors">
                        ndcreation139@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">WhatsApp</p>
                      <a href="https://wa.me/917069984184" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--neon-cyan)] transition-colors">
                        +91 7069984184
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Location</p>
                      <p className="text-white">Gujarat, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: 'https://github.com' },
                    { icon: Linkedin, href: 'https://linkedin.com' },
                    { icon: Twitter, href: 'https://twitter.com' },
                    { icon: Instagram, href: 'https://instagram.com/ndcreationstudio' },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-lg glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--electric-blue)] hover:bg-[var(--electric-blue)]/10 transition-all"
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Response Time</h3>
                <p className="text-gray-400">We typically respond within <span className="text-[var(--neon-cyan)] font-semibold">24 hours</span> during business days.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

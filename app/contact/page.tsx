'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import AnimatedCursor from '@/components/AnimatedCursor';
import ParticleSystem from '@/components/ParticleSystem';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Send email via API
      const emailResponse = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error('Email API Error:', errorData);
        throw new Error('Failed to send email');
      }

      const emailResult = await emailResponse.json();
      console.log('✅ Email sent successfully:', emailResult);

      // Trigger AI email reply (async - don't wait for it)
      fetch('/api/ai/email-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: formData.email,
          subject: formData.subject,
          message: formData.message,
          name: formData.name,
        }),
      }).then(() => {
        console.log('🤖 AI email reply triggered');
      }).catch((err) => {
        console.error('AI email reply failed:', err);
      });

      // Prepare WhatsApp message (simplified format for WhatsApp)
      const whatsappMessage = `🌐 NEW MESSAGE - NDCREATIONS

👤 From: ${formData.name}
📧 Email: ${formData.email}
📋 Subject: ${formData.subject}

💬 Message:
${formData.message}

📅 Sent: ${new Date().toLocaleString()}`;
      
      const whatsappUrl = `https://wa.me/917069984184?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Auto-open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      console.log('📱 WhatsApp opened automatically');

      // Save to localStorage
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      contacts.push({ 
        ...formData, 
        id: Date.now(), 
        date: new Date().toISOString(),
        whatsappUrl
      });
      localStorage.setItem('contacts', JSON.stringify(contacts));

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      }, 4000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <SmoothScroll />
      <AnimatedCursor />
      <ParticleSystem particleCount={40} />
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
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B026FF] to-[#FF006E] flex items-center justify-center mx-auto mb-4 glow-purple">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-2xl text-white font-semibold mb-2">Your response has been sent!</p>
                  <p className="text-gray-400">NDcreations Team will reach you out soon.</p>
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
                      className={`w-full px-4 py-3 rounded-lg glass border ${errors.name ? 'border-red-500 animate-shake' : 'border-[#B026FF]/30'} bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF006E] focus:glow-pink transition-all`}
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
                      className={`w-full px-4 py-3 rounded-lg glass border ${errors.email ? 'border-red-500 animate-shake' : 'border-[#B026FF]/30'} bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF006E] focus:glow-pink transition-all`}
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
                      className={`w-full px-4 py-3 rounded-lg glass border ${errors.subject ? 'border-red-500 animate-shake' : 'border-[#B026FF]/30'} bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF006E] focus:glow-pink transition-all`}
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
                      className={`w-full px-4 py-3 rounded-lg glass border ${errors.message ? 'border-red-500 animate-shake' : 'border-[#B026FF]/30'} bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF006E] focus:glow-pink transition-all resize-none`}
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
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-gradient-to-r from-[#B026FF] to-[#FF006E] text-white font-semibold hover:scale-105 transition-transform animate-pulse-glow"
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
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#B026FF] to-[#FF006E] flex items-center justify-center flex-shrink-0 glow-purple">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <a href="mailto:ndcreation139@gmail.com" className="text-white hover:text-[#FF006E] transition-colors">
                        ndcreation139@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#B026FF] to-[#FF006E] flex items-center justify-center flex-shrink-0 glow-purple">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">WhatsApp</p>
                      <a href="https://wa.me/917069984184" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FF006E] transition-colors">
                        +91 7069984184
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#B026FF] to-[#FF006E] flex items-center justify-center flex-shrink-0 glow-purple">
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
                      className="w-12 h-12 rounded-lg glass border border-[#B026FF]/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#FF006E] hover:bg-[#B026FF]/10 transition-all glow-purple"
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Response Time</h3>
                <p className="text-gray-400">We typically respond within <span className="text-[#FF006E] font-semibold">24 hours</span> during business days.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

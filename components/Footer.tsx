'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/lib/constants';
import Logo from './Logo';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/ndcreationstudio', label: 'Instagram' },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[var(--charcoal-black)] border-t border-white/10 overflow-hidden">
      {/* Subtle Grid Background - Purple */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#B026FF 1px, transparent 1px), linear-gradient(90deg, #B026FF 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block mb-4">
              <Logo showText={true} animated={false} />
            </Link>
            <p className="text-gray-400 mb-4">{BRAND.tagline}</p>
            <p className="text-sm text-gray-500">{BRAND.description}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[var(--neon-cyan)] transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[var(--neon-cyan)] group-hover:w-4 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* More Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[var(--neon-cyan)] transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[var(--neon-cyan)] group-hover:w-4 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-bold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#FF006E] mt-0.5 flex-shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#FF006E] mt-0.5 flex-shrink-0" />
                <a href={`https://wa.me/${BRAND.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#FF006E] mt-0.5 flex-shrink-0" />
                <span>Gujarat, India</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg glass border border-[#B026FF]/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#FF006E] hover:bg-[#B026FF]/10 transition-all glow-purple"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </motion.div>
      </div>

      {/* Floating Gradient Orb - Purple/Pink */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-[#B026FF] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF006E] rounded-full blur-3xl"
      />
    </footer>
  );
}

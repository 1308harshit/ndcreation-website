'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import AnimatedCursor from '@/components/AnimatedCursor';
import ParticleSystem from '@/components/ParticleSystem';
import { Sparkles, Target, Zap, Users, Award, Rocket } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <SmoothScroll />
      <AnimatedCursor />
      <ParticleSystem particleCount={40} />
      <Navbar />
      
      <main className="min-h-screen bg-[var(--deep-navy)] pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full glass border border-[#B026FF]/30 text-sm text-[#FF006E] mb-4 animate-pulse-glow"
            >
              About Us
            </motion.span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Engineering the Future
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              NDcreations is a world-class futuristic tech company that builds cutting-edge applications, 
              AI tools, websites, and games. We transform ideas into reality through innovation and premium engineering.
            </p>
          </motion.div>

          {/* Company Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="glass rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B026FF] to-[#FF006E] flex items-center justify-center glow-purple">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Our Story</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                At NDcreations, we believe that technology should not just solve problems—it should inspire, 
                innovate, and transform the way we live and work. Founded with a vision to push the boundaries 
                of what's possible, we specialize in creating premium digital experiences that combine 
                cutting-edge technology with exceptional design.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                From AI-powered tools that revolutionize workflows to immersive applications and stunning 
                websites, every project we undertake is crafted with precision, passion, and a commitment 
                to excellence. We don't just build products—we engineer the future.
              </p>
            </div>
          </motion.div>

          {/* Founder Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="glass rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Founder Avatar */}
                <div className="relative">
                  <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-[#B026FF] to-[#FF006E] flex items-center justify-center glow-purple">
                    <div className="w-44 h-44 rounded-xl bg-[var(--deep-navy)] flex items-center justify-center">
                      <span className="text-6xl font-bold bg-gradient-to-r from-[#B026FF] to-[#FF006E] bg-clip-text text-transparent">
                        DS
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-xl bg-gradient-to-br from-[#B026FF] to-[#FF006E] flex items-center justify-center glow-purple">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Founder Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Daksh Sutariya</h3>
                  <p className="text-xl text-[#FF006E] mb-4">Founder & CEO</p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    Daksh Sutariya is the visionary founder behind NDcreations. With a passion for technology 
                    and innovation, Daksh leads the company with a mission to create world-class digital solutions 
                    that push the boundaries of what's possible.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Under his leadership, NDcreations has become synonymous with premium engineering, 
                    cutting-edge AI development, and exceptional user experiences. Daksh's commitment to 
                    excellence and forward-thinking approach continues to drive the company's success in 
                    delivering transformative technology solutions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Rocket,
                  title: 'Innovation First',
                  description: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.',
                },
                {
                  icon: Target,
                  title: 'Excellence',
                  description: 'Every project is crafted with precision, attention to detail, and a commitment to quality.',
                },
                {
                  icon: Zap,
                  title: 'Speed & Efficiency',
                  description: 'We deliver fast without compromising quality, ensuring rapid time-to-market for our clients.',
                },
                {
                  icon: Users,
                  title: 'Client-Centric',
                  description: 'Your success is our success. We work closely with clients to understand and exceed their expectations.',
                },
                {
                  icon: Sparkles,
                  title: 'AI-Powered',
                  description: 'We leverage artificial intelligence to create smarter, more efficient, and more powerful solutions.',
                },
                {
                  icon: Award,
                  title: 'Premium Quality',
                  description: 'We don\'t just build products—we engineer premium experiences that stand out in the market.',
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group glass rounded-2xl p-6 border border-white/10 hover:border-[var(--electric-blue)] transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--neon-cyan)] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What We Do */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="glass rounded-3xl p-8 md:p-12 border border-white/10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[var(--neon-cyan)]">Products</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--electric-blue)] mt-1">•</span>
                      <span>AI-powered applications and tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--electric-blue)] mt-1">•</span>
                      <span>Mobile applications for iOS and Android</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--electric-blue)] mt-1">•</span>
                      <span>Premium websites and web applications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--electric-blue)] mt-1">•</span>
                      <span>Immersive games and interactive experiences</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[var(--neon-cyan)]">Services</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--electric-blue)] mt-1">•</span>
                      <span>AI Development & Machine Learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--electric-blue)] mt-1">•</span>
                      <span>Custom App Development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--electric-blue)] mt-1">•</span>
                      <span>Website & SaaS Development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--electric-blue)] mt-1">•</span>
                      <span>UI/UX Design & Game Development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--electric-blue)] mt-1">•</span>
                      <span>Automation Systems & AI Agents</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="glass rounded-3xl p-12 border border-white/10 bg-gradient-to-br from-[var(--electric-blue)]/10 to-[var(--neon-cyan)]/10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Build the Future Together?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's transform your ideas into reality with cutting-edge technology and premium engineering.
              </p>
              <a
                href={`https://wa.me/917069984184?text=${encodeURIComponent('Hi NDcreations! I would like to discuss a project.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)] text-white font-semibold hover:scale-105 transition-transform"
              >
                Get in Touch
                <Rocket className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}

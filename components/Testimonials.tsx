'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechVision Inc',
    image: '/testimonials/avatar1.jpg',
    quote: 'NDcreations transformed our vision into reality. Their AI solutions increased our efficiency by 300%. Absolutely phenomenal work!',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    company: 'DataFlow Systems',
    image: '/testimonials/avatar2.jpg',
    quote: 'The level of technical expertise and attention to detail is unmatched. They delivered a scalable SaaS platform that exceeded all expectations.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'InnovateLabs',
    image: '/testimonials/avatar3.jpg',
    quote: 'Working with NDcreations was a game-changer. Their UI/UX design elevated our product and user engagement skyrocketed.',
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Founder',
    company: 'StartupHub',
    image: '/testimonials/avatar4.jpg',
    quote: 'From concept to launch, NDcreations was with us every step. Their app development skills are world-class.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--charcoal-black)]" />
      
      {/* Mesh Gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />

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
            Testimonials
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Trusted by industry leaders and innovative startups worldwide.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 relative">
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 opacity-20">
                    <Quote className="w-16 h-16 text-[var(--neon-cyan)]" />
                  </div>

                  <div className="relative z-10">
                    {/* Quote */}
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                      "{testimonials[currentIndex].quote}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-cyan)] flex items-center justify-center text-white font-bold text-xl">
                        {testimonials[currentIndex].name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-[var(--electric-blue)] hover:border-[var(--electric-blue)] transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-[var(--electric-blue)] hover:border-[var(--electric-blue)] transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-cyan)]'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

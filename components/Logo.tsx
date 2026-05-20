'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
  animated?: boolean;
}

export default function Logo({ className = '', showText = true, animated = true }: LogoProps) {
  const LogoContent = (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* ND Logo */}
      <svg
        width="60"
        height="60"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
      >
        {/* Glow effect */}
        <defs>
          <linearGradient id="ndGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d9ff" />
            <stop offset="50%" stopColor="#0066ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <radialGradient id="cosmicGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Cosmic glow background */}
        <circle cx="100" cy="100" r="80" fill="url(#cosmicGlow)" />

        {/* N Letter */}
        <path
          d="M 40 60 L 40 140 L 50 140 L 50 80 L 90 140 L 100 140 L 100 60 L 90 60 L 90 120 L 50 60 Z"
          fill="url(#ndGradient)"
          filter="url(#glow)"
        />

        {/* D Letter */}
        <path
          d="M 120 60 L 120 140 L 150 140 Q 180 140 180 100 Q 180 60 150 60 Z M 130 70 L 150 70 Q 170 70 170 100 Q 170 130 150 130 L 130 130 Z"
          fill="url(#ndGradient)"
          filter="url(#glow)"
        />

        {/* Sparkle effect */}
        <circle cx="170" cy="70" r="3" fill="#a855f7" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="180" cy="85" r="2" fill="#00d9ff" opacity="0.6">
          <animate
            attributeName="opacity"
            values="0.2;0.8;0.2"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-bold bg-gradient-to-r from-[var(--electric-blue)] via-[var(--neon-cyan)] to-purple-500 bg-clip-text text-transparent leading-none">
            NDCREATION
          </span>
          <span className="text-xs text-gray-400 tracking-widest uppercase">Studio</span>
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        {LogoContent}
      </motion.div>
    );
  }

  return LogoContent;
}

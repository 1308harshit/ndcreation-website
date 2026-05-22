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
      {/* Dominant ND Logo with Hexagonal Design */}
      <div className="relative w-[60px] h-[60px] group">
        {/* Outer pulsing glow */}
        <div className="absolute inset-0 animate-pulse-glow rounded-lg" style={{
          background: 'linear-gradient(135deg, #B026FF, #FF006E)',
          filter: 'blur(12px)',
          opacity: 0.7
        }} />
        
        {/* Rotating ring effect */}
        <div className="absolute inset-0 rounded-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300">
          <div className="absolute inset-0 rounded-lg" style={{
            background: 'conic-gradient(from 0deg, transparent, #B026FF, transparent, #FF006E, transparent)',
            animation: 'spin 4s linear infinite',
            filter: 'blur(6px)'
          }} />
        </div>
        
        <svg
          width="60"
          height="60"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-2xl"
        >
          <defs>
            {/* Hexagon background gradient */}
            <linearGradient id="hexBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A1A2E" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#0A0A0F" stopOpacity="0.98" />
            </linearGradient>
            
            {/* Hexagon stroke gradient - Purple to Pink */}
            <linearGradient id="hexStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B026FF" />
              <stop offset="50%" stopColor="#FF006E" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
            
            {/* Letter gradient - Dominant Purple/Pink */}
            <linearGradient id="letterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B026FF" />
              <stop offset="50%" stopColor="#FF006E" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            
            {/* Holographic shine */}
            <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="neonGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Hexagonal background */}
          <path
            d="M100 20 L170 60 L170 140 L100 180 L30 140 L30 60 Z"
            fill="url(#hexBg)"
            stroke="url(#hexStroke)"
            strokeWidth="3"
          />
          
          {/* Circuit pattern background */}
          <g opacity="0.4">
            <line x1="60" y1="60" x2="140" y2="60" stroke="#00F0FF" strokeWidth="1" />
            <line x1="60" y1="100" x2="140" y2="100" stroke="#00F0FF" strokeWidth="1" />
            <line x1="60" y1="140" x2="140" y2="140" stroke="#00F0FF" strokeWidth="1" />
            <circle cx="60" cy="60" r="2" fill="#00F0FF" />
            <circle cx="140" cy="60" r="2" fill="#00F0FF" />
            <circle cx="60" cy="140" r="2" fill="#00F0FF" />
            <circle cx="140" cy="140" r="2" fill="#00F0FF" />
          </g>
          
          {/* "N" Letter - Bold and Dominant */}
          <path
            d="M 50 70 L 50 130 L 60 130 L 60 90 L 80 130 L 90 130 L 90 70 L 80 70 L 80 110 L 60 70 Z"
            fill="url(#letterGradient)"
            filter="url(#neonGlow)"
            className="drop-shadow-lg"
          />
          
          {/* "D" Letter - Bold and Dominant */}
          <path
            d="M 110 70 L 110 130 L 130 130 Q 160 130 160 100 Q 160 70 130 70 Z M 120 80 L 130 80 Q 150 80 150 100 Q 150 120 130 120 L 120 120 Z"
            fill="url(#letterGradient)"
            filter="url(#neonGlow)"
            className="drop-shadow-lg"
          />
          
          {/* Animated sparkles - Gaming style */}
          <g className="animate-pulse">
            <circle cx="40" cy="40" r="2" fill="#FF006E" opacity="0.9">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="160" cy="40" r="2" fill="#B026FF" opacity="0.9">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="40" cy="160" r="2" fill="#00F0FF" opacity="0.9">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="160" cy="160" r="2" fill="#FF006E" opacity="0.9">
              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </g>
          
          {/* Holographic shine effect */}
          <path
            d="M100 20 L170 60 L170 140 L100 180 L30 140 L30 60 Z"
            fill="url(#shine)"
            opacity="0.2"
            className="pointer-events-none"
          >
            <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Text - Gaming Style */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#B026FF] via-[#FF006E] to-[#EC4899] bg-clip-text text-transparent leading-none tracking-wider text-neon-purple">
            NDCREATIONS
          </span>
          <span className="text-xs text-gray-400 tracking-[0.3em] uppercase font-semibold">
            STUDIO
          </span>
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        className="cursor-pointer"
      >
        {LogoContent}
      </motion.div>
    );
  }

  return LogoContent;
}

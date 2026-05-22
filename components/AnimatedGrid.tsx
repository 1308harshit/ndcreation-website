'use client';

import { useEffect, useRef } from 'react';

interface AnimatedGridProps {
  className?: string;
}

export default function AnimatedGrid({ className = '' }: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid settings
    const gridSize = 50;
    const perspective = 500;
    let offset = 0;

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update offset for animation
      offset += 0.5;
      if (offset > gridSize) offset = 0;

      // Draw perspective grid
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.7;
      const vanishingY = canvas.height * 0.3;

      // Vertical lines
      for (let i = -10; i <= 10; i++) {
        const x = centerX + i * gridSize;
        const gradient = ctx.createLinearGradient(x, centerY, centerX, vanishingY);
        
        // Purple to pink gradient
        gradient.addColorStop(0, 'rgba(176, 38, 255, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 110, 0.2)');
        gradient.addColorStop(1, 'rgba(176, 38, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, centerY);
        ctx.lineTo(centerX, vanishingY);
        ctx.stroke();
      }

      // Horizontal lines
      for (let i = 0; i <= 10; i++) {
        const y = centerY - i * gridSize + offset;
        const scale = 1 - (i * gridSize - offset) / perspective;
        
        if (scale <= 0) continue;

        const lineWidth = canvas.width * scale;
        const x1 = centerX - lineWidth / 2;
        const x2 = centerX + lineWidth / 2;

        // Fade out as lines go into distance
        const alpha = Math.max(0, Math.min(0.3, scale * 0.5));
        
        const gradient = ctx.createLinearGradient(x1, y, x2, y);
        gradient.addColorStop(0, `rgba(176, 38, 255, 0)`);
        gradient.addColorStop(0.5, `rgba(255, 0, 110, ${alpha})`);
        gradient.addColorStop(1, `rgba(176, 38, 255, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}

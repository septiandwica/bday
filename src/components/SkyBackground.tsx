import React from 'react';
import { motion } from 'framer-motion';

// Cute small cloud SVG component
const SmallCloud: React.FC<{ className?: string; scale?: number }> = ({ className = '', scale = 1 }) => (
  <svg
    viewBox="0 0 120 60"
    className={`fill-white drop-shadow-sm ${className}`}
    style={{ transform: `scale(${scale})` }}
  >
    <path d="M25,45 Q10,45 10,35 Q10,25 22,23 Q25,12 38,12 Q48,12 53,19 Q60,10 75,10 Q90,10 96,22 Q108,23 110,35 Q110,45 95,45 Z" />
  </svg>
);

export const SkyBackground: React.FC = () => {
  const clouds = [
    { id: 1, top: '8%', size: 0.9, duration: 42, delay: 0, opacity: 0.85 },
    { id: 2, top: '18%', size: 0.65, duration: 34, delay: 12, opacity: 0.75 },
    { id: 3, top: '32%', size: 1.1, duration: 48, delay: 4, opacity: 0.9 },
    { id: 4, top: '48%', size: 0.75, duration: 38, delay: 18, opacity: 0.8 },
    { id: 5, top: '65%', size: 0.95, duration: 44, delay: 8, opacity: 0.85 },
    { id: 6, top: '82%', size: 0.7, duration: 36, delay: 22, opacity: 0.7 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#bae6fd] via-[#e0f2fe] to-[#f0f9ff]">
      {/* Soft daylight glow in upper corner */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/60 blur-3xl pointer-events-none" />

      {/* Floating cute small clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute -left-36 w-32 h-16 pointer-events-none"
          style={{ top: cloud.top, opacity: cloud.opacity }}
          animate={{ x: ['0vw', '115vw'] }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            delay: cloud.delay,
            ease: 'linear',
          }}
        >
          <SmallCloud scale={cloud.size} />
        </motion.div>
      ))}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

export const CosmicBackground: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generatedStars: Star[] = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#030712]">
      {/* Deep blue cosmic aura lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-600/15 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[140px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-indigo-600/15 blur-[130px] animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 3}px rgba(125, 211, 252, 0.9)`,
          }}
          animate={{
            opacity: [0.2, 0.95, 0.2],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Occasional Shooting Star */}
      <div className="absolute top-16 right-20 w-32 h-[1.5px] bg-gradient-to-r from-transparent via-sky-300 to-white animate-shooting-star opacity-80" />
      <div className="absolute top-72 right-1/3 w-40 h-[1.5px] bg-gradient-to-r from-transparent via-blue-300 to-white animate-shooting-star opacity-70" style={{ animationDelay: '3.8s' }} />

      {/* Subtle Grid / Starlight Shimmer Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />
    </div>
  );
};


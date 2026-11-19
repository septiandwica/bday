import React from 'react';
import { motion } from 'framer-motion';

interface ShinkaiSkyProps {
  timeOfDay?: 'day' | 'golden' | 'twilight';
}

export const ShinkaiSky: React.FC<ShinkaiSkyProps> = ({ timeOfDay = 'day' }) => {
  // Clear daytime sky palette inspired by Makoto Shinkai (Shinkai Blue)
  const skyBg = timeOfDay === 'golden'
    ? 'bg-[#dbeafe]'
    : timeOfDay === 'twilight'
    ? 'bg-[#e0f2fe]'
    : 'bg-[#e0f2fe]';

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${skyBg} transition-colors duration-1000`}>
      {/* Sun glow in the upper corner */}
      <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-white/70 blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-28 w-24 h-24 rounded-full bg-amber-100/40 blur-xl pointer-events-none" />

      {/* Far Clouds Layer (Slowest) */}
      <motion.div
        className="absolute top-8 -left-32 w-[140%] h-48 opacity-60"
        animate={{ x: [0, 60, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 1200 300" className="w-full h-full fill-white" preserveAspectRatio="none">
          <path d="M0,180 Q150,120 300,160 T600,140 T900,170 T1200,150 L1200,300 L0,300 Z" />
        </svg>
      </motion.div>

      {/* Mid Layer Cumulus Clouds (Classic Makoto Shinkai billowy clouds) */}
      <motion.div
        className="absolute top-20 -left-20 w-[130%] h-64 opacity-80"
        animate={{ x: [0, -45, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 1200 350" className="w-full h-full fill-white drop-shadow-sm" preserveAspectRatio="none">
          <path d="M50,260 C80,200 160,200 200,240 C240,160 360,150 420,220 C460,180 540,190 580,250 C620,170 740,160 800,230 C860,170 980,180 1020,250 C1070,210 1150,220 1180,270 L1200,350 L0,350 Z" />
        </svg>
      </motion.div>

      {/* Distance Birds Gliding Across the Sky */}
      <motion.div
        className="absolute top-24 left-1/4"
        animate={{
          x: [0, 450],
          y: [0, -25, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        <div className="flex gap-4 opacity-40">
          <svg className="w-4 h-3 fill-slate-500" viewBox="0 0 24 16">
            <path d="M0,8 Q6,0 12,8 Q18,0 24,8 Q18,3 12,11 Q6,3 0,8 Z" />
          </svg>
          <svg className="w-3 h-2 fill-slate-500 -mt-2" viewBox="0 0 24 16">
            <path d="M0,8 Q6,0 12,8 Q18,0 24,8 Q18,3 12,11 Q6,3 0,8 Z" />
          </svg>
        </div>
      </motion.div>

      {/* Drifting Flower Petals / Wind Breezes (Kimi no Na wa wind feeling) */}
      {[
        { x: '10%', delay: 0, dur: 9 },
        { x: '35%', delay: 3, dur: 11 },
        { x: '60%', delay: 1.5, dur: 8 },
        { x: '80%', delay: 4, dur: 10 },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute -top-10 w-2.5 h-3.5 rounded-full bg-sky-200/90 shadow-xs"
          style={{ left: item.x }}
          animate={{
            y: ['0vh', '110vh'],
            x: ['0px', '120px', '-40px', '80px'],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: item.dur,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Horizon Hill Silhouette in Bottom */}
      <div className="absolute bottom-0 inset-x-0 h-36 pointer-events-none opacity-20">
        <svg viewBox="0 0 1200 200" className="w-full h-full fill-[#38bdf8]" preserveAspectRatio="none">
          <path d="M0,120 Q300,60 600,100 T1200,80 L1200,200 L0,200 Z" />
        </svg>
      </div>
    </div>
  );
};


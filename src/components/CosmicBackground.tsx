import React from 'react';
import { motion } from 'framer-motion';

export const CosmicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#f0f8ff]">
      {/* Decorative Solid Sky Accent Circles (Clean, No Gradients) */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#e0f2fe] opacity-80" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#bae6fd] opacity-60" />
      <div className="absolute -bottom-28 left-1/4 w-88 h-88 rounded-full bg-[#e0f2fe] opacity-70" />

      {/* Floating Fluffy Clouds (White Solid, Cute Flat Shapes) */}
      <div className="absolute top-12 left-10 animate-cloud opacity-90">
        <svg className="w-36 h-20 text-white fill-current drop-shadow-sm" viewBox="0 0 100 60">
          <path d="M20,40 a15,15 0 0,1 25,-10 a20,20 0 0,1 35,5 a15,15 0 0,1 15,15 a10,10 0 0,1 -10,10 l-60,0 a10,10 0 0,1 -5,-20 z" />
        </svg>
      </div>

      <div className="absolute top-44 right-20 animate-cloud opacity-80" style={{ animationDelay: '7s' }}>
        <svg className="w-48 h-24 text-white fill-current drop-shadow-sm" viewBox="0 0 100 60">
          <path d="M20,40 a15,15 0 0,1 25,-10 a20,20 0 0,1 35,5 a15,15 0 0,1 15,15 a10,10 0 0,1 -10,10 l-60,0 a10,10 0 0,1 -5,-20 z" />
        </svg>
      </div>

      <div className="absolute bottom-40 left-16 animate-cloud opacity-85" style={{ animationDelay: '14s' }}>
        <svg className="w-40 h-22 text-white fill-current drop-shadow-sm" viewBox="0 0 100 60">
          <path d="M20,40 a15,15 0 0,1 25,-10 a20,20 0 0,1 35,5 a15,15 0 0,1 15,15 a10,10 0 0,1 -10,10 l-60,0 a10,10 0 0,1 -5,-20 z" />
        </svg>
      </div>

      {/* Cute Floating Balloons in Shades of Bright Blue & White */}
      <div className="absolute top-28 right-12 animate-balloon hidden sm:block">
        <div className="flex flex-col items-center">
          <div className="w-10 h-14 rounded-full bg-[#38bdf8] shadow-sm relative">
            <div className="absolute top-2 left-2 w-2.5 h-4 rounded-full bg-white/50" />
          </div>
          <div className="w-1.5 h-1.5 bg-[#0284c7] -mt-0.5 rounded-xs" />
          <div className="w-0.5 h-16 bg-slate-400" />
        </div>
      </div>

      <div className="absolute top-72 left-8 animate-balloon hidden sm:block" style={{ animationDelay: '2.5s' }}>
        <div className="flex flex-col items-center">
          <div className="w-12 h-16 rounded-full bg-[#7dd3fc] shadow-sm relative">
            <div className="absolute top-2 left-2 w-3 h-5 rounded-full bg-white/60" />
          </div>
          <div className="w-1.5 h-1.5 bg-[#0284c7] -mt-0.5 rounded-xs" />
          <div className="w-0.5 h-20 bg-slate-400" />
        </div>
      </div>

      <div className="absolute bottom-60 right-28 animate-balloon hidden md:block" style={{ animationDelay: '4s' }}>
        <div className="flex flex-col items-center">
          <div className="w-9 h-12 rounded-full bg-[#0284c7] shadow-sm relative">
            <div className="absolute top-2 left-2 w-2 h-3.5 rounded-full bg-white/40" />
          </div>
          <div className="w-1.5 h-1.5 bg-[#0369a1] -mt-0.5 rounded-xs" />
          <div className="w-0.5 h-14 bg-slate-400" />
        </div>
      </div>

      {/* Floating Sparkle Stars (Yellow & Cyan Solid) */}
      {[
        { top: 15, left: 25, delay: 0 },
        { top: 22, left: 75, delay: 1.2 },
        { top: 50, left: 10, delay: 2.1 },
        { top: 65, left: 88, delay: 0.8 },
        { top: 85, left: 30, delay: 1.6 },
        { top: 80, left: 65, delay: 2.8 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
          animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 90, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, delay: pos.delay, ease: 'easeInOut' }}
        >
          <span className="text-xl">✨</span>
        </motion.div>
      ))}
    </div>
  );
};

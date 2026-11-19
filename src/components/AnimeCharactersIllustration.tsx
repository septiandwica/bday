import React from 'react';
import { motion } from 'framer-motion';

interface IllustrationProps {
  chapter: number;
}

export const AnimeCharactersIllustration: React.FC<IllustrationProps> = ({ chapter }) => {
  return (
    <div className="relative w-full max-w-md h-64 sm:h-72 flex items-center justify-center select-none">
      {/* Soft ground hill base */}
      <div className="absolute bottom-4 inset-x-8 h-4 rounded-full bg-sky-200/80 blur-xs" />

      {/* Chapter 0: Girl gazing up at the endless blue sky */}
      {chapter === 0 && (
        <motion.div
          key="ch0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-64 h-64 flex items-end justify-center pb-4"
        >
          {/* Animated wind grass on hill */}
          <svg viewBox="0 0 200 200" className="w-60 h-60">
            {/* Hill curve */}
            <path d="M10,185 Q100,165 190,185" fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            
            {/* Girl looking at the sky (Makoto Shinkai style silhouette in deep navy/slate) */}
            <g transform="translate(85, 80)">
              {/* Head & Hair flowing in wind */}
              <circle cx="15" cy="12" r="10" fill="#0f172a" />
              {/* Ponytail / Wind-blown hair */}
              <motion.path
                d="M8,14 Q-4,18 -8,28 Q-2,20 10,18 Z"
                fill="#0f172a"
                animate={{ rotate: [-2, 4, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Torso & Ribbon */}
              <path d="M10,22 L20,22 L23,55 L7,55 Z" fill="#0f172a" />
              <path d="M15,24 L15,36" stroke="#38bdf8" strokeWidth="2" />
              {/* Skirt flowing */}
              <motion.path
                d="M7,55 L23,55 L27,78 L3,78 Z"
                fill="#0f172a"
                animate={{ skewX: [-2, 3, -2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Legs */}
              <path d="M10,78 L10,105" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M20,78 L20,105" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              {/* Shoes */}
              <circle cx="10" cy="106" r="2.5" fill="#0f172a" />
              <circle cx="21" cy="106" r="2.5" fill="#0f172a" />
            </g>

            {/* Dandelion seed drifting */}
            <circle cx="50" cy="70" r="2" fill="#38bdf8" />
            <circle cx="65" cy="55" r="1.5" fill="#38bdf8" />
            <circle cx="140" cy="60" r="2" fill="#38bdf8" />
          </svg>
        </motion.div>
      )}

      {/* Chapter 1: 2023 - First Meeting (Two silhouettes facing each other) */}
      {chapter === 1 && (
        <motion.div
          key="ch1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-72 h-64 flex items-end justify-center pb-4"
        >
          <svg viewBox="0 0 240 200" className="w-72 h-60">
            {/* Ground */}
            <path d="M10,185 Q120,175 230,185" fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />

            {/* Boy (Left - Quiet, reserved posture) */}
            <g transform="translate(60, 75)">
              <circle cx="15" cy="12" r="10" fill="#0f172a" />
              {/* Torso with hands in pocket */}
              <path d="M8,22 L22,22 L24,65 L6,65 Z" fill="#0f172a" />
              {/* Legs */}
              <path d="M11,65 L11,108" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              <path d="M19,65 L19,108" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              <rect x="7" y="106" width="6" height="4" rx="2" fill="#0f172a" />
              <rect x="17" y="106" width="6" height="4" rx="2" fill="#0f172a" />
            </g>

            {/* Gentle connecting line / spark of first glance */}
            <path d="M90,105 Q120,95 140,105" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Girl (Right - Energetic, turning around, hair in motion) */}
            <g transform="translate(145, 80)">
              <circle cx="15" cy="12" r="9.5" fill="#0f172a" />
              {/* Long Hair with ribbon */}
              <motion.path
                d="M10,14 Q26,20 32,32 Q22,22 14,18 Z"
                fill="#0f172a"
                animate={{ rotate: [1, -4, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <path d="M9,22 L21,22 L23,55 L7,55 Z" fill="#0f172a" />
              <path d="M7,55 L23,55 L26,76 L4,76 Z" fill="#0f172a" />
              <path d="M10,76 L10,103" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M20,76 L20,103" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </motion.div>
      )}

      {/* Chapter 2: Nov 2024 - Confession on her Birthday */}
      {chapter === 2 && (
        <motion.div
          key="ch2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-72 h-64 flex items-end justify-center pb-4"
        >
          <svg viewBox="0 0 240 200" className="w-72 h-60">
            <path d="M15,185 Q120,170 225,185" fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />

            {/* Boy holding a small gift/letter box toward her */}
            <g transform="translate(75, 75)">
              <circle cx="15" cy="12" r="10" fill="#0f172a" />
              <path d="M8,22 L22,22 L24,65 L6,65 Z" fill="#0f172a" />
              {/* Extended arms holding small birthday gift */}
              <path d="M18,34 L32,38 L32,46" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <rect x="30" y="36" width="10" height="10" rx="2" fill="#0284c7" />
              <path d="M30,41 L40,41" stroke="#ffffff" strokeWidth="1.5" />
              <path d="M11,65 L11,108" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              <path d="M19,65 L19,108" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Girl listening intently */}
            <g transform="translate(145, 80)">
              <circle cx="15" cy="12" r="9.5" fill="#0f172a" />
              <path d="M9,22 L21,22 L23,55 L7,55 Z" fill="#0f172a" />
              <path d="M7,55 L23,55 L26,76 L4,76 Z" fill="#0f172a" />
              <path d="M10,76 L10,103" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M20,76 L20,103" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </motion.div>
      )}

      {/* Chapter 3: 2025 - Partner Usaha & Skripsi Bareng */}
      {chapter === 3 && (
        <motion.div
          key="ch3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-80 h-64 flex items-end justify-center pb-4"
        >
          <svg viewBox="0 0 260 200" className="w-80 h-60">
            {/* Floor */}
            <path d="M20,185 L240,185" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />

            {/* Study / Work Desk */}
            <rect x="75" y="115" width="110" height="8" rx="2" fill="#0f172a" />
            <path d="M85,123 L85,185" stroke="#0f172a" strokeWidth="4" />
            <path d="M175,123 L175,185" stroke="#0f172a" strokeWidth="4" />

            {/* Laptop screen glowing in sky blue */}
            <rect x="115" y="90" width="30" height="22" rx="2" fill="#38bdf8" />
            <polygon points="110,113 150,113 145,115 115,115" fill="#0f172a" />

            {/* Boy seated on left */}
            <g transform="translate(48, 85)">
              <circle cx="15" cy="12" r="10" fill="#0f172a" />
              <path d="M8,22 L22,22 L24,55 L6,55 Z" fill="#0f172a" />
              {/* Arm reaching for desk */}
              <path d="M18,34 L36,36" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              {/* Seated legs */}
              <path d="M8,55 L26,55 L26,98" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinejoin="round" />
            </g>

            {/* Girl seated on right working together */}
            <g transform="translate(182, 85)">
              <circle cx="15" cy="12" r="9.5" fill="#0f172a" />
              <path d="M8,22 L22,22 L24,55 L6,55 Z" fill="#0f172a" />
              {/* Arm reaching for desk */}
              <path d="M8,34 L-10,36" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M18,55 L4,55 L4,98" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinejoin="round" />
            </g>
          </svg>
        </motion.div>
      )}

      {/* Chapter 4: August 2025 - After Capstone Defense (The Kimi no Na wa Hilltop Jadian Moment) */}
      {chapter === 4 && (
        <motion.div
          key="ch4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-80 h-64 flex items-end justify-center pb-4"
        >
          <svg viewBox="0 0 260 200" className="w-80 h-60">
            {/* The iconic Shinkai Hilltop Ridge */}
            <path d="M20,185 Q130,150 240,185" fill="none" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />

            {/* Two silhouettes holding hands on the crest */}
            <g transform="translate(100, 68)">
              {/* Boy */}
              <g transform="translate(0, 0)">
                <circle cx="14" cy="12" r="10" fill="#0f172a" />
                <path d="M6,22 L22,22 L24,65 L6,65 Z" fill="#0f172a" />
                <path d="M10,65 L10,110" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
                <path d="M18,65 L18,110" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              </g>

              {/* Joined Hands */}
              <path d="M20,40 Q28,48 36,40" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Small glowing blue connection ring */}
              <circle cx="28" cy="44" r="3" fill="#38bdf8" />

              {/* Girl */}
              <g transform="translate(30, 4)">
                <circle cx="15" cy="12" r="9.5" fill="#0f172a" />
                {/* Hair flowing freely */}
                <motion.path
                  d="M10,14 Q28,18 36,32 Q24,20 14,18 Z"
                  fill="#0f172a"
                  animate={{ rotate: [-2, 3, -2] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <path d="M8,22 L22,22 L24,55 L6,55 Z" fill="#0f172a" />
                <motion.path
                  d="M6,55 L24,55 L28,78 L2,78 Z"
                  fill="#0f172a"
                  animate={{ skewX: [-2, 3, -2] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <path d="M10,78 L10,106" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                <path d="M20,78 L20,106" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </motion.div>
      )}

      {/* Chapter 5: Birthday Today (Both around the Cake) */}
      {chapter === 5 && (
        <motion.div
          key="ch5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-72 h-44 flex items-end justify-center"
        >
          {/* Couple standing together side by side */}
          <div className="flex items-end gap-6 pb-2">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#0f172a]" />
              <div className="w-7 h-16 bg-[#0f172a] rounded-t-md -mt-1" />
              <div className="flex gap-1.5 -mt-0.5">
                <div className="w-2.5 h-14 bg-[#0f172a]" />
                <div className="w-2.5 h-14 bg-[#0f172a]" />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-5.5 h-5.5 rounded-full bg-[#0f172a]" />
              <div className="w-6 h-12 bg-[#0f172a] rounded-t-md -mt-1" />
              <div className="w-8 h-8 bg-[#0f172a] rounded-b-xl -mt-1" />
              <div className="flex gap-1.5 -mt-0.5">
                <div className="w-2 h-12 bg-[#0f172a]" />
                <div className="w-2 h-12 bg-[#0f172a]" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};


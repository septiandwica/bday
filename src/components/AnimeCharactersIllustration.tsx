import React from 'react';
import { motion } from 'framer-motion';

interface IllustrationProps {
  chapter: number;
}

export const AnimeCharactersIllustration: React.FC<IllustrationProps> = ({ chapter }) => {
  return (
    <div className="relative w-full max-w-md h-60 sm:h-64 flex items-center justify-center select-none">
      {/* Ground hill base */}
      <div className="absolute bottom-4 inset-x-8 h-3 rounded-full bg-sky-200/60 blur-xs" />

      {/* Chapter 0: 8 September 2026 - Najla gives him the book "I Have a Crush on You" */}
      {chapter === 0 && (
        <motion.div
          key="ch0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-72 h-60 flex items-end justify-center pb-4"
        >
          <svg viewBox="0 0 240 180" className="w-72 h-56">
            <path d="M15,165 Q120,155 225,165" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

            {/* Boy on Left receiving the book */}
            <g transform="translate(65, 55)">
              <circle cx="15" cy="12" r="10" fill="#0f172a" />
              <path d="M8,22 L22,22 L24,65 L6,65 Z" fill="#0f172a" />
              {/* Hands holding the book */}
              <path d="M18,36 L30,42" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M11,65 L11,105" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              <path d="M19,65 L19,105" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Book: "I Have a Crush on You" */}
            <g transform="translate(100, 90)">
              <rect x="0" y="0" width="22" height="28" rx="3" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
              <path d="M4,14 L18,14" stroke="#ffffff" strokeWidth="1.5" />
              <path d="M11,6 L11,10" stroke="#bae6fd" strokeWidth="1.5" />
            </g>

            {/* Floating Heart above book */}
            <motion.path
              d="M111,80 C111,75 106,72 103,75 C100,72 95,75 95,80 C95,85 103,91 103,91 C103,91 111,85 111,80 Z"
              fill="#0284c7"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Girl on Right presenting the gift with smile */}
            <g transform="translate(145, 60)">
              <circle cx="15" cy="12" r="9.5" fill="#0f172a" />
              <motion.path
                d="M10,14 Q26,20 32,30 Q22,22 14,18 Z"
                fill="#0f172a"
                animate={{ rotate: [1, -3, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <path d="M9,22 L21,22 L23,55 L7,55 Z" fill="#0f172a" />
              {/* Reaching arm giving book */}
              <path d="M8,36 L-6,40" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M7,55 L23,55 L26,76 L4,76 Z" fill="#0f172a" />
              <path d="M10,76 L10,100" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M20,76 L20,100" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </g>
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
          transition={{ duration: 0.5 }}
          className="relative w-72 h-60 flex items-end justify-center pb-4"
        >
          <svg viewBox="0 0 240 180" className="w-72 h-56">
            <path d="M10,165 Q120,155 230,165" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

            {/* Boy (Left - Quiet, reserved posture) */}
            <g transform="translate(60, 55)">
              <circle cx="15" cy="12" r="10" fill="#0f172a" />
              <path d="M8,22 L22,22 L24,65 L6,65 Z" fill="#0f172a" />
              <path d="M11,65 L11,105" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              <path d="M19,65 L19,105" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Gentle connecting line */}
            <path d="M90,85 Q115,75 140,85" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Girl (Right - Energetic, turning around) */}
            <g transform="translate(145, 60)">
              <circle cx="15" cy="12" r="9.5" fill="#0f172a" />
              <motion.path
                d="M10,14 Q26,20 32,32 Q22,22 14,18 Z"
                fill="#0f172a"
                animate={{ rotate: [1, -4, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <path d="M9,22 L21,22 L23,55 L7,55 Z" fill="#0f172a" />
              <path d="M7,55 L23,55 L26,76 L4,76 Z" fill="#0f172a" />
              <path d="M10,76 L10,100" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M20,76 L20,100" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
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
          transition={{ duration: 0.5 }}
          className="relative w-72 h-60 flex items-end justify-center pb-4"
        >
          <svg viewBox="0 0 240 180" className="w-72 h-56">
            <path d="M15,165 Q120,150 225,165" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

            {/* Boy holding a small gift/letter box toward her */}
            <g transform="translate(75, 55)">
              <circle cx="15" cy="12" r="10" fill="#0f172a" />
              <path d="M8,22 L22,22 L24,65 L6,65 Z" fill="#0f172a" />
              <path d="M18,34 L32,38 L32,46" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <rect x="30" y="36" width="10" height="10" rx="2" fill="#0284c7" />
              <path d="M30,41 L40,41" stroke="#ffffff" strokeWidth="1.5" />
              <path d="M11,65 L11,105" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              <path d="M19,65 L19,105" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Girl listening */}
            <g transform="translate(145, 60)">
              <circle cx="15" cy="12" r="9.5" fill="#0f172a" />
              <path d="M9,22 L21,22 L23,55 L7,55 Z" fill="#0f172a" />
              <path d="M7,55 L23,55 L26,76 L4,76 Z" fill="#0f172a" />
              <path d="M10,76 L10,100" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M20,76 L20,100" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
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
          transition={{ duration: 0.5 }}
          className="relative w-80 h-60 flex items-end justify-center pb-4"
        >
          <svg viewBox="0 0 260 180" className="w-80 h-56">
            <path d="M20,165 L240,165" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

            {/* Desk */}
            <rect x="75" y="105" width="110" height="6" rx="2" fill="#0f172a" />
            <path d="M85,111 L85,165" stroke="#0f172a" strokeWidth="3" />
            <path d="M175,111 L175,165" stroke="#0f172a" strokeWidth="3" />

            {/* Laptop screen */}
            <rect x="115" y="82" width="30" height="20" rx="2" fill="#38bdf8" />
            <polygon points="110,103 150,103 145,105 115,105" fill="#0f172a" />

            {/* Boy seated on left */}
            <g transform="translate(48, 75)">
              <circle cx="15" cy="12" r="10" fill="#0f172a" />
              <path d="M8,22 L22,22 L24,55 L6,55 Z" fill="#0f172a" />
              <path d="M18,34 L36,36" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M8,55 L26,55 L26,88" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinejoin="round" />
            </g>

            {/* Girl seated on right */}
            <g transform="translate(182, 75)">
              <circle cx="15" cy="12" r="9.5" fill="#0f172a" />
              <path d="M8,22 L22,22 L24,55 L6,55 Z" fill="#0f172a" />
              <path d="M8,34 L-10,36" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M18,55 L4,55 L4,88" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinejoin="round" />
            </g>
          </svg>
        </motion.div>
      )}

      {/* Chapter 4: August 2025 - Resmi Jadian setelah Capstone Defense */}
      {chapter === 4 && (
        <motion.div
          key="ch4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-80 h-60 flex items-end justify-center pb-4"
        >
          <svg viewBox="0 0 260 180" className="w-80 h-56">
            {/* Shinkai Hilltop Ridge */}
            <path d="M20,165 Q130,135 240,165" fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />

            {/* Two silhouettes holding hands */}
            <g transform="translate(100, 52)">
              {/* Boy */}
              <g transform="translate(0, 0)">
                <circle cx="14" cy="12" r="10" fill="#0f172a" />
                <path d="M6,22 L22,22 L24,65 L6,65 Z" fill="#0f172a" />
                <path d="M10,65 L10,108" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
                <path d="M18,65 L18,108" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              </g>

              {/* Joined Hands */}
              <path d="M20,40 Q28,48 36,40" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
              <circle cx="28" cy="44" r="3" fill="#38bdf8" />

              {/* Girl */}
              <g transform="translate(30, 4)">
                <circle cx="15" cy="12" r="9.5" fill="#0f172a" />
                <motion.path
                  d="M10,14 Q28,18 36,32 Q24,20 14,18 Z"
                  fill="#0f172a"
                  animate={{ rotate: [-2, 3, -2] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <path d="M8,22 L22,22 L24,55 L6,55 Z" fill="#0f172a" />
                <path d="M6,55 L24,55 L28,78 L2,78 Z" fill="#0f172a" />
                <path d="M10,78 L10,104" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                <path d="M20,78 L20,104" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>
          </svg>
        </motion.div>
      )}

      {/* Chapter 5: November 2026 - Ulang Tahun Najla Hari Ini */}
      {chapter === 5 && (
        <motion.div
          key="ch5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-80 h-60 flex items-end justify-center pb-4"
        >
          <svg viewBox="0 0 260 180" className="w-80 h-56">
            <path d="M20,165 Q130,155 240,165" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

            {/* Boy on Left */}
            <g transform="translate(75, 52)">
              <circle cx="14" cy="12" r="10" fill="#0f172a" />
              <path d="M6,22 L22,22 L24,65 L6,65 Z" fill="#0f172a" />
              {/* Hand extended holding cake plate */}
              <path d="M18,36 L34,44" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M10,65 L10,108" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
              <path d="M18,65 L18,108" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Birthday Cake in center */}
            <g transform="translate(118, 92)">
              <rect x="0" y="8" width="24" height="14" rx="2" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1" />
              {/* Candle & Flame */}
              <rect x="11" y="2" width="2.5" height="6" fill="#38bdf8" />
              <circle cx="12.2" cy="0" r="2.5" fill="#facc15" />
            </g>

            {/* Girl on Right making a wish */}
            <g transform="translate(150, 56)">
              <circle cx="15" cy="12" r="9.5" fill="#0f172a" />
              <motion.path
                d="M10,14 Q28,18 36,32 Q24,20 14,18 Z"
                fill="#0f172a"
                animate={{ rotate: [-2, 3, -2] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <path d="M8,22 L22,22 L24,55 L6,55 Z" fill="#0f172a" />
              {/* Clapped hands making a wish */}
              <path d="M8,36 L-6,42" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M6,55 L24,55 L28,78 L2,78 Z" fill="#0f172a" />
              <path d="M10,78 L10,104" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M20,78 L20,104" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </motion.div>
      )}
    </div>
  );
};

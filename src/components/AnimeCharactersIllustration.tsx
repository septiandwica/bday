import React from 'react';
import { motion } from 'framer-motion';

interface IllustrationProps {
  step: number;
}

export const AnimeCharactersIllustration: React.FC<IllustrationProps> = ({ step }) => {
  return (
    <div className="relative w-full max-w-sm h-48 sm:h-52 flex items-center justify-center select-none my-2">
      {/* Ground line */}
      <div className="absolute bottom-2 inset-x-8 h-2 rounded-full bg-sky-200/50 blur-xs" />

      {/* Step 1: 2024 - Confess yang Mas suruh lupain */}
      {step === 1 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-64 h-48 flex items-end justify-center pb-2"
        >
          <svg viewBox="0 0 220 160" className="w-64 h-44">
            <path d="M15,145 Q110,135 205,145" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            {/* Boy looking shy / hesitating */}
            <g transform="translate(60, 45)">
              <circle cx="15" cy="12" r="9" fill="#0f172a" />
              <path d="M8,21 L22,21 L23,55 L7,55 Z" fill="#0f172a" />
              <path d="M10,55 L10,95" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M18,55 L18,95" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              {/* Scratching head / shy hand */}
              <path d="M20,28 L30,22 L24,14" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
            {/* Girl listening with curious smile */}
            <g transform="translate(135, 48)">
              <circle cx="15" cy="12" r="8.5" fill="#0f172a" />
              <motion.path
                d="M10,14 Q24,18 28,28 Q20,20 13,17 Z"
                fill="#0f172a"
                animate={{ rotate: [1, -3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <path d="M9,21 L21,21 L22,50 L8,50 Z" fill="#0f172a" />
              <path d="M7,50 L23,50 L25,70 L5,70 Z" fill="#0f172a" />
              <path d="M10,70 L10,92" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M18,70 L18,92" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </motion.div>
      )}

      {/* Step 2: Awal 2025 - Makan hati tapi Lala bikin ceria */}
      {step === 2 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-64 h-48 flex items-end justify-center pb-2"
        >
          <svg viewBox="0 0 220 160" className="w-64 h-44">
            <path d="M15,145 Q110,135 205,145" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            {/* Boy sitting feeling down */}
            <g transform="translate(65, 55)">
              <circle cx="15" cy="12" r="9" fill="#0f172a" />
              <path d="M8,21 L22,21 L20,50 L10,50 Z" fill="#0f172a" />
              <path d="M10,50 L22,50 L22,85" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
            </g>
            {/* Girl offering cheerful warmth */}
            <g transform="translate(130, 48)">
              <circle cx="15" cy="12" r="8.5" fill="#0f172a" />
              <path d="M9,21 L21,21 L22,50 L8,50 Z" fill="#0f172a" />
              <path d="M7,50 L23,50 L25,70 L5,70 Z" fill="#0f172a" />
              {/* Hand extended cheer */}
              <path d="M8,30 L-8,34" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10,70 L10,92" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M18,70 L18,92" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </motion.div>
      )}

      {/* Step 3: Akhir 2025 - Rill Usaha Bareng */}
      {step === 3 && (
        <motion.div
          key="step3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-72 h-48 flex items-end justify-center pb-2"
        >
          <svg viewBox="0 0 240 160" className="w-72 h-44">
            <path d="M20,145 L220,145" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            {/* Shared desk */}
            <rect x="70" y="95" width="100" height="5" rx="2" fill="#0f172a" />
            <path d="M80,100 L80,145" stroke="#0f172a" strokeWidth="3" />
            <path d="M160,100 L160,145" stroke="#0f172a" strokeWidth="3" />
            {/* Laptop */}
            <rect x="105" y="76" width="28" height="18" rx="2" fill="#38bdf8" />
            <polygon points="100,94 138,94 134,96 104,96" fill="#0f172a" />
            {/* Boy working */}
            <g transform="translate(45, 68)">
              <circle cx="15" cy="12" r="9" fill="#0f172a" />
              <path d="M8,21 L22,21 L23,48 L7,48 Z" fill="#0f172a" />
              <path d="M16,30 L32,34" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M8,48 L24,48 L24,78" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
            </g>
            {/* Lala partnering */}
            <g transform="translate(165, 68)">
              <circle cx="15" cy="12" r="8.5" fill="#0f172a" />
              <path d="M8,21 L22,21 L23,48 L7,48 Z" fill="#0f172a" />
              <path d="M8,30 L-8,34" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M16,48 L2,48 L2,78" stroke="#0f172a" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
            </g>
          </svg>
        </motion.div>
      )}

      {/* Step 4: Awal 2026 - Keliling Indo & Chat */}
      {step === 4 && (
        <motion.div
          key="step4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-64 h-48 flex items-end justify-center pb-2"
        >
          <svg viewBox="0 0 220 160" className="w-64 h-44">
            <path d="M15,145 Q110,135 205,145" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            {/* Boy holding phone, looking at screen */}
            <g transform="translate(95, 45)">
              <circle cx="15" cy="12" r="9" fill="#0f172a" />
              <path d="M8,21 L22,21 L23,55 L7,55 Z" fill="#0f172a" />
              {/* Hands holding phone */}
              <path d="M10,32 L2,38 L8,44" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="0" y="34" width="7" height="12" rx="1" fill="#0284c7" />
              <path d="M10,55 L10,95" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M18,55 L18,95" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          </svg>
        </motion.div>
      )}

      {/* Step 5: Agustus - September 2026 - Kado Buku "I Have a Crush on You" */}
      {step === 5 && (
        <motion.div
          key="step5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-72 h-48 flex items-end justify-center pb-2"
        >
          <svg viewBox="0 0 220 160" className="w-72 h-44">
            <path d="M15,145 Q110,135 205,145" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            {/* Boy */}
            <g transform="translate(60, 48)">
              <circle cx="15" cy="12" r="9" fill="#0f172a" />
              <path d="M8,21 L22,21 L23,55 L7,55 Z" fill="#0f172a" />
              <path d="M16,32 L26,38" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M10,55 L10,92" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M18,55 L18,92" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            {/* Book in the middle */}
            <g transform="translate(94, 80)">
              <rect x="0" y="0" width="20" height="25" rx="3" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
              <path d="M4,12 L16,12" stroke="#ffffff" strokeWidth="1.5" />
            </g>
            {/* Lala giving book */}
            <g transform="translate(130, 48)">
              <circle cx="15" cy="12" r="8.5" fill="#0f172a" />
              <path d="M9,21 L21,21 L22,50 L8,50 Z" fill="#0f172a" />
              <path d="M8,32 L-8,38" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M7,50 L23,50 L25,70 L5,70 Z" fill="#0f172a" />
              <path d="M10,70 L10,92" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M18,70 L18,92" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </motion.div>
      )}
    </div>
  );
};

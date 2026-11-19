import React from 'react';
import { motion } from 'framer-motion';

interface IllustrationProps {
  step: number;
}

// Two birds SVG — philosophy: together chasing dreams in the open sky
export const AnimeCharactersIllustration: React.FC<IllustrationProps> = ({ step }) => {
  return (
    <div className="relative w-full max-w-sm h-48 sm:h-52 flex items-center justify-center select-none my-2">

      {/* Step 1: 2024 — Confess, suruh lupain. Birds apart, one looking back */}
      {step === 1 && (
        <motion.svg
          key="birds-1"
          viewBox="0 0 260 160"
          className="w-64 h-44"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Sky line */}
          <path d="M20,140 Q130,130 240,140" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bird left — hesitant, wings mid-flap, turned slightly toward right */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Body */}
            <ellipse cx="72" cy="85" rx="14" ry="8" fill="#0284c7" />
            {/* Head */}
            <circle cx="84" cy="80" r="8" fill="#0284c7" />
            {/* Eye */}
            <circle cx="87" cy="79" r="1.8" fill="white" />
            <circle cx="87.6" cy="79" r="0.9" fill="#0f172a" />
            {/* Beak — pointing right, slightly open */}
            <path d="M91,80 L96,82 L91,83" fill="#38bdf8" />
            {/* Wing up */}
            <motion.path
              d="M72,77 Q62,65 50,70 Q62,75 72,82"
              fill="#38bdf8"
              animate={{ d: ['M72,77 Q62,65 50,70 Q62,75 72,82', 'M72,80 Q62,72 50,78 Q62,80 72,86', 'M72,77 Q62,65 50,70 Q62,75 72,82'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Tail */}
            <path d="M58,85 Q48,82 44,90 Q52,86 60,90" fill="#0369a1" />
          </motion.g>

          {/* Bird right — listening/curious, wings folded, slight distance */}
          <motion.g
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <ellipse cx="185" cy="88" rx="13" ry="7.5" fill="#38bdf8" />
            <circle cx="197" cy="83" r="7.5" fill="#38bdf8" />
            <circle cx="200" cy="82" r="1.6" fill="white" />
            <circle cx="200.6" cy="82" r="0.8" fill="#0f172a" />
            {/* Beak pointing left toward other bird */}
            <path d="M190,83 L185,85 L190,87" fill="#0284c7" />
            {/* Wing folded — resting */}
            <path d="M185,82 Q175,76 170,82 Q177,82 185,88" fill="#bae6fd" />
            {/* Tail */}
            <path d="M172,88 Q163,86 160,93 Q168,89 174,93" fill="#7dd3fc" />
          </motion.g>

          {/* Soft dashed line between them — uncertain distance */}
          <path d="M100,82 Q130,70 170,82" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="5,5" strokeLinecap="round" />
        </motion.svg>
      )}

      {/* Step 2: Awal 2025 — Mas sempat makan hati, Lala bikin ceria. One bird drooping, other chirping */}
      {step === 2 && (
        <motion.svg
          key="birds-2"
          viewBox="0 0 260 160"
          className="w-64 h-44"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <path d="M20,140 Q130,130 240,140" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bird left — slightly drooping, wings low */}
          <motion.g
            animate={{ y: [0, 3, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="75" cy="95" rx="14" ry="8" fill="#0284c7" />
            <circle cx="87" cy="90" r="8" fill="#0284c7" />
            <circle cx="90" cy="89" r="1.8" fill="white" />
            <circle cx="90.4" cy="89.4" r="0.9" fill="#0f172a" />
            <path d="M94,91 L99,93 L94,94" fill="#38bdf8" />
            {/* Wing drooping low */}
            <path d="M75,89 Q63,88 55,96 Q66,91 75,97" fill="#38bdf8" opacity="0.7" />
            <path d="M61,96 Q52,97 49,104 Q57,99 63,103" fill="#0369a1" />
          </motion.g>

          {/* Bird right — chirping, wings spread cheerfully */}
          <motion.g
            animate={{ y: [0, -7, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            <ellipse cx="178" cy="82" rx="13" ry="7.5" fill="#38bdf8" />
            <circle cx="190" cy="77" r="7.5" fill="#38bdf8" />
            <circle cx="193" cy="76" r="1.6" fill="white" />
            <circle cx="193.4" cy="76" r="0.8" fill="#0f172a" />
            <path d="M183,77 L178,79 L183,80" fill="#0284c7" />
            {/* Wing spread wide — cheerful */}
            <motion.path
              d="M178,76 Q165,62 152,66 Q165,72 178,80"
              fill="#bae6fd"
              animate={{ d: ['M178,76 Q165,62 152,66 Q165,72 178,80', 'M178,80 Q166,70 153,74 Q166,76 178,84', 'M178,76 Q165,62 152,66 Q165,72 178,80'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Small music notes */}
            <text x="196" y="68" fontSize="10" fill="#0284c7" fontFamily="serif">♪</text>
            <text x="202" y="58" fontSize="8" fill="#38bdf8" fontFamily="serif">♫</text>
            <path d="M165,83 Q156,82 153,89 Q161,85 167,89" fill="#7dd3fc" />
          </motion.g>
        </motion.svg>
      )}

      {/* Step 3: Akhir 2025 — Usaha bareng. Two birds flying side by side, equal height */}
      {step === 3 && (
        <motion.svg
          key="birds-3"
          viewBox="0 0 260 160"
          className="w-64 h-44"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <path d="M20,140 Q130,130 240,140" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bird left — flying forward, strong */}
          <motion.g
            animate={{ x: [0, 4, 0], y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="85" cy="78" rx="15" ry="8.5" fill="#0284c7" />
            <circle cx="98" cy="72" r="8.5" fill="#0284c7" />
            <circle cx="101" cy="71" r="1.9" fill="white" />
            <circle cx="101.6" cy="71" r="0.9" fill="#0f172a" />
            <path d="M105,72 L111,74 L105,76" fill="#38bdf8" />
            <motion.path
              d="M85,70 Q72,55 57,60 Q72,67 85,76"
              fill="#38bdf8"
              animate={{ d: ['M85,70 Q72,55 57,60 Q72,67 85,76', 'M85,74 Q72,62 57,67 Q72,71 85,80', 'M85,70 Q72,55 57,60 Q72,67 85,76'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <path d="M70,78 Q60,76 56,84 Q65,80 71,84" fill="#0369a1" />
          </motion.g>

          {/* Bird right — flying at the same level, wings in sync */}
          <motion.g
            animate={{ x: [0, 4, 0], y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          >
            <ellipse cx="168" cy="78" rx="14" ry="8" fill="#38bdf8" />
            <circle cx="181" cy="72" r="8" fill="#38bdf8" />
            <circle cx="184" cy="71" r="1.7" fill="white" />
            <circle cx="184.6" cy="71" r="0.85" fill="#0f172a" />
            <path d="M188,72 L194,74 L188,76" fill="#0284c7" />
            <motion.path
              d="M168,70 Q155,55 140,60 Q155,67 168,76"
              fill="#bae6fd"
              animate={{ d: ['M168,70 Q155,55 140,60 Q155,67 168,76', 'M168,74 Q155,62 140,67 Q155,71 168,80', 'M168,70 Q155,55 140,60 Q155,67 168,76'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
            />
            <path d="M153,78 Q143,76 139,84 Q148,80 154,84" fill="#7dd3fc" />
          </motion.g>

          {/* Connected line — flying together */}
          <path d="M113,74 Q130,68 143,74" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />
        </motion.svg>
      )}

      {/* Step 4: Awal 2026 — Keliling indo, selalu kontak. One bird far, one stays in place */}
      {step === 4 && (
        <motion.svg
          key="birds-4"
          viewBox="0 0 260 160"
          className="w-64 h-44"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <path d="M20,140 Q130,130 240,140" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bird left far away — small, high up */}
          <motion.g
            animate={{ x: [0, 8, 0], y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="55" cy="55" rx="10" ry="5.5" fill="#0284c7" opacity="0.75" />
            <circle cx="63" cy="51" r="5.5" fill="#0284c7" opacity="0.75" />
            <path d="M67,52 L71,53.5 L67,55" fill="#38bdf8" />
            <motion.path
              d="M55,51 Q46,43 37,46 Q46,50 55,55"
              fill="#38bdf8"
              opacity="0.7"
              animate={{ d: ['M55,51 Q46,43 37,46 Q46,50 55,55', 'M55,53 Q46,47 37,50 Q46,52 55,57', 'M55,51 Q46,43 37,46 Q46,50 55,55'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.g>

          {/* Bird right — waiting, perched on branch */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <ellipse cx="178" cy="90" rx="14" ry="8" fill="#38bdf8" />
            <circle cx="190" cy="85" r="8" fill="#38bdf8" />
            <circle cx="193" cy="84" r="1.7" fill="white" />
            <circle cx="193.4" cy="84" r="0.85" fill="#0f172a" />
            <path d="M183,85 L178,87 L183,89" fill="#0284c7" />
            <path d="M176,92 Q166,90 162,97 Q170,93 176,97" fill="#7dd3fc" />
            {/* Branch */}
            <path d="M155,100 Q175,96 200,100" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
            {/* Legs on branch */}
            <line x1="175" y1="98" x2="173" y2="102" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="180" y1="98" x2="182" y2="102" stroke="#0284c7" strokeWidth="1.5" />
          </motion.g>

          {/* Dotted arc between far and near bird */}
          <path d="M75,55 Q130,30 165,82" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="5,5" strokeLinecap="round" />
        </motion.svg>
      )}

      {/* Step 5: Agustus–September 2026 — Jadian + Buku. Both birds close, touching wingtips */}
      {step === 5 && (
        <motion.svg
          key="birds-5"
          viewBox="0 0 260 160"
          className="w-64 h-44"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <path d="M20,140 Q130,130 240,140" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Heart above */}
          <motion.path
            d="M128,42 C128,37 122,34 118,38 C114,42 118,46 128,54 C138,46 142,42 138,38 C134,34 128,37 128,42 Z"
            fill="#38bdf8"
            animate={{ scale: [1, 1.12, 1], y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Bird left — flying toward center */}
          <motion.g
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="88" cy="80" rx="15" ry="8.5" fill="#0284c7" />
            <circle cx="101" cy="74" r="8.5" fill="#0284c7" />
            <circle cx="104" cy="73" r="1.9" fill="white" />
            <circle cx="104.6" cy="73" r="0.95" fill="#0f172a" />
            <path d="M108,74 L114,76 L108,78" fill="#38bdf8" />
            <motion.path
              d="M88,72 Q75,58 60,62 Q75,69 88,78"
              fill="#38bdf8"
              animate={{ d: ['M88,72 Q75,58 60,62 Q75,69 88,78', 'M88,76 Q75,65 60,69 Q75,73 88,82', 'M88,72 Q75,58 60,62 Q75,69 88,78'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <path d="M73,80 Q63,78 59,86 Q68,82 74,86" fill="#0369a1" />
          </motion.g>

          {/* Bird right — flying toward center, wingtip touching */}
          <motion.g
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
          >
            <ellipse cx="172" cy="80" rx="14" ry="8" fill="#38bdf8" />
            <circle cx="159" cy="74" r="8" fill="#38bdf8" />
            <circle cx="156" cy="73" r="1.7" fill="white" />
            <circle cx="155.4" cy="73" r="0.85" fill="#0f172a" />
            <path d="M152,74 L146,76 L152,78" fill="#0284c7" />
            <motion.path
              d="M172,72 Q185,58 200,62 Q185,69 172,78"
              fill="#bae6fd"
              animate={{ d: ['M172,72 Q185,58 200,62 Q185,69 172,78', 'M172,76 Q185,65 200,69 Q185,73 172,82', 'M172,72 Q185,58 200,62 Q185,69 172,78'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            />
            <path d="M187,80 Q197,78 201,86 Q192,82 186,86" fill="#7dd3fc" />
          </motion.g>

          {/* Wingtip glint between both birds */}
          <motion.circle
            cx="130"
            cy="77"
            r="3"
            fill="#bae6fd"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.svg>
      )}
    </div>
  );
};

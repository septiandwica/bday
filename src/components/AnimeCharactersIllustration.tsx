import React from 'react';
import { motion } from 'framer-motion';

interface IllustrationProps {
  step: number;
}

// Two birds SVG — philosophy: together chasing dreams in the open sky
export const AnimeCharactersIllustration: React.FC<IllustrationProps> = ({ step }) => {
  return (
    <div className="relative w-full max-w-md mx-auto h-48 sm:h-56 flex items-center justify-center select-none my-1">

      {/* Step 1: 2024 — Confess, suruh lupain. Birds apart, perfectly centered */}
      {step === 1 && (
        <motion.svg
          key="birds-1"
          viewBox="0 0 280 160"
          className="w-full max-w-[320px] sm:max-w-[380px] h-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Sky line */}
          <path d="M15,142 Q140,132 265,142" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bird left (cx=85) — hesitant, wings mid-flap, turned toward right */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="85" cy="85" rx="16" ry="9" fill="#0284c7" />
            <circle cx="98" cy="79" r="9" fill="#0284c7" />
            <circle cx="101.5" cy="78" r="2" fill="white" />
            <circle cx="102" cy="78" r="1" fill="#0f172a" />
            {/* Beak */}
            <path d="M106,79 L112,81.5 L106,83" fill="#38bdf8" />
            {/* Wing */}
            <motion.path
              d="M85,76 Q73,63 59,69 Q73,74 85,82"
              fill="#38bdf8"
              animate={{ d: ['M85,76 Q73,63 59,69 Q73,74 85,82', 'M85,79 Q73,70 59,77 Q73,79 85,86', 'M85,76 Q73,63 59,69 Q73,74 85,82'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Tail */}
            <path d="M69,85 Q57,81 52,90 Q62,86 71,90" fill="#0369a1" />
          </motion.g>

          {/* Bird right (cx=195) — listening/curious, wings folded */}
          <motion.g
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <ellipse cx="195" cy="88" rx="15" ry="8.5" fill="#38bdf8" />
            <circle cx="182" cy="82" r="8.5" fill="#38bdf8" />
            <circle cx="178.5" cy="81" r="1.8" fill="white" />
            <circle cx="178" cy="81" r="0.9" fill="#0f172a" />
            {/* Beak pointing left */}
            <path d="M174,82 L168,84.5 L174,86" fill="#0284c7" />
            {/* Wing folded */}
            <path d="M195,82 Q207,75 213,82 Q205,82 195,88" fill="#bae6fd" />
            {/* Tail */}
            <path d="M210,88 Q221,85 225,93 Q215,89 208,93" fill="#7dd3fc" />
          </motion.g>

          {/* Soft dashed connection arc centered at 140 */}
          <path d="M115,82 Q140,70 165,82" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="5,5" strokeLinecap="round" />
        </motion.svg>
      )}

      {/* Step 2: Awal 2025 — Mas sempat lesu, Lala bikin ceria */}
      {step === 2 && (
        <motion.svg
          key="birds-2"
          viewBox="0 0 280 160"
          className="w-full max-w-[320px] sm:max-w-[380px] h-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <path d="M15,142 Q140,132 265,142" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bird left (cx=90) — drooping wings */}
          <motion.g
            animate={{ y: [0, 3, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="90" cy="95" rx="16" ry="9" fill="#0284c7" />
            <circle cx="103" cy="89" r="9" fill="#0284c7" />
            <circle cx="106.5" cy="88" r="2" fill="white" />
            <circle cx="107" cy="88" r="1" fill="#0f172a" />
            <path d="M111,89 L117,91.5 L111,93" fill="#38bdf8" />
            {/* Wing drooping */}
            <path d="M90,89 Q77,88 67,97 Q79,91 90,98" fill="#38bdf8" opacity="0.75" />
            <path d="M74,96 Q63,97 59,105 Q68,100 76,104" fill="#0369a1" />
          </motion.g>

          {/* Bird right (cx=190) — cheerful, wings spread wide */}
          <motion.g
            animate={{ y: [0, -7, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            <ellipse cx="190" cy="82" rx="15" ry="8.5" fill="#38bdf8" />
            <circle cx="177" cy="76" r="8.5" fill="#38bdf8" />
            <circle cx="173.5" cy="75" r="1.8" fill="white" />
            <circle cx="173" cy="75" r="0.9" fill="#0f172a" />
            <path d="M169,76 L163,78.5 L169,80" fill="#0284c7" />
            {/* Wing spread wide */}
            <motion.path
              d="M190,75 Q205,59 220,64 Q205,71 190,80"
              fill="#bae6fd"
              animate={{ d: ['M190,75 Q205,59 220,64 Q205,71 190,80', 'M190,79 Q204,68 219,72 Q204,75 190,84', 'M190,75 Q205,59 220,64 Q205,71 190,80'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Small chirp wave circles */}
            <circle cx="156" cy="65" r="2.5" fill="#0284c7" />
            <circle cx="147" cy="56" r="2" fill="#38bdf8" />
            <path d="M205,83 Q216,82 220,89 Q210,85 203,89" fill="#7dd3fc" />
          </motion.g>
        </motion.svg>
      )}

      {/* Step 3: Akhir 2025 — Usaha bareng. Two birds flying side by side */}
      {step === 3 && (
        <motion.svg
          key="birds-3"
          viewBox="0 0 280 160"
          className="w-full max-w-[320px] sm:max-w-[380px] h-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <path d="M15,142 Q140,132 265,142" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bird left (cx=95) — flying forward */}
          <motion.g
            animate={{ x: [0, 4, 0], y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="95" cy="78" rx="16" ry="9.5" fill="#0284c7" />
            <circle cx="109" cy="72" r="9.5" fill="#0284c7" />
            <circle cx="112.5" cy="71" r="2" fill="white" />
            <circle cx="113" cy="71" r="1" fill="#0f172a" />
            <path d="M117,72 L123,74.5 L117,77" fill="#38bdf8" />
            <motion.path
              d="M95,69 Q81,53 64,59 Q81,66 95,76"
              fill="#38bdf8"
              animate={{ d: ['M95,69 Q81,53 64,59 Q81,66 95,76', 'M95,73 Q81,60 64,66 Q81,70 95,80', 'M95,69 Q81,53 64,59 Q81,66 95,76'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <path d="M79,78 Q68,76 63,84 Q73,80 80,84" fill="#0369a1" />
          </motion.g>

          {/* Bird right (cx=185) — flying at same level */}
          <motion.g
            animate={{ x: [0, 4, 0], y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          >
            <ellipse cx="185" cy="78" rx="15.5" ry="9" fill="#38bdf8" />
            <circle cx="199" cy="72" r="9" fill="#38bdf8" />
            <circle cx="202.5" cy="71" r="1.9" fill="white" />
            <circle cx="203" cy="71" r="0.95" fill="#0f172a" />
            <path d="M207,72 L213,74.5 L207,77" fill="#0284c7" />
            <motion.path
              d="M185,69 Q171,53 154,59 Q171,66 185,76"
              fill="#bae6fd"
              animate={{ d: ['M185,69 Q171,53 154,59 Q171,66 185,76', 'M185,73 Q171,60 154,66 Q171,70 185,80', 'M185,69 Q171,53 154,59 Q171,66 185,76'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
            />
            <path d="M169,78 Q158,76 153,84 Q163,80 170,84" fill="#7dd3fc" />
          </motion.g>

          {/* Flow line between them */}
          <path d="M125,74 Q140,68 155,74" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />
        </motion.svg>
      )}

      {/* Step 4: Awal 2026 — Keliling Indo, tetap saling kontak */}
      {step === 4 && (
        <motion.svg
          key="birds-4"
          viewBox="0 0 280 160"
          className="w-full max-w-[320px] sm:max-w-[380px] h-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <path d="M15,142 Q140,132 265,142" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Bird left (cx=75) — flying high & exploring */}
          <motion.g
            animate={{ x: [0, 8, 0], y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="75" cy="54" rx="12" ry="7" fill="#0284c7" opacity="0.8" />
            <circle cx="85" cy="49" r="7" fill="#0284c7" opacity="0.8" />
            <path d="M90,50 L95,52 L90,54" fill="#38bdf8" />
            <motion.path
              d="M75,49 Q65,40 54,43 Q65,48 75,54"
              fill="#38bdf8"
              opacity="0.75"
              animate={{ d: ['M75,49 Q65,40 54,43 Q65,48 75,54', 'M75,52 Q65,44 54,48 Q65,51 75,57', 'M75,49 Q65,40 54,43 Q65,48 75,54'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.g>

          {/* Bird right (cx=205) — waiting perched on branch */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <ellipse cx="205" cy="90" rx="15" ry="8.5" fill="#38bdf8" />
            <circle cx="192" cy="84" r="8.5" fill="#38bdf8" />
            <circle cx="188.5" cy="83" r="1.8" fill="white" />
            <circle cx="188" cy="83" r="0.9" fill="#0f172a" />
            <path d="M184,84 L178,86.5 L184,88" fill="#0284c7" />
            <path d="M220,92 Q231,89 235,97 Q225,93 218,97" fill="#7dd3fc" />
            {/* Branch */}
            <path d="M175,100 Q205,96 235,100" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="202" y1="98" x2="200" y2="102" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="208" y1="98" x2="210" y2="102" stroke="#0284c7" strokeWidth="1.5" />
          </motion.g>

          {/* Dotted arc connecting both birds centered at 140 */}
          <path d="M95,54 Q140,25 185,84" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="5,5" strokeLinecap="round" />
        </motion.svg>
      )}

      {/* Step 5: Agustus–September 2026 — Jadian & Bersatu */}
      {step === 5 && (
        <motion.svg
          key="birds-5"
          viewBox="0 0 280 160"
          className="w-full max-w-[320px] sm:max-w-[380px] h-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <path d="M15,142 Q140,132 265,142" fill="none" stroke="#bae6fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Heart centered at x=140 */}
          <motion.path
            d="M140,42 C140,37 134,34 130,38 C126,42 130,46 140,54 C150,46 154,42 150,38 C146,34 140,37 140,42 Z"
            fill="#38bdf8"
            animate={{ scale: [1, 1.15, 1], y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Bird left (cx=98) */}
          <motion.g
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="98" cy="80" rx="16" ry="9" fill="#0284c7" />
            <circle cx="112" cy="74" r="9" fill="#0284c7" />
            <circle cx="115.5" cy="73" r="2" fill="white" />
            <circle cx="116" cy="73" r="1" fill="#0f172a" />
            <path d="M120,74 L126,76.5 L120,79" fill="#38bdf8" />
            <motion.path
              d="M98,71 Q84,56 68,61 Q84,68 98,78"
              fill="#38bdf8"
              animate={{ d: ['M98,71 Q84,56 68,61 Q84,68 98,78', 'M98,75 Q84,63 68,68 Q84,72 98,82', 'M98,71 Q84,56 68,61 Q84,68 98,78'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <path d="M82,80 Q71,78 66,86 Q76,82 83,86" fill="#0369a1" />
          </motion.g>

          {/* Bird right (cx=182) */}
          <motion.g
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
          >
            <ellipse cx="182" cy="80" rx="15.5" ry="8.5" fill="#38bdf8" />
            <circle cx="168" cy="74" r="8.5" fill="#38bdf8" />
            <circle cx="164.5" cy="73" r="1.8" fill="white" />
            <circle cx="164" cy="73" r="0.9" fill="#0f172a" />
            <path d="M160,74 L154,76.5 L160,79" fill="#0284c7" />
            <motion.path
              d="M182,71 Q196,56 212,61 Q196,68 182,78"
              fill="#bae6fd"
              animate={{ d: ['M182,71 Q196,56 212,61 Q196,68 182,78', 'M182,75 Q196,63 212,68 Q196,72 182,82', 'M182,71 Q196,56 212,61 Q196,68 182,78'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            />
            <path d="M198,80 Q209,78 214,86 Q204,82 197,86" fill="#7dd3fc" />
          </motion.g>

          {/* Wingtip connection glint at center x=140 */}
          <motion.circle
            cx="140"
            cy="77"
            r="3.5"
            fill="#bae6fd"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.svg>
      )}
    </div>
  );
};

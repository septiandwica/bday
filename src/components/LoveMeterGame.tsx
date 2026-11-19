import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Infinity as InfinityIcon } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerStarBurst } from '../utils/confetti';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
}

export const LoveMeterGame: React.FC = () => {
  const [loveCount, setLoveCount] = useState(100);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sounds.playHeartPop();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() * 40 - 20),
      size: Math.random() * 16 + 20,
    };

    setFloatingHearts((prev) => [...prev.slice(-15), newHeart]);
    setLoveCount((prev) => prev + 25);

    if (loveCount % 200 === 0) {
      sounds.playFanfare();
      triggerStarBurst();
    }
  };

  const getLoveStatusMessage = () => {
    if (loveCount < 200) return 'Cinta yang tulus dan murni untuk Najla 💙';
    if (loveCount < 500) return 'Makin cinta, makin sayang tanpa batas! 🥰';
    if (loveCount < 1000) return 'Kapasitas cinta meluber ke seluruh langit biru! 🚀💙';
    return 'Kadar cinta Infinity: Selamanya hanya untukmu! 💙♾️';
  };

  return (
    <section className="py-4 md:py-6 px-4 max-w-xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border-4 border-[#bae6fd] rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-3 shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-[#0284c7]" />
          Mini Game Interaktif
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0369a1] font-display">
          Love Meter untuk Najla
        </h2>
        <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-sm mx-auto">
          Klik tombol hati biru di bawah untuk mengisi energi cinta tanpa batas!
        </p>

        {/* Big Heart Button with floating hearts container */}
        <div className="relative my-8 h-48 flex items-center justify-center">
          {/* Floating rising hearts */}
          <AnimatePresence>
            {floatingHearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, y: 0, scale: 0.8, x: h.x - 50 }}
                animate={{ opacity: 0, y: -160, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute pointer-events-none select-none"
                style={{ fontSize: `${h.size}px` }}
              >
                💙
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Interactive Heart Button (Bright Blue & White) */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleHeartClick}
            className="w-32 h-32 rounded-full bg-[#38bdf8] border-4 border-white shadow-xl flex items-center justify-center cursor-pointer group relative"
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center group-hover:bg-sky-50 transition-colors">
              <Heart className="w-16 h-16 text-[#0284c7] fill-[#0284c7] group-hover:scale-110 transition-transform" />
            </div>
            <span className="absolute -bottom-2 px-3 py-1 rounded-full bg-[#0284c7] text-[10px] font-bold text-white shadow-sm border-2 border-white">
              Klik Aku!
            </span>
          </motion.button>
        </div>

        {/* Counter Display */}
        <div className="space-y-2">
          <div className="text-3xl md:text-4xl font-black font-mono text-[#0369a1] flex items-center justify-center gap-1">
            <span>{loveCount}%</span>
            {loveCount >= 500 && <InfinityIcon className="w-8 h-8 text-[#0284c7] animate-pulse ml-1" />}
          </div>
          <p className="text-xs text-[#0284c7] font-bold">
            {getLoveStatusMessage()}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

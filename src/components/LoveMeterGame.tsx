import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Infinity as InfinityIcon } from 'lucide-react';
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
      size: Math.random() * 16 + 18,
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
    if (loveCount < 1000) return 'Kapasitas cinta meluber ke seluruh alam semesta! 🚀✨';
    return 'Kadar cinta Infinity: Selamanya hanya untukmu! 💙♾️';
  };

  return (
    <section className="py-20 px-4 max-w-xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel border border-sky-400/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Mini Game Interaktif
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-sky-300 to-blue-200 font-display">
          Love Meter untuk Najla
        </h2>
        <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-sm mx-auto">
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
                className="absolute pointer-events-none text-sky-400"
                style={{ fontSize: `${h.size}px` }}
              >
                💙
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Interactive Heart Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHeartClick}
            className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-700 via-sky-500 to-cyan-400 p-1 shadow-2xl shadow-sky-500/40 flex items-center justify-center cursor-pointer group relative"
          >
            <div className="w-full h-full rounded-full bg-slate-950/80 flex items-center justify-center group-hover:bg-slate-950/60 transition-colors">
              <Heart className="w-16 h-16 text-sky-400 fill-sky-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
            </div>
            <span className="absolute -bottom-2 px-3 py-1 rounded-full bg-sky-950 text-[10px] font-bold text-sky-300 border border-sky-400/40 shadow-xs">
              Klik Aku!
            </span>
          </motion.button>
        </div>

        {/* Counter Display */}
        <div className="space-y-2">
          <div className="text-3xl md:text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-white flex items-center justify-center gap-1">
            <span>{loveCount}%</span>
            {loveCount >= 500 && <InfinityIcon className="w-7 h-7 text-sky-400 animate-pulse ml-1" />}
          </div>
          <p className="text-xs text-sky-200 font-medium">
            {getLoveStatusMessage()}
          </p>
        </div>
      </motion.div>
    </section>
  );
};


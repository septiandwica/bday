import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, CheckCircle2, Gift } from 'lucide-react';
import { STAR_REASONS, StarReason } from '../data/memories';
import { sounds } from '../utils/audio';
import { triggerStarBurst } from '../utils/confetti';

export const StarWishesJar: React.FC = () => {
  const [openedStars, setOpenedStars] = useState<number[]>([]);
  const [activeStar, setActiveStar] = useState<StarReason | null>(null);

  const handleOpenStar = (star: StarReason) => {
    sounds.playChime(1.1 + (star.id * 0.05));
    setActiveStar(star);

    if (!openedStars.includes(star.id)) {
      const nextOpened = [...openedStars, star.id];
      setOpenedStars(nextOpened);
      if (nextOpened.length === STAR_REASONS.length) {
        setTimeout(() => {
          sounds.playFanfare();
          triggerStarBurst();
        }, 500);
      }
    }
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto text-center relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold mb-3">
          <Star className="w-3.5 h-3.5" />
          Botol Bintang Origami
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-sky-300 to-blue-200 font-display">
          Alasan Kenapa Najla Begitu Berharga
        </h2>
        <p className="text-slate-300 text-sm md:text-base mt-2 max-w-md mx-auto">
          Ada 6 bintang harapan di dalam toples kaca ini. Buka satu per satu untuk membaca alasan kenapa kamu begitu istimewa!
        </p>

        {/* Progress Tracker */}
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-medium text-sky-300 border border-sky-500/20">
          <span>Bintang dibuka:</span>
          <span className="font-bold text-white">{openedStars.length} / {STAR_REASONS.length}</span>
          {openedStars.length === STAR_REASONS.length && (
            <span className="text-emerald-400 font-bold ml-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Lengkap!
            </span>
          )}
        </div>
      </motion.div>

      {/* Interactive Stars Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 max-w-4xl mx-auto">
        {STAR_REASONS.map((star, idx) => {
          const isOpened = openedStars.includes(star.id);

          return (
            <motion.button
              key={star.id}
              onClick={() => handleOpenStar(star)}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-3xl border flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden group ${
                isOpened
                  ? 'bg-gradient-to-b from-sky-950/80 to-blue-900/60 border-sky-400/50 shadow-lg shadow-sky-500/20'
                  : 'glass-panel border-sky-500/20 hover:border-sky-400/50 hover:bg-sky-950/40'
              }`}
            >
              {/* Star Icon Badge */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-400 flex items-center justify-center text-white text-xl shadow-md mb-2 group-hover:rotate-12 transition-transform">
                {star.icon}
              </div>

              <span className="text-xs font-bold text-sky-200">
                Bintang #{star.id}
              </span>
              <span className="text-[10px] text-slate-400 mt-1">
                {isOpened ? 'Terbuka ✨' : 'Ketuk untuk Buka'}
              </span>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.button>
          );
        })}
      </div>

      {/* Modal / Dialog Reveal when clicking a star */}
      <AnimatePresence>
        {activeStar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStar(null)}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full glass-panel border border-sky-400/50 rounded-3xl p-6 md:p-8 shadow-2xl text-center overflow-hidden"
            >
              {/* Glowing background burst */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-sky-500 via-blue-600 to-cyan-400 mx-auto flex items-center justify-center text-3xl shadow-lg mb-4">
                {activeStar.icon}
              </div>

              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Bintang Harapan #{activeStar.id}
              </span>
              <h3 className="text-xl font-bold font-display text-sky-100 mt-1 mb-4">
                {activeStar.title}
              </h3>

              <p className="text-slate-200 text-sm md:text-base font-light leading-relaxed mb-6 font-handwriting text-2xl">
                "{activeStar.message}"
              </p>

              <button
                onClick={() => setActiveStar(null)}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md"
              >
                Tutup &amp; Simpan di Hati 💙
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


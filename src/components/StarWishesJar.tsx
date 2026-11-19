import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';
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
        }, 400);
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
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-3 shadow-xs">
          <Star className="w-3.5 h-3.5" />
          Botol Bintang Origami
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0369a1] font-display">
          Alasan Kenapa Najla Begitu Istimewa
        </h2>
        <p className="text-slate-600 text-sm md:text-base mt-2 max-w-md mx-auto">
          Ada 6 bintang harapan origami. Buka satu per satu untuk membaca alasan kenapa kamu begitu berharga bagiku! ⭐
        </p>

        {/* Progress Tracker (Solid White & Sky) */}
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-xs font-bold text-[#0369a1] border-2 border-sky-200 shadow-xs">
          <span>Bintang dibuka:</span>
          <span className="text-[#0284c7]">{openedStars.length} / {STAR_REASONS.length}</span>
          {openedStars.length === STAR_REASONS.length && (
            <span className="text-emerald-600 font-bold ml-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Lengkap!
            </span>
          )}
        </div>
      </motion.div>

      {/* Interactive Stars Grid (Solid Pastel Sky Blue & White) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 max-w-4xl mx-auto">
        {STAR_REASONS.map((star) => {
          const isOpened = openedStars.includes(star.id);

          return (
            <motion.button
              key={star.id}
              onClick={() => handleOpenStar(star)}
              whileHover={{ scale: 1.07, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-3xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden shadow-sm ${
                isOpened
                  ? 'bg-[#e0f2fe] border-[#38bdf8] text-[#0369a1]'
                  : 'bg-white border-[#bae6fd] hover:border-[#38bdf8] hover:bg-sky-50'
              }`}
            >
              {/* Star Icon Badge (Solid Sky / Blue) */}
              <div className="w-12 h-12 rounded-2xl bg-[#0284c7] flex items-center justify-center text-white text-xl shadow-xs mb-2 group-hover:rotate-12 transition-transform">
                {star.icon}
              </div>

              <span className="text-xs font-bold text-[#0369a1]">
                Bintang #{star.id}
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-1">
                {isOpened ? 'Terbuka 💙' : 'Sentuh Buka'}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Modal / Dialog Reveal (Crisp White & Solid Blue Accent) */}
      <AnimatePresence>
        {activeStar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStar(null)}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-white border-4 border-[#38bdf8] rounded-3xl p-6 md:p-8 shadow-2xl text-center overflow-hidden"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#0284c7] mx-auto flex items-center justify-center text-3xl shadow-md mb-4 text-white">
                {activeStar.icon}
              </div>

              <span className="text-xs font-mono uppercase tracking-wider text-[#0284c7] font-extrabold">
                Bintang Harapan #{activeStar.id}
              </span>
              <h3 className="text-xl font-bold font-display text-[#0369a1] mt-1 mb-4">
                {activeStar.title}
              </h3>

              <p className="text-slate-700 text-sm md:text-base font-normal leading-relaxed mb-6 font-handwriting text-2xl">
                "{activeStar.message}"
              </p>

              <button
                onClick={() => setActiveStar(null)}
                className="w-full py-3 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
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

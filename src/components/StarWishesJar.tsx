import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, Heart } from 'lucide-react';
import { LALA_QUALITIES, QualityItem } from '../data/memories';
import { sounds } from '../utils/audio';
import { triggerStarBurst } from '../utils/confetti';

export const StarWishesJar: React.FC = () => {
  const [openedStars, setOpenedStars] = useState<number[]>([]);
  const [activeStar, setActiveStar] = useState<QualityItem | null>(null);

  const handleOpenStar = (star: QualityItem) => {
    sounds.playChime(1.1 + (star.id * 0.05));
    setActiveStar(star);

    if (!openedStars.includes(star.id)) {
      const nextOpened = [...openedStars, star.id];
      setOpenedStars(nextOpened);
      if (nextOpened.length === LALA_QUALITIES.length) {
        setTimeout(() => {
          sounds.playFanfare();
          triggerStarBurst();
        }, 400);
      }
    }
  };

  return (
    <section className="py-4 md:py-6 px-4 max-w-4xl mx-auto text-center relative z-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0369a1]">Alasan Lala Istimewa</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {LALA_QUALITIES.map((star) => (
          <div
            key={star.id}
            onClick={() => handleOpenStar(star)}
            className="p-4 bg-white rounded-2xl border border-sky-200 cursor-pointer shadow-xs hover:scale-105 transition-all"
          >
            <Star className="w-5 h-5 text-[#0284c7] mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-800">{star.title}</p>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeStar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-5 bg-white rounded-2xl border-2 border-sky-300 max-w-md mx-auto shadow-md"
          >
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              "{activeStar.description}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, RotateCw, ArrowRight } from 'lucide-react';
import { MEMORIES_DATA } from '../data/memories';
import { sounds } from '../utils/audio';

interface MemoryLaneProps {
  onContinue: () => void;
}

export const MemoryLane: React.FC<MemoryLaneProps> = ({ onContinue }) => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    sounds.playChime(1.05);
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-4 md:py-6 px-4 w-full max-w-6xl mx-auto relative z-10 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 max-w-xl mx-auto"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-2 shadow-xs">
          <Camera className="w-3.5 h-3.5" />
          <span>Momen Bersama</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0369a1] font-display">
          Galeri Foto Kita
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-md mx-auto">
          Sentuh kartu untuk lihat catatannya.
        </p>
      </motion.div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 text-left">
        {MEMORIES_DATA.map((item, index) => {
          const isFlipped = !!flippedCards[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="relative cursor-pointer select-none w-full"
              style={{ perspective: '1000px' }}
              onClick={() => toggleFlip(item.id)}
            >
              {/* Cute Blue Pin */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-[#0284c7] border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              {/* Card Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '370px',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.55s cubic-bezier(0.4,0.2,0.2,1)',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front Side: Photo View */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  className="w-full h-full bg-white rounded-3xl p-4 sm:p-5 shadow-lg border-2 border-sky-100 flex flex-col justify-between"
                >
                  {/* Photo */}
                  <div className="w-full h-52 sm:h-56 rounded-2xl overflow-hidden bg-sky-50 relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-white/95 text-[11px] font-bold text-[#0284c7] shadow-xs backdrop-blur-xs">
                      {item.category}
                    </div>
                  </div>

                  {/* Title & Flip hint */}
                  <div className="pt-3 flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-sm sm:text-base text-slate-800 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Klik untuk lihat catatan
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0284c7] shrink-0">
                      <RotateCw className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Back Side: Note View */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className="w-full h-full bg-[#f0f8ff] rounded-3xl p-6 sm:p-7 shadow-lg border-2 border-[#bae6fd] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b-2 border-sky-200">
                      <span className="text-[11px] font-mono font-bold text-[#0284c7] uppercase tracking-wider">
                        {item.title}
                      </span>
                      <Camera className="w-4 h-4 text-[#0284c7]" />
                    </div>
                    <div className="mt-4 overflow-y-auto max-h-52 pr-1">
                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                        "{item.note}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-sky-200 text-center text-xs font-mono text-[#0369a1] font-bold">
                    Ketuk untuk kembali ke foto
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Continue CTA */}
      <div className="mt-6 mb-4 flex justify-center">
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Lanjut ke Momen Spesial Hari Ini</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

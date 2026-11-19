import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, RotateCw, Heart, ArrowRight } from 'lucide-react';
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
    <section className="py-4 md:py-6 px-4 max-w-4xl mx-auto relative z-10 text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-2 shadow-xs">
          <Camera className="w-3.5 h-3.5" />
          <span>Hal yang Mas Syukuri</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0369a1] font-display">
          Yang Mas Kagumi dari Lala
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
          Sentuh kartu foto untuk membalik dan membaca catatan kecil di baliknya.
        </p>
      </motion.div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 text-left">
        {MEMORIES_DATA.map((item, index) => {
          const isFlipped = !!flippedCards[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative cursor-pointer select-none perspective-1000"
              onClick={() => toggleFlip(item.id)}
            >
              {/* Cute Blue Pin */}
              <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 z-20 w-5 h-5 rounded-full bg-[#0284c7] border-2 border-white shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* Card Container */}
              <div
                className={`relative w-full h-72 transition-transform duration-500 transform-style-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side: Photo View */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-2xl p-3.5 pb-4 shadow-md border border-sky-100 flex flex-col justify-between backface-hidden">
                  <div className="w-full h-44 rounded-xl overflow-hidden bg-sky-50 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 text-[10px] font-bold text-[#0284c7] backdrop-blur-xs">
                      {item.category}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Sentuh untuk membalik</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center text-[#0284c7]">
                      <RotateCw className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Back Side: Note View */}
                <div className="absolute inset-0 w-full h-full bg-[#f0f8ff] rounded-2xl p-5 shadow-md border-2 border-[#bae6fd] flex flex-col justify-between rotate-y-180 backface-hidden">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-sky-200">
                      <span className="text-[10px] font-mono font-bold text-[#0284c7] uppercase">
                        Catatan Mas
                      </span>
                      <Heart className="w-3.5 h-3.5 fill-[#0284c7] text-[#0284c7]" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mt-3">
                      "{item.note}"
                    </p>
                  </div>

                  <div className="pt-2 text-center text-[10px] font-mono text-[#0369a1] font-bold">
                    Ketuk untuk kembali
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Continue CTA */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Lanjut ke Momen Spesial Hari Ini</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

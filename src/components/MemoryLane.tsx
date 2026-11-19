import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Camera, RotateCw, X } from 'lucide-react';
import { MEMORIES_DATA, MemoryItem } from '../data/memories';
import { sounds } from '../utils/audio';

export const MemoryLane: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);

  const toggleFlip = (id: number) => {
    sounds.playChime(1.05);
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold mb-3">
          <Camera className="w-3.5 h-3.5" />
          Galeri Kenangan &amp; Foto
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-sky-300 to-blue-200 font-display">
          Lembaran Cerita Kita
        </h2>
        <p className="text-slate-300 text-sm md:text-base mt-2 max-w-md mx-auto">
          Setiap detik bersamamu adalah memori manis. Sentuh kartu untuk membaca pesan rahasia di baliknya ya!
        </p>
      </motion.div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {MEMORIES_DATA.map((item, index) => {
          const isFlipped = !!flippedCards[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? 1.5 : -1.5 }}
              className="relative cursor-pointer select-none perspective-1000"
              onClick={() => toggleFlip(item.id)}
            >
              {/* Blue Push Pin on top */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-300 border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
              </div>

              {/* Card Container */}
              <div
                className={`relative w-full h-[380px] rounded-3xl transition-transform duration-700 transform-style-3d shadow-xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT: Polaroid Photo */}
                <div
                  className="absolute inset-0 w-full h-full bg-white text-slate-800 p-4 pb-6 rounded-3xl shadow-2xl flex flex-col justify-between border-4 border-sky-100 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-100 group">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-sky-950/70 text-sky-200 text-[10px] font-semibold backdrop-blur-xs">
                      {item.tag}
                    </span>
                  </div>

                  <div className="pt-2 px-1 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 font-display">{item.title}</h4>
                      <p className="text-[11px] text-slate-400">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-sky-600 bg-sky-50 px-2 py-1 rounded-lg">
                      <RotateCw className="w-3 h-3 animate-spin-slow" />
                      <span>Balik</span>
                    </div>
                  </div>
                </div>

                {/* BACK: Secret Love Note */}
                <div
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0c1f3d] via-[#091830] to-[#040d1c] text-slate-100 p-6 rounded-3xl shadow-2xl flex flex-col justify-between border-2 border-sky-400/40 backface-hidden rotate-y-180"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="flex items-center justify-between text-xs text-sky-300 pb-2 border-b border-sky-500/20">
                    <span className="font-mono tracking-wider">SECRET NOTE #{item.id}</span>
                    <Heart className="w-4 h-4 fill-sky-400 text-sky-300" />
                  </div>

                  <div className="my-auto py-4">
                    <h5 className="font-display text-lg text-sky-200 font-bold mb-3">{item.title}</h5>
                    <p className="text-sm font-light text-slate-200 leading-relaxed font-handwriting text-2xl">
                      "{item.note}"
                    </p>
                  </div>

                  <div className="text-right text-[11px] text-sky-400/80 font-medium">
                    Ketuk untuk kembali &larr;
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal (if needed) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-slate-900 rounded-3xl overflow-hidden border border-sky-500/30 shadow-2xl p-4"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={selectedPhoto.image} alt={selectedPhoto.title} className="w-full h-80 object-cover rounded-2xl mb-4" />
              <h3 className="text-lg font-bold text-sky-200">{selectedPhoto.title}</h3>
              <p className="text-sm text-slate-300 mt-1">{selectedPhoto.note}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


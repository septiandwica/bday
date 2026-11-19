import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MailOpen, Lock, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerStarBurst } from '../utils/confetti';

interface WelcomeEnvelopeProps {
  onOpen: () => void;
}

export const WelcomeEnvelope: React.FC<WelcomeEnvelopeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);
    sounds.playFanfare();
    sounds.playChime(1.15);
    triggerStarBurst();

    setTimeout(() => {
      setIsRevealed(true);
    }, 700);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center py-6 px-4 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full flex flex-col items-center"
      >
        {/* Secret Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-4 shadow-xs">
          <Lock className="w-3.5 h-3.5" />
          <span>Sebuah Pesan Rahasia</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0369a1] font-display mb-2 tracking-tight">
          Untuk Lala Tersayang
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm font-normal mb-8 max-w-sm">
          Ada lembaran cerita kecil dari Mas tentang perjalanan kita yang ingin Mas bagikan ke kamu.
        </p>

        {/* 3D Interactive Envelope */}
        <motion.div
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpenEnvelope}
          className="relative mx-auto w-72 sm:w-80 h-48 cursor-pointer group"
        >
          {/* Envelope Body */}
          <div className="relative w-full h-full bg-[#7dd3fc] rounded-3xl border-4 border-[#38bdf8] p-5 flex flex-col items-center justify-between shadow-xl overflow-hidden">
            {/* Top flap triangle */}
            <div className="absolute top-0 inset-x-0 h-24 bg-[#38bdf8] clip-path-polygon border-b-2 border-white/40" />

            <div className="w-full flex items-center justify-between text-[11px] text-white font-bold tracking-wider relative z-10">
              <span className="bg-[#0284c7] px-2.5 py-0.5 rounded-md">DARI MAS</span>
              <span className="text-[#0369a1] bg-white px-2.5 py-0.5 rounded-md">UNTUK LALA</span>
            </div>

            {/* Central Seal Heart */}
            <AnimatePresence>
              {!isOpening ? (
                <motion.div className="relative z-10 w-16 h-16 rounded-full bg-[#0284c7] border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white fill-white" />
                  <span className="absolute -bottom-6 text-[10px] font-extrabold tracking-wider text-[#0369a1] whitespace-nowrap bg-white px-2.5 py-0.5 rounded-full shadow-xs border border-sky-200">
                    Buka Surat Rahasia
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#0284c7] border-2 border-[#0284c7]"
                >
                  <MailOpen className="w-8 h-8" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10 w-full text-center">
              <span className="text-xs font-handwriting text-3xl font-bold text-white drop-shadow-xs">
                Lala
              </span>
            </div>
          </div>
        </motion.div>

        {/* Revealed Secret CTA */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-col items-center"
            >
              <button
                onClick={onOpen}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Mulai Perjalanan Rahasia Kita</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

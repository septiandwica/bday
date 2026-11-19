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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center py-4 sm:py-8 px-4 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full flex flex-col items-center"
      >
        {/* Secret Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-3 shadow-xs">
          <Lock className="w-3.5 h-3.5" />
          <span>Sebuah Pesan Rahasia</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0369a1] font-display mb-2 tracking-tight">
          Untuk Lala Tersayang
        </h1>
        <p className="text-slate-600 text-xs sm:text-base font-normal mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
          Ada lembaran cerita kecil dari Mas tentang perjalanan kita yang ingin Mas bagikan ke kamu.
        </p>

        {/* Grand 3D Interactive Envelope (Large & Fully Responsive) */}
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenEnvelope}
          className="relative mx-auto w-full max-w-[340px] sm:max-w-[480px] md:max-w-[540px] h-60 sm:h-72 md:h-80 cursor-pointer group select-none"
        >
          {/* Sliding Letter Card (Emerges upward when opened) */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -65, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-x-4 top-2 h-44 sm:h-52 bg-white rounded-2xl border-2 border-[#bae6fd] shadow-md z-0 flex flex-col items-center justify-center p-4 text-center"
              >
                <Heart className="w-5 h-5 text-[#0284c7] fill-[#0284c7] mb-1.5" />
                <p className="text-xs sm:text-sm font-handwriting text-xl sm:text-2xl text-[#0369a1] font-bold">
                  "Untuk seseorang yang selalu Mas syukuri hadirnya..."
                </p>
                <span className="text-[10px] sm:text-xs text-slate-400 font-mono mt-1">
                  Sentuh tombol di bawah untuk membaca
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope Body */}
          <div className="relative w-full h-full bg-[#7dd3fc] rounded-3xl sm:rounded-[36px] border-4 border-[#38bdf8] p-5 sm:p-7 flex flex-col items-center justify-between shadow-2xl overflow-hidden z-10">
            {/* Top flap triangle (Large triangular flap) */}
            <div className="absolute top-0 inset-x-0 h-28 sm:h-36 md:h-40 bg-[#38bdf8] clip-path-polygon border-b-2 border-white/40 shadow-inner" />

            {/* Top Labels */}
            <div className="w-full flex items-center justify-between text-xs sm:text-sm text-white font-bold tracking-wider relative z-20">
              <span className="bg-[#0284c7] px-3 py-1 rounded-lg shadow-xs">
                DARI MAS
              </span>
              <span className="text-[#0369a1] bg-white px-3 py-1 rounded-lg shadow-xs">
                UNTUK LALA
              </span>
            </div>

            {/* Big Central Wax Seal Heart */}
            <div className="relative z-30 my-auto flex flex-col items-center justify-center">
              <AnimatePresence>
                {!isOpening ? (
                  <motion.div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#0284c7] border-4 border-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-9 h-9 sm:w-11 sm:h-11 text-white fill-white" />
                    <span className="absolute -bottom-7 sm:-bottom-8 text-[10px] sm:text-xs font-extrabold tracking-wider text-[#0369a1] whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-md border-2 border-sky-200">
                      Buka Surat Rahasia
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white flex items-center justify-center text-[#0284c7] border-2 border-[#0284c7]"
                  >
                    <MailOpen className="w-9 h-9 sm:w-11 sm:h-11" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Recipient Script */}
            <div className="relative z-20 w-full text-center">
              <span className="font-handwriting text-4xl sm:text-5xl font-bold text-white drop-shadow-md">
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
              className="mt-8 sm:mt-10 flex flex-col items-center"
            >
              <button
                onClick={onOpen}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Mulai Perjalanan Rahasia Kita</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

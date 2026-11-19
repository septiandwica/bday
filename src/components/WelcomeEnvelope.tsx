import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MailOpen } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerStarBurst } from '../utils/confetti';

interface WelcomeEnvelopeProps {
  onOpen: () => void;
}

export const WelcomeEnvelope: React.FC<WelcomeEnvelopeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);
    sounds.playFanfare();
    sounds.playChime(1.2);
    triggerStarBurst();

    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-lg w-full"
      >
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#bae6fd] text-[#0284c7] text-xs font-bold mb-6 shadow-sm"
        >
          <Heart className="w-3.5 h-3.5 fill-[#0284c7] text-[#0284c7]" />
          <span>Sebuah Kejutan Spesial Ulang Tahun</span>
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-[#0369a1] font-display mb-3 tracking-tight">
          Untuk Najla Tersayang
        </h1>
        <p className="text-slate-600 text-sm md:text-base font-normal mb-10 max-w-md mx-auto">
          Ada sepucuk surat manis dan halaman spesial berwarna biru cerah favoritmu.
        </p>

        {/* 3D Interactive Envelope (Bright Sky Blue, Solid Colors, NO Dark Gradient) */}
        <motion.div
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpenEnvelope}
          className="relative mx-auto w-72 md:w-84 h-48 md:h-56 cursor-pointer group"
        >
          {/* Envelope Body */}
          <div className="relative w-full h-full bg-[#7dd3fc] rounded-3xl border-4 border-[#38bdf8] p-6 flex flex-col items-center justify-between shadow-xl overflow-hidden">
            {/* Top flap triangle (Clean solid white/sky) */}
            <div className="absolute top-0 inset-x-0 h-24 bg-[#38bdf8] clip-path-polygon border-b-2 border-white/40" />

            <div className="w-full flex items-center justify-between text-xs text-white font-bold tracking-wider relative z-10">
              <span className="bg-[#0284c7] px-2 py-0.5 rounded-md">SPECIAL FOR YOU</span>
              <span className="text-[#0369a1] bg-white px-2 py-0.5 rounded-md">100% LOVE</span>
            </div>

            {/* Central Seal (Solid Royal Blue & White Heart) */}
            <AnimatePresence>
              {!isOpening ? (
                <motion.div
                  className="relative z-10 w-16 h-16 rounded-full bg-[#0284c7] border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                >
                  <Heart className="w-8 h-8 text-white fill-white" />
                  <span className="absolute -bottom-6 text-[10px] uppercase font-extrabold tracking-widest text-[#0369a1] whitespace-nowrap bg-white px-2.5 py-0.5 rounded-full shadow-xs border border-sky-200">
                    Klik Untuk Buka 💙
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 1, rotate: 0 }}
                  animate={{ scale: 1.4, rotate: 15, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#0284c7] border-2 border-[#0284c7]"
                >
                  <MailOpen className="w-8 h-8" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center relative z-10">
              <span className="text-xs font-handwriting text-3xl font-bold text-white drop-shadow-xs">Najla</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom hint */}
        <p className="text-xs text-slate-500 mt-8 flex items-center justify-center gap-1.5 font-medium">
          <span>Sentuh amplop birunya untuk membuka kejutan</span>
          <span className="inline-block animate-bounce">💌</span>
        </p>
      </motion.div>
    </div>
  );
};

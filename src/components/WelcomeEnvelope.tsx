import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
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
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      {/* Decorative Floating Sparkles */}
      <div className="absolute top-1/4 left-10 md:left-24 text-sky-400 opacity-60 animate-float">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-1/4 right-10 md:right-28 text-blue-400 opacity-50 animate-float-delayed">
        <Heart className="w-7 h-7 fill-sky-400/30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center max-w-lg w-full"
      >
        {/* Subtitle / Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-semibold mb-6 shadow-lg shadow-sky-950/50"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Sebuah Kejutan Spesial Hari Ini</span>
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-blue-300 to-sky-100 font-display mb-3 tracking-tight">
          Untuk Najla Tersayang
        </h1>
        <p className="text-slate-300 text-sm md:text-base font-light mb-10 max-w-md mx-auto">
          Ada sepucuk surat dan dunia penuh warna biru yang dibuat istimewa untuk merayakan hari kelahiranmu.
        </p>

        {/* 3D Interactive Envelope */}
        <motion.div
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenEnvelope}
          className="relative mx-auto w-72 md:w-84 h-48 md:h-56 cursor-pointer group"
        >
          {/* Glowing Aura Behind Envelope */}
          <div className="absolute -inset-2 bg-gradient-to-r from-sky-600 via-blue-500 to-cyan-400 rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition-opacity" />

          {/* Envelope Body */}
          <div className="relative w-full h-full bg-gradient-to-b from-slate-900 to-[#071328] rounded-2xl border-2 border-sky-400/40 p-6 flex flex-col items-center justify-between shadow-2xl overflow-hidden">
            {/* Flap lines */}
            <div className="absolute top-0 inset-x-0 h-24 border-b border-sky-500/20 bg-gradient-to-b from-sky-950/60 to-transparent clip-path-polygon" />

            <div className="w-full flex items-center justify-between text-xs text-sky-400/80 font-mono tracking-wider">
              <span>SPECIAL DELIVERY</span>
              <span>100% LOVE</span>
            </div>

            {/* Central Wax Seal */}
            <AnimatePresence>
              {!isOpening ? (
                <motion.div
                  className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-blue-700 via-sky-500 to-blue-400 p-1 shadow-lg flex items-center justify-center border-2 border-sky-200/80 group-hover:scale-110 transition-transform"
                >
                  <div className="w-full h-full rounded-full bg-blue-900 flex items-center justify-center text-white">
                    <Heart className="w-7 h-7 text-sky-200 fill-sky-300" />
                  </div>
                  <span className="absolute -bottom-6 text-[10px] uppercase font-bold tracking-widest text-sky-300 whitespace-nowrap">
                    Klik Untuk Buka
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 1, rotate: 0 }}
                  animate={{ scale: 1.4, rotate: 15, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-full bg-sky-400 flex items-center justify-center text-slate-950"
                >
                  <MailOpen className="w-8 h-8" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center">
              <p className="text-xs font-handwriting text-2xl text-sky-200">Najla</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom hint */}
        <p className="text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5">
          <span>Sentuh amplop untuk membuka kejutan</span>
          <span className="inline-block animate-bounce">💙</span>
        </p>
      </motion.div>
    </div>
  );
};


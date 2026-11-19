import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../utils/audio';
import { triggerCandleConfetti } from '../utils/confetti';

interface AnimatedCakeProps {
  onWishDone?: () => void;
}

export const AnimatedCake: React.FC<AnimatedCakeProps> = ({ onWishDone }) => {
  const [isLit, setIsLit] = useState(true);
  const [isBlown, setIsBlown] = useState(false);

  const handleBlowCandle = () => {
    if (!isLit) return;
    sounds.playBlowCandle();
    setIsLit(false);

    setTimeout(() => {
      setIsBlown(true);
      sounds.playFanfare();
      triggerCandleConfetti();
      onWishDone?.();
    }, 400);
  };

  const handleRelight = () => {
    sounds.playChime(1.0);
    setIsLit(true);
    setIsBlown(false);
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-sm mx-auto">
      {/* Cake Container */}
      <div className="relative w-64 h-56 flex flex-col items-center justify-end pb-4">
        {/* Soft Shadow Base */}
        <div className="absolute bottom-4 w-56 h-6 rounded-full bg-sky-200/90 blur-xs" />

        {/* Candle with Flame */}
        <div className="flex flex-col items-center cursor-pointer mb-[-2px] relative z-20" onClick={handleBlowCandle}>
          <AnimatePresence>
            {isLit ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0, opacity: 0, y: -10 }}
                className="w-4 h-7 rounded-full bg-[#facc15] border border-amber-400 animate-flame drop-shadow-[0_0_8px_#facc15]"
                title="Klik untuk tiup lilin"
              />
            ) : (
              <motion.div
                initial={{ opacity: 0.8, y: 0 }}
                animate={{ opacity: 0, y: -25, scale: 1.6 }}
                transition={{ duration: 1.2 }}
                className="text-xs text-slate-400 font-mono"
              >
                
              </motion.div>
            )}
          </AnimatePresence>

          {/* Candle stick */}
          <div className="w-3.5 h-10 rounded-t-sm bg-[#38bdf8] border-2 border-white relative overflow-hidden shadow-xs">
            <div className="w-full h-1.5 bg-white mt-1" />
            <div className="w-full h-1.5 bg-white mt-2" />
          </div>
        </div>

        {/* Tier 1 (Top Tier - Solid Pastel Sky Blue) */}
        <div className="w-36 h-14 bg-[#7dd3fc] rounded-2xl border-4 border-white shadow-md relative z-10 flex items-center justify-center overflow-hidden">
          {/* Frosting drips */}
          <div className="absolute -top-1 inset-x-0 flex justify-around">
            <span className="w-4 h-4 bg-white rounded-full" />
            <span className="w-5 h-5 bg-white rounded-full" />
            <span className="w-4 h-4 bg-white rounded-full" />
            <span className="w-5 h-4 bg-white rounded-full" />
          </div>
          <span className="text-xs font-handwriting text-2xl text-[#0369a1] font-bold tracking-wider relative z-10 mt-1">
            Lala
          </span>
        </div>

        {/* Tier 2 (Bottom Tier - Solid Bright Sky Blue) */}
        <div className="w-52 h-20 bg-[#38bdf8] rounded-2xl border-4 border-white shadow-lg relative flex items-center justify-center overflow-hidden -mt-1">
          {/* White cream pearls */}
          <div className="w-full h-2.5 bg-white/70 flex items-center justify-around px-3">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>

        {/* Cake Stand Plate */}
        <div className="w-60 h-3.5 bg-white rounded-full shadow-md border-2 border-sky-200" />
        <div className="w-20 h-4 bg-[#bae6fd] rounded-b-xl border-2 border-white" />
      </div>

      {/* Button Controls */}
      <div className="mt-4">
        {isLit ? (
          <button
            onClick={handleBlowCandle}
            className="px-6 py-2.5 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Tiup Lilin Ulang Tahun</span>
            <span></span>
          </button>
        ) : (
          <button
            onClick={handleRelight}
            className="px-4 py-2 rounded-2xl bg-white text-[#0284c7] border-2 border-sky-300 font-bold text-xs hover:bg-sky-50 transition-all cursor-pointer shadow-xs"
          >
            Nyalakan Lilin Lagi ↩
          </button>
        )}
      </div>

      {/* Wish Message Reveal */}
      <AnimatePresence>
        {isBlown && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 rounded-2xl bg-white border-2 border-[#38bdf8] shadow-md text-center max-w-xs"
          >
            <p className="text-xs font-bold text-[#0369a1] mb-1">Permohonanmu Telah Terkabul </p>
            <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
              Semoga Lala panjang umur, sehat selalu, dan semua impian yang kamu rancang tercapai dengan indah.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


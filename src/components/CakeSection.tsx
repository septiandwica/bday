import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, RotateCcw, Heart, Cake, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerCandleConfetti } from '../utils/confetti';

interface CakeSectionProps {
  onContinue: () => void;
}

export const CakeSection: React.FC<CakeSectionProps> = ({ onContinue }) => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [hasMadeWish, setHasMadeWish] = useState(false);

  const allCandlesOut = candlesLit.every((lit) => !lit);

  const extinguishCandle = (index: number) => {
    if (!candlesLit[index]) return;
    sounds.playBlowCandle();
    sounds.playChime(1.1);
    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    if (updated.every((lit) => !lit)) {
      triggerCelebration();
    }
  };

  const blowAllCandles = () => {
    if (allCandlesOut) return;
    sounds.playBlowCandle();
    setCandlesLit([false, false, false]);
    triggerCelebration();
  };

  const triggerCelebration = () => {
    setHasMadeWish(true);
    setTimeout(() => {
      sounds.playFanfare();
      triggerCandleConfetti();
    }, 350);
  };

  const relightCandles = () => {
    sounds.playChime(0.9);
    setCandlesLit([true, true, true]);
    setHasMadeWish(false);
  };

  return (
    <section className="py-4 md:py-6 px-4 max-w-2xl mx-auto text-center relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-2 shadow-xs">
          <Cake className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>Momen Spesial Ulang Tahun</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0369a1] font-display">
          Make a Wish, Lala!
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
          Pejamkan mata, sebutkan harapan terbaikmu dalam hati, lalu sentuh atau tiup lilinnya ya.
        </p>
      </motion.div>

      {/* Interactive Birthday Cake Container */}
      <div className="relative mx-auto w-64 sm:w-72 h-64 flex flex-col items-center justify-end pb-4">
        {/* Shadow under cake */}
        <div className="absolute bottom-4 w-52 h-8 bg-sky-200/60 rounded-full blur-xs pointer-events-none" />

        {/* 3 Candles */}
        <div className="flex justify-center gap-6 mb-[-3px] relative z-20">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => extinguishCandle(idx)}
            >
              {/* Flame */}
              <AnimatePresence>
                {candlesLit[idx] ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0, y: -8 }}
                    className="relative w-4 h-6 flex items-center justify-center mb-0.5"
                    title="Sentuh untuk tiup lilin ini"
                  >
                    <div className="w-3.5 h-6 rounded-full bg-amber-300 border border-amber-400 animate-flame" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.6, y: 0 }}
                    animate={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.6 }}
                    className="w-2 h-6 flex items-center justify-center mb-0.5 text-slate-400"
                  >
                    <Wind className="w-3 h-3 text-sky-400" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Body */}
              <div className="w-3.5 h-10 rounded-t-sm bg-[#38bdf8] border-2 border-white shadow-xs relative overflow-hidden">
                <div className="w-full h-1.5 bg-white mt-1" />
                <div className="w-full h-1.5 bg-white mt-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Top Cake Tier */}
        <div className="w-40 h-14 bg-[#7dd3fc] rounded-2xl shadow-sm relative z-10 border-4 border-white flex items-center justify-center overflow-hidden">
          <div className="absolute -top-1 inset-x-0 flex justify-around">
            <span className="w-4 h-3 bg-white rounded-full shadow-xs" />
            <span className="w-5 h-4 bg-white rounded-full shadow-xs" />
            <span className="w-4 h-3 bg-white rounded-full shadow-xs" />
          </div>
          <span className="text-xs font-handwriting text-2xl text-[#0369a1] font-bold tracking-wider relative z-10">
            Lala
          </span>
        </div>

        {/* Bottom Cake Tier */}
        <div className="w-52 h-20 bg-[#38bdf8] rounded-2xl shadow-md relative border-4 border-white flex items-center justify-center overflow-hidden">
          <div className="w-full h-2.5 bg-white/70 flex items-center justify-around px-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {!allCandlesOut ? (
          <button
            onClick={blowAllCandles}
            className="px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Wind className="w-4 h-4" />
            <span>Tiup Semua Lilin</span>
          </button>
        ) : (
          <button
            onClick={relightCandles}
            className="px-4 py-2 rounded-xl bg-white text-[#0284c7] border-2 border-sky-300 hover:bg-sky-50 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nyalakan Lilin Lagi</span>
          </button>
        )}
      </div>

      {/* Birthday Wish Card Reveal & Continue CTA */}
      <AnimatePresence>
        {hasMadeWish && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-6 p-5 sm:p-6 rounded-3xl bg-white/95 border-2 border-[#38bdf8] max-w-lg mx-auto shadow-lg text-center"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-100 text-[#0284c7] mb-2 mx-auto">
              <Heart className="w-5 h-5 fill-[#0284c7]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-[#0369a1] mb-1">
              Harapan Terbaik untuk Lala
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal mb-5">
              Selamat bertambah usia ya, Lala. Semoga selalu sehat, tenang hatinya, dan setiap langkah yang kamu tuju selalu dimudahkan.
            </p>

            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Buka Surat Tulus dari Mas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerCandleConfetti } from '../utils/confetti';

export const CakeSection: React.FC = () => {
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
    <section className="py-20 px-4 max-w-4xl mx-auto text-center relative z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Tiup Lilin Ulang Tahun
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#0369a1] font-display">
          Make a Wish, Najla!
        </h2>
        <p className="text-slate-600 text-sm md:text-base mt-2 max-w-md mx-auto">
          Pejamkan mata, buat harapan terbaikmu dalam hati, lalu tiup lilinnya ya! 🎂
        </p>
      </motion.div>

      {/* Interactive Birthday Cake Container (Bright Pastel Blue & White, NO Gradients) */}
      <div className="relative mx-auto w-72 md:w-88 h-80 flex flex-col items-center justify-end pb-8">
        {/* Soft shadow under cake */}
        <div className="absolute bottom-6 w-60 h-10 bg-sky-200/80 rounded-full blur-md pointer-events-none" />

        {/* 3 Candles */}
        <div className="flex justify-center gap-8 mb-[-4px] relative z-20">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="flex flex-col items-center cursor-pointer group" onClick={() => extinguishCandle(idx)}>
              {/* Flame */}
              <AnimatePresence>
                {candlesLit[idx] ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0, y: -10 }}
                    className="relative w-5 h-8 flex items-center justify-center"
                    title="Klik untuk tiup lilin ini"
                  >
                    {/* Flame in bright yellow/orange */}
                    <div className="w-4 h-7 rounded-full bg-[#facc15] border border-amber-400 animate-flame" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -20, scale: 1.5 }}
                    transition={{ duration: 0.9 }}
                    className="w-2 h-4 text-slate-400 text-xs"
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Body (Bright Solid Blue & White Stripes) */}
              <div className="w-4 h-12 rounded-t-sm bg-[#38bdf8] border-2 border-white shadow-sm relative overflow-hidden">
                <div className="w-full h-2 bg-white mt-1" />
                <div className="w-full h-2 bg-white mt-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Top Cake Tier (Solid Bright Sky Blue) */}
        <div className="w-48 h-16 bg-[#7dd3fc] rounded-2xl shadow-md relative z-10 border-4 border-white flex items-center justify-center overflow-hidden">
          {/* Frosting Drips */}
          <div className="absolute -top-1 inset-x-0 flex justify-around">
            <span className="w-5 h-4 bg-white rounded-full shadow-xs" />
            <span className="w-6 h-5 bg-white rounded-full shadow-xs" />
            <span className="w-5 h-4 bg-white rounded-full shadow-xs" />
            <span className="w-6 h-5 bg-white rounded-full shadow-xs" />
          </div>
          <span className="text-xs font-handwriting text-2xl text-[#0369a1] font-bold tracking-wider relative z-10">
            Najla
          </span>
        </div>

        {/* Bottom Cake Tier (Solid Bright Vibrant Blue) */}
        <div className="w-64 h-24 bg-[#38bdf8] rounded-2xl shadow-lg relative border-4 border-white flex items-center justify-center overflow-hidden">
          {/* Decorative white pearl line */}
          <div className="w-full h-3 bg-white/70 flex items-center justify-around px-4">
            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
          </div>
        </div>

        {/* Cake Stand Plate (Clean White) */}
        <div className="w-72 h-4 bg-white rounded-full shadow-md border-2 border-sky-200" />
        <div className="w-24 h-5 bg-[#bae6fd] rounded-b-xl shadow-xs border-2 border-white" />
      </div>

      {/* Interactive Controls */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {!allCandlesOut ? (
          <button
            onClick={blowAllCandles}
            className="px-6 py-3.5 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Wind className="w-4 h-4 animate-pulse" />
            <span>Tiup Semua Lilin Sekarang! 🎂</span>
          </button>
        ) : (
          <button
            onClick={relightCandles}
            className="px-5 py-2.5 rounded-2xl bg-white text-[#0284c7] border-2 border-sky-300 hover:bg-sky-50 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nyalakan Lilin Lagi</span>
          </button>
        )}
      </div>

      {/* Birthday Wish Card Reveal (Bright Clean White, Solid Sky Border) */}
      <AnimatePresence>
        {hasMadeWish && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mt-10 p-6 md:p-8 rounded-3xl bg-white border-2 border-[#38bdf8] max-w-xl mx-auto shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10 text-center">
              <span className="text-4xl mb-2 inline-block">🎉💙✨</span>
              <h3 className="text-2xl font-bold font-display text-[#0369a1] mb-2">
                Harapanmu Telah Terkabul!
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed font-normal">
                Selamat bertambah usia, <span className="font-bold text-[#0284c7]">Najla</span>! Semoga panjang umur, sehat dan ceria selalu, dimudahkan segala langkah dan urusanmu, serta selalu dilingkupi kebahagiaan yang melimpah ruah.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

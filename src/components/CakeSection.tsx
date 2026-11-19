import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wind, Flame, RotateCcw } from 'lucide-react';
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
    }, 400);
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Momen Spesial Ulang Tahun
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-sky-300 to-blue-200 font-display">
          Tiup Lilin &amp; Make a Wish
        </h2>
        <p className="text-slate-300 text-sm md:text-base mt-2 max-w-md mx-auto">
          Pejamkan matamu, buat satu permohonan tulus dari hatimu, lalu tiup lilin birunya ya!
        </p>
      </motion.div>

      {/* Interactive Birthday Cake Container */}
      <div className="relative mx-auto w-72 md:w-88 h-80 flex flex-col items-center justify-end pb-8">
        {/* Glow under cake */}
        <div className="absolute bottom-6 w-64 h-16 bg-sky-500/25 rounded-full blur-2xl pointer-events-none" />

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
                    {/* Flame tear-drop in sky blue/yellow core */}
                    <div className="w-4 h-7 rounded-full bg-gradient-to-t from-sky-500 via-cyan-300 to-white animate-flame" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -20, scale: 1.5 }}
                    transition={{ duration: 1 }}
                    className="w-2 h-4 text-slate-400 text-[10px]"
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Body (Striped Blue/Silver) */}
              <div className="w-4 h-12 rounded-t-sm bg-gradient-to-b from-sky-200 via-blue-400 to-sky-600 shadow-md relative overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.4)_4px,rgba(255,255,255,0.4)_8px)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Top Cake Tier (Frosting & Sprinkles) */}
        <div className="w-48 h-16 bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 rounded-2xl shadow-lg relative z-10 border-t-2 border-white/40 flex items-center justify-center overflow-hidden">
          {/* Frosting Drips */}
          <div className="absolute -top-1 inset-x-0 flex justify-around">
            <span className="w-5 h-4 bg-white/70 rounded-full" />
            <span className="w-6 h-5 bg-white/70 rounded-full" />
            <span className="w-5 h-4 bg-white/70 rounded-full" />
            <span className="w-6 h-5 bg-white/70 rounded-full" />
          </div>
          <span className="text-xs font-handwriting text-2xl text-sky-950 font-bold tracking-wider">Najla</span>
        </div>

        {/* Bottom Cake Tier */}
        <div className="w-64 h-24 bg-gradient-to-r from-sky-600 via-blue-500 to-sky-700 rounded-2xl shadow-2xl relative border-t-2 border-sky-300/40 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
          {/* Decorative frosting ribbon */}
          <div className="w-full h-3 bg-white/30 backdrop-blur-xs flex items-center justify-around px-4">
            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
          </div>
        </div>

        {/* Cake Stand Plate */}
        <div className="w-72 h-4 bg-gradient-to-r from-slate-300 via-white to-slate-300 rounded-full shadow-xl border-t border-white" />
        <div className="w-24 h-5 bg-gradient-to-b from-slate-400 to-slate-600 rounded-b-xl shadow-md" />
      </div>

      {/* Interactive Controls */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        {!allCandlesOut ? (
          <button
            onClick={blowAllCandles}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600 text-white font-bold text-sm shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Wind className="w-4 h-4 animate-pulse" />
            <span>Tiup Semua Lilin Sekarang! 🎂</span>
          </button>
        ) : (
          <button
            onClick={relightCandles}
            className="px-5 py-2.5 rounded-2xl glass-panel text-sky-300 hover:text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer hover:border-sky-400/50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nyalakan Lilin Lagi</span>
          </button>
        )}
      </div>

      {/* Birthday Wish Card Reveal */}
      <AnimatePresence>
        {hasMadeWish && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mt-10 p-6 md:p-8 rounded-3xl glass-panel border border-sky-400/40 max-w-xl mx-auto shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-sky-400/10 pointer-events-none">
              <Flame className="w-24 h-24" />
            </div>

            <div className="relative z-10 text-center">
              <span className="text-3xl mb-2 inline-block">🎉💙✨</span>
              <h3 className="text-xl md:text-2xl font-bold font-display text-sky-200 mb-2">
                Permohonanmu Telah Dikirim ke Bintang-Bintang!
              </h3>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed font-light">
                Selamat bertambah usia, <span className="font-semibold text-sky-300">Najla</span>. Semoga panjang umur, sehat selalu, dimudahkan segala langkah dan urusanmu, serta selalu dilingkupi kebahagiaan yang melimpah ruah.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


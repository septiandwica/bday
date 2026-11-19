import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Clock, ArrowRight, Gift } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerGrandEnvelopeBurst } from '../utils/confetti';

interface CountdownGateProps {
  onComplete: () => void;
}

// Target: 20 November 2026 00:00:00 (Local Time)
const TARGET_TIME = new Date(2026, 10, 20, 0, 0, 0).getTime();

export const CountdownGate: React.FC<CountdownGateProps> = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalMs: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: TARGET_TIME - Date.now(),
  });

  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = TARGET_TIME - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, totalMs: 0 });
        if (!hasCelebrated) {
          setHasCelebrated(true);
          sounds.playFanfare();
          triggerGrandEnvelopeBurst();
          setTimeout(() => {
            onComplete();
          }, 3000);
        }
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds, totalMs: diff });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [hasCelebrated, onComplete]);

  const handleManualSkip = () => {
    sounds.playChime(1.1);
    triggerGrandEnvelopeBurst();
    onComplete();
  };

  const isMidnightReached = timeLeft.totalMs <= 0 || hasCelebrated;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center py-4 px-3 sm:px-4 text-center select-none relative z-10">
      
      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-sky-200 text-[#0284c7] text-xs font-semibold mb-3 shadow-xs"
      >
        <Clock className="w-3.5 h-3.5" />
        <span>Menghitung Detik Menuju Hari Bahagiamu</span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-4xl font-extrabold text-[#0369a1] font-display mb-1.5 tracking-tight"
      >
        Ulang Tahun ke-21 Lala
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-600 text-xs sm:text-sm font-normal mb-6 max-w-md mx-auto"
      >
        {isMidnightReached
          ? "Waktu yang dinanti telah tiba! Selamat ulang tahun yang ke-21, Lala tersayang."
          : "Tepat jam 00:00 (20 November 2026), sebuah kejutan manis dari Mas akan terbuka untuk kamu."}
      </motion.p>

      {/* COUNTDOWN TILES */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm bg-white/95 border-3 border-[#bae6fd] rounded-3xl p-5 sm:p-7 shadow-xl relative backdrop-blur-xs mb-6"
      >
        <AnimatePresence mode="wait">
          {!isMidnightReached ? (
            <motion.div
              key="counting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 sm:gap-3"
            >
              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-sky-50 border-2 border-sky-200 flex items-center justify-center shadow-inner">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#0284c7]">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 mt-1.5 uppercase tracking-wider">
                  Jam
                </span>
              </div>

              <span className="text-xl sm:text-2xl font-bold text-sky-400 mb-5">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-sky-50 border-2 border-sky-200 flex items-center justify-center shadow-inner">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#0284c7]">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 mt-1.5 uppercase tracking-wider">
                  Menit
                </span>
              </div>

              <span className="text-xl sm:text-2xl font-bold text-sky-400 mb-5">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-sky-50 border-2 border-sky-200 flex items-center justify-center shadow-inner">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#0284c7]">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 mt-1.5 uppercase tracking-wider">
                  Detik
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-4 flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center text-[#0284c7] mb-3">
                <Sparkles className="w-7 h-7 animate-pulse text-[#0284c7]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0369a1] font-display mb-1">
                20 November 2026
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Membuka Amplop Rahasia untuk Lala...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Button Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center gap-2"
      >
        <button
          onClick={handleManualSkip}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all cursor-pointer"
        >
          {isMidnightReached ? (
            <>
              <span>Buka Amplop Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <Gift className="w-4 h-4" />
              <span>Buka Amplop Sekarang</span>
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};

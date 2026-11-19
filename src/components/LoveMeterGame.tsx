import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Infinity as InfinityIcon, RotateCcw, Camera, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerStarBurst, triggerGrandEnvelopeBurst } from '../utils/confetti';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
}

interface LoveMeterGameProps {
  onRestart: () => void;
  onGoToPhotoStudio?: () => void;
}

export const LoveMeterGame: React.FC<LoveMeterGameProps> = ({ onRestart, onGoToPhotoStudio }) => {
  const [loveCount, setLoveCount] = useState(100);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sounds.playHeartPop();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() * 40 - 20),
      size: Math.random() * 8 + 18,
    };

    setFloatingHearts((prev) => [...prev.slice(-12), newHeart]);
    const nextCount = loveCount + 25;
    setLoveCount(nextCount);

    if (nextCount % 200 === 0 || nextCount === 500 || nextCount === 1000) {
      sounds.playFanfare();
      triggerStarBurst();
    }
    if (nextCount === 1000) {
      triggerGrandEnvelopeBurst();
    }
  };

  const getLoveStatusMessage = () => {
    if (loveCount < 250) return 'Rasa sayang yang tulus dan jujur untuk Lala';
    if (loveCount < 500) return 'Makin hari makin bersyukur kenal dan punya kamu';
    if (loveCount < 1000) return 'Satu frekuensi, saling melengkapi dan saling support';
    return 'Kadar cinta tanpa batas: Selamanya Mas ada untuk kamu';
  };

  return (
    <section className="py-2 sm:py-4 px-3 sm:px-4 max-w-xl mx-auto text-center relative z-10 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 border-4 border-[#bae6fd] rounded-3xl p-6 sm:p-9 shadow-xl relative overflow-hidden"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-50 border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-3 shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-[#0284c7]" />
          <span>Babak Penutup</span>
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0369a1] font-display">
          Love Meter untuk Lala
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
          Sentuh tombol hati biru di bawah untuk mengisi energi cinta tanpa batas!
        </p>

        {/* Big Heart Button with floating hearts container */}
        <div className="relative my-7 h-44 sm:h-48 flex items-center justify-center">
          {/* Floating rising hearts */}
          <AnimatePresence>
            {floatingHearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, y: 0, scale: 0.8, x: h.x - 40 }}
                animate={{ opacity: 0, y: -150, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute pointer-events-none select-none text-[#0284c7]"
              >
                <Heart style={{ width: h.size, height: h.size }} className="fill-[#0284c7]" />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Interactive Heart Button (Bright Blue & White) */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleHeartClick}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#38bdf8] border-4 border-white shadow-xl flex items-center justify-center cursor-pointer group relative"
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center group-hover:bg-sky-50 transition-colors">
              <Heart className="w-14 h-14 sm:w-16 sm:h-16 text-[#0284c7] fill-[#0284c7] group-hover:scale-110 transition-transform" />
            </div>
            <span className="absolute -bottom-2 px-3 py-1 rounded-full bg-[#0284c7] text-[10px] font-bold text-white shadow-sm border-2 border-white">
              Sentuh Aku!
            </span>
          </motion.button>
        </div>

        {/* Counter Display */}
        <div className="space-y-2 mb-6">
          <div className="text-3xl sm:text-4xl font-black font-mono text-[#0369a1] flex items-center justify-center gap-1.5">
            <span>{loveCount}%</span>
            {loveCount >= 500 && (
              <InfinityIcon className="w-8 h-8 text-[#0284c7] animate-pulse ml-1" />
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#0284c7] font-bold px-2">
            {getLoveStatusMessage()}
          </p>
        </div>

        {/* Final Message */}
        <div className="p-4 rounded-2xl bg-[#f0f8ff] border border-sky-200 text-slate-700 text-xs sm:text-sm leading-relaxed mb-6">
          "Terima kasih sudah meluangkan waktu buat baca ini, Lala. Selamat ulang tahun sekali lagi, semoga hari ini dan hari-hari ke depan selalu penuh senyum buat kamu."
        </div>

        {/* Footer Actions: Switch to Photo Studio or Restart */}
        <div className="pt-4 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-[#0284c7] font-bold text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai dari Amplop Awal</span>
          </button>

          {onGoToPhotoStudio && (
            <button
              onClick={onGoToPhotoStudio}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border-2 border-sky-300 text-[#0284c7] hover:bg-sky-50 font-bold text-xs transition-all shadow-xs cursor-pointer hover:scale-105 active:scale-95"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Buka Studio Foto Polaroid</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
};

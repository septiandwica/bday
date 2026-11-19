import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, RotateCcw, MapPin } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerHeartRain } from '../utils/confetti';

interface LoveLetterProps {
  onRestart: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onRestart }) => {
  const [supportCount, setSupportCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);

  const handleSendSupport = (e: React.MouseEvent<HTMLButtonElement>) => {
    sounds.playHeartPop();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    setFloatingHearts((prev) => [
      ...prev.slice(-10),
      { id: Date.now() + Math.random(), x: x + (Math.random() * 40 - 20) },
    ]);
    setSupportCount((prev) => prev + 1);

    if ((supportCount + 1) % 3 === 0) {
      sounds.playFanfare();
      triggerHeartRain();
    }
  };

  return (
    <section className="py-4 md:py-6 px-4 max-w-2xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 border-4 border-[#bae6fd] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
      >
        {/* Decorative LDR Stamp */}
        <div className="absolute top-5 right-5 px-2.5 py-1.5 rounded-xl border-2 border-dashed border-[#38bdf8] flex items-center gap-1 text-center bg-[#f0f8ff]">
          <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
          <span className="text-[10px] font-mono font-bold text-[#0369a1]">
            Cikarang &bull; Jakarta
          </span>
        </div>

        {/* Letter Header */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-[#0284c7] font-bold flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-[#0284c7]" />
            <span>Surat Tulus dari Mas</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0369a1] font-display mt-1">
            Untuk Lala Tersayang
          </h2>
        </div>

        {/* Letter Body: Simple, Direct, Natural & Grounded */}
        <div className="space-y-3.5 text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
          <p>
            Selamat ulang tahun ya, Lala. Hari ini Mas pengen ngucapin terima kasih banyak sekali buat kamu.
          </p>
          <p>
            Sampai sekarang, Mas seneng banget bisa kenal dan belajar banyak hal dari kamu—soal kehidupan, soal sudut pandang, dan banyak hal lainnya. Kamu selalu jadi orang yang ga pernah menganggap remeh goal dan impian Mas. Kamu juga ga melulu bilang hal-hal negatif, selalu ngasih energi baik yang bikin Mas tenang.
          </p>
          <p>
            Mulai dari ragu di 2024, masa-masa makan hati di 2025 sampai kita rill bikin usaha bareng, keliling nyari jati diri di 2026, sampai jadian lewat chat dan kamu ngasih buku manis <span className="font-semibold text-[#0284c7]">"I Have a Crush on You"</span> pas ultah Mas 8 September lalu—semuanya bener-bener berharga buat Mas.
          </p>
          <p>
            Walaupun sekarang kita lagi LDR Cikarang - Jakarta, jarak itu sama sekali ga mengurangi komitmen Mas. Banyak banget harapan Mas ke depan bareng kamu. Dan yang paling utama: <span className="font-bold text-[#0369a1]">Mas pengen selalu ada buat men-support apa pun yang Lala pengen lakuin</span>.
          </p>
          <p className="pt-1 font-bold text-[#0284c7]">
            Terima kasih banyak ya sudah ada untuk Mas. Mas sayang banget sama Lala.
          </p>
        </div>

        {/* Signature & Interactive Support */}
        <div className="mt-8 pt-5 border-t-2 border-[#bae6fd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400 font-medium">Dari yang selalu sayang kamu,</p>
            <p className="font-handwriting text-2xl text-[#0369a1] font-bold mt-0.5">Mas</p>
          </div>

          <div className="relative">
            {/* Floating rising hearts */}
            <AnimatePresence>
              {floatingHearts.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -70, scale: 1.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="absolute pointer-events-none text-[#0284c7]"
                  style={{ left: h.x }}
                >
                  <Heart className="w-4 h-4 fill-[#0284c7]" />
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={handleSendSupport}
              className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm bg-[#0284c7] hover:bg-[#0369a1] text-white hover:scale-105 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Semangat untuk Mas ({supportCount})</span>
            </button>
          </div>
        </div>

        {/* Restart Button */}
        <div className="mt-6 pt-4 border-t border-sky-100 flex justify-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold text-slate-500 hover:text-[#0284c7] hover:bg-sky-50 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Mulai Baca dari Awal</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

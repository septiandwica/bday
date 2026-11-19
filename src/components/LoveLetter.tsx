import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerHeartRain } from '../utils/confetti';

export const LoveLetter: React.FC = () => {
  const [hugSent, setHugSent] = useState(false);

  const handleSendHug = () => {
    sounds.playHeartPop();
    sounds.playFanfare();
    triggerHeartRain();
    setHugSent(true);
    setTimeout(() => setHugSent(false), 4000);
  };

  return (
    <section className="py-4 md:py-6 px-4 max-w-3xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border-4 border-[#bae6fd] rounded-3xl p-6 md:p-12 shadow-xl relative overflow-hidden"
      >
        {/* Subtle decorative stamp in corner */}
        <div className="absolute top-6 right-6 w-16 h-20 rounded-xl border-2 border-dashed border-[#38bdf8] p-1 flex flex-col items-center justify-center text-center bg-[#f0f8ff]">
          <Heart className="w-5 h-5 text-[#0284c7] fill-[#0284c7]" />
          <span className="text-[9px] font-mono font-bold text-[#0369a1] mt-1">NAJLA</span>
          <span className="text-[8px] font-mono text-slate-400">BDAY 2026</span>
        </div>

        {/* Letter Header */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#0284c7] font-bold flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-[#0284c7]" />
            Sebuah Surat Tulus
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0369a1] font-display mt-1">
            Untuk Najla, Sayangku 💙
          </h2>
        </div>

        {/* Letter Body (Dark Slate Text on Clean White Background) */}
        <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed font-normal">
          <p>
            Hari ini adalah hari yang sangat spesial. Aku ingin berterima kasih banyak sekali ke kamu, Najla. Terima kasih sudah hadir dalam hidupku sejak pertemuan kita di 2023. Terima kasih sudah melengkapi sifatku yang awalnya pendiam dengan energimu yang aktif dan hangat.
          </p>
          <p>
            Mulai dari momen confess yang sempat digantung di ultahmu November 2024, perjuangan merintis usaha bersama, begadang menyelesaikan satu kelompok Tugas Akhir S1, hingga kita resmi jadian setelah Capstone Defense di Agustus 2025. Terlebih saat kamu memberikanku kado buku <span className="font-semibold text-[#0284c7]">"I Have a Crush on You"</span> saat ulang tahunku 8 September 2026—di mana hatiku berbisik: <em>"aku juga (gw juga!) naksir dan sayang banget sama kamu"</em>.
          </p>
          <p>
            Harapanku banyak banget untuk kamu di usia yang baru ini. Tapi yang paling utama: <span className="font-bold text-[#0369a1]">aku pengen selalu men-support apa pun yang pengen kamu lakukan, mengejar semua impian dan cita-citamu</span>. Kamu tidak perlu khawatir melangkah, karena aku akan selalu ada di sampingmu untuk mendukung dan memegang tanganmu.
          </p>
          <p className="pt-2 font-bold text-[#0284c7]">
            Selamat ulang tahun, Najla tersayang. Terima kasih banyak ya sudah ada untukku. Aku sayang banget sama kamu! 💙
          </p>
        </div>

        {/* Signature */}
        <div className="mt-8 pt-6 border-t-2 border-[#bae6fd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400 font-medium">Dengan segenap cintaku,</p>
            <p className="font-handwriting text-3xl text-[#0369a1] font-bold mt-1">Yang Selalu Sayang Kamu</p>
          </div>

          <button
            onClick={handleSendHug}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
              hugSent
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0284c7] hover:bg-[#0369a1] text-white hover:scale-105 active:scale-95'
            }`}
          >
            {hugSent ? (
              <>
                <Heart className="w-4 h-4 fill-white" />
                <span>Peluk Hangat Terkirim! 💙</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Peluk Hangat &amp; Doa</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
};

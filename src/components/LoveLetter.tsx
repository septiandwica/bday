import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Send } from 'lucide-react';
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
    <section className="py-20 px-4 max-w-3xl mx-auto relative z-10">
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
            <Sparkles className="w-3.5 h-3.5" />
            Sebuah Surat Tulus
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0369a1] font-display mt-1">
            Untuk Najla, Sayangku 💙
          </h2>
        </div>

        {/* Letter Body (Dark Slate Text on Clean White Background) */}
        <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed font-normal">
          <p>
            Hari ini adalah salah satu hari paling membahagiakan, bukan hanya untukmu, tapi juga untukku. Karena di hari inilah, seseorang yang begitu luar biasa, cantik, dan tulus dilahirkan ke dunia.
          </p>
          <p>
            Terima kasih ya sudah selalu menjadi pelangi di hari-hariku yang mendung. Terima kasih sudah mengajarkanku arti kenyamanan, kehangatan, dan ketulusan. Warna biru yang kamu sukai adalah cerminan dari hatimu sendiri: tenang, dalam, menyejukkan, dan seluas samudra.
          </p>
          <p>
            Di usiamu yang baru ini, aku berdoa agar Najla selalu diberikan kesehatan, kelapangan hati, rezeki yang berkah, dan keberanian untuk mengejar setiap impian yang kamu dambakan. Apapun yang terjadi di masa depan, ingat ya, aku akan selalu ada di sampingmu untuk bangga, mendukung, dan memegang tanganmu.
          </p>
          <p className="pt-2 font-bold text-[#0284c7]">
            Selamat ulang tahun, cintaku. Semoga hari ini dan selamanya kamu selalu bahagia! 💙
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

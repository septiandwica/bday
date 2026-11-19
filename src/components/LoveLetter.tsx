import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, RotateCcw, MapPin, ArrowRight, Gift, Camera } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerHeartRain, triggerGrandEnvelopeBurst, triggerStarBurst } from '../utils/confetti';

interface LoveLetterProps {
  onSelectChoice: (choice: 'lovemeter' | 'photostudio') => void;
  onRestart: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onSelectChoice, onRestart }) => {
  const [supportCount, setSupportCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  
  // Gift drop state
  const [isGiftDropping, setIsGiftDropping] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false);

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

  const handleTriggerGift = () => {
    sounds.playChime(1.1);
    setIsGiftDropping(true);
  };

  const handleOpenGift = () => {
    if (isGiftOpened) return;
    setIsGiftOpened(true);
    sounds.playFanfare();
    triggerGrandEnvelopeBurst();
    triggerStarBurst();
  };

  return (
    <section className="py-2 sm:py-4 px-3 sm:px-4 max-w-2xl mx-auto relative z-10 select-none">
      <AnimatePresence mode="wait">
        {/* VIEW 1: THE LETTER */}
        {!isGiftDropping ? (
          <motion.div
            key="letter-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -40 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="bg-white/95 border-4 border-[#bae6fd] rounded-3xl p-4 sm:p-8 shadow-xl relative overflow-hidden"
          >
            {/* Responsive Header Row: Title & LDR Stamp */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-3 mb-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#0284c7] font-bold flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-[#0284c7]" />
                  <span>Surat Tulus dari Mas</span>
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold text-[#0369a1] font-display mt-1">
                  Untuk Lala Tersayang
                </h2>
              </div>

              {/* LDR Stamp */}
              <div className="self-start shrink-0 px-2.5 py-1 rounded-xl border-2 border-dashed border-[#38bdf8] flex items-center gap-1.5 text-center bg-[#f0f8ff]">
                <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#0369a1]">
                  Cikarang &bull; Jakarta
                </span>
              </div>
            </div>

            {/* Letter Body */}
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
            <div className="mt-7 pt-5 border-t-2 border-[#bae6fd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400 font-medium">Dari yang selalu sayang kamu,</p>
                <p className="font-handwriting text-2xl text-[#0369a1] font-bold mt-0.5">Mas</p>
              </div>

              <div className="relative w-full sm:w-auto flex justify-end">
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
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs bg-[#0284c7] hover:bg-[#0369a1] text-white hover:scale-105 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Semangat ({supportCount})</span>
                </button>
              </div>
            </div>

            {/* Bottom: Trigger Surprise Gift Drop from Sky */}
            <div className="mt-6 pt-5 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={onRestart}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-[#0284c7] transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Mulai dari Awal</span>
              </button>

              <button
                onClick={handleTriggerGift}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              >
                <Gift className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Buka Kado Kejutan dari Langit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* VIEW 2: GIFT FALLING FROM SKY & OPENING */
          <motion.div
            key="gift-drop-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-6 min-h-[460px] text-center"
          >
            {/* Header Hint */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-2 shadow-xs">
                <Gift className="w-3.5 h-3.5" />
                <span>Kado Kejutan Spesial</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0369a1] font-display">
                {!isGiftOpened ? "Sebuah Kado Jatuh untuk Lala!" : "Pilih Hadiah Spesialmu:"}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
                {!isGiftOpened
                  ? "Sentuh kotak kado di bawah untuk membukanya."
                  : "Dua kejutan spesial siap untuk menemani hari ulang tahunmu."}
              </p>
            </motion.div>

            {/* GIFT BOX OBJECT FALLING FROM THE SKY */}
            <div className="relative flex flex-col items-center justify-center my-4 w-full max-w-[340px] sm:max-w-[420px]">
              
              {/* Emerging 2 Options when Opened */}
              <AnimatePresence>
                {isGiftOpened && (
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 120, delay: 0.15 }}
                    className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 z-30"
                  >
                    {/* Option 1: Love Meter */}
                    <motion.div
                      whileHover={{ scale: 1.04, y: -4 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onSelectChoice('lovemeter')}
                      className="w-full sm:w-1/2 bg-white rounded-3xl p-5 shadow-xl border-3 border-[#38bdf8] hover:border-[#0284c7] cursor-pointer transition-all text-left flex flex-col justify-between h-44 group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded-md">
                            MINI GAME
                          </span>
                          <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                            <Heart className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                        <h4 className="font-bold text-base text-slate-800 group-hover:text-[#0284c7] transition-colors">
                          Love Meter
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Ukur kapasitas cinta & sayang tanpa batas untuk Lala.
                        </p>
                      </div>

                      <div className="pt-2 border-t border-sky-100 flex items-center justify-between text-xs font-bold text-[#0284c7]">
                        <span>Mainkan Game</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>

                    {/* Option 2: Polaroid Photo Studio */}
                    <motion.div
                      whileHover={{ scale: 1.04, y: -4 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onSelectChoice('photostudio')}
                      className="w-full sm:w-1/2 bg-white rounded-3xl p-5 shadow-xl border-3 border-[#7dd3fc] hover:border-[#0284c7] cursor-pointer transition-all text-left flex flex-col justify-between h-44 group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded-md">
                            STUDIO FOTO
                          </span>
                          <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                            <Camera className="w-4 h-4" />
                          </div>
                        </div>
                        <h4 className="font-bold text-base text-slate-800 group-hover:text-[#0284c7] transition-colors">
                          Photo Studio Mini
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Foto polaroid ulang tahun dengan filter aesthetic & bisa disimpan.
                        </p>
                      </div>

                      <div className="pt-2 border-t border-sky-100 flex items-center justify-between text-xs font-bold text-[#0284c7]">
                        <span>Buka Studio</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Physical Gift Box falling from sky */}
              <motion.div
                initial={{ y: -600, scale: 0.5, rotate: -20 }}
                animate={{ y: 0, scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  damping: 12,
                  stiffness: 90,
                  delay: 0.1,
                }}
                onClick={!isGiftOpened ? handleOpenGift : undefined}
                className={`relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center ${
                  !isGiftOpened ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : 'opacity-85'
                }`}
              >
                {/* Floating Shadow */}
                <div className="absolute -bottom-3 w-36 sm:w-44 h-6 bg-sky-200/60 rounded-full blur-xs" />

                {/* Gift Lid (Pops open when clicked) */}
                <motion.div
                  animate={{
                    y: isGiftOpened ? -50 : 0,
                    rotate: isGiftOpened ? -22 : 0,
                    opacity: isGiftOpened ? 0.3 : 1,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute top-2 w-44 sm:w-52 h-10 sm:h-12 bg-[#38bdf8] rounded-xl border-4 border-white shadow-md z-20 flex items-center justify-center"
                >
                  {/* Ribbon cross horizontal */}
                  <div className="w-7 h-full bg-white shadow-2xs" />
                  
                  {/* Ribbon Bow on top */}
                  <div className="absolute -top-5 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-3 border-white bg-[#0284c7] transform -rotate-45" />
                    <div className="w-6 h-6 rounded-full border-3 border-white bg-[#0284c7] transform rotate-45 -ml-2" />
                  </div>
                </motion.div>

                {/* Gift Body */}
                <div className="w-38 sm:w-44 h-32 sm:h-36 bg-[#7dd3fc] rounded-2xl border-4 border-white shadow-xl relative overflow-hidden flex items-center justify-center mt-6">
                  {/* Vertical white ribbon */}
                  <div className="w-7 h-full bg-white shadow-2xs" />
                  {/* Horizontal white ribbon */}
                  <div className="h-7 w-full bg-white absolute inset-y-1/2 transform -translate-y-1/2 shadow-2xs" />

                  {/* Touch Me Pill before opened */}
                  {!isGiftOpened && (
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute px-3 py-1 rounded-full bg-[#0284c7] text-white text-[10px] font-bold shadow-md border border-white z-10"
                    >
                      Buka Kado
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Back button */}
            <div className="mt-6">
              <button
                onClick={() => setIsGiftDropping(false)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#0284c7] transition-colors cursor-pointer"
              >
                <span>&larr; Baca Ulang Surat</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, BookOpen, Cake, Mail, Sparkle, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerGrandEnvelopeBurst } from '../utils/confetti';

interface WelcomeEnvelopeProps {
  onOpen: (stageIndex?: number) => void;
}

interface PoppedElement {
  id: number;
  stageIndex: number;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  rotation: number;
}

const POPOUT_ITEMS: PoppedElement[] = [
  {
    id: 1,
    stageIndex: 1,
    badge: "BABAK 1",
    title: "Kisah Kita",
    subtitle: "Kilas balik perjalanan dari 2024",
    icon: BookOpen,
    accentColor: "border-[#38bdf8] hover:border-[#0284c7]",
    rotation: -4,
  },
  {
    id: 2,
    stageIndex: 7,
    badge: "SPESIAL LALA",
    title: "Tiup Lilin",
    subtitle: "Make a wish & tiup lilin kue tart",
    icon: Cake,
    accentColor: "border-[#7dd3fc] hover:border-[#0284c7]",
    rotation: 0,
  },
  {
    id: 3,
    stageIndex: 8,
    badge: "SURAT MAS",
    title: "Pesan Tulus",
    subtitle: "Janji komitmen & saling support",
    icon: Mail,
    accentColor: "border-[#38bdf8] hover:border-[#0284c7]",
    rotation: 4,
  },
];

export const WelcomeEnvelope: React.FC<WelcomeEnvelopeProps> = ({ onOpen }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleOpenEnvelope = () => {
    if (isOpened) return;
    setIsOpened(true);
    sounds.playChime(1.0);
    sounds.playFanfare();
    triggerGrandEnvelopeBurst();
  };

  const handleSelectElement = (stageIndex: number, itemId: number) => {
    setSelectedItem(itemId);
    sounds.playChime(1.15);
    setTimeout(() => {
      onOpen(stageIndex);
    }, 350);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center py-4 px-3 sm:px-4 relative z-10 text-center select-none">
      {/* Secret Badge Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-3 shadow-xs"
      >
        <Lock className="w-3.5 h-3.5" />
        <span>Sebuah Pesan Rahasia</span>
      </motion.div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0369a1] font-display mb-1 tracking-tight">
        Untuk Lala Tersayang
      </h1>
      <p className="text-slate-600 text-xs sm:text-sm font-normal mb-6 sm:mb-8 max-w-md mx-auto">
        {!isOpened
          ? "Sentuh amplop di bawah untuk membukanya."
          : "Pilih salah satu surat yang keluar dari amplop untuk memulai cerita:"}
      </p>

      {/* Envelope Container Area */}
      <div className="relative w-full max-w-[350px] sm:max-w-[480px] md:max-w-[540px] pt-16 sm:pt-24 pb-4">
        {/* Popped Out Elements from the Envelope (Bursting Upward) */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 15,
                delay: 0.15,
              }}
              className="absolute -top-6 sm:-top-8 inset-x-0 z-30 flex items-end justify-center gap-2 sm:gap-3 px-1 pointer-events-auto"
            >
              {POPOUT_ITEMS.map((item) => {
                const Icon = item.icon;
                const isChosen = selectedItem === item.id;

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -8, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectElement(item.stageIndex, item.id)}
                    style={{ rotate: `${item.rotation}deg` }}
                    className={`flex-1 max-w-[110px] sm:max-w-[150px] md:max-w-[165px] bg-white rounded-2xl p-2.5 sm:p-4 shadow-xl border-2 sm:border-3 ${item.accentColor} cursor-pointer transition-all text-left flex flex-col justify-between h-36 sm:h-44 group ${
                      isChosen ? 'ring-4 ring-[#0284c7] scale-105' : ''
                    }`}
                  >
                    <div>
                      {/* Badge & Icon */}
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-[#0284c7] bg-sky-50 px-1.5 sm:px-2 py-0.5 rounded-md">
                          {item.badge}
                        </span>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sky-100 flex items-center justify-center text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-xs sm:text-sm text-slate-800 leading-tight group-hover:text-[#0284c7] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[9px] sm:text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Bottom Action Hint */}
                    <div className="pt-1 border-t border-sky-100 flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-[#0284c7]">
                      <span>Buka</span>
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Envelope Graphic */}
        <div
          onClick={!isOpened ? handleOpenEnvelope : undefined}
          className={`relative mx-auto w-full h-52 sm:h-64 md:h-72 rounded-3xl sm:rounded-[36px] bg-[#7dd3fc] border-4 border-[#38bdf8] shadow-2xl p-5 sm:p-7 flex flex-col justify-between overflow-hidden z-20 ${
            !isOpened ? 'cursor-pointer hover:scale-102 transition-transform' : ''
          }`}
        >
          {/* Envelope Top Flap (Flips open in 3D) */}
          <motion.div
            style={{ transformOrigin: 'top' }}
            animate={{ rotateX: isOpened ? 180 : 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute top-0 inset-x-0 h-28 sm:h-36 bg-[#38bdf8] clip-path-polygon border-b-2 border-white/40 shadow-md z-25 pointer-events-none"
          />

          {/* Top Labels */}
          <div className="w-full flex items-center justify-between text-xs sm:text-sm text-white font-bold tracking-wider relative z-30">
            <span className="bg-[#0284c7] px-3 py-1 rounded-lg shadow-xs">
              DARI MAS
            </span>
            <span className="text-[#0369a1] bg-white px-3 py-1 rounded-lg shadow-xs">
              UNTUK LALA
            </span>
          </div>

          {/* Center Wax Seal (Only visible before opening) */}
          <div className="relative z-30 my-auto flex flex-col items-center justify-center">
            <AnimatePresence>
              {!isOpened && (
                <motion.div
                  exit={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#0284c7] border-4 border-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                >
                  <Heart className="w-9 h-9 sm:w-11 sm:h-11 text-white fill-white" />
                  <span className="absolute -bottom-7 sm:-bottom-8 text-[10px] sm:text-xs font-extrabold tracking-wider text-[#0369a1] whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-md border-2 border-sky-200">
                    Buka Amplop
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Recipient Script in Script Font */}
          <div className="relative z-30 w-full text-center">
            <span className="font-handwriting text-3xl sm:text-4xl font-bold text-white drop-shadow-md">
              Lala
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

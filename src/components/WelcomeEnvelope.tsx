import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, BookOpen, Cake, Mail, ArrowUpRight } from 'lucide-react';
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
          ? "Sentuh amplop surat di bawah untuk membukanya."
          : "Pilih salah satu surat yang keluar dari amplop untuk memulai cerita:"}
      </p>

      {/* ENVELOPE STAGE CONTAINER */}
      <div className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[500px] pt-20 sm:pt-28 pb-4">
        
        {/* POPPED OUT ITEMS (Rise up out of the envelope pocket) */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 15,
                delay: 0.2,
              }}
              className="absolute -top-4 sm:-top-8 inset-x-0 z-20 flex items-end justify-center gap-2 sm:gap-3 px-1 pointer-events-auto"
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
                    className={`flex-1 max-w-[110px] sm:max-w-[145px] md:max-w-[160px] bg-white rounded-2xl p-2.5 sm:p-4 shadow-xl border-2 sm:border-3 ${item.accentColor} cursor-pointer transition-all text-left flex flex-col justify-between h-36 sm:h-44 group ${
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

                    {/* Action Hint */}
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

        {/* REALISTIC ENVELOPE OBJECT */}
        <div
          onClick={!isOpened ? handleOpenEnvelope : undefined}
          className={`relative mx-auto w-full h-52 sm:h-64 rounded-2xl sm:rounded-3xl shadow-2xl overflow-visible select-none ${
            !isOpened ? 'cursor-pointer hover:scale-102 transition-transform' : ''
          }`}
          style={{ perspective: '1000px' }}
        >
          {/* 1. Envelope Back Wall & Interior (Depth) */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-[#bae6fd] shadow-inner overflow-hidden z-10">
            {/* Interior Pattern / Shading */}
            <div className="w-full h-full bg-[#93c5fd]/40 flex items-center justify-center">
              <span className="font-handwriting text-3xl sm:text-4xl text-[#0369a1]/30 font-bold">
                Lala
              </span>
            </div>
          </div>

          {/* 2. Top Flap (Triangular flap that flips open 180deg) */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '52%',
              transformOrigin: 'top center',
              zIndex: isOpened ? 15 : 35,
            }}
            animate={{
              rotateX: isOpened ? 180 : 0,
            }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Flap SVG Polygon pointing DOWN when closed, flips UP when opened */}
            <svg
              viewBox="0 0 460 145"
              className="w-full h-full drop-shadow-md"
              preserveAspectRatio="none"
            >
              <polygon
                points="0,0 460,0 230,145"
                fill={isOpened ? '#bae6fd' : '#38bdf8'}
              />
              <line
                x1="0"
                y1="0"
                x2="230"
                y2="145"
                stroke="#ffffff"
                strokeWidth="2"
                opacity="0.4"
              />
              <line
                x1="460"
                y1="0"
                x2="230"
                y2="145"
                stroke="#ffffff"
                strokeWidth="2"
                opacity="0.4"
              />
            </svg>

            {/* Wax Seal at the tip of the closed flap */}
            <AnimatePresence>
              {!isOpened && (
                <motion.div
                  initial={{ scale: 1 }}
                  exit={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-[-22px] sm:bottom-[-26px] left-1/2 transform -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0284c7] border-4 border-white shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                >
                  <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />
                  <span className="absolute -bottom-6 text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#0369a1] whitespace-nowrap bg-white px-2.5 py-0.5 rounded-full shadow-md border border-sky-200">
                    Buka Amplop
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 3. Envelope Front Pocket (Left, Right, and Bottom Triangular Folds) - Z-index 30 sits in front of emerging cards */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <svg
              viewBox="0 0 460 260"
              className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden"
              preserveAspectRatio="none"
            >
              {/* Left Triangular Fold */}
              <polygon points="0,0 210,135 0,260" fill="#7dd3fc" />
              <line x1="0" y1="0" x2="210" y2="135" stroke="#ffffff" strokeWidth="1.5" opacity="0.35" />

              {/* Right Triangular Fold */}
              <polygon points="460,0 250,135 460,260" fill="#7dd3fc" />
              <line x1="460" y1="0" x2="250" y2="135" stroke="#ffffff" strokeWidth="1.5" opacity="0.35" />

              {/* Bottom Triangular Fold */}
              <polygon points="0,260 230,120 460,260" fill="#38bdf8" />
              <line x1="0" y1="260" x2="230" y2="120" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
              <line x1="460" y1="260" x2="230" y2="120" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
            </svg>

            {/* Recipient Script on Bottom Front Face */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-0 text-center pointer-events-none">
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-white/80 uppercase block">
                SURAT SPESIAL UNTUK
              </span>
              <span className="font-handwriting text-3xl sm:text-4xl text-white font-bold drop-shadow-md">
                Lala
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

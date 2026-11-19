import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Bookmark, Image as ImageIcon, Sparkles } from 'lucide-react';
import { AnimeCharactersIllustration } from './AnimeCharactersIllustration';
import { StoryChapter } from '../data/story';

interface StoryStepCardProps {
  stepData: StoryChapter;
  onNext: () => void;
}

export const StoryStepCard: React.FC<StoryStepCardProps> = ({ stepData, onNext }) => {
  const [viewMode, setViewMode] = useState<'photo' | 'illustration'>('photo');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full max-w-xl mx-auto flex flex-col items-center select-none"
    >
      {/* Main Story Card (Fully Responsive, Clean Flex Layout) */}
      <div className="w-full bg-white/95 border-4 border-[#bae6fd] rounded-3xl p-4 sm:p-7 shadow-xl relative backdrop-blur-xs">
        
        {/* Top Header Row: Badges on left, Bookmark pill on right (No absolute overlap!) */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-white bg-[#0284c7] px-2.5 py-0.5 rounded-md">
              {stepData.year}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#0369a1] bg-sky-100 px-2.5 py-0.5 rounded-md">
              {stepData.badge}
            </span>
          </div>

          {/* Clean Bookmark Badge that never blocks text */}
          <div className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200 text-[#0284c7]">
            <Bookmark className="w-3 h-3 fill-[#0284c7]" />
            <span className="text-[10px] font-mono font-bold">Kisah #{stepData.id}</span>
          </div>
        </div>

        {/* Title & View Mode Switcher */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="text-lg sm:text-2xl font-bold font-display text-[#0369a1] leading-tight">
            {stepData.title}
          </h2>

          {/* Mode Switcher: Photo (Default) & Cartoon Illustration */}
          <div className="shrink-0 flex items-center bg-sky-100/70 p-0.5 rounded-lg text-[10px] font-bold text-slate-600">
            <button
              onClick={() => setViewMode('photo')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'photo'
                  ? 'bg-white text-[#0284c7] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Lihat Foto Kenangan"
            >
              <ImageIcon className="w-3 h-3" />
              <span>Foto</span>
            </button>
            <button
              onClick={() => setViewMode('illustration')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === 'illustration'
                  ? 'bg-white text-[#0284c7] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Lihat Ilustrasi Karakter"
            >
              <Sparkles className="w-3 h-3" />
              <span>Kartun</span>
            </button>
          </div>
        </div>

        {/* Media Box: Real Photo (Default) or 2 Birds Illustration */}
        <div className="my-2.5">
          <AnimatePresence mode="wait">
            {viewMode === 'photo' ? (
              <motion.div
                key="photo"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-900/5 border-2 border-sky-200/80 shadow-xs flex items-center justify-center p-1.5"
              >
                <img
                  src={stepData.image}
                  alt={stepData.title}
                  className="w-full h-full object-contain rounded-xl"
                  loading="eager"
                />
              </motion.div>
            ) : (
              <motion.div
                key="illustration"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <AnimeCharactersIllustration step={stepData.id} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Story Text Box */}
        <div className="mt-2 bg-[#f0f8ff] p-3.5 sm:p-5 rounded-2xl border border-sky-200">
          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal">
            {stepData.story}
          </p>
        </div>

        {/* Highlight Note */}
        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[#0284c7]">
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#0284c7] shrink-0" />
          <span className="leading-snug">{stepData.highlight}</span>
        </div>

        {/* Forward Next Action */}
        <div className="mt-5 pt-3.5 border-t border-sky-100 flex justify-end w-full">
          <button
            onClick={onNext}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>{stepData.nextButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

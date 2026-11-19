import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShinkaiSky } from './components/ShinkaiSky';
import { AnimeCharactersIllustration } from './components/AnimeCharactersIllustration';
import { AnimatedCake } from './components/AnimatedCake';
import { AudioPlayer } from './components/AudioPlayer';
import { STORY_CHAPTERS } from './data/story';
import { sounds } from './utils/audio';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = STORY_CHAPTERS.length;
  const currentChapter = STORY_CHAPTERS[currentPage];

  // Keyboard Navigation (Arrow Left / Arrow Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const goToNext = () => {
    if (currentPage < totalPages - 1) {
      sounds.playChime(1.0 + (currentPage * 0.05));
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentPage > 0) {
      sounds.playChime(0.95);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (pageIndex: number) => {
    sounds.playChime(1.0);
    setCurrentPage(pageIndex);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-between text-slate-800 select-none">
      {/* Makoto Shinkai Clear Sky Animation Background */}
      <ShinkaiSky
        timeOfDay={
          currentPage === 2 ? 'golden' : currentPage === 4 ? 'twilight' : 'day'
        }
      />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Top Header Bar */}
      <header className="relative z-20 w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold tracking-widest text-[#0284c7] bg-white/90 px-3 py-1 rounded-full border-2 border-sky-200 shadow-xs">
            NAJLA'S STORY &bull; {currentChapter.year}
          </span>
        </div>

        {/* Story Progress Dots */}
        <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-sky-200 backdrop-blur-xs">
          {STORY_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => goToPage(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentPage === idx
                  ? 'w-6 bg-[#0284c7]'
                  : 'w-2 bg-sky-200 hover:bg-sky-400'
              }`}
              title={`Bab ${idx}: ${ch.title}`}
            />
          ))}
        </div>
      </header>

      {/* Main Page Slide View (No Scroll - Pure Cinematic Viewport) */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full flex flex-col items-center text-center my-auto"
          >
            {/* Chapter Badge */}
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#0369a1] bg-[#e0f2fe] border-2 border-sky-200 px-3 py-0.5 rounded-md mb-2">
              Chapter {currentChapter.chapterNumber}
            </span>

            {/* Chapter Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0369a1] font-display tracking-tight leading-tight mb-1">
              {currentChapter.title}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mb-4 font-mono">
              {currentChapter.subtitle}
            </p>

            {/* Anime Illustration Artwork for this Chapter */}
            {currentPage < 5 ? (
              <AnimeCharactersIllustration chapter={currentPage} />
            ) : (
              <div className="my-2">
                <AnimatedCake />
              </div>
            )}

            {/* Story Paragraphs Card (Clean White, Solid Sky Border, NO Dark Gradients) */}
            <div className="mt-4 max-w-xl w-full bg-white/95 border-2 border-[#bae6fd] rounded-2xl p-5 shadow-sm text-left backdrop-blur-xs">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {currentChapter.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {currentChapter.quote && (
                <div className="mt-3 pt-3 border-t-2 border-[#bae6fd]">
                  <p className="text-xs sm:text-sm font-handwriting text-xl text-[#0284c7] font-bold italic">
                    "{currentChapter.quote}"
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar */}
      <footer className="relative z-20 w-full px-6 py-4 flex items-center justify-between border-t-2 border-sky-200 bg-white/80 backdrop-blur-xs">
        {/* Previous Button */}
        <button
          onClick={goToPrev}
          disabled={currentPage === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            currentPage === 0
              ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400'
              : 'bg-white text-[#0369a1] border-2 border-sky-200 hover:bg-sky-50 shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        {/* Current Chapter Indicator */}
        <span className="text-xs font-mono font-bold text-slate-500 hidden sm:inline-block">
          Halaman {currentPage + 1} dari {totalPages}
        </span>

        {/* Next / Replay Button */}
        {currentPage < totalPages - 1 ? (
          <button
            onClick={goToNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Lanjutkan Cerita</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => goToPage(0)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Baca Ulang Cerita</span>
          </button>
        )}
      </footer>
    </div>
  );
};

export default App;

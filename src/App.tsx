import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShinkaiSky } from './components/ShinkaiSky';
import { WelcomeEnvelope } from './components/WelcomeEnvelope';
import { StoryBook } from './components/StoryBook';
import { MemoryLane } from './components/MemoryLane';
import { StarWishesJar } from './components/StarWishesJar';
import { CakeSection } from './components/CakeSection';
import { LoveLetter } from './components/LoveLetter';
import { LoveMeterGame } from './components/LoveMeterGame';
import { AudioPlayer } from './components/AudioPlayer';
import { sounds } from './utils/audio';
import { ChevronLeft, ChevronRight, RotateCcw, Heart, BookOpen, Camera, Star, Cake, Mail } from 'lucide-react';

interface PageMeta {
  id: number;
  shortTitle: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PAGES: PageMeta[] = [
  { id: 0, shortTitle: "Amplop", badge: "SURAT DARI HATIKU", icon: Mail },
  { id: 1, shortTitle: "Kisah Kita", badge: "PERJALANAN 2023 - 2026", icon: BookOpen },
  { id: 2, shortTitle: "Kenangan", badge: "LEMBARAN MEMOAR", icon: Camera },
  { id: 3, shortTitle: "Bintang", badge: "ALASAN ISTIMEWA", icon: Star },
  { id: 4, shortTitle: "Tiup Lilin", badge: "MAKE A WISH", icon: Cake },
  { id: 5, shortTitle: "Surat Tulus", badge: "PESAN & KOMITMEN", icon: Heart },
  { id: 6, shortTitle: "Love Meter", badge: "PELUK TAK TERHINGGA", icon: Heart },
];

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Keyboard Navigation (Arrow Left / Arrow Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  const goToNext = () => {
    if (currentPage < PAGES.length - 1) {
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
    sounds.playChime(1.0 + (pageIndex * 0.04));
    setCurrentPage(pageIndex);
  };

  const currentMeta = PAGES[currentPage];

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-between text-slate-800 select-none">
      {/* Makoto Shinkai Clear Daytime Sky Animation Background (Zero Dark Gradients) */}
      <ShinkaiSky
        timeOfDay={
          currentPage === 4 ? 'twilight' : currentPage === 5 ? 'golden' : 'day'
        }
      />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Top Header Navigation Bar */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-3 flex items-center justify-between border-b-2 border-sky-100 bg-white/90 backdrop-blur-md shadow-xs">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0284c7] flex items-center justify-center text-white shadow-xs">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-[#0369a1] font-display tracking-tight block leading-tight">
              Untuk Najla Tersayang
            </span>
            <span className="text-[10px] font-mono font-bold text-[#0284c7] uppercase tracking-wider block">
              {currentMeta.badge}
            </span>
          </div>
        </div>

        {/* Center: Story Progress Dots & Chapter Pills */}
        <div className="hidden md:flex items-center gap-1.5 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200">
          {PAGES.map((page, idx) => {
            const Icon = page.icon;
            const isActive = currentPage === idx;
            return (
              <button
                key={page.id}
                onClick={() => goToPage(idx)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0284c7] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0284c7] hover:bg-sky-100'
                }`}
                title={`Bab ${idx + 1}: ${page.shortTitle}`}
              >
                <Icon className="w-3 h-3" />
                <span className="text-[11px]">{page.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Page Indicator */}
        <div className="flex md:hidden items-center gap-1 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 text-xs font-bold text-[#0284c7] font-mono">
          <span>{currentPage + 1}</span>
          <span className="text-slate-400">/</span>
          <span>{PAGES.length}</span>
        </div>
      </header>

      {/* Main Page Container (Scrollable per page if needed, centered content) */}
      <main className="relative z-10 flex-1 w-full overflow-y-auto px-4 py-4 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full max-w-5xl mx-auto flex flex-col items-center my-auto py-4"
          >
            {currentPage === 0 && (
              <WelcomeEnvelope onOpen={() => goToNext()} />
            )}

            {currentPage === 1 && (
              <div className="w-full">
                <StoryBook />
              </div>
            )}

            {currentPage === 2 && (
              <div className="w-full">
                <MemoryLane />
              </div>
            )}

            {currentPage === 3 && (
              <div className="w-full">
                <StarWishesJar />
              </div>
            )}

            {currentPage === 4 && (
              <div className="w-full">
                <CakeSection />
              </div>
            )}

            {currentPage === 5 && (
              <div className="w-full">
                <LoveLetter />
              </div>
            )}

            {currentPage === 6 && (
              <div className="w-full flex flex-col items-center">
                <LoveMeterGame />
                <div className="mt-6">
                  <button
                    onClick={() => goToPage(0)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border-2 border-sky-300 text-[#0284c7] hover:bg-sky-50 font-bold text-xs transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Mulai Membaca Kembali dari Awal</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar */}
      <footer className="relative z-20 w-full px-4 sm:px-8 py-3 flex items-center justify-between border-t-2 border-sky-100 bg-white/90 backdrop-blur-md shadow-xs">
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
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        {/* Center Progress Info */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-mono font-bold text-[#0369a1]">
            Bab {currentPage + 1} dari {PAGES.length}
          </span>
          <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
            Gunakan tombol panah &larr; &rarr; di keyboard
          </span>
        </div>

        {/* Next / Finish Button */}
        {currentPage < PAGES.length - 1 ? (
          <button
            onClick={goToNext}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Lanjut: {PAGES[currentPage + 1].shortTitle}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => goToPage(0)}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-[#0284c7] hover:bg-[#0369a1] text-white transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai dari Awal</span>
          </button>
        )}
      </footer>
    </div>
  );
};

export default App;

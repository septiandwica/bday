import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SkyBackground } from './components/SkyBackground';
import { WelcomeEnvelope } from './components/WelcomeEnvelope';
import { StoryStepCard } from './components/StoryStepCard';
import { MemoryLane } from './components/MemoryLane';
import { CakeSection } from './components/CakeSection';
import { LoveLetter } from './components/LoveLetter';
import { AudioPlayer } from './components/AudioPlayer';
import { STORY_STEPS } from './data/story';
import { sounds } from './utils/audio';
import { ChevronLeft } from 'lucide-react';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const goToNext = () => {
    sounds.playChime(1.0 + (currentPage * 0.05));
    setCurrentPage((prev) => prev + 1);
  };

  const goToPrev = () => {
    sounds.playChime(0.95);
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const restartJourney = () => {
    sounds.playChime(1.0);
    setCurrentPage(0);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-between text-slate-800 select-none">
      {/* Sky Background with cute small drifting clouds */}
      <SkyBackground />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Main Secret Flow Container (NO TOP NAVBAR) */}
      <main className="relative z-10 flex-1 w-full overflow-y-auto px-4 py-8 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {/* Stage 0: Amplop Rahasia untuk Lala */}
          {currentPage === 0 && (
            <WelcomeEnvelope onOpen={goToNext} />
          )}

          {/* Stages 1 to 5: 2024 - 2026 Authentic Relationship Timeline */}
          {currentPage >= 1 && currentPage <= 5 && (
            <StoryStepCard
              key={currentPage}
              stepData={STORY_STEPS[currentPage - 1]}
              onNext={goToNext}
            />
          )}

          {/* Stage 6: Hal yang Mas Syukuri & Pelajaran Hidup dari Lala */}
          {currentPage === 6 && (
            <MemoryLane onContinue={goToNext} />
          )}

          {/* Stage 7: Momen Ulang Tahun: Make a Wish & Tiup Lilin */}
          {currentPage === 7 && (
            <CakeSection onContinue={goToNext} />
          )}

          {/* Stage 8: Surat Tulus dari Mas & Harapan ke Depan */}
          {currentPage === 8 && (
            <LoveLetter onRestart={restartJourney} />
          )}
        </AnimatePresence>
      </main>

      {/* Discreet Bottom Navigation (Back Button Only, No Spoilers) */}
      {currentPage > 0 && (
        <div className="relative z-20 w-full px-6 py-3 flex items-center justify-start pointer-events-none">
          <button
            onClick={goToPrev}
            className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/80 border border-sky-200 text-slate-600 hover:text-[#0284c7] hover:bg-white shadow-xs transition-all cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

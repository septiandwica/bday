import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SkyBackground } from './components/SkyBackground';
import { WelcomeEnvelope } from './components/WelcomeEnvelope';
import { StoryStepCard } from './components/StoryStepCard';
import { MemoryLane } from './components/MemoryLane';
import { CakeSection } from './components/CakeSection';
import { LoveLetter } from './components/LoveLetter';
import { LoveMeterGame } from './components/LoveMeterGame';
import { PhotoStudio } from './components/PhotoStudio';
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

  const goToStage = (stage: number) => {
    sounds.playChime(1.05);
    setCurrentPage(stage);
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

      {/* Main Secret Flow Container (NO TOP NAVBAR, no flex justify-center clipping) */}
      <main className="relative z-10 flex-1 w-full overflow-y-auto px-4 py-6 sm:py-8 flex flex-col items-center">
        <div className="w-full my-auto flex flex-col items-center">
          <AnimatePresence mode="wait">
            {/* Stage 0: Amplop Rahasia untuk Lala */}
            {currentPage === 0 && (
              <WelcomeEnvelope
                onOpen={(targetStage) =>
                  typeof targetStage === 'number' ? goToStage(targetStage) : goToNext()
                }
              />
            )}

            {/* Stages 1 to 5: 2024 - 2026 Authentic Relationship Timeline */}
            {currentPage >= 1 && currentPage <= 5 && (
              <StoryStepCard
                key={currentPage}
                stepData={STORY_STEPS[currentPage - 1]}
                onNext={goToNext}
              />
            )}

            {/* Stage 6: Hal yang Mas Syukuri & Galeri Foto Kita */}
            {currentPage === 6 && (
              <MemoryLane onContinue={goToNext} />
            )}

            {/* Stage 7: Momen Ulang Tahun: Make a Wish & Tiup Lilin */}
            {currentPage === 7 && (
              <CakeSection onContinue={goToNext} />
            )}

            {/* Stage 8: Surat Tulus dari Mas & Kado Jatuh dari Langit */}
            {currentPage === 8 && (
              <LoveLetter
                onSelectChoice={(choice) => goToStage(choice === 'lovemeter' ? 9 : 10)}
                onRestart={restartJourney}
              />
            )}

            {/* Stage 9: Love Meter Game */}
            {currentPage === 9 && (
              <LoveMeterGame
                onRestart={restartJourney}
                onGoToPhotoStudio={() => goToStage(10)}
              />
            )}

            {/* Stage 10: Polaroid Photo Studio Mini */}
            {currentPage === 10 && (
              <PhotoStudio
                onRestart={restartJourney}
                onGoToLoveMeter={() => goToStage(9)}
              />
            )}
          </AnimatePresence>
        </div>
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

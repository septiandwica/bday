import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SkyBackground } from './components/SkyBackground';
import { CountdownGate } from './components/CountdownGate';
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

export const App: React.FC = () => {
  // Start at -1 (Countdown Gate before midnight)
  const [currentPage, setCurrentPage] = useState(-1);

  const goToNext = () => {
    sounds.playChime(1.0 + (currentPage * 0.05));
    setCurrentPage((prev) => prev + 1);
  };

  const goToStage = (stage: number) => {
    sounds.playChime(1.05);
    setCurrentPage(stage);
  };

  const restartJourney = () => {
    sounds.playChime(1.0);
    setCurrentPage(0);
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden flex flex-col justify-between text-slate-800 select-none">
      {/* Sky Background with cute small drifting clouds */}
      <SkyBackground />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Main Secret Flow Container (NO TOP NAVBAR, NO BOTTOM BAR, PURE IMMERSIVE FLOW) */}
      <main className="relative z-10 flex-1 w-full overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 flex flex-col">
        <div className="w-full max-w-4xl mx-auto my-auto flex flex-col items-center justify-center py-2 sm:py-4">
          <AnimatePresence mode="wait">
            {/* Stage -1: Countdown Gate Menuju 20 November 2026 */}
            {currentPage === -1 && (
              <CountdownGate onComplete={() => goToStage(0)} />
            )}

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
    </div>
  );
};

export default App;

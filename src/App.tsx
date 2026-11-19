import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CosmicBackground } from './components/CosmicBackground';
import { AudioPlayer } from './components/AudioPlayer';
import { WelcomeEnvelope } from './components/WelcomeEnvelope';
import { CakeSection } from './components/CakeSection';
import { MemoryLane } from './components/MemoryLane';
import { StarWishesJar } from './components/StarWishesJar';
import { LoveLetter } from './components/LoveLetter';
import { LoveMeterGame } from './components/LoveMeterGame';
import { Footer } from './components/Footer';
import { Sparkles, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);

  return (
    <div className="relative min-h-screen text-slate-800 selection:bg-sky-400 selection:text-white">
      {/* Bright Sky Blue Background with Floating Clouds & Balloons */}
      <CosmicBackground />

      {/* Floating Audio Player */}
      <AudioPlayer />

      <AnimatePresence mode="wait">
        {!hasOpenedEnvelope ? (
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7 }}
          >
            <WelcomeEnvelope onOpen={() => setHasOpenedEnvelope(true)} />
          </motion.div>
        ) : (
          <motion.main
            key="celebration-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative z-10"
          >
            {/* Grand Hero Section (Bright Sky Blue, Solid Colors, NO Dark Gradients) */}
            <header className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-6 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#0284c7]" />
                <span>Happy Birthday Special Celebration</span>
                <Heart className="w-3.5 h-3.5 fill-[#0284c7] text-[#0284c7]" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#0369a1] font-display tracking-tight leading-tight"
              >
                Selamat Ulang Tahun, <br />
                <span className="text-[#0284c7] font-handwriting text-5xl sm:text-7xl md:text-8xl block mt-2">
                  Najla Cantik 💙
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-slate-600 text-base md:text-lg font-normal mt-6 max-w-xl mx-auto leading-relaxed"
              >
                Hari ini adalah hari istimewamu! Semoga hari-harimu selalu seindah dan secerah warna biru langit favoritmu, dipenuhi tawa ceria, cinta, dan kebahagiaan yang melimpah.
              </motion.p>
            </header>

            {/* Stage 2: Interactive Cake & Wish Candle */}
            <CakeSection />

            {/* Stage 3: Polaroid Memory Lane */}
            <MemoryLane />

            {/* Stage 4: Star Wishes Origami Jar */}
            <StarWishesJar />

            {/* Stage 5: Love Letter */}
            <LoveLetter />

            {/* Stage 6: Love Meter Game */}
            <LoveMeterGame />

            {/* Footer */}
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

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
    <div className="relative min-h-screen text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* Dynamic Starlight Cosmic Blue Background */}
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
            transition={{ duration: 0.8 }}
          >
            <WelcomeEnvelope onOpen={() => setHasOpenedEnvelope(true)} />
          </motion.div>
        ) : (
          <motion.main
            key="celebration-view"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative z-10"
          >
            {/* Grand Hero Section */}
            <header className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-950/80 border border-sky-400/30 text-sky-300 text-xs font-semibold mb-6 shadow-lg shadow-sky-950/50"
              >
                <Sparkles className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Happy Birthday Special Celebration</span>
                <Heart className="w-3.5 h-3.5 fill-sky-400 text-sky-300" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-100 via-sky-300 to-blue-300 font-display tracking-tight leading-tight"
              >
                Selamat Ulang Tahun, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 font-handwriting text-5xl sm:text-7xl md:text-8xl block mt-2">
                  Najla Cantik 💙
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-slate-200 text-base md:text-lg font-light mt-6 max-w-xl mx-auto leading-relaxed"
              >
                Hari ini adalah harimu! Semoga hari-harimu selalu seindah warna biru favoritmu, dipenuhi tawa, cinta, dan ketenangan yang tak pernah pudar.
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


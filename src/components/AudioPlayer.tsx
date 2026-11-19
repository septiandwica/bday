import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Sparkles, Upload } from 'lucide-react';
import { sounds } from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTitle, setSongTitle] = useState('Dreamy Music Box (Lullaby Chords)');
  const [showUploader, setShowUploader] = useState(false);

  const toggleMusic = () => {
    sounds.toggleDreamyMusic((playing) => {
      setIsPlaying(playing);
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      sounds.setCustomAudio(url);
      setIsPlaying(true);
      setSongTitle(file.name.replace(/\.[^/.]+$/, ''));
      setShowUploader(false);
    }
  };

  return (
    <>
      {/* Floating Audio Controller Badge */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      >
        <div className="glass-panel rounded-full p-2 pr-4 flex items-center gap-3 shadow-xl border border-sky-500/30">
          {/* Vinyl Disc Animation */}
          <button
            onClick={toggleMusic}
            className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-sky-900 via-blue-600 to-sky-400 p-0.5 shadow-md flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform"
            title={isPlaying ? 'Jeda Musik' : 'Putar Musik Romantis'}
          >
            <motion.div
              className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-1.5 rounded-full border border-sky-500/20" />
              <div className="absolute inset-3 rounded-full border border-sky-500/30" />
              <div className="w-3.5 h-3.5 rounded-full bg-sky-400 flex items-center justify-center shadow-inner">
                <Music className="w-2 h-2 text-slate-950" />
              </div>
            </motion.div>

            {/* Glowing pulse ring when playing */}
            {isPlaying && (
              <span className="absolute -inset-1 rounded-full bg-sky-400/30 animate-ping pointer-events-none" />
            )}
          </button>

          {/* Song Info & Controls */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {isPlaying ? 'Musik Menyala' : 'Musik Lagu'}
            </span>
            <span className="text-xs font-semibold text-slate-100 max-w-[140px] truncate">
              {songTitle}
            </span>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={toggleMusic}
            className="p-1.5 rounded-full hover:bg-sky-500/20 text-sky-300 transition-colors cursor-pointer"
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Custom Song Upload Toggle */}
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="p-1.5 rounded-full hover:bg-sky-500/20 text-sky-300 transition-colors cursor-pointer"
            title="Ganti lagu kesukaan Najla (MP3)"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Upload Song Modal */}
      <AnimatePresence>
        {showUploader && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 glass-panel p-4 rounded-2xl max-w-xs shadow-2xl border border-sky-500/30"
          >
            <h4 className="text-xs font-bold text-sky-300 mb-1">Ganti Lagu Kesukaan Najla</h4>
            <p className="text-[11px] text-slate-300 mb-3">
              Pilih file musik (.mp3) dari perangkatmu untuk diputar di latar belakang.
            </p>
            <label className="flex items-center justify-center gap-2 px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>Pilih File Lagu</span>
              <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


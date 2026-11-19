import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Upload, EyeOff, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTitle, setSongTitle] = useState('Dreamy Music Box');
  const [showUploader, setShowUploader] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

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
      {/* Top-Right Audio Controller (Never blocks bottom action buttons, can be hidden/minimized) */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 select-none"
      >
        <AnimatePresence mode="wait">
          {isMinimized ? (
            /* Minimized State: Sleek tiny round button */
            <motion.button
              key="minimized"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => setIsMinimized(false)}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-sky-200 shadow-sm flex items-center justify-center text-[#0284c7] hover:bg-white hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              title="Tampilkan kontrol musik"
            >
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Music className="w-3.5 h-3.5" />
              </motion.div>
            </motion.button>
          ) : (
            /* Expanded State: Compact clean pill */
            <motion.div
              key="expanded"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xs rounded-full py-1.5 pl-2 pr-2.5 flex items-center gap-2 shadow-sm border border-[#bae6fd]"
            >
              {/* Mini Vinyl Disc */}
              <button
                onClick={toggleMusic}
                className="relative w-6 h-6 rounded-full bg-[#0284c7] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform shrink-0"
                title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
              >
                <motion.div
                  className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Music className="w-2.5 h-2.5 text-white" />
                </motion.div>
              </button>

              {/* Song Title */}
              <span className="text-[11px] font-medium text-slate-700 max-w-[85px] sm:max-w-[110px] truncate leading-tight">
                {songTitle}
              </span>

              {/* Play/Pause Toggle */}
              <button
                onClick={toggleMusic}
                className="p-1 rounded-full hover:bg-sky-50 text-[#0284c7] transition-colors cursor-pointer"
                title={isPlaying ? 'Mute' : 'Play'}
              >
                {isPlaying ? (
                  <Volume2 className="w-3.5 h-3.5" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {/* Upload MP3 button */}
              <button
                onClick={() => setShowUploader(!showUploader)}
                className="p-1 rounded-full hover:bg-sky-50 text-slate-400 hover:text-[#0284c7] transition-colors cursor-pointer"
                title="Ganti file musik"
              >
                <Upload className="w-3 h-3" />
              </button>

              {/* Hide / Minimize button */}
              <button
                onClick={() => {
                  setShowUploader(false);
                  setIsMinimized(true);
                }}
                className="p-1 rounded-full hover:bg-sky-50 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title="Sembunyikan"
              >
                <EyeOff className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Upload Song Modal (Drops cleanly from top right) */}
      <AnimatePresence>
        {showUploader && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="fixed top-14 right-3 sm:top-16 sm:right-4 z-40 bg-white p-4 rounded-2xl max-w-xs shadow-xl border border-sky-200"
          >
            <h4 className="text-xs font-bold text-[#0369a1] mb-1">Ganti Lagu Kesukaan Lala</h4>
            <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
              Pilih file musik (.mp3) untuk diputar di latar belakang.
            </p>
            <label className="flex items-center justify-center gap-2 px-3 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-xs">
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Upload } from 'lucide-react';
import { sounds } from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTitle, setSongTitle] = useState('Dreamy Music Box');
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
      {/* Sleek, Compact Floating Audio Controller (Minimalist & Unobtrusive) */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-4 right-4 z-50 flex items-center select-none"
      >
        <div className="bg-white/95 backdrop-blur-xs rounded-full py-1.5 px-2.5 flex items-center gap-2 shadow-md border border-[#bae6fd]">
          {/* Mini Vinyl Disc */}
          <button
            onClick={toggleMusic}
            className="relative w-7 h-7 rounded-full bg-[#38bdf8] p-0.5 shadow-2xs flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform shrink-0"
            title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          >
            <motion.div
              className="w-full h-full rounded-full bg-[#0284c7] flex items-center justify-center relative overflow-hidden"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white flex items-center justify-center shadow-xs">
                <Music className="w-1.5 h-1.5 text-[#0284c7]" />
              </div>
            </motion.div>

            {isPlaying && (
              <span className="absolute -inset-0.5 rounded-full bg-sky-400/30 animate-ping pointer-events-none" />
            )}
          </button>

          {/* Song Title (Compact) */}
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-bold text-slate-700 max-w-[85px] sm:max-w-[120px] truncate leading-tight">
              {songTitle}
            </span>
          </div>

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
            className="p-1 rounded-full hover:bg-sky-50 text-slate-500 hover:text-[#0284c7] transition-colors cursor-pointer"
            title="Ganti file musik"
          >
            <Upload className="w-3 h-3" />
          </button>
        </div>
      </motion.div>

      {/* Upload Song Modal */}
      <AnimatePresence>
        {showUploader && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="fixed bottom-16 right-4 z-50 bg-white p-4 rounded-2xl max-w-xs shadow-xl border-2 border-[#38bdf8]"
          >
            <h4 className="text-xs font-bold text-[#0369a1] mb-1">Ganti Lagu Kesukaan Lala</h4>
            <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
              Pilih file musik (.mp3) untuk diputar di latar belakang.
            </p>
            <label className="flex items-center justify-center gap-2 px-3 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs">
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

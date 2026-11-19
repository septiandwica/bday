import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Upload } from 'lucide-react';
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
      {/* Floating Audio Controller Badge (Bright White & Sky Blue, NO Gradients) */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      >
        <div className="bg-white rounded-full p-2 pr-4 flex items-center gap-3 shadow-xl border-2 border-[#bae6fd]">
          {/* Vinyl Disc Animation (Solid Bright Sky Blue) */}
          <button
            onClick={toggleMusic}
            className="relative w-11 h-11 rounded-full bg-[#38bdf8] p-0.5 shadow-sm flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform"
            title={isPlaying ? 'Jeda Musik' : 'Putar Musik Romantis'}
          >
            <motion.div
              className="w-full h-full rounded-full bg-[#0284c7] flex items-center justify-center relative overflow-hidden"
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-xs">
                <Music className="w-2.5 h-2.5 text-[#0284c7]" />
              </div>
            </motion.div>

            {/* Glowing ring when playing */}
            {isPlaying && (
              <span className="absolute -inset-1 rounded-full bg-sky-400/40 animate-ping pointer-events-none" />
            )}
          </button>

          {/* Song Info & Controls */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#0284c7] flex items-center gap-1">
              <Music className="w-2.5 h-2.5" />
              {isPlaying ? 'Musik Nyala' : 'Musik Latar'}
            </span>
            <span className="text-xs font-bold text-slate-800 max-w-[90px] sm:max-w-[140px] truncate">
              {songTitle}
            </span>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={toggleMusic}
            className="p-1.5 rounded-full hover:bg-sky-50 text-[#0284c7] transition-colors cursor-pointer"
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Custom Song Upload Toggle */}
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="p-1.5 rounded-full hover:bg-sky-50 text-[#0284c7] transition-colors cursor-pointer"
            title="Ganti lagu kesukaan Lala (MP3)"
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
            className="fixed bottom-24 right-6 z-50 bg-white p-5 rounded-3xl max-w-xs shadow-2xl border-2 border-[#38bdf8]"
          >
            <h4 className="text-xs font-bold text-[#0369a1] mb-1">Ganti Lagu Kesukaan Lala</h4>
            <p className="text-[11px] text-slate-500 mb-3">
              Pilih file musik (.mp3) dari perangkatmu untuk diputar di latar belakang.
            </p>
            <label className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs">
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

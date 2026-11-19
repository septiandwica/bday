import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Download, RefreshCw, Heart, ArrowRight, RotateCcw, Cake, Crown, Bird, Sparkle, Stamp } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerStarBurst } from '../utils/confetti';

interface PhotoStudioProps {
  onGoToLoveMeter: () => void;
  onRestart: () => void;
}

interface FilterOption {
  id: string;
  name: string;
  cssFilter: string;
}

interface AestheticSticker {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  renderLabel: string;
}

const FILTERS: FilterOption[] = [
  { id: 'normal', name: 'Original', cssFilter: 'none' },
  { id: 'warm', name: 'Warm Sky', cssFilter: 'sepia(0.2) saturate(1.2) brightness(1.05)' },
  { id: 'dreamy', name: 'Dreamy', cssFilter: 'brightness(1.1) contrast(0.95) saturate(1.2) hue-rotate(-5deg)' },
  { id: 'vintage', name: 'Vintage', cssFilter: 'sepia(0.35) contrast(1.15) brightness(1.02)' },
  { id: 'skyblue', name: 'Sky Glow', cssFilter: 'hue-rotate(20deg) brightness(1.08) saturate(1.1)' },
  { id: 'bw', name: 'B&W', cssFilter: 'grayscale(1) contrast(1.15)' },
];

const STICKERS: AestheticSticker[] = [
  { id: 'none', name: 'Tanpa Stiker', icon: Sparkle, renderLabel: '' },
  { id: 'cake', name: 'Kue Tart', icon: Cake, renderLabel: 'CAKE' },
  { id: 'crown', name: 'Mahkota', icon: Crown, renderLabel: 'CROWN' },
  { id: 'birds', name: 'Dua Burung', icon: Bird, renderLabel: 'BIRDS' },
  { id: 'stamp', name: 'Stempel Pos', icon: Stamp, renderLabel: 'STAMP' },
];

const FRAME_THEMES = [
  { id: 'classic', name: 'Classic White', borderClass: 'border-white bg-white', hex: '#ffffff' },
  { id: 'skyblue', name: 'Pastel Sky', borderClass: 'border-[#bae6fd] bg-[#f0f9ff]', hex: '#f0f9ff' },
  { id: 'warmcream', name: 'Sweet Cream', borderClass: 'border-[#fed7aa] bg-[#fffbeb]', hex: '#fffbeb' },
];

export const PhotoStudio: React.FC<PhotoStudioProps> = ({ onGoToLoveMeter, onRestart }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(FILTERS[0]);
  const [selectedSticker, setSelectedSticker] = useState<AestheticSticker>(STICKERS[1]); // Default Cake
  const [selectedFrame, setSelectedFrame] = useState(FRAME_THEMES[0]);
  const [caption, setCaption] = useState('Happy Birthday Lala');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sync Video Element with Camera Stream
  const syncVideoStream = (videoElement: HTMLVideoElement | null) => {
    videoRef.current = videoElement;
    if (videoElement && streamRef.current) {
      if (videoElement.srcObject !== streamRef.current) {
        videoElement.srcObject = streamRef.current;
      }
      videoElement.play().catch((err) => {
        console.warn('Video auto-play interrupted:', err);
      });
    }
  };

  // Start Camera
  const startCamera = async () => {
    try {
      setCameraError(null);
      // Stop any existing stream first
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 720 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      setIsCameraActive(true);
      setPhotoUrl(null);
      sounds.playChime(1.1);
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Kamera tidak dapat diakses atau izin belum diberikan. Kamu bisa upload foto dari galeri HP/laptop.');
      setIsCameraActive(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Capture Snapshot from Camera
  const takeSnapshot = () => {
    if (!videoRef.current) return;
    setIsFlashing(true);
    sounds.playChime(1.3);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 640;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Mirror horizontal for natural selfie view
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setPhotoUrl(dataUrl);
      stopCamera();
      triggerStarBurst();
    }

    setTimeout(() => {
      setIsFlashing(false);
    }, 250);
  };

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target?.result as string);
        stopCamera();
        sounds.playChime(1.1);
        triggerStarBurst();
      };
      reader.readAsDataURL(file);
    }
  };

  // Download Polaroid Canvas
  const downloadPolaroid = () => {
    if (!photoUrl) return;
    sounds.playChime(1.2);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const polaroidWidth = 800;
    const polaroidHeight = 1020;
    const photoMargin = 50;
    const photoSize = polaroidWidth - (photoMargin * 2);

    canvas.width = polaroidWidth;
    canvas.height = polaroidHeight;

    // Frame Theme Background
    ctx.fillStyle = selectedFrame.hex;
    ctx.fillRect(0, 0, polaroidWidth, polaroidHeight);

    // Frame Border Outline
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, polaroidWidth - 8, polaroidHeight - 8);

    // Draw photo with selected filter
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Photo square background
      ctx.fillStyle = '#f0f9ff';
      ctx.fillRect(photoMargin, photoMargin, photoSize, photoSize);

      // Apply CSS Filter
      ctx.save();
      if (selectedFilter.cssFilter !== 'none') {
        ctx.filter = selectedFilter.cssFilter;
      }

      // Draw image cropped to square
      const minDim = Math.min(img.width, img.height);
      const sx = (img.width - minDim) / 2;
      const sy = (img.height - minDim) / 2;
      ctx.drawImage(img, sx, sy, minDim, minDim, photoMargin, photoMargin, photoSize, photoSize);
      ctx.restore();

      // Inner Photo Border
      ctx.strokeStyle = '#e0f2fe';
      ctx.lineWidth = 2;
      ctx.strokeRect(photoMargin, photoMargin, photoSize, photoSize);

      // Aesthetic Sticker Badge in Top Right of Photo
      if (selectedSticker.id !== 'none') {
        ctx.save();
        const badgeX = photoMargin + photoSize - 60;
        const badgeY = photoMargin + 20;

        // Circular background for sticker badge
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(2, 132, 199, 0.25)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(badgeX, badgeY, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#0284c7';
        ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (selectedSticker.id === 'cake') ctx.fillText('🎂', badgeX, badgeY + 2);
        else if (selectedSticker.id === 'crown') ctx.fillText('👑', badgeX, badgeY + 2);
        else if (selectedSticker.id === 'birds') ctx.fillText('🕊️', badgeX, badgeY + 2);
        else if (selectedSticker.id === 'stamp') ctx.fillText('💌', badgeX, badgeY + 2);
        ctx.restore();
      }

      // Header Tag on Polaroid Chin
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('LALA BIRTHDAY EDITION', polaroidWidth / 2, photoMargin + photoSize + 50);

      // Handwritten style caption
      ctx.fillStyle = '#0369a1';
      ctx.font = 'bold 44px "Dancing Script", cursive, serif';
      ctx.fillText(caption, polaroidWidth / 2, photoMargin + photoSize + 115);

      // Subtitle
      ctx.fillStyle = '#64748b';
      ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Momen Spesial Ulang Tahun • 2026', polaroidWidth / 2, photoMargin + photoSize + 160);

      // Export to PNG and download
      const link = document.createElement('a');
      link.download = `polaroid-lala-birthday.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = photoUrl;
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <section className="py-2 sm:py-4 px-3 sm:px-4 max-w-2xl mx-auto text-center relative z-10 select-none">
      {/* Flash overlay */}
      {isFlashing && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-pulse" />
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-2 shadow-xs">
          <Camera className="w-3.5 h-3.5" />
          <span>Mini Studio Foto</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0369a1] font-display">
          Polaroid Birthday Studio
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-md mx-auto">
          Ambil selfie atau upload foto favorit Lala, pilih komponen estetik & filter, lalu simpan polaroid ulang tahunmu!
        </p>
      </motion.div>

      {/* POLAROID FRAME PREVIEW */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative mx-auto w-full max-w-[320px] sm:max-w-[360px] rounded-3xl p-4 sm:p-5 shadow-2xl border-4 transition-all duration-300 flex flex-col items-center ${selectedFrame.borderClass}`}
      >
        {/* Photo Container */}
        <div className="w-full aspect-square bg-[#f0f9ff] rounded-2xl overflow-hidden relative border-2 border-sky-100 flex items-center justify-center">
          
          {/* Active Camera View */}
          {isCameraActive && (
            <div className="w-full h-full relative">
              <video
                ref={syncVideoStream}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
              <button
                onClick={takeSnapshot}
                className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-5 py-2 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 transition-all z-20"
              >
                <Camera className="w-4 h-4" />
                <span>Jepret Foto</span>
              </button>
            </div>
          )}

          {/* Captured / Uploaded Photo Preview with CSS Filter */}
          {!isCameraActive && photoUrl && (
            <div className="w-full h-full relative">
              <img
                src={photoUrl}
                alt="Polaroid Preview"
                style={{ filter: selectedFilter.cssFilter }}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Aesthetic Sticker Overlay Preview */}
              {selectedSticker.id !== 'none' && (
                <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 shadow-md border-2 border-[#38bdf8] flex items-center justify-center text-[#0284c7] animate-bounce">
                  <selectedSticker.icon className="w-5 h-5" />
                </div>
              )}
            </div>
          )}

          {/* Prompt when no camera and no photo */}
          {!isCameraActive && !photoUrl && (
            <div className="p-5 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-[#0284c7]">
                <Camera className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-600 font-medium max-w-[200px]">
                Buka kamera untuk selfie atau pilih foto dari galeri
              </p>
              <div className="flex flex-col gap-2 w-full max-w-[200px]">
                <button
                  onClick={startCamera}
                  className="w-full py-2 px-3 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Buka Kamera Selfie</span>
                </button>
                <label className="w-full py-2 px-3 rounded-xl bg-white border-2 border-sky-300 text-[#0284c7] hover:bg-sky-50 font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload dari Galeri</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Polaroid Chin */}
        <div className="w-full pt-4 pb-2 px-2 text-center">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full text-center font-handwriting text-2xl sm:text-3xl text-[#0284c7] font-bold bg-transparent border-b border-transparent hover:border-sky-200 focus:border-[#38bdf8] focus:outline-none transition-colors"
            placeholder="Tulis catatan kecil..."
          />
          <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-1 uppercase tracking-wider">
            Momen Spesial Ulang Tahun • 2026
          </p>
        </div>
      </motion.div>

      {/* CUSTOMIZABLE AESTHETIC CONTROLS (FILTERS, STICKERS, THEMES) */}
      {photoUrl && (
        <div className="mt-5 max-w-md mx-auto space-y-4">
          
          {/* 1. Filter Picker */}
          <div>
            <span className="text-xs font-bold text-[#0369a1] mb-1.5 block">
              1. Filter Aesthetic:
            </span>
            <div className="flex items-center justify-center flex-wrap gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFilter(f);
                    sounds.playChime(1.05);
                  }}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    selectedFilter.id === f.id
                      ? 'bg-[#0284c7] text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-sky-200 hover:bg-sky-50'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Aesthetic Stickers */}
          <div>
            <span className="text-xs font-bold text-[#0369a1] mb-1.5 block">
              2. Stiker / Aksesoris:
            </span>
            <div className="flex items-center justify-center flex-wrap gap-2">
              {STICKERS.map((s) => {
                const Icon = s.icon;
                const isSelected = selectedSticker.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedSticker(s);
                      sounds.playChime(1.1);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0284c7] text-white shadow-xs scale-105'
                        : 'bg-white text-slate-600 border border-sky-200 hover:bg-sky-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Frame Style Themes */}
          <div>
            <span className="text-xs font-bold text-[#0369a1] mb-1.5 block">
              3. Tema Bingkai Polaroid:
            </span>
            <div className="flex items-center justify-center gap-2">
              {FRAME_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setSelectedFrame(theme);
                    sounds.playChime(1.05);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedFrame.id === theme.id
                      ? 'bg-[#0369a1] text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-sky-200 hover:bg-sky-50'
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons: Download & Retake */}
          <div className="pt-2 flex items-center justify-center gap-2.5">
            <button
              onClick={downloadPolaroid}
              className="px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Simpan Foto Polaroid</span>
            </button>

            <button
              onClick={() => {
                setPhotoUrl(null);
                startCamera();
              }}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-600 border-2 border-sky-200 hover:bg-sky-50 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ganti Foto</span>
            </button>
          </div>
        </div>
      )}

      {cameraError && (
        <p className="text-xs text-amber-600 mt-2">{cameraError}</p>
      )}

      {/* Footer Navigation */}
      <div className="mt-6 pt-4 border-t border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-xl mx-auto">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#0284c7] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Mulai dari Amplop Awal</span>
        </button>

        <button
          onClick={onGoToLoveMeter}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white border-2 border-[#38bdf8] text-[#0284c7] hover:bg-sky-50 font-bold text-xs shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <Heart className="w-3.5 h-3.5 fill-[#0284c7]" />
          <span>Coba Love Meter Juga</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};

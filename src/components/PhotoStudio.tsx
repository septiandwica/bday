import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Download, RefreshCw, Sparkles, Heart, ArrowRight, RotateCcw } from 'lucide-react';
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

const FILTERS: FilterOption[] = [
  { id: 'normal', name: 'Original', cssFilter: 'none' },
  { id: 'warm', name: 'Warm Sky', cssFilter: 'sepia(0.2) saturate(1.2) brightness(1.05)' },
  { id: 'dreamy', name: 'Dreamy Pastel', cssFilter: 'brightness(1.1) contrast(0.95) saturate(1.2) hue-rotate(-5deg)' },
  { id: 'vintage', name: 'Vintage Film', cssFilter: 'sepia(0.35) contrast(1.15) brightness(1.02)' },
  { id: 'skyblue', name: 'Sky Glow', cssFilter: 'hue-rotate(20deg) brightness(1.08) saturate(1.1)' },
  { id: 'bw', name: 'B&W Classic', cssFilter: 'grayscale(1) contrast(1.15)' },
];

export const PhotoStudio: React.FC<PhotoStudioProps> = ({ onGoToLoveMeter, onRestart }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(FILTERS[0]);
  const [caption, setCaption] = useState('Happy Birthday Lala');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start Camera
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
      setPhotoUrl(null);
      sounds.playChime(1.1);
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError('Kamera tidak dapat diakses. Kamu bisa upload foto dari galeri HP/laptop.');
      setIsCameraActive(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
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
      // Mirror horizontal for natural selfie
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

    // High resolution polaroid dimensions
    const polaroidWidth = 800;
    const polaroidHeight = 1000;
    const photoMargin = 50;
    const photoSize = polaroidWidth - (photoMargin * 2);

    canvas.width = polaroidWidth;
    canvas.height = polaroidHeight;

    // White Polaroid Frame with subtle warm tone
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, polaroidWidth, polaroidHeight);

    // Subtle outer border
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

      // Top Birthday Badge
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('LALA BIRTHDAY EDITION', polaroidWidth / 2, photoMargin + photoSize + 48);

      // Handwritten style caption
      ctx.fillStyle = '#0369a1';
      ctx.font = 'bold 44px "Dancing Script", cursive, serif';
      ctx.fillText(caption, polaroidWidth / 2, photoMargin + photoSize + 110);

      // Date / Subtitle
      ctx.fillStyle = '#64748b';
      ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Momen Spesial Ulang Tahun • 2026', polaroidWidth / 2, photoMargin + photoSize + 155);

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
      {/* Flash overlay effect */}
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
          Ambil foto selfie atau upload foto favorit Lala, pilih filter aesthetic, lalu simpan polaroid ulang tahunmu!
        </p>
      </motion.div>

      {/* POLAROID CARD FRAME */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative mx-auto w-full max-w-[320px] sm:max-w-[370px] bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border-4 border-sky-200 flex flex-col items-center"
      >
        {/* Photo Window */}
        <div className="w-full aspect-square bg-[#f0f9ff] rounded-2xl overflow-hidden relative border-2 border-sky-100 flex items-center justify-center">
          {/* Active Camera View */}
          {isCameraActive && (
            <div className="w-full h-full relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
              <button
                onClick={takeSnapshot}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>Jepret Foto</span>
              </button>
            </div>
          )}

          {/* Captured / Uploaded Photo Preview with CSS Filter */}
          {!isCameraActive && photoUrl && (
            <img
              src={photoUrl}
              alt="Polaroid Preview"
              style={{ filter: selectedFilter.cssFilter }}
              className="w-full h-full object-cover transition-all duration-300"
            />
          )}

          {/* Empty Initial State: Camera or Upload Prompt */}
          {!isCameraActive && !photoUrl && (
            <div className="p-6 text-center flex flex-col items-center justify-center gap-3">
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

        {/* Polaroid Chin (Bottom Text Section) */}
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

      {/* FILTER PICKER (Available when photo is taken/uploaded) */}
      {photoUrl && (
        <div className="mt-4 max-w-md mx-auto">
          <span className="text-xs font-bold text-[#0369a1] mb-2 block">
            Pilih Filter Aesthetic:
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

          {/* Action Buttons: Download & Retake */}
          <div className="mt-4 flex items-center justify-center gap-2.5">
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

      {/* Footer Navigation: Switch to Love Meter or Restart */}
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

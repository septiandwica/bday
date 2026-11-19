import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Download, RefreshCw, Heart, ArrowRight, RotateCcw, Sparkle, Sliders, Palette } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerStarBurst } from '../utils/confetti';

interface PhotoStudioProps {
  onGoToLoveMeter: () => void;
  onRestart: () => void;
}

interface CuratedTheme {
  id: string;
  name: string;
  tag: string;
  frameBg: string;
  frameBorder: string;
  badgeBg: string;
  badgeText: string;
  defaultFilter: string;
  accentIcon: string;
  hexBg: string;
}

const THEMES: CuratedTheme[] = [
  {
    id: 'classic21',
    name: 'Classic 21st',
    tag: 'Elegan & Bersih',
    frameBg: 'bg-white',
    frameBorder: 'border-white',
    badgeBg: 'bg-sky-50 text-[#0284c7]',
    badgeText: '21st BDAY',
    defaultFilter: 'none',
    accentIcon: '21',
    hexBg: '#ffffff',
  },
  {
    id: 'pastelsky',
    name: 'Pastel Sky',
    tag: 'Langit Lembut',
    frameBg: 'bg-[#f0f9ff]',
    frameBorder: 'border-[#bae6fd]',
    badgeBg: 'bg-[#0284c7] text-white',
    badgeText: 'LALA 21',
    defaultFilter: 'brightness(1.08) contrast(0.96) saturate(1.15)',
    accentIcon: '☁️',
    hexBg: '#f0f9ff',
  },
  {
    id: 'vintagefilm',
    name: 'Warm Retro',
    tag: 'Nostalgia Hangat',
    frameBg: 'bg-[#fffbeb]',
    frameBorder: 'border-[#fde68a]',
    badgeBg: 'bg-amber-100 text-amber-800',
    badgeText: 'NOV 2005',
    defaultFilter: 'sepia(0.3) contrast(1.12) brightness(1.04)',
    accentIcon: '✨',
    hexBg: '#fffbeb',
  },
  {
    id: 'noir',
    name: 'Classic Film',
    tag: 'Hitam Putih Sinematik',
    frameBg: 'bg-white',
    frameBorder: 'border-slate-200',
    badgeBg: 'bg-slate-800 text-white',
    badgeText: '21 YEARS',
    defaultFilter: 'grayscale(1) contrast(1.18)',
    accentIcon: '🎬',
    hexBg: '#ffffff',
  },
];

const FILTERS = [
  { id: 'original', name: 'Original', css: 'none' },
  { id: 'warm', name: 'Warm', css: 'sepia(0.2) saturate(1.2) brightness(1.05)' },
  { id: 'dreamy', name: 'Dreamy', css: 'brightness(1.1) contrast(0.95) saturate(1.2) hue-rotate(-5deg)' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(0.35) contrast(1.15) brightness(1.02)' },
  { id: 'sky', name: 'Sky Tint', css: 'hue-rotate(20deg) brightness(1.08) saturate(1.1)' },
  { id: 'bw', name: 'Monochrome', css: 'grayscale(1) contrast(1.15)' },
];

export const PhotoStudio: React.FC<PhotoStudioProps> = ({ onGoToLoveMeter, onRestart }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<CuratedTheme>(THEMES[0]);
  const [customFilter, setCustomFilter] = useState<string>('none');
  const [activeTab, setActiveTab] = useState<'theme' | 'filter'>('theme');
  const [caption, setCaption] = useState('Happy 21st Birthday Lala');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sync stream to video element
  const syncVideoStream = (videoElement: HTMLVideoElement | null) => {
    videoRef.current = videoElement;
    if (videoElement && streamRef.current) {
      if (videoElement.srcObject !== streamRef.current) {
        videoElement.srcObject = streamRef.current;
      }
      videoElement.play().catch(() => {});
    }
  };

  // Start Camera
  const startCamera = async () => {
    try {
      setCameraError(null);
      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } },
        audio: false,
      });

      streamRef.current = stream;
      setIsCameraActive(true);
      setPhotoUrl(null);
      sounds.playChime(1.1);
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError('Kamera tidak dapat diakses. Kamu bisa memilih foto langsung dari galeri HP/laptop.');
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

  // Capture Snapshot
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

  // File Upload
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

  // Compute active CSS filter
  const activeCssFilter = customFilter !== 'none' ? customFilter : selectedTheme.defaultFilter;

  // Download High-Resolution Birthday Polaroid
  const downloadPolaroid = () => {
    if (!photoUrl) return;
    sounds.playChime(1.2);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 800;
    const height = 1040;
    const margin = 50;
    const photoSize = width - (margin * 2);

    canvas.width = width;
    canvas.height = height;

    // Background Polaroid Chin
    ctx.fillStyle = selectedTheme.hexBg;
    ctx.fillRect(0, 0, width, height);

    // Frame Border Outline
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Photo square background
      ctx.fillStyle = '#f0f9ff';
      ctx.fillRect(margin, margin, photoSize, photoSize);

      // Apply CSS Filter
      ctx.save();
      if (activeCssFilter !== 'none') {
        ctx.filter = activeCssFilter;
      }

      // Draw cropped square
      const minDim = Math.min(img.width, img.height);
      const sx = (img.width - minDim) / 2;
      const sy = (img.height - minDim) / 2;
      ctx.drawImage(img, sx, sy, minDim, minDim, margin, margin, photoSize, photoSize);
      ctx.restore();

      // Photo inner border
      ctx.strokeStyle = '#e0f2fe';
      ctx.lineWidth = 2;
      ctx.strokeRect(margin, margin, photoSize, photoSize);

      // 21st Birthday Stamp Badge (Top Right of Photo)
      ctx.save();
      const badgeX = margin + photoSize - 65;
      const badgeY = margin + 30;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(2, 132, 199, 0.2)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.roundRect(badgeX - 45, badgeY - 16, 90, 32, 16);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedTheme.badgeText, badgeX, badgeY);
      ctx.restore();

      // Top Tag on Chin
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("LALA'S 21ST BIRTHDAY", width / 2, margin + photoSize + 48);

      // Handwritten cursive caption
      ctx.fillStyle = '#0369a1';
      ctx.font = 'bold 44px "Dancing Script", cursive, serif';
      ctx.fillText(caption, width / 2, margin + photoSize + 115);

      // Subtitle with Birthdate
      ctx.fillStyle = '#64748b';
      ctx.font = '500 19px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('20 November 2005 • Menapaki 21 Tahun Penuh Cahaya', width / 2, margin + photoSize + 162);

      // Trigger download
      const link = document.createElement('a');
      link.download = `polaroid-lala-21st-birthday.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      triggerStarBurst();
    };
    img.src = photoUrl;
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <section className="py-2 sm:py-4 px-3 sm:px-4 max-w-xl mx-auto text-center relative z-10 select-none pb-20">
      {/* Flash overlay */}
      {isFlashing && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-pulse" />
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 sm:mb-4"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border-2 border-sky-200 text-[#0284c7] text-[11px] font-bold mb-1.5 shadow-xs">
          <Camera className="w-3.5 h-3.5" />
          <span>Spesial Ulang Tahun ke-21</span>
        </span>
        <h2 className="text-xl sm:text-3xl font-extrabold text-[#0369a1] font-display leading-tight">
          Polaroid Studio Lala
        </h2>
        <p className="text-slate-600 text-[11px] sm:text-xs mt-0.5 max-w-md mx-auto">
          20 November 2005 &bull; 21 Tahun Spesial
        </p>
      </motion.div>

      {/* ELEGANT POLAROID FRAME (PROPER, COMPACT & FULLY RESPONSIVE) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative mx-auto w-full max-w-[280px] sm:max-w-[325px] rounded-3xl p-3.5 sm:p-4 shadow-xl border-3 sm:border-4 transition-all duration-300 flex flex-col items-center ${selectedTheme.frameBg} ${selectedTheme.frameBorder}`}
      >
        {/* Photo Container */}
        <div className="w-full aspect-square max-h-[240px] sm:max-h-[280px] bg-[#f0f9ff] rounded-2xl overflow-hidden relative border-2 border-sky-100 flex items-center justify-center">
          
          {/* Active Camera Live View */}
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
                className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs shadow-lg flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all z-20"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Jepret Foto</span>
              </button>
            </div>
          )}

          {/* Captured / Uploaded Photo Preview with Theme / Filter */}
          {!isCameraActive && photoUrl && (
            <div className="w-full h-full relative">
              <img
                src={photoUrl}
                alt="Polaroid Preview"
                style={{ filter: activeCssFilter }}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* 21st Birthday Emblem Badge */}
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/95 shadow-md border border-sky-200 flex items-center gap-1">
                <span className="text-[9px] font-mono font-extrabold text-[#0284c7]">
                  {selectedTheme.badgeText}
                </span>
              </div>
            </div>
          )}

          {/* Prompt when empty */}
          {!isCameraActive && !photoUrl && (
            <div className="p-4 text-center flex flex-col items-center justify-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-[#0284c7]">
                <Camera className="w-5 h-5" />
              </div>
              <p className="text-[11px] text-slate-600 font-medium max-w-[180px] leading-tight">
                Buka kamera selfie atau pilih foto dari galeri
              </p>
              <div className="flex flex-col gap-1.5 w-full max-w-[180px]">
                <button
                  onClick={startCamera}
                  className="w-full py-1.5 px-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-[11px] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Buka Kamera</span>
                </button>
                <label className="w-full py-1.5 px-2.5 rounded-xl bg-white border-2 border-sky-300 text-[#0284c7] hover:bg-sky-50 font-bold text-[11px] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Foto</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Polaroid Chin */}
        <div className="w-full pt-3 pb-1 px-1 text-center">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full text-center font-handwriting text-xl sm:text-2xl text-[#0284c7] font-bold bg-transparent border-b border-transparent hover:border-sky-200 focus:border-[#38bdf8] focus:outline-none transition-colors"
            placeholder="Happy 21st Birthday Lala"
          />
          <p className="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 uppercase tracking-wider">
            20 November 2005 &bull; 21 Tahun Spesial
          </p>
        </div>
      </motion.div>

      {/* STREAMLINED CONTROLS (PROPER, TIDY & UNIFIED) */}
      {photoUrl && (
        <div className="mt-4 max-w-sm mx-auto">
          
          {/* Segmented Tab Switcher (Gaya Polaroid vs Warna Filter) */}
          <div className="flex rounded-xl bg-sky-100/70 p-1 mb-3">
            <button
              onClick={() => setActiveTab('theme')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'theme' ? 'bg-white text-[#0284c7] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Gaya Polaroid</span>
            </button>
            <button
              onClick={() => setActiveTab('filter')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'filter' ? 'bg-white text-[#0284c7] shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Filter Warna</span>
            </button>
          </div>

          {/* Tab 1: Gaya Polaroid Curated */}
          {activeTab === 'theme' && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {THEMES.map((theme) => {
                const isSelected = selectedTheme.id === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setSelectedTheme(theme);
                      setCustomFilter('none');
                      sounds.playChime(1.05);
                    }}
                    className={`p-2.5 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0284c7] bg-white shadow-xs ring-2 ring-sky-200'
                        : 'border-sky-100 bg-white/70 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">{theme.name}</span>
                      <span className="text-xs">{theme.accentIcon}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block leading-tight">{theme.tag}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab 2: Filter Warna */}
          {activeTab === 'filter' && (
            <div className="flex items-center justify-center flex-wrap gap-1.5 mb-4">
              {FILTERS.map((f) => {
                const isSelected = customFilter === f.css;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      setCustomFilter(f.css);
                      sounds.playChime(1.05);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0284c7] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-sky-200 hover:bg-sky-50'
                    }`}
                  >
                    {f.name}
                  </button>
                );
              })}
            </div>
          )}

          {/* Download & Retake Actions */}
          <div className="flex items-center justify-center gap-2.5">
            <button
              onClick={downloadPolaroid}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Simpan Foto Polaroid</span>
            </button>

            <button
              onClick={() => {
                setPhotoUrl(null);
                startCamera();
              }}
              className="py-2.5 px-3.5 rounded-xl bg-white text-slate-600 border-2 border-sky-200 hover:bg-sky-50 font-bold text-xs shadow-xs transition-all flex items-center gap-1 cursor-pointer"
              title="Ambil foto ulang"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ulang</span>
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

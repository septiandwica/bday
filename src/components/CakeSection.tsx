import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, RotateCcw, Heart, Cake, ArrowRight, Mic, MicOff, Volume2 } from 'lucide-react';
import { sounds } from '../utils/audio';
import { triggerCandleConfetti } from '../utils/confetti';

interface CakeSectionProps {
  onContinue: () => void;
}

export const CakeSection: React.FC<CakeSectionProps> = ({ onContinue }) => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [hasMadeWish, setHasMadeWish] = useState(false);

  // Microphone Blow Sensor State
  const [isMicActive, setIsMicActive] = useState(false);
  const [blowLevel, setBlowLevel] = useState(0); // 0 to 100%
  const [micError, setMicError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const blowStreakRef = useRef(0);

  const allCandlesOut = candlesLit.every((lit) => !lit);

  const triggerCelebration = () => {
    setHasMadeWish(true);
    stopMic();
    setTimeout(() => {
      sounds.playFanfare();
      triggerCandleConfetti();
    }, 350);
  };

  const extinguishCandle = (index: number) => {
    if (!candlesLit[index]) return;
    sounds.playBlowCandle();
    sounds.playChime(1.1);

    setCandlesLit((prev) => {
      const updated = [...prev];
      updated[index] = false;
      if (updated.every((lit) => !lit)) {
        triggerCelebration();
      }
      return updated;
    });
  };

  const blowAllCandles = () => {
    if (allCandlesOut) return;
    sounds.playBlowCandle();
    setCandlesLit([false, false, false]);
    triggerCelebration();
  };

  const relightCandles = () => {
    sounds.playChime(0.9);
    setCandlesLit([true, true, true]);
    setHasMadeWish(false);
    blowStreakRef.current = 0;
  };

  // Start Mic Blow Sensor
  const startMic = async () => {
    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      mediaStreamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);
      analyserRef.current = analyser;

      setIsMicActive(true);
      blowStreakRef.current = 0;

      const checkBlow = () => {
        if (!analyserRef.current) return;
        const buffer = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(buffer);

        let lowFreqSum = 0;
        const lowBins = 30;
        for (let i = 2; i < lowBins; i++) {
          lowFreqSum += buffer[i];
        }
        const avgVolume = lowFreqSum / (lowBins - 2);

        const normalized = Math.min(100, Math.max(0, Math.round(((avgVolume - 15) / 45) * 100)));
        setBlowLevel(normalized);

        if (normalized > 55) {
          blowStreakRef.current += 1;
          if (blowStreakRef.current > 4) {
            blowAllCandles();
            return;
          }
        } else {
          blowStreakRef.current = Math.max(0, blowStreakRef.current - 1);
        }

        animationFrameRef.current = requestAnimationFrame(checkBlow);
      };

      animationFrameRef.current = requestAnimationFrame(checkBlow);
    } catch (err) {
      console.error('Mic access error:', err);
      setMicError('Izin mikrofon diperlukan untuk sensor tiup.');
      setIsMicActive(false);
    }
  };

  const stopMic = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsMicActive(false);
    setBlowLevel(0);
    blowStreakRef.current = 0;
  };

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  return (
    <section className="py-2 sm:py-4 px-3 sm:px-4 max-w-xl mx-auto text-center relative z-10 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 sm:mb-4"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-2 shadow-xs">
          <Cake className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>Momen Spesial Ulang Tahun</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0369a1] font-display">
          Make a Wish, Lala!
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-sm mx-auto">
          Pejamkan mata, sebutkan harapan terbaikmu dalam hati, lalu tiup lilinnya ya.
        </p>
      </motion.div>

      {/* Mic Sensor Status Pill */}
      <div className="mb-4 flex flex-col items-center justify-center">
        {!isMicActive ? (
          <button
            onClick={startMic}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border-2 border-sky-300 text-[#0284c7] hover:bg-sky-50 text-xs font-bold shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Aktifkan Sensor Tiup (Mic)</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#38bdf8] text-[#0369a1] text-xs font-bold shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0284c7]"></span>
            </span>
            <Volume2 className="w-3.5 h-3.5 text-[#0284c7]" />
            <span className="text-[11px] sm:text-xs">Tiup ke arah mic/layar...</span>

            {/* Live Volume Meter Bar */}
            <div className="w-14 sm:w-18 h-2 rounded-full bg-sky-100 overflow-hidden border border-sky-200">
              <div
                className="h-full bg-[#0284c7] transition-all duration-75 rounded-full"
                style={{ width: `${blowLevel}%` }}
              />
            </div>

            <button
              onClick={stopMic}
              className="p-0.5 rounded-full hover:bg-sky-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              title="Matikan sensor mic"
            >
              <MicOff className="w-3 h-3" />
            </button>
          </div>
        )}

        {micError && (
          <p className="text-[11px] text-amber-600 mt-1">{micError}</p>
        )}
      </div>

      {/* BIRTHDAY CAKE WITH CANDLES PLANTED FIRMLY INTO FROSTING */}
      <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[330px] flex flex-col items-center justify-end pb-2">
        
        {/* 3 CANDLES PLANTED IN CAKE TOP (Negative margin so candles stick directly into cake frosting) */}
        <div className="flex justify-center gap-8 sm:gap-10 relative z-30 mb-[-12px]">
          {[0, 1, 2].map((idx) => {
            const isLit = candlesLit[idx];
            return (
              <div
                key={idx}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => extinguishCandle(idx)}
                title={isLit ? "Sentuh untuk tiup lilin ini" : "Lilin sudah padam"}
              >
                {/* Flame / Smoke */}
                <div className="h-7 sm:h-8 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {isLit ? (
                      <motion.div
                        key="flame"
                        initial={{ scale: 0 }}
                        animate={{
                          scale: blowLevel > 30 ? [1, 1.25, 0.9, 1.1] : 1,
                          rotate: blowLevel > 30 ? [-12, 14, -8, 10] : [-2, 2, -2],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: blowLevel > 30 ? 0.2 : 0.8,
                          ease: 'easeInOut',
                        }}
                        exit={{ scale: 0, opacity: 0, y: -10 }}
                        className="relative w-4 h-6 sm:h-7 flex items-center justify-center"
                      >
                        <div className="absolute inset-0 rounded-full bg-amber-400 blur-[2px] opacity-75" />
                        <div className="relative w-3 h-5 sm:h-6 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100" />
                        <div className="absolute bottom-0.5 w-1 h-1.5 rounded-full bg-sky-400 opacity-60" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                        animate={{ opacity: 0, y: -16, scale: 1.3 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="flex flex-col items-center"
                      >
                        <Wind className="w-3 h-3 text-sky-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Wick */}
                <div className="w-0.5 h-1.5 bg-slate-700" />

                {/* Candle Stick */}
                <div className="w-3.5 sm:w-4 h-10 sm:h-12 rounded-t-sm bg-[#38bdf8] shadow-xs relative overflow-hidden">
                  <div className="w-full h-1 bg-white transform -rotate-12 mt-1.5 scale-125" />
                  <div className="w-full h-1 bg-white transform -rotate-12 mt-2 scale-125" />
                </div>
              </div>
            );
          })}
        </div>

        {/* SEAMLESS SVG CAKE BODY (Starts immediately at the candle base) */}
        <div className="w-full relative z-20">
          <svg
            viewBox="0 0 320 160"
            className="w-full h-auto drop-shadow-md select-none"
          >
            {/* Soft Shadow under plate */}
            <ellipse cx="160" cy="154" rx="125" ry="6" fill="#bae6fd" opacity="0.4" />

            {/* Seamless Porcelain Plate */}
            <ellipse cx="160" cy="148" rx="130" ry="9" fill="#ffffff" />
            <ellipse cx="160" cy="147" rx="122" ry="6" fill="#f0f9ff" />

            {/* Bottom Tier (Soft Pastel Sky Blue) */}
            <path
              d="M 55,75 
                 L 265,75 
                 C 265,75 265,138 265,138 
                 C 265,144 258,146 250,146 
                 L 70,146 
                 C 62,146 55,144 55,138 
                 Z"
              fill="#7dd3fc"
            />

            {/* Bottom Tier Accent */}
            <text
              x="160"
              y="118"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize="12"
              fontWeight="bold"
              letterSpacing="3"
            >
              HAPPY BIRTHDAY
            </text>

            {/* Top Tier (Pastel Soft Blue) */}
            <path
              d="M 92,16 
                 L 228,16 
                 L 228,78 
                 L 92,78 
                 Z"
              fill="#bae6fd"
            />

            {/* Whipped Cream Melting between Top & Bottom Tier */}
            <path
              d="M 92,75 
                 Q 106,87 120,75 
                 Q 134,89 148,75 
                 Q 160,91 172,75 
                 Q 186,89 200,75 
                 Q 214,87 228,75 
                 L 228,73 
                 L 92,73 
                 Z"
              fill="#ffffff"
            />

            {/* Lala Handwritten Script */}
            <text
              x="160"
              y="56"
              textAnchor="middle"
              fill="#0284c7"
              fontFamily="'Dancing Script', cursive"
              fontSize="30"
              fontWeight="bold"
            >
              Lala
            </text>

            {/* Top Whipped Cream Frosting Crown (where candles are planted!) */}
            <path
              d="M 92,16 
                 Q 106,28 120,16 
                 Q 134,30 148,16 
                 Q 160,32 172,16 
                 Q 186,30 200,16 
                 Q 214,28 228,16 
                 L 228,12 
                 C 228,9 222,8 214,8 
                 L 106,8 
                 C 98,8 92,9 92,12 
                 Z"
              fill="#ffffff"
            />

            {/* Cream Rosettes wrapping the base of each candle */}
            <ellipse cx="120" cy="14" rx="8" ry="3.5" fill="#f0f9ff" />
            <ellipse cx="160" cy="14" rx="8" ry="3.5" fill="#f0f9ff" />
            <ellipse cx="200" cy="14" rx="8" ry="3.5" fill="#f0f9ff" />
          </svg>
        </div>
      </div>

      {/* Action Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        {!allCandlesOut ? (
          <button
            onClick={blowAllCandles}
            className="px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Wind className="w-4 h-4" />
            <span>Tiup Semua Lilin</span>
          </button>
        ) : (
          <button
            onClick={relightCandles}
            className="px-4 py-2 rounded-xl bg-white text-[#0284c7] border-2 border-sky-300 hover:bg-sky-50 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nyalakan Lilin Lagi</span>
          </button>
        )}
      </div>

      {/* Wish Revealed Card & Forward CTA */}
      <AnimatePresence>
        {hasMadeWish && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-5 p-4 sm:p-6 rounded-3xl bg-white/95 border-2 border-[#38bdf8] max-w-lg mx-auto shadow-lg text-center"
          >
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-sky-100 text-[#0284c7] mb-2 mx-auto">
              <Heart className="w-4 h-4 fill-[#0284c7]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold font-display text-[#0369a1] mb-1">
              Harapan Terbaik untuk Lala
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal mb-4">
              Selamat bertambah usia ya, Lala. Semoga selalu sehat, tenang hatinya, dan setiap langkah serta impian yang kamu rancang selalu dimudahkan.
            </p>

            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Buka Surat Tulus dari Mas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

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
    // Stop mic stream once blown
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

        // Calculate average energy in low frequencies (typical of breath noise)
        let lowFreqSum = 0;
        const lowBins = 30;
        for (let i = 2; i < lowBins; i++) {
          lowFreqSum += buffer[i];
        }
        const avgVolume = lowFreqSum / (lowBins - 2);

        // Normalize to 0-100% (noise floor typically ~10-20, blow hits 45+)
        const normalized = Math.min(100, Math.max(0, Math.round(((avgVolume - 15) / 45) * 100)));
        setBlowLevel(normalized);

        // Threshold for blow detection
        if (normalized > 55) {
          blowStreakRef.current += 1;
          if (blowStreakRef.current > 4) {
            // Blow detected!
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

  // Stop Mic Stream
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  return (
    <section className="py-2 sm:py-4 px-3 sm:px-4 max-w-3xl mx-auto text-center relative z-10 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border-2 border-sky-200 text-[#0284c7] text-xs font-bold mb-2 shadow-xs">
          <Cake className="w-3.5 h-3.5 text-[#0284c7]" />
          <span>Momen Spesial Ulang Tahun</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0369a1] font-display">
          Make a Wish, Lala!
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-md mx-auto">
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
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border-2 border-[#38bdf8] text-[#0369a1] text-xs font-bold shadow-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0284c7]"></span>
            </span>
            <Volume2 className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>Mendengarkan tiupanmu...</span>

            {/* Live Volume Meter Bar */}
            <div className="w-16 h-2 rounded-full bg-sky-100 overflow-hidden border border-sky-200">
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

      {/* GRAND BIRTHDAY CAKE DISPLAY */}
      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] h-76 sm:h-88 flex flex-col items-center justify-end pb-3">
        {/* Soft Shadow Under Stand */}
        <div className="absolute bottom-2 w-64 sm:w-80 h-6 bg-sky-200/60 rounded-full blur-sm pointer-events-none" />

        {/* 3 CANDLES ON TOP */}
        <div className="flex justify-center gap-6 sm:gap-9 mb-[-4px] relative z-20">
          {[0, 1, 2].map((idx) => {
            const isLit = candlesLit[idx];
            return (
              <div
                key={idx}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => extinguishCandle(idx)}
                title={isLit ? "Klik untuk tiup lilin ini" : "Lilin sudah padam"}
              >
                {/* Flame / Smoke */}
                <div className="h-8 sm:h-9 flex items-center justify-center">
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
                        className="relative w-4 sm:w-5 h-7 sm:h-8 flex items-center justify-center"
                      >
                        {/* Outer Glow */}
                        <div className="absolute inset-0 rounded-full bg-amber-400 blur-[3px] opacity-75" />
                        {/* Flame Body */}
                        <div className="relative w-3.5 sm:w-4 h-6 sm:h-7 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 border border-amber-300" />
                        {/* Inner Blue Core */}
                        <div className="absolute bottom-0.5 w-1.5 h-2 rounded-full bg-sky-400 opacity-60" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="smoke"
                        initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                        animate={{ opacity: 0, y: -20, scale: 1.4 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="flex flex-col items-center"
                      >
                        <Wind className="w-3.5 h-3.5 text-sky-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Wick */}
                <div className="w-0.5 h-1.5 bg-slate-700" />

                {/* Candle Body */}
                <div className="w-4 sm:w-5 h-11 sm:h-13 rounded-t-sm bg-[#38bdf8] border-2 border-white shadow-xs relative overflow-hidden">
                  {/* Spiral White Stripes */}
                  <div className="w-full h-1.5 bg-white transform -rotate-12 mt-1 scale-125" />
                  <div className="w-full h-1.5 bg-white transform -rotate-12 mt-2 scale-125" />
                  <div className="w-full h-1.5 bg-white transform -rotate-12 mt-2 scale-125" />
                </div>
              </div>
            );
          })}
        </div>

        {/* TIER 1 (TOP TIER - White Cream with Lala name) */}
        <div className="w-36 sm:w-46 h-14 sm:h-16 bg-white rounded-2xl shadow-md relative z-15 border-4 border-sky-100 flex items-center justify-center overflow-hidden">
          {/* Top frosting drips */}
          <div className="absolute -top-1 inset-x-0 flex justify-around">
            <span className="w-4 h-3 bg-sky-100 rounded-full" />
            <span className="w-5 h-4 bg-sky-100 rounded-full" />
            <span className="w-4 h-3 bg-sky-100 rounded-full" />
            <span className="w-5 h-4 bg-sky-100 rounded-full" />
          </div>

          {/* Golden/Blue Lala Script */}
          <span className="font-handwriting text-2xl sm:text-3xl text-[#0284c7] font-bold tracking-wider relative z-10">
            Lala
          </span>
        </div>

        {/* TIER 2 (MIDDLE TIER - Soft Baby Blue) */}
        <div className="w-52 sm:w-66 h-18 sm:h-22 bg-[#7dd3fc] rounded-2xl shadow-lg relative z-10 border-4 border-white flex flex-col justify-between overflow-hidden -mt-2">
          {/* White cream wave border */}
          <div className="w-full h-3 bg-white flex items-center justify-around px-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-200" />
            <span className="w-2 h-2 rounded-full bg-sky-200" />
            <span className="w-2 h-2 rounded-full bg-sky-200" />
            <span className="w-2 h-2 rounded-full bg-sky-200" />
            <span className="w-2 h-2 rounded-full bg-sky-200" />
          </div>

          {/* Decorative heart pattern center */}
          <div className="flex items-center justify-center gap-3 my-auto text-white/90">
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#0369a1] uppercase">
              Happy Birthday
            </span>
            <Heart className="w-3.5 h-3.5 fill-white" />
          </div>

          {/* Lower cream pearls */}
          <div className="w-full h-2 bg-white/70" />
        </div>

        {/* TIER 3 (BOTTOM TIER - Bright Sky Blue Grand Tier) */}
        <div className="w-68 sm:w-84 h-22 sm:h-26 bg-[#38bdf8] rounded-2xl sm:rounded-3xl shadow-xl relative border-4 border-white flex flex-col justify-between overflow-hidden -mt-2">
          {/* Top cream drip lace */}
          <div className="w-full h-3.5 bg-white flex items-center justify-around px-3 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
          </div>

          {/* Bottom tier decorative band */}
          <div className="my-auto px-4 flex items-center justify-between text-white/80">
            <div className="h-0.5 flex-1 bg-white/50 rounded-full" />
            <div className="mx-3 px-3 py-0.5 rounded-full bg-white/90 text-[#0284c7] text-[10px] sm:text-xs font-bold shadow-xs">
              Mengejar Impian Bersama
            </div>
            <div className="h-0.5 flex-1 bg-white/50 rounded-full" />
          </div>

          {/* Bottom pearl line */}
          <div className="w-full h-3 bg-white/90 flex items-center justify-around px-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
          </div>
        </div>

        {/* ORNATE CAKE STAND / PLATTER */}
        <div className="w-76 sm:w-94 h-4 bg-white rounded-full shadow-lg border-2 border-sky-200 relative z-5" />
        <div className="w-24 sm:w-32 h-4 bg-[#bae6fd] rounded-b-2xl border-2 border-white shadow-md relative z-5" />
      </div>

      {/* Manual Button Fallbacks */}
      <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-3">
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
            className="mt-6 p-5 sm:p-6 rounded-3xl bg-white/95 border-2 border-[#38bdf8] max-w-lg mx-auto shadow-lg text-center"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-100 text-[#0284c7] mb-2 mx-auto">
              <Heart className="w-5 h-5 fill-[#0284c7]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-[#0369a1] mb-1">
              Harapan Terbaik untuk Lala
            </h3>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-normal mb-5">
              Selamat bertambah usia ya, Lala. Semoga selalu sehat, tenang hatinya, dan setiap langkah serta impian yang kamu rancang selalu dimudahkan.
            </p>

            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
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

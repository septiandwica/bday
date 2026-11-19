// Web Audio API Sound Synthesizer for Lala's Birthday
// Provides instantaneous, beautiful sound effects with 0 external asset dependencies

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private ambientTimer: number | null = null;
  private isAmbientPlaying: boolean = false;
  private customAudio: HTMLAudioElement | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sweet chime sound for clicks, stars, and discoveries
  playChime(pitchModifier: number = 1) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Musical pentatonic frequencies in C major
      const baseFreq = 523.25 * pitchModifier; // C5
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 2, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    } catch {
      // Audio autoplay may be blocked until user gesture
    }
  }

  // Play celebration fanfare when blowing candle or opening letter
  playFanfare() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);

        const startTime = this.ctx.currentTime + idx * 0.1;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.8);
      });
    } catch {}
  }

  // Candle blowing sound effect (filtered gentle pink/white noise puff)
  playBlowCandle() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.7);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {}
  }

  // Heart pop sound
  playHeartPop() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }

  // Dreamy ambient music box chord generator (plays gentle romantic lofi chimes on loop)
  toggleDreamyMusic(onStateChange?: (isPlaying: boolean) => void) {
    if (this.customAudio) {
      if (this.customAudio.paused) {
        this.customAudio.play();
        this.isAmbientPlaying = true;
      } else {
        this.customAudio.pause();
        this.isAmbientPlaying = false;
      }
      onStateChange?.(this.isAmbientPlaying);
      return;
    }

    if (this.isAmbientPlaying) {
      if (this.ambientTimer) clearInterval(this.ambientTimer);
      this.ambientTimer = null;
      this.isAmbientPlaying = false;
      onStateChange?.(false);
      return;
    }

    this.initContext();
    this.isAmbientPlaying = true;
    onStateChange?.(true);

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C E G B)
      [220.00, 261.63, 329.63, 392.00], // Am7 (A C E G)
      [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F A C E)
      [196.00, 246.94, 293.66, 392.00], // Gadd9 (G B D G)
    ];

    let chordIdx = 0;
    const playChordStep = () => {
      if (!this.isAmbientPlaying || !this.ctx) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, noteIdx) => {
        if (!this.ctx) return;
        const noteDelay = noteIdx * 0.18;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + noteDelay);

        const startTime = this.ctx.currentTime + noteDelay;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.045, startTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 3.0);
      });
    };

    playChordStep();
    this.ambientTimer = window.setInterval(playChordStep, 3600);
  }

  setCustomAudio(url: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (this.ambientTimer) {
      clearInterval(this.ambientTimer);
      this.ambientTimer = null;
    }
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = 0.5;
    this.customAudio.play();
    this.isAmbientPlaying = true;
  }

  isPlaying() {
    return this.isAmbientPlaying;
  }
}

export const sounds = new SoundEffectsManager();


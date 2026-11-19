import confetti from 'canvas-confetti';

// Celebratory Blue & Silver Confetti Palette for Lala
const BLUE_PALETTE = ['#0284c7', '#38bdf8', '#7dd3fc', '#bae6fd', '#3b82f6', '#93c5fd', '#ffffff', '#e0f2fe'];

export function triggerStarBurst() {
  confetti({
    particleCount: 90,
    spread: 100,
    origin: { y: 0.6 },
    colors: BLUE_PALETTE,
    shapes: ['star', 'circle'],
    ticks: 200,
    gravity: 0.7,
    scalar: 1.2,
  });
}

export function triggerGrandEnvelopeBurst() {
  // Center fountain
  confetti({
    particleCount: 70,
    spread: 80,
    origin: { y: 0.65 },
    colors: BLUE_PALETTE,
    shapes: ['star', 'circle'],
    ticks: 220,
    gravity: 0.65,
    scalar: 1.3,
  });

  // Left side cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.15, y: 0.7 },
      colors: BLUE_PALETTE,
      ticks: 200,
      scalar: 1.1,
    });
  }, 120);

  // Right side cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.85, y: 0.7 },
      colors: BLUE_PALETTE,
      ticks: 200,
      scalar: 1.1,
    });
  }, 180);
}

export function triggerCandleConfetti() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 120, zIndex: 100 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 40 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: BLUE_PALETTE,
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: BLUE_PALETTE,
    });
  }, 250);
}

export function triggerHeartRain() {
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: BLUE_PALETTE,
  });
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: BLUE_PALETTE,
  });
}

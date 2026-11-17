/**
 * Thin diagonal streaks falling like rain/meteors plus small colored dots,
 * drawn on a canvas behind the hero. Pure logic + 2D canvas, no Angular.
 */

interface Streak {
  x: number;
  y: number;
  length: number;
  speed: number; // px per ms
  alpha: number;
  /** 0..1, eased highlight while the pointer is near. */
  glow: number;
}

interface Dot {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  phase: number;
  glow: number;
}

export interface MeteorFieldOptions {
  /** Colors for the dots. */
  colors: readonly string[];
  /** Color of the streaks (rgb triplet, alpha is applied per streak). */
  streakRgb: string;
  /** Color of streaks highlighted by the pointer. */
  glowRgb: string;
}

// Falling direction: down and slightly to the left, normalized.
const DIR_X = -0.34;
const DIR_Y = 0.94;

/** Pointer influence radius in CSS px. */
const GLOW_RADIUS = 170;
/** Time constant (ms) for the highlight to fade in/out. */
const GLOW_EASE_MS = 140;

export class MeteorFieldEngine {
  private readonly ctx: CanvasRenderingContext2D;
  private streaks: Streak[] = [];
  private dots: Dot[] = [];
  private width = 0;
  private height = 0;
  private raf = 0;
  private last = 0;
  private running = false;
  private time = 0;
  private pointer: { x: number; y: number } | null = null;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly options: MeteorFieldOptions,
    private readonly random: () => number = Math.random,
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D não suportado');
    this.ctx = ctx;
  }

  /** Size the canvas to its CSS box (device-pixel aware) and repopulate. */
  resize(width: number, height: number, pixelRatio: number): void {
    this.width = width;
    this.height = height;
    const ratio = Math.min(pixelRatio, 2);
    this.canvas.width = Math.round(width * ratio);
    this.canvas.height = Math.round(height * ratio);
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const area = width * height;
    const streakCount = Math.min(110, Math.round(area / 11000));
    const dotCount = Math.min(70, Math.round(area / 18000));
    this.streaks = Array.from({ length: streakCount }, () => this.newStreak(true));
    this.dots = Array.from({ length: dotCount }, () => this.newDot());
    this.draw();
  }

  /** Pointer position in canvas CSS px, or null when it leaves. */
  setPointer(x: number | null, y?: number): void {
    this.pointer = x === null || y === undefined ? null : { x, y };
    if (!this.running) {
      // Static mode (reduced motion): apply the highlight at once and redraw.
      for (const s of this.streaks) s.glow = this.streakTarget(s);
      for (const d of this.dots) d.glow = this.pointTarget(d.x, d.y);
      this.draw();
    }
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  private readonly frame = (now: number): void => {
    const dt = Math.min(now - this.last, 50);
    this.last = now;
    this.step(dt);
    this.draw();
    if (this.running) this.raf = requestAnimationFrame(this.frame);
  };

  /** Advance the simulation by `dt` ms. */
  step(dt: number): void {
    this.time += dt;
    const ease = Math.min(1, dt / GLOW_EASE_MS);
    for (let i = 0; i < this.streaks.length; i++) {
      const s = this.streaks[i];
      s.x += DIR_X * s.speed * dt;
      s.y += DIR_Y * s.speed * dt;
      if (s.y - s.length * DIR_Y > this.height || s.x + s.length * -DIR_X < 0) {
        this.streaks[i] = this.newStreak(false);
        continue;
      }
      s.glow += (this.streakTarget(s) - s.glow) * ease;
    }
    for (let i = 0; i < this.dots.length; i++) {
      const d = this.dots[i];
      d.x += DIR_X * d.speed * dt;
      d.y += DIR_Y * d.speed * dt;
      if (d.y > this.height + 4 || d.x < -4) {
        this.dots[i] = { ...this.newDot(), y: -4 };
        continue;
      }
      d.glow += (this.pointTarget(d.x, d.y) - d.glow) * ease;
    }
  }

  draw(): void {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.lineCap = 'round';
    for (const s of this.streaks) {
      const tailX = s.x - DIR_X * s.length;
      const tailY = s.y - DIR_Y * s.length;
      const alpha = s.alpha + s.glow * (0.85 - s.alpha);
      const rgb = s.glow > 0.02 ? this.options.glowRgb : this.options.streakRgb;
      const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(${rgb}, ${alpha})`);
      gradient.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.lineWidth = 1 + s.glow * 0.8;
      ctx.strokeStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
    }

    for (const d of this.dots) {
      const twinkle = 0.55 + 0.45 * Math.sin(this.time / 600 + d.phase);
      ctx.globalAlpha = Math.min(1, twinkle + d.glow);
      ctx.fillStyle = d.color;
      const size = d.size + d.glow * 1.5;
      ctx.fillRect(d.x - (size - d.size) / 2, d.y - (size - d.size) / 2, size, size);
    }
    ctx.globalAlpha = 1;
  }

  get counts(): { streaks: number; dots: number } {
    return { streaks: this.streaks.length, dots: this.dots.length };
  }

  /** 0..1 highlight for a streak, from the pointer's distance to its segment. */
  private streakTarget(s: Streak): number {
    const p = this.pointer;
    if (!p) return 0;
    const tailX = s.x - DIR_X * s.length;
    const tailY = s.y - DIR_Y * s.length;
    const vx = s.x - tailX;
    const vy = s.y - tailY;
    const t = Math.max(
      0,
      Math.min(1, ((p.x - tailX) * vx + (p.y - tailY) * vy) / (vx * vx + vy * vy)),
    );
    return falloff(Math.hypot(p.x - (tailX + vx * t), p.y - (tailY + vy * t)));
  }

  private pointTarget(x: number, y: number): number {
    const p = this.pointer;
    return p ? falloff(Math.hypot(p.x - x, p.y - y)) : 0;
  }

  private newStreak(anywhere: boolean): Streak {
    const r = this.random;
    // Spawn along the top edge or the right edge so streaks enter the view.
    let x: number;
    let y: number;
    if (anywhere) {
      x = r() * (this.width + this.height * 0.4);
      y = r() * this.height;
    } else if (r() < 0.75) {
      x = r() * (this.width + this.height * 0.4);
      y = -r() * 200;
    } else {
      x = this.width + r() * 120;
      y = r() * this.height * 0.6;
    }
    return {
      x,
      y,
      length: 60 + r() * 180,
      speed: 0.05 + r() * 0.12,
      alpha: 0.06 + r() * 0.22,
      glow: 0,
    };
  }

  private newDot(): Dot {
    const r = this.random;
    const colors = this.options.colors;
    return {
      x: r() * (this.width + this.height * 0.4),
      y: r() * this.height,
      size: r() < 0.8 ? 1.5 : 2.5,
      speed: 0.01 + r() * 0.03,
      color: colors[Math.floor(r() * colors.length)],
      phase: r() * Math.PI * 2,
      glow: 0,
    };
  }
}

/** Smooth 1 → 0 falloff over GLOW_RADIUS. */
function falloff(distance: number): number {
  if (distance >= GLOW_RADIUS) return 0;
  const k = 1 - distance / GLOW_RADIUS;
  return k * k * (3 - 2 * k);
}

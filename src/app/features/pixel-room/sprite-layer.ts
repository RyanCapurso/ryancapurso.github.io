import { AnimId, AnimSpec } from './pixel-room.model';

interface PlayOptions {
  loop?: boolean;
  onEnd?: () => void;
}

/**
 * One spot in the room that shows one animation at a time and advances it
 * using the per-frame durations taken from the original GIF.
 * Pure logic (no DOM), so it is unit-testable.
 */
export class SpriteLayer {
  anim: AnimId;
  frame = 0;
  playing = false;
  private loop = false;
  private elapsed = 0;
  private onEnd: (() => void) | null = null;

  constructor(
    private readonly anims: Readonly<Record<AnimId, AnimSpec>>,
    initial: AnimId,
  ) {
    this.anim = initial;
  }

  get spec(): AnimSpec {
    return this.anims[this.anim];
  }

  play(anim: AnimId, options: PlayOptions = {}): void {
    this.anim = anim;
    this.frame = 0;
    this.elapsed = 0;
    this.playing = true;
    this.loop = options.loop ?? false;
    this.onEnd = options.onEnd ?? null;
  }

  /** Show a still frame. A negative frame counts from the end (-1 = last). */
  hold(anim: AnimId, frame: number): void {
    this.anim = anim;
    const count = this.anims[anim].durations.length;
    this.frame = frame < 0 ? count + frame : frame;
    this.playing = false;
    this.loop = false;
    this.onEnd = null;
  }

  /** Advance by `dt` ms. Returns true when the visible frame changed. */
  tick(dt: number): boolean {
    if (!this.playing) return false;
    const durations = this.spec.durations;
    let changed = false;
    this.elapsed += dt;
    while (this.playing && this.elapsed >= durations[this.frame]) {
      this.elapsed -= durations[this.frame];
      changed = true;
      if (this.frame + 1 < durations.length) {
        this.frame++;
      } else if (this.loop) {
        this.frame = 0;
      } else {
        this.playing = false;
        const done = this.onEnd;
        this.onEnd = null;
        done?.();
      }
    }
    return changed;
  }
}

import { MeteorFieldEngine } from './meteor-field-engine';

/** Minimal 2D context stub: jsdom has no canvas. */
function fakeCanvas(): HTMLCanvasElement {
  const noop = () => undefined;
  const ctx = {
    setTransform: noop,
    clearRect: noop,
    beginPath: noop,
    moveTo: noop,
    lineTo: noop,
    stroke: noop,
    fillRect: noop,
    createLinearGradient: () => ({ addColorStop: noop }),
  };
  return { width: 0, height: 0, getContext: () => ctx } as unknown as HTMLCanvasElement;
}

function seeded(seed = 42): () => number {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

describe('MeteorFieldEngine', () => {
  const options = { colors: ['#0d83fa'], streakRgb: '255, 255, 255' };

  it('scales the number of streaks and dots with the area, with a cap', () => {
    const engine = new MeteorFieldEngine(fakeCanvas(), options, seeded());
    engine.resize(375, 600, 2);
    const small = engine.counts;
    engine.resize(1440, 700, 1);
    const large = engine.counts;
    expect(large.streaks).toBeGreaterThan(small.streaks);
    engine.resize(5000, 3000, 1);
    expect(engine.counts.streaks).toBeLessThanOrEqual(110);
    expect(engine.counts.dots).toBeLessThanOrEqual(70);
  });

  it('keeps the population stable while animating (respawns off-screen items)', () => {
    const engine = new MeteorFieldEngine(fakeCanvas(), options, seeded());
    engine.resize(1440, 700, 1);
    const before = engine.counts;
    for (let i = 0; i < 2000; i++) engine.step(16);
    expect(engine.counts).toEqual(before);
  });

  it('caps the canvas backing resolution at 2x', () => {
    const canvas = fakeCanvas();
    new MeteorFieldEngine(canvas, options, seeded()).resize(100, 50, 3);
    expect(canvas.width).toBe(200);
    expect(canvas.height).toBe(100);
  });
});

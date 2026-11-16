import { ROOM_MANIFEST } from './pixel-room.manifest';
import { SpriteLayer } from './sprite-layer';

const anims = ROOM_MANIFEST.anims;
const total = (id: keyof typeof anims) => anims[id].durations.reduce((a, b) => a + b, 0);

describe('SpriteLayer', () => {
  it('advances frames using the GIF durations', () => {
    const layer = new SpriteLayer(anims, 'cafeteira');
    layer.play('cafeteira');
    expect(layer.tick(anims.cafeteira.durations[0] - 1)).toBe(false);
    expect(layer.frame).toBe(0);
    expect(layer.tick(1)).toBe(true);
    expect(layer.frame).toBe(1);
  });

  it('stops on the last frame and calls onEnd once for a one-shot animation', () => {
    const layer = new SpriteLayer(anims, 'cafeteira');
    let ended = 0;
    layer.play('cafeteira', { onEnd: () => ended++ });
    layer.tick(total('cafeteira') + 1000);
    expect(layer.playing).toBe(false);
    expect(ended).toBe(1);
  });

  it('wraps around when looping', () => {
    const layer = new SpriteLayer(anims, 'programando');
    layer.play('programando', { loop: true });
    layer.tick(total('programando') + anims.programando.durations[0]);
    expect(layer.playing).toBe(true);
    expect(layer.frame).toBe(1);
  });

  it('holds a frame counted from the end', () => {
    const layer = new SpriteLayer(anims, 'polvoParaAzul');
    layer.hold('polvoParaAzul', -1);
    expect(layer.frame).toBe(anims.polvoParaAzul.durations.length - 1);
    expect(layer.tick(10_000)).toBe(false);
  });
});

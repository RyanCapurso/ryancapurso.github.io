import { AnimId, RoomManifest, RoomObject } from './pixel-room.model';
import { SpriteLayer } from './sprite-layer';

interface LoadedSprite {
  img: HTMLImageElement;
  alpha: Uint8ClampedArray;
  silhouette: HTMLCanvasElement;
}

export interface EngineOptions {
  reduceMotion: boolean;
  onAction?: (object: RoomObject) => void;
}

/**
 * Canvas renderer for the pixel-art room: draws the background and the three
 * animated objects, does pixel-perfect hit testing and plays the click animations.
 */
export class PixelRoomEngine {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly layers: Record<RoomObject, SpriteLayer>;
  /** Back to front. The coffee maker is drawn after the desk so its steam shows over the monitors. */
  private readonly order: readonly RoomObject[] = ['ryan', 'cafeteira', 'polvo'];
  private plush: 'azul' | 'rosa' = 'azul';
  private hover: RoomObject | null = null;
  private dirty = true;
  private raf = 0;
  private last = 0;
  private running = false;

  private constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly manifest: RoomManifest,
    private readonly background: HTMLImageElement,
    private readonly sprites: Record<AnimId, LoadedSprite>,
    private readonly options: EngineOptions,
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D não suportado');
    this.ctx = ctx;
    canvas.width = manifest.width;
    canvas.height = manifest.height;

    const a = manifest.anims;
    this.layers = {
      ryan: new SpriteLayer(a, 'programando'),
      cafeteira: new SpriteLayer(a, 'cafeteira'),
      polvo: new SpriteLayer(a, 'polvoParaAzul'),
    };
    this.layers.cafeteira.hold('cafeteira', 0);
    this.layers.polvo.hold('polvoParaAzul', -1);
    this.idleRyan();
  }

  static async create(
    canvas: HTMLCanvasElement,
    manifest: RoomManifest,
    options: EngineOptions,
  ): Promise<PixelRoomEngine> {
    const ids = Object.keys(manifest.anims) as AnimId[];
    const [background, ...images] = await Promise.all([
      loadImage(manifest.background),
      ...ids.map((id) => loadImage(manifest.anims[id].src)),
    ]);
    const sprites = {} as Record<AnimId, LoadedSprite>;
    ids.forEach((id, i) => (sprites[id] = prepareSprite(images[i])));
    return new PixelRoomEngine(canvas, manifest, background, sprites, options);
  }

  // --- interactions -------------------------------------------------------

  trigger(object: RoomObject): void {
    const L = this.layers;
    if (object === 'ryan') {
      if (L.ryan.anim === 'atencao' && L.ryan.playing) return;
      L.ryan.play('atencao', { onEnd: () => this.idleRyan() });
    } else if (object === 'cafeteira') {
      if (L.cafeteira.playing) return;
      L.cafeteira.play('cafeteira', { onEnd: () => this.still(L.cafeteira, 'cafeteira', 0) });
    } else {
      if (L.polvo.playing) return;
      const next: AnimId = this.plush === 'azul' ? 'polvoParaRosa' : 'polvoParaAzul';
      L.polvo.play(next, {
        onEnd: () => {
          this.plush = this.plush === 'azul' ? 'rosa' : 'azul';
          this.still(L.polvo, next, -1);
        },
      });
    }
    this.dirty = true;
    this.options.onAction?.(object);
  }

  /** Ryan turns around once to invite the first click. */
  invite(): void {
    if (!this.options.reduceMotion && this.layers.ryan.anim === 'programando') this.trigger('ryan');
  }

  setHover(object: RoomObject | null): void {
    if (object !== this.hover) {
      this.hover = object;
      this.dirty = true;
    }
  }

  /** Which object is under a point given in canvas CSS pixels (pixel-perfect). */
  hitTest(clientX: number, clientY: number): RoomObject | null {
    const r = this.canvas.getBoundingClientRect();
    const px = ((clientX - r.left) * this.manifest.width) / r.width;
    const py = ((clientY - r.top) * this.manifest.height) / r.height;
    for (let i = this.order.length - 1; i >= 0; i--) {
      const name = this.order[i];
      const layer = this.layers[name];
      const spec = layer.spec;
      const x = Math.floor(px - spec.x);
      const y = Math.floor(py - spec.y);
      if (x < 0 || y < 0 || x >= spec.w || y >= spec.h) continue;
      const sprite = this.sprites[layer.anim];
      const idx = (y * sprite.img.width + layer.frame * spec.w + x) * 4 + 3;
      if (sprite.alpha[idx] > 0) return name;
    }
    return null;
  }

  // --- loop ---------------------------------------------------------------

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

  destroy(): void {
    this.stop();
  }

  private readonly frame = (now: number): void => {
    const dt = Math.min(now - this.last, 250);
    this.last = now;
    for (const name of this.order) if (this.layers[name].tick(dt)) this.dirty = true;
    if (this.dirty) this.render();
    if (this.running) this.raf = requestAnimationFrame(this.frame);
  };

  render(): void {
    const ctx = this.ctx;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.background, 0, 0);
    for (const name of this.order) this.drawLayer(name);
    this.dirty = false;
  }

  private drawLayer(name: RoomObject): void {
    const layer = this.layers[name];
    const spec = layer.spec;
    const sprite = this.sprites[layer.anim];
    const sx = layer.frame * spec.w;
    if (this.hover === name) {
      for (const [dx, dy] of OUTLINE) {
        this.ctx.drawImage(
          sprite.silhouette,
          sx,
          0,
          spec.w,
          spec.h,
          spec.x + dx,
          spec.y + dy,
          spec.w,
          spec.h,
        );
      }
    }
    this.ctx.drawImage(sprite.img, sx, 0, spec.w, spec.h, spec.x, spec.y, spec.w, spec.h);
  }

  private idleRyan(): void {
    if (this.options.reduceMotion) this.layers.ryan.hold('programando', 0);
    else this.layers.ryan.play('programando', { loop: true });
    this.dirty = true;
  }

  private still(layer: SpriteLayer, anim: AnimId, frame: number): void {
    layer.hold(anim, frame);
    this.dirty = true;
  }
}

const OUTLINE: readonly (readonly [number, number])[] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    img.src = src;
  });
}

/** Alpha channel for hit testing + a white silhouette for the hover outline. */
function prepareSprite(img: HTMLImageElement): LoadedSprite {
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const cx = c.getContext('2d', { willReadFrequently: true })!;
  cx.drawImage(img, 0, 0);
  const alpha = cx.getImageData(0, 0, c.width, c.height).data;

  const silhouette = document.createElement('canvas');
  silhouette.width = img.width;
  silhouette.height = img.height;
  const sx = silhouette.getContext('2d')!;
  sx.drawImage(img, 0, 0);
  sx.globalCompositeOperation = 'source-in';
  sx.fillStyle = '#ffffff';
  sx.fillRect(0, 0, silhouette.width, silhouette.height);

  return { img, alpha, silhouette };
}

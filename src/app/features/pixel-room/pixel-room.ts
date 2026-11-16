import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ROOM_MANIFEST } from './pixel-room.manifest';
import { HOTSPOTS, OBJECT_LABELS, RoomObject } from './pixel-room.model';
import { PixelRoomEngine } from './pixel-room-engine';

interface Hotspot {
  readonly id: RoomObject;
  readonly label: string;
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;
}

const INVITE_DELAY_MS = 3500;

/**
 * Interactive pixel-art room. Rendering starts only in the browser
 * (`afterNextRender`), so the prerendered HTML ships an empty, correctly sized canvas.
 */
@Component({
  selector: 'app-pixel-room',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pixel-room.html',
  styleUrl: './pixel-room.scss',
})
export class PixelRoom {
  /** Emits whenever the visitor clicks or activates an object. */
  readonly action = output<RoomObject>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  protected readonly manifest = ROOM_MANIFEST;
  protected readonly ratio = `${ROOM_MANIFEST.width} / ${ROOM_MANIFEST.height}`;
  protected readonly displayWidth = signal<number | null>(null);
  protected readonly hovering = signal(false);
  protected readonly failed = signal(false);
  protected readonly stillImage = 'quarto/quarto-estatico.png';
  protected readonly hotspots: readonly Hotspot[] = (Object.keys(HOTSPOTS) as RoomObject[]).map(
    (id) => {
      const [x, y, w, h] = HOTSPOTS[id];
      return {
        id,
        label: OBJECT_LABELS[id],
        left: (x / ROOM_MANIFEST.width) * 100,
        top: (y / ROOM_MANIFEST.height) * 100,
        width: (w / ROOM_MANIFEST.width) * 100,
        height: (h / ROOM_MANIFEST.height) * 100,
      };
    },
  );

  private engine?: PixelRoomEngine;

  constructor() {
    afterNextRender(() => void this.init());
  }

  private async init(): Promise<void> {
    const view = this.host.nativeElement.ownerDocument.defaultView;
    if (!view) return;
    this.observeSize(view);

    try {
      const reduceMotion = view.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      const engine = await PixelRoomEngine.create(this.canvasRef().nativeElement, this.manifest, {
        reduceMotion,
        onAction: (object) => this.action.emit(object),
      });
      this.engine = engine;
      engine.render();

      // Only animate while the room is on screen.
      let visibility: IntersectionObserver | undefined;
      if ('IntersectionObserver' in view) {
        visibility = new IntersectionObserver(([entry]) =>
          entry.isIntersecting ? engine.start() : engine.stop(),
        );
        visibility.observe(this.host.nativeElement);
      } else {
        engine.start();
      }

      const invite = view.setTimeout(() => engine.invite(), INVITE_DELAY_MS);

      this.destroyRef.onDestroy(() => {
        view.clearTimeout(invite);
        visibility?.disconnect();
        engine.destroy();
      });
    } catch {
      // No canvas support or an image failed to load: show the still picture instead.
      this.failed.set(true);
    }
  }

  /** Keep pixels square: snap to whole multiples of the art once there is room for 2x or more. */
  private observeSize(view: Window): void {
    const fit = () => {
      const available = this.host.nativeElement.clientWidth;
      if (!available) return;
      let scale = available / this.manifest.width;
      if (scale >= 2) scale = Math.floor(scale);
      this.displayWidth.set(Math.round(this.manifest.width * scale));
    };
    fit();
    if (!('ResizeObserver' in view)) return;
    const resize = new ResizeObserver(fit);
    resize.observe(this.host.nativeElement);
    this.destroyRef.onDestroy(() => resize.disconnect());
  }

  protected onPointerMove(event: PointerEvent): void {
    const hit = this.engine?.hitTest(event.clientX, event.clientY) ?? null;
    this.engine?.setHover(hit);
    this.hovering.set(hit !== null);
  }

  protected onPointerLeave(): void {
    this.engine?.setHover(null);
    this.hovering.set(false);
  }

  protected onCanvasClick(event: MouseEvent): void {
    const hit = this.engine?.hitTest(event.clientX, event.clientY);
    if (hit) this.engine?.trigger(hit);
  }

  protected activate(object: RoomObject): void {
    this.engine?.trigger(object);
  }

  protected focusObject(object: RoomObject | null): void {
    this.engine?.setHover(object);
  }
}

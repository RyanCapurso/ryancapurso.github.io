import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { MeteorFieldEngine } from './meteor-field-engine';

/**
 * Decorative animated background (falling streaks and colored dots).
 * Fills its positioned parent; hidden from assistive tech; browser-only.
 */
@Component({
  selector: 'app-meteor-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas class="canvas"></canvas>`,
  host: { 'aria-hidden': 'true' },
  styles: `
    :host {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }
    .canvas {
      width: 100%;
      height: 100%;
    }
  `,
})
export class MeteorField {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    afterNextRender(() => this.init());
  }

  private init(): void {
    const view = this.host.nativeElement.ownerDocument.defaultView;
    if (!view) return;

    let engine: MeteorFieldEngine;
    try {
      engine = new MeteorFieldEngine(this.canvasRef().nativeElement, {
        colors: ['#0d83fa', '#128cfc', '#5cc8ff', '#7b5cff', '#ffffff'],
        streakRgb: '160, 190, 255',
        glowRgb: '110, 200, 255',
      });
    } catch {
      return; // No canvas: the hero gradient alone is fine.
    }

    const fit = () => {
      const { clientWidth, clientHeight } = this.host.nativeElement;
      if (clientWidth && clientHeight)
        engine.resize(clientWidth, clientHeight, view.devicePixelRatio || 1);
    };
    fit();

    // Highlight streaks near the mouse. The canvas ignores pointer events so the hero
    // stays clickable; listen on the section that contains it instead.
    const area = this.host.nativeElement.parentElement;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const rect = this.host.nativeElement.getBoundingClientRect();
      engine.setPointer(event.clientX - rect.left, event.clientY - rect.top);
    };
    const onLeave = () => engine.setPointer(null);
    area?.addEventListener('pointermove', onMove, { passive: true });
    area?.addEventListener('pointerleave', onLeave);
    this.destroyRef.onDestroy(() => {
      area?.removeEventListener('pointermove', onMove);
      area?.removeEventListener('pointerleave', onLeave);
    });

    const reduceMotion = view.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reduceMotion) return; // keep the still frame; the pointer highlight still redraws it

    const resize = 'ResizeObserver' in view ? new ResizeObserver(fit) : undefined;
    resize?.observe(this.host.nativeElement);

    let visibility: IntersectionObserver | undefined;
    if ('IntersectionObserver' in view) {
      visibility = new IntersectionObserver(([entry]) =>
        entry.isIntersecting ? engine.start() : engine.stop(),
      );
      visibility.observe(this.host.nativeElement);
    } else {
      engine.start();
    }

    this.destroyRef.onDestroy(() => {
      resize?.disconnect();
      visibility?.disconnect();
      engine.stop();
    });
  }
}

import { DOCUMENT, Injectable, OnDestroy, inject, signal } from '@angular/core';

/**
 * Tracks which page section is currently in view, so the menu can mark it.
 * Browser-only: call `observe()` from `afterNextRender`.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private observer?: IntersectionObserver;

  private readonly active = signal<string>('inicio');
  readonly activeId = this.active.asReadonly();

  observe(ids: readonly string[]): void {
    const view = this.document.defaultView;
    if (!view || !('IntersectionObserver' in view)) return;

    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) this.active.set(visible.target.id);
      },
      // A section counts as current when it crosses the upper-middle band of the viewport.
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    for (const id of ids) {
      const el = this.document.getElementById(id);
      if (el) this.observer.observe(el);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

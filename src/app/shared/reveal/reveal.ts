import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Fades/slides an element in when it scrolls into view.
 *
 * The element is only hidden when the `<html>` element has the `js` class
 * (set by an inline script in index.html) and motion is allowed, so the
 * prerendered page stays fully readable without JavaScript.
 *
 * Usage: `<div appReveal>` or `<li appReveal [revealDelay]="$index * 80">`.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[style.--reveal-delay]': 'revealDelay() + "ms"',
  },
})
export class Reveal {
  /** Delay in ms, handy for staggering items in a list. */
  readonly revealDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const element = this.el.nativeElement;
      const view = element.ownerDocument.defaultView;
      if (!view || !('IntersectionObserver' in view)) {
        element.classList.add('is-visible');
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
      );
      observer.observe(element);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}

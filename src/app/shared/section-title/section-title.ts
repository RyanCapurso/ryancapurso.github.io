import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Centered uppercase heading with the white underline from the template. */
@Component({
  selector: 'app-section-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h2 class="title" [id]="headingId()"><ng-content /></h2>`,
  styles: `
    :host {
      display: flex;
      justify-content: center;
    }
    .title {
      display: grid;
      justify-items: center;
      gap: 12px;
      font-size: var(--text-3xl);
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }
    .title::after {
      content: '';
      width: 120px;
      height: 2px;
      background: var(--color-text);
    }
  `,
})
export class SectionTitle {
  /** Used by the parent section's `aria-labelledby`. */
  readonly headingId = input.required<string>();
}

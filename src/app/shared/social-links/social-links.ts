import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { SocialLink } from '../../core/models/portfolio.model';

/** Square outlined icon links (LinkedIn, résumé). */
@Component({
  selector: 'app-social-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul role="list" class="list" [style.--size.px]="size()">
      @for (link of links(); track link.href) {
        <li>
          <a
            class="link"
            [href]="link.href"
            target="_blank"
            rel="noopener noreferrer"
            [attr.aria-label]="link.label + ' (' + ui().newTab + ')'"
          >
            @switch (link.icon) {
              @case ('linkedin') {
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13v5.43h-4v-4.82c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.9h-4v-11Z"
                  />
                </svg>
              }
              @case ('resume') {
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V9h5.5L13 3.5ZM8 12v1.5h8V12H8Zm0 3v1.5h8V15H8Zm0 3v1.5h5V18H8Z"
                  />
                </svg>
              }
            }
          </a>
        </li>
      }
    </ul>
  `,
  styles: `
    .list {
      display: flex;
      gap: 14px;
    }
    .link {
      display: grid;
      place-items: center;
      width: var(--size);
      height: var(--size);
      border: 1px solid var(--color-accent-strong);
      border-radius: var(--radius);
      color: var(--color-text);
      transition: background-color var(--duration) var(--ease);
    }
    .link:hover {
      background: rgb(18 140 252 / 0.15);
    }
    svg {
      width: 55%;
      height: 55%;
    }
  `,
})
export class SocialLinks {
  readonly links = input.required<readonly SocialLink[]>();
  readonly size = input(36);
  protected readonly ui = inject(LanguageService).ui;
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { SocialLinks } from '../../shared/social-links/social-links';

@Component({
  selector: 'app-site-footer',
  imports: [SocialLinks],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <a class="to-top" href="#inicio" aria-label="Voltar ao topo">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M6 13.5 12 7.5l6 6M6 18.5l6-6 6 6"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
      <div class="container inner">
        <app-social-links [links]="store.socialLinks()" [size]="48" />
        <p class="copy">{{ store.profile().fullName }} © {{ year }}</p>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      position: relative;
      background: var(--color-bg-alt);
      border-top: 1px solid var(--color-line);
      padding-block: 64px calc(48px + env(safe-area-inset-bottom, 0px));
    }
    .to-top {
      position: absolute;
      top: 0;
      left: 50%;
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      background: var(--color-accent);
      color: var(--color-text);
      border-radius: var(--radius);
      transform: translate(-50%, -50%);
      transition:
        background-color var(--duration) var(--ease),
        transform var(--duration) var(--ease);
    }
    .to-top:hover {
      background: var(--color-accent-strong);
      transform: translate(-50%, calc(-50% - 3px));
    }
    .to-top svg {
      width: 26px;
      height: 26px;
    }
    .inner {
      display: grid;
      justify-items: center;
      gap: 20px;
    }
    .copy {
      color: var(--color-muted);
      font-size: var(--text-sm);
      font-weight: 500;
    }
  `,
})
export class SiteFooter {
  protected readonly store = inject(PortfolioStore);
  protected readonly year = new Date().getFullYear();
}

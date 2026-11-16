import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { SocialLinks } from '../../shared/social-links/social-links';

@Component({
  selector: 'app-site-footer',
  imports: [SocialLinks],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="container inner">
        <app-social-links [links]="store.socialLinks()" [size]="48" />
        <p class="copy">{{ store.profile().fullName }} © {{ year }}</p>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      background: var(--color-bg-alt);
      border-top: 1px solid var(--color-line);
      padding-block: 48px calc(48px + env(safe-area-inset-bottom, 0px));
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

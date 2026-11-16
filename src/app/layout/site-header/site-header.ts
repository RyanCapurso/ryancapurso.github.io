import { ChangeDetectionStrategy, Component, afterNextRender, inject, signal } from '@angular/core';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { SocialLinks } from '../../shared/social-links/social-links';

@Component({
  selector: 'app-site-header',
  imports: [SocialLinks],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class SiteHeader {
  protected readonly store = inject(PortfolioStore);
  protected readonly spy = inject(ScrollSpyService);
  protected readonly menuOpen = signal(false);

  constructor() {
    afterNextRender(() => this.spy.observe(this.store.navItems().map((item) => item.id)));
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}

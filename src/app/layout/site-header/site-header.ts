import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME_PATH, HTML_LANG, Lang } from '../../core/i18n/lang';
import { LanguageService } from '../../core/i18n/language.service';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { SocialLinks } from '../../shared/social-links/social-links';

interface LanguageOption {
  readonly lang: Lang;
  readonly short: string;
  readonly name: string;
  readonly path: string;
  readonly hreflang: string;
}

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, SocialLinks],
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
  protected readonly language = inject(LanguageService);
  protected readonly ui = this.language.ui;
  protected readonly menuOpen = signal(false);

  /** Language switcher; each name is written in its own language. Keeps the current section. */
  protected readonly languages: readonly LanguageOption[] = [
    { lang: 'pt', short: 'PT', name: 'Português', path: HOME_PATH.pt, hreflang: HTML_LANG.pt },
    { lang: 'en', short: 'EN', name: 'English', path: HOME_PATH.en, hreflang: HTML_LANG.en },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}

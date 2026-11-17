import {
  ChangeDetectionStrategy,
  Component,
  afterNextRender,
  effect,
  inject,
  input,
} from '@angular/core';
import { Lang } from '../../core/i18n/lang';
import { LanguageService } from '../../core/i18n/language.service';
import { SeoService } from '../../core/i18n/seo.service';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { About } from '../../sections/about/about';
import { Contact } from '../../sections/contact/contact';
import { Experience } from '../../sections/experience/experience';
import { Hero } from '../../sections/hero/hero';
import { Projects } from '../../sections/projects/projects';
import { Stack } from '../../sections/stack/stack';

/** The one-page portfolio. Routed at "/" (pt) and "/en" (en); the language comes from route data. */
@Component({
  selector: 'app-home',
  imports: [Hero, About, Stack, Experience, Projects, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-stack />
    <app-experience />
    @if (store.hasProjects()) {
      <app-projects />
    }
    <app-contact />
  `,
})
export class Home {
  /** Bound from the route's `data.lang` (withComponentInputBinding). */
  readonly lang = input<Lang>('pt');

  protected readonly store = inject(PortfolioStore);
  private readonly language = inject(LanguageService);
  private readonly seo = inject(SeoService);
  private readonly spy = inject(ScrollSpyService);

  constructor() {
    effect(() => {
      const lang = this.lang();
      this.language.set(lang);
      this.seo.apply(lang);
    });
    // Sections are recreated when the language changes, so observe them again.
    afterNextRender(() => this.spy.observe(this.store.navItems().map((item) => item.id)));
  }
}

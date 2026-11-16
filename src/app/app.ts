import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioStore } from './core/services/portfolio.store';
import { SiteFooter } from './layout/site-footer/site-footer';
import { SiteHeader } from './layout/site-header/site-header';
import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';
import { Experience } from './sections/experience/experience';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { Stack } from './sections/stack/stack';

@Component({
  selector: 'app-root',
  imports: [SiteHeader, SiteFooter, Hero, About, Stack, Experience, Projects, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-site-header />
    <main id="conteudo" tabindex="-1">
      <app-hero />
      <app-about />
      <app-stack />
      <app-experience />
      @if (store.hasProjects()) {
        <app-projects />
      }
      <app-contact />
    </main>
    <app-site-footer />
  `,
  styles: `
    main:focus {
      outline: none;
    }
  `,
})
export class App {
  protected readonly store = inject(PortfolioStore);
}

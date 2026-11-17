import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionTitle } from '../../shared/section-title/section-title';

@Component({
  selector: 'app-stack',
  imports: [SectionTitle, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section--alt" id="stack" aria-labelledby="stack-titulo">
      <div class="container wrap">
        <app-section-title appReveal headingId="stack-titulo">{{
          ui().stack.title
        }}</app-section-title>

        <ul role="list" class="tags" [attr.aria-label]="ui().stack.techLabel" appReveal>
          @for (skill of store.skills(); track skill) {
            <li class="tag">{{ skill }}</li>
          }
        </ul>

        <ul role="list" class="cards">
          @for (item of store.competences(); track item.title) {
            <li class="card" appReveal [revealDelay]="($index % 3) * 90">
              <h3 class="card__title">{{ item.title }}</h3>
              <span class="card__rule" aria-hidden="true"></span>
              <p class="card__text">{{ item.description }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .wrap {
      display: grid;
      gap: 56px;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      max-width: 900px;
      margin-inline: auto;
    }
    .tag {
      padding: 7px 14px;
      border: 1px solid var(--color-accent-strong);
      border-radius: var(--radius);
      font-size: var(--text-sm);
      font-weight: 600;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
      gap: 30px;
    }
    .card {
      display: grid;
      align-content: start;
      gap: 16px;
      padding: 32px;
      background: var(--color-bg);
      border: 1px solid var(--color-accent-strong);
    }
    .card__title {
      font-size: var(--text-xl);
      font-weight: 800;
    }
    .card__rule {
      width: 50px;
      height: 2px;
      background: var(--color-text);
    }
    .card__text {
      color: var(--color-muted);
      font-weight: 500;
      line-height: 1.5;
    }
  `,
})
export class Stack {
  protected readonly store = inject(PortfolioStore);
  protected readonly ui = inject(LanguageService).ui;
}

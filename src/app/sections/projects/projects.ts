import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { SectionTitle } from '../../shared/section-title/section-title';

/** Rendered by the page only when PROJECTS (portfolio.data.ts) has items. */
@Component({
  selector: 'app-projects',
  imports: [SectionTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section section--alt" id="projetos" aria-labelledby="projetos-titulo">
      <div class="container wrap">
        <app-section-title headingId="projetos-titulo">Projetos</app-section-title>
        <ul role="list" class="cards">
          @for (project of store.projects(); track project.title) {
            <li class="card">
              <div
                class="card__image"
                [style.background-image]="project.image ? 'url(' + project.image + ')' : null"
                aria-hidden="true"
              ></div>
              <div class="card__body">
                <h3 class="card__title">{{ project.title }}</h3>
                <p class="card__subtitle">{{ project.subtitle }}</p>
                <p class="card__text">{{ project.description }}</p>
                <div class="card__links">
                  @if (project.url) {
                    <a
                      class="btn btn--outline"
                      [href]="project.url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver projeto<span class="visually-hidden">
                        {{ project.title }} (abre em nova aba)</span
                      >
                    </a>
                  }
                  @if (project.repoUrl) {
                    <a
                      class="btn btn--outline"
                      [href]="project.repoUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Código<span class="visually-hidden">
                        de {{ project.title }} (abre em nova aba)</span
                      >
                    </a>
                  }
                </div>
              </div>
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
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
      gap: 30px;
    }
    .card {
      display: grid;
      grid-template-rows: 200px auto;
      overflow: hidden;
      background: var(--color-bg);
      border: 1px solid var(--color-accent-strong);
    }
    .card__image {
      background: linear-gradient(180deg, var(--color-accent-strong), var(--color-line)) center /
        cover;
    }
    .card__body {
      display: grid;
      gap: 12px;
      padding: 28px;
    }
    .card__title {
      font-size: var(--text-2xl);
      font-weight: 700;
    }
    .card__subtitle {
      color: var(--color-accent-strong);
      font-size: var(--text-sm);
      font-weight: 600;
    }
    .card__text {
      color: var(--color-muted);
      font-weight: 500;
      line-height: 1.5;
    }
    .card__links {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 8px;
    }
  `,
})
export class Projects {
  protected readonly store = inject(PortfolioStore);
}

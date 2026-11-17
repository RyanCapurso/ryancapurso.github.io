import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionTitle } from '../../shared/section-title/section-title';

@Component({
  selector: 'app-experience',
  imports: [SectionTitle, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="experiencia" aria-labelledby="experiencia-titulo">
      <div class="container wrap">
        <app-section-title appReveal headingId="experiencia-titulo">Experiência</app-section-title>

        <ol role="list" class="timeline">
          @for (job of store.experiences(); track job.period + job.client) {
            <li class="item" appReveal>
              <div class="meta">
                <p class="period">{{ job.period }}</p>
                <p class="company">{{ job.company }}</p>
                <p class="client">Cliente: {{ job.client }}</p>
              </div>
              <div class="body">
                <h3 class="role">{{ job.role }}</h3>
                <p class="desc">{{ job.description }}</p>
                <p class="stack">
                  <span class="visually-hidden">Tecnologias: </span>{{ job.stack.join(' · ') }}
                </p>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .wrap {
      display: grid;
      gap: 56px;
    }
    .item {
      display: grid;
      grid-template-columns: 260px minmax(0, 1fr);
      gap: 16px 60px;
      padding-block: 36px;
      border-top: 1px solid var(--color-line);
    }
    .meta,
    .body {
      display: grid;
      align-content: start;
      gap: 10px;
    }
    .period {
      color: var(--color-accent);
      font-size: var(--text-sm);
      font-weight: 700;
    }
    .company {
      font-size: var(--text-2xl);
      font-weight: 700;
    }
    .client,
    .desc {
      color: var(--color-muted);
      font-weight: 500;
    }
    .role {
      font-size: 1.375rem;
      font-weight: 700;
    }
    .desc {
      line-height: 1.6;
    }
    .stack {
      color: var(--color-accent-strong);
      font-size: var(--text-sm);
      font-weight: 600;
    }
    @media (max-width: 760px) {
      .item {
        grid-template-columns: minmax(0, 1fr);
        padding-block: 28px;
      }
      .meta {
        grid-template-columns: auto 1fr;
        align-items: baseline;
        column-gap: 10px;
      }
      .period {
        grid-column: 1 / -1;
      }
      .company {
        font-size: 1.0625rem;
      }
      .role {
        order: -1;
      }
    }
  `,
})
export class Experience {
  protected readonly store = inject(PortfolioStore);
}

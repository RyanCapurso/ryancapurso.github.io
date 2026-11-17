import { Injectable, computed, inject, signal } from '@angular/core';
import { CONTENT, SKILLS } from '../data/portfolio.data';
import { LanguageService } from '../i18n/language.service';
import { Project } from '../models/portfolio.model';

/** Read-only access to the portfolio content in the current language, as signals. */
@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  private readonly language = inject(LanguageService);
  private readonly content = computed(() => CONTENT[this.language.lang()]);

  readonly profile = computed(() => this.content().profile);
  readonly socialLinks = computed(() => this.content().socialLinks);
  readonly skills = signal(SKILLS).asReadonly();
  readonly competences = computed(() => this.content().competences);
  readonly experiences = computed(() => this.content().experiences);

  /** Test/preview override for the project list. */
  private readonly projectOverride = signal<readonly Project[] | null>(null);
  readonly projects = computed(() => this.projectOverride() ?? this.content().projects);
  readonly hasProjects = computed(() => this.projects().length > 0);

  /** Menu entries, without "Projetos" while there are no projects to show. */
  readonly navItems = computed(() =>
    this.content().navItems.filter((item) => item.id !== 'projetos' || this.hasProjects()),
  );

  /** Test/preview hook: replace the project list. */
  setProjects(projects: readonly Project[]): void {
    this.projectOverride.set(projects);
  }
}

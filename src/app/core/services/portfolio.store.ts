import { Injectable, computed, signal } from '@angular/core';
import {
  COMPETENCES,
  EXPERIENCES,
  NAV_ITEMS,
  PROFILE,
  PROJECTS,
  SKILLS,
  SOCIAL_LINKS,
} from '../data/portfolio.data';
import { Project } from '../models/portfolio.model';

/** Read-only access to the portfolio content, exposed as signals. */
@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  readonly profile = signal(PROFILE).asReadonly();
  readonly socialLinks = signal(SOCIAL_LINKS).asReadonly();
  readonly skills = signal(SKILLS).asReadonly();
  readonly competences = signal(COMPETENCES).asReadonly();
  readonly experiences = signal(EXPERIENCES).asReadonly();

  private readonly projectList = signal<readonly Project[]>(PROJECTS);
  readonly projects = this.projectList.asReadonly();
  readonly hasProjects = computed(() => this.projectList().length > 0);

  /** Menu entries, without "Projetos" while there are no projects to show. */
  readonly navItems = computed(() =>
    NAV_ITEMS.filter((item) => item.id !== 'projetos' || this.hasProjects()),
  );

  /** Test/preview hook: replace the project list. */
  setProjects(projects: readonly Project[]): void {
    this.projectList.set(projects);
  }
}

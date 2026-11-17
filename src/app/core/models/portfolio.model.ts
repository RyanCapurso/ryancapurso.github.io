export interface NavItem {
  readonly id: string;
  readonly label: string;
}

export type SocialIcon = 'linkedin' | 'resume';

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly icon: SocialIcon;
}

export interface Profile {
  readonly name: string;
  readonly fullName: string;
  readonly role: string;
  readonly kicker: string;
  readonly summary: string;
  readonly location: string;
  readonly email: string;
  readonly photo: string;
  readonly about: readonly string[];
  /** Most recent first. */
  readonly education: readonly string[];
  readonly languages: string;
}

export interface Competence {
  readonly title: string;
  readonly description: string;
}

export interface Experience {
  readonly period: string;
  readonly company: string;
  readonly client: string;
  readonly role: string;
  readonly description: string;
  readonly stack: readonly string[];
}

export interface Project {
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly image?: string;
  readonly url?: string;
  readonly repoUrl?: string;
}

export interface PortfolioContent {
  readonly profile: Profile;
  readonly socialLinks: readonly SocialLink[];
  readonly competences: readonly Competence[];
  readonly experiences: readonly Experience[];
  readonly projects: readonly Project[];
  readonly navItems: readonly NavItem[];
}

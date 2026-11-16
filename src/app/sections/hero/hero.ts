import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { PortfolioStore } from '../../core/services/portfolio.store';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly profile = inject(PortfolioStore).profile;

  /** "Desenvolvedor Java Pleno" -> parts around "Java" so the word can be highlighted. */
  protected readonly roleParts = computed(() => {
    const [before, after] = this.profile().role.split('Java');
    return { before, after };
  });
}

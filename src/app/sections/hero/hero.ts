import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/i18n/language.service';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { MeteorField } from '../../features/meteor-field/meteor-field';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, RouterLink, MeteorField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly profile = inject(PortfolioStore).profile;
  private readonly language = inject(LanguageService);
  protected readonly ui = this.language.ui;
  protected readonly homePath = this.language.homePath;

  /** "Desenvolvedor Java" / "Java Developer" -> parts around "Java" so the word can be highlighted. */
  protected readonly roleParts = computed(() => {
    const [before, after = ''] = this.profile().role.split('Java');
    return { before, after };
  });
}

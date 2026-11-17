import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { PixelRoom } from '../../features/pixel-room/pixel-room';
import { RoomObject } from '../../features/pixel-room/pixel-room.model';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionTitle } from '../../shared/section-title/section-title';

@Component({
  selector: 'app-about',
  imports: [SectionTitle, PixelRoom, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly profile = inject(PortfolioStore).profile;
  protected readonly ui = inject(LanguageService).ui;
  protected readonly reaction = signal('');

  protected onRoomAction(object: RoomObject): void {
    this.reaction.set(this.ui().room.reactions[object]);
  }
}

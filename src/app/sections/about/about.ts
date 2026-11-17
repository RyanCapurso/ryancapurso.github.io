import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PortfolioStore } from '../../core/services/portfolio.store';
import { PixelRoom } from '../../features/pixel-room/pixel-room';
import { RoomObject } from '../../features/pixel-room/pixel-room.model';
import { Reveal } from '../../shared/reveal/reveal';
import { SectionTitle } from '../../shared/section-title/section-title';

const REACTIONS: Readonly<Record<RoomObject, string>> = {
  ryan: 'Opa! Me chamou? Estou terminando um deploy.',
  cafeteira: 'Café passando. Combustível de dev.',
  polvo: 'O polvo virou! Ele muda de humor.',
};

@Component({
  selector: 'app-about',
  imports: [SectionTitle, PixelRoom, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly profile = inject(PortfolioStore).profile;
  protected readonly reaction = signal('');

  protected onRoomAction(object: RoomObject): void {
    this.reaction.set(REACTIONS[object]);
  }
}

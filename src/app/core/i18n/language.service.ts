import { Injectable, computed, signal } from '@angular/core';
import { HOME_PATH, Lang } from './lang';
import { UI_TEXT } from './ui-text';

/** Current site language. Set by the home page from its route (/ or /en). */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly current = signal<Lang>('pt');

  readonly lang = this.current.asReadonly();
  readonly ui = computed(() => UI_TEXT[this.current()]);
  readonly homePath = computed(() => HOME_PATH[this.current()]);

  set(lang: Lang): void {
    this.current.set(lang);
  }
}

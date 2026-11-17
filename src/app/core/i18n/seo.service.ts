import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HOME_PATH, HTML_LANG, LANGS, Lang, OG_LOCALE } from './lang';
import { UI_TEXT } from './ui-text';

const ORIGIN = 'https://ryancapurso.github.io';

/** Updates <html lang>, title, description, Open Graph and hreflang links per language. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  apply(lang: Lang): void {
    const text = UI_TEXT[lang].meta;
    const url = ORIGIN + (lang === 'pt' ? '/' : HOME_PATH[lang] + '/');

    this.document.documentElement.lang = HTML_LANG[lang];
    this.title.setTitle(text.title);
    this.meta.updateTag({ name: 'description', content: text.description });
    this.meta.updateTag({ property: 'og:title', content: text.title });
    this.meta.updateTag({ property: 'og:description', content: text.ogDescription });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: text.ogImage });
    this.meta.updateTag({ property: 'og:image:alt', content: text.title });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[lang] });

    this.setLink('canonical', url);
    for (const other of LANGS) {
      this.setLink(
        'alternate',
        ORIGIN + (other === 'pt' ? '/' : HOME_PATH[other] + '/'),
        HTML_LANG[other],
      );
    }
    this.setLink('alternate', ORIGIN + '/', 'x-default');
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = `link[rel="${rel}"]` + (hreflang ? `[hreflang="${hreflang}"]` : '');
    let link = this.document.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      if (hreflang) link.hreflang = hreflang;
      this.document.head.appendChild(link);
    }
    link.href = href;
  }
}

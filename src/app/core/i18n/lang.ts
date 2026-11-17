export type Lang = 'pt' | 'en';

export const LANGS: readonly Lang[] = ['pt', 'en'];

/** Route path of each language's home page. */
export const HOME_PATH: Readonly<Record<Lang, string>> = { pt: '/', en: '/en' };

/** Values for <html lang> and og:locale. */
export const HTML_LANG: Readonly<Record<Lang, string>> = { pt: 'pt-BR', en: 'en' };
export const OG_LOCALE: Readonly<Record<Lang, string>> = { pt: 'pt_BR', en: 'en_US' };

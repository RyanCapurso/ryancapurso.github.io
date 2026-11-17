import { DOCUMENT, Injectable, inject } from '@angular/core';
import { LanguageService } from '../i18n/language.service';
import { PortfolioStore } from './portfolio.store';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

/**
 * Sends the contact form. The site is static (no backend), so this opens the
 * visitor's e-mail app with the message filled in. To receive messages without
 * that step, swap `send()` for an HTTP call to a form service (Formspree,
 * EmailJS, a serverless function...).
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly document = inject(DOCUMENT);
  private readonly store = inject(PortfolioStore);
  private readonly language = inject(LanguageService);

  buildMailto({ name, email, message }: ContactMessage): string {
    const subject = `${this.language.ui().contact.mailSubject} — ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    return `mailto:${this.store.profile().email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  send(contact: ContactMessage): void {
    this.document.defaultView?.location.assign(this.buildMailto(contact));
  }
}

import { TestBed } from '@angular/core/testing';
import { ContactMessage, ContactService } from '../../core/services/contact.service';
import { Contact } from './contact';

describe('Contact', () => {
  let sent: ContactMessage[];

  beforeEach(async () => {
    sent = [];
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [
        { provide: ContactService, useValue: { send: (m: ContactMessage) => sent.push(m) } },
      ],
    }).compileComponents();
  });

  async function setup() {
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const type = (selector: string, value: string) => {
      const input = el.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    };
    const submit = async () => {
      el.querySelector<HTMLFormElement>('form')!.dispatchEvent(new Event('submit'));
      await fixture.whenStable();
    };
    return { el, type, submit };
  }

  it('shows errors and does not send an empty form', async () => {
    const { el, submit } = await setup();
    await submit();
    expect(sent).toHaveLength(0);
    expect(el.querySelectorAll('.error')).toHaveLength(3);
    expect(el.querySelector('#contato-email')?.getAttribute('aria-invalid')).toBe('true');
  });

  it('rejects an invalid e-mail', async () => {
    const { el, type, submit } = await setup();
    type('#contato-nome', 'Maria');
    type('#contato-email', 'maria-sem-arroba');
    type('#contato-mensagem', 'Olá, gostaria de conversar sobre uma vaga.');
    await submit();
    expect(sent).toHaveLength(0);
    expect(el.querySelector('#contato-email-erro')).not.toBeNull();
  });

  it('sends a valid message and confirms it', async () => {
    const { el, type, submit } = await setup();
    type('#contato-nome', 'Maria');
    type('#contato-email', 'maria@empresa.com');
    type('#contato-mensagem', 'Olá, gostaria de conversar sobre uma vaga.');
    await submit();
    expect(sent).toEqual([
      {
        name: 'Maria',
        email: 'maria@empresa.com',
        message: 'Olá, gostaria de conversar sobre uma vaga.',
      },
    ]);
    expect(el.querySelector('.status')?.textContent).toContain('app de e-mail');
  });
});

describe('ContactService', () => {
  it('builds an encoded mailto link to the portfolio e-mail', () => {
    const url = TestBed.inject(ContactService).buildMailto({
      name: 'João & Cia',
      email: 'joao@x.com',
      message: 'Oi',
    });
    expect(url.startsWith('mailto:ryan_capurso@hotmail.com?subject=')).toBe(true);
    expect(url).toContain(encodeURIComponent('João & Cia'));
  });
});

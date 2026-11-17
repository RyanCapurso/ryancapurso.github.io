import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';
import { PortfolioStore } from './core/services/portfolio.store';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes, withComponentInputBinding())],
    }).compileComponents();
  });

  /** Render the full app shell at a URL. */
  async function render(url = '/') {
    const harness = await RouterTestingHarness.create();
    const fixture = TestBed.createComponent(App);
    await harness.navigateByUrl(url);
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the name and role, without "Pleno"', async () => {
    const el = await render();
    const h1 = el.querySelector('h1')?.textContent ?? '';
    expect(h1).toContain('Ryan Capurso');
    expect(h1).toContain('Desenvolvedor Java');
    expect(h1).not.toContain('Pleno');
  });

  it('renders every section the menu links to', async () => {
    const el = await render();
    const links = [...el.querySelectorAll<HTMLAnchorElement>('nav a')];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const id = new URL(link.href).hash.slice(1);
      expect(el.querySelector(`#${id}`), `section #${id}`).not.toBeNull();
    }
  });

  it('shows the postgraduate degree and the English level', async () => {
    const text = (await render()).textContent ?? '';
    expect(text).toContain('Pós-graduação em Arquitetura e Desenvolvimento Java — FIAP');
    expect(text).toContain('Inglês (A2)');
  });

  it('serves the English version at /en', async () => {
    const el = await render('/en');
    expect(el.querySelector('h1')?.textContent).toContain('Java Developer');
    expect(el.textContent).toContain('English (A2)');
    expect(el.querySelector('#sobre h2')?.textContent).toContain('About me');
    expect(document.documentElement.lang).toBe('en');
  });

  it('has a PT/EN switcher that marks the current language', async () => {
    const el = await render('/en');
    const current = el.querySelector('.lang [aria-current="page"]');
    expect(current?.textContent?.trim()).toBe('EN');
    const pt = [...el.querySelectorAll<HTMLAnchorElement>('.lang a')].find(
      (a) => a.textContent?.trim() === 'PT',
    );
    expect(new URL(pt!.href).pathname).toBe('/');
  });

  it('hides the projects section and its menu link while there are no projects', async () => {
    const el = await render();
    expect(el.querySelector('#projetos')).toBeNull();
    expect(el.querySelector('nav a[href*="#projetos"]')).toBeNull();
  });

  it('shows the projects section once a project is added', async () => {
    TestBed.inject(PortfolioStore).setProjects([
      {
        title: 'Landing page',
        subtitle: 'Freela · 2026',
        description: 'Teste',
        url: 'https://example.com',
      },
    ]);
    const el = await render();
    expect(el.querySelector('#projetos')?.textContent).toContain('Landing page');
    expect(el.querySelector('nav a[href*="#projetos"]')).not.toBeNull();
  });

  it('lists all experiences', async () => {
    const el = await render();
    expect(el.querySelectorAll('#experiencia li').length).toBe(5);
  });
});

import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { PortfolioStore } from './core/services/portfolio.store';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  async function render() {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the name and role in the main heading', async () => {
    const el = await render();
    const h1 = el.querySelector('h1')?.textContent ?? '';
    expect(h1).toContain('Ryan Capurso');
    expect(h1).toContain('Java');
  });

  it('renders every section the menu links to', async () => {
    const el = await render();
    const links = [...el.querySelectorAll<HTMLAnchorElement>('nav a')];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const id = link.getAttribute('href')!.slice(1);
      expect(el.querySelector(`#${id}`), `section #${id}`).not.toBeNull();
    }
  });

  it('hides the projects section and its menu link while there are no projects', async () => {
    const el = await render();
    expect(el.querySelector('#projetos')).toBeNull();
    expect(el.querySelector('nav a[href="#projetos"]')).toBeNull();
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
    expect(el.querySelector('nav a[href="#projetos"]')).not.toBeNull();
  });

  it('lists all experiences', async () => {
    const el = await render();
    expect(el.querySelectorAll('#experiencia li').length).toBe(5);
  });
});

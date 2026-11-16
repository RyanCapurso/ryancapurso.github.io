# Portfólio — Ryan Capurso

Portfólio pessoal em Angular 22, baseado no layout v2 do Figma (fonte Raleway, paleta azul-marinho + azul), com o quarto em pixel art interativo na seção "Sobre mim".

## Comandos

```bash
npm install
npm start          # http://localhost:4200
npm test           # testes (Vitest) em modo watch
npm run test:ci    # testes uma vez
npm run build      # build de produção pré-renderizado em dist/portfolio/browser
npm run format     # Prettier
```

## Como editar o conteúdo

Todo o texto do site fica em **`src/app/core/data/portfolio.data.ts`**: perfil, links, tecnologias, competências, experiências e projetos. Os componentes só exibem o que está lá.

- **Projetos:** a lista `PROJECTS` está vazia, então a seção e o link "Projetos" do menu não aparecem. Ao adicionar o primeiro item, os dois aparecem sozinhos. Imagens dos projetos vão em `public/images/`.
- **Currículo:** coloque o PDF em `public/` e descomente a linha do currículo em `SOCIAL_LINKS`.
- **Foto:** `public/images/ryan.webp` (320×320).

## Estrutura

```
src/
  styles/_tokens.scss         cores, fontes, espaçamentos (do Figma)
  styles.scss                 base, .container, .section, .btn, acessibilidade
  app/
    app.ts                    página: header, seções, footer
    core/
      data/                   conteúdo do site
      models/                 tipos do conteúdo
      services/               PortfolioStore (signals), ScrollSpy (menu ativo), ContactService
    layout/                   site-header (menu mobile), site-footer
    sections/                 hero, about, stack, experience, projects, contact
    shared/                   section-title, social-links
    features/pixel-room/      quarto interativo (canvas)
public/quarto/                fundo do quarto e as animações em tiras de quadros
```

## Decisões técnicas

- **Componentes standalone, signals e `OnPush`** em tudo; `input()`, `output()`, `viewChild()` e `inject()`; controle de fluxo `@if`/`@for`; sem Zone.js (zoneless, padrão do Angular 22).
- **Pré-renderização (SSG):** `outputMode: static`. O HTML final já sai com todo o conteúdo, bom para SEO e para o carregamento. O build gera arquivos estáticos que podem ir para GitHub Pages, Vercel, Netlify ou Cloudflare Pages (pasta `dist/portfolio/browser`).
- **TypeScript estrito** e `strictTemplates`, com diagnósticos estendidos tratados como erro.
- **Acessibilidade:** link "Pular para o conteúdo", landmarks, títulos ligados às seções (`aria-labelledby`), menu mobile com `aria-expanded` e tecla Esc, item ativo do menu com `aria-current`, foco visível, mensagens de erro do formulário ligadas aos campos, `prefers-reduced-motion` respeitado. O quarto pode ser usado pelo teclado (Tab + Enter).
- **Performance:** foto com `NgOptimizedImage` e `priority` (é o maior elemento do topo), WebP, fonte com `preconnect`, animação do quarto só roda quando ele está visível. Bundle inicial em torno de 95 kB comprimido.
- **Quarto interativo:** a lógica de animação (`SpriteLayer`) é TypeScript puro e testado; o `PixelRoomEngine` cuida do canvas, do clique por pixel e do contorno no hover. Só inicia no navegador (`afterNextRender`). Se o canvas não estiver disponível, mostra a imagem parada.
- **Formulário de contato:** formulário reativo tipado com validação. Como o site é estático, o envio abre o app de e-mail do visitante com a mensagem pronta (`ContactService`). Para receber mensagens direto, troque o `send()` por uma chamada HTTP a um serviço de formulários (Formspree, EmailJS ou uma função serverless).

## Deploy (GitHub Pages)

O workflow `.github/workflows/deploy.yml` roda os testes, faz o build e publica em **https://ryancapurso.github.io** a cada `git push` na branch `main`. Para acompanhar, veja a aba **Actions** do repositório.

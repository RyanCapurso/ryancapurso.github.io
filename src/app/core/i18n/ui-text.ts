import { Lang } from './lang';

/** Interface strings (everything that is not portfolio content). */
export interface UiText {
  readonly meta: { title: string; description: string; ogDescription: string; ogImage: string };
  readonly header: {
    skipToContent: string;
    logoLabel: string;
    sectionsLabel: string;
    openMenu: string;
    closeMenu: string;
    languageLabel: string;
  };
  readonly hero: { greeting: string; ctaExperience: string; ctaContact: string; photoAlt: string };
  readonly about: {
    title: string;
    hintBefore: string;
    hintMe: string;
    hintMiddle: string;
    hintCoffee: string;
    hintAnd: string;
    hintOctopus: string;
    hintAfter: string;
    education: string;
    languages: string;
  };
  readonly room: {
    imageLabel: string;
    labels: { ryan: string; cafeteira: string; polvo: string };
    reactions: { ryan: string; cafeteira: string; polvo: string };
  };
  readonly stack: { title: string; techLabel: string };
  readonly experience: { title: string; client: string; techLabel: string };
  readonly projects: { title: string; view: string; code: string };
  readonly contact: {
    title: string;
    intro: string;
    name: string;
    email: string;
    message: string;
    nameError: string;
    emailError: string;
    messageError: string;
    submit: string;
    sent: string;
    direct: string;
    mailSubject: string;
  };
  readonly footer: { backToTop: string };
  readonly newTab: string;
}

export const UI_TEXT: Readonly<Record<Lang, UiText>> = {
  pt: {
    meta: {
      title: 'Ryan Capurso — Desenvolvedor Java',
      description:
        'Portfólio de Ryan Capurso, Desenvolvedor Java (Backend e Fullstack) com Spring, microsserviços, Kafka e Angular.',
      ogDescription:
        'Portfólio de Ryan Capurso, Desenvolvedor Java: APIs e sistemas de alto volume com Java, Spring, microsserviços, Kafka e Angular.',
      ogImage: 'https://ryancapurso.github.io/images/og-image.png',
    },
    header: {
      skipToContent: 'Pular para o conteúdo',
      logoLabel: 'Ryan Capurso, voltar ao início',
      sectionsLabel: 'Seções',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      languageLabel: 'Idioma',
    },
    hero: {
      greeting: 'Olá, eu sou',
      ctaExperience: 'Veja minha experiência',
      ctaContact: 'Fale comigo',
      photoAlt: 'Foto de Ryan Capurso',
    },
    about: {
      title: 'Sobre mim',
      hintBefore: 'Clique em ',
      hintMe: 'mim',
      hintMiddle: ', na ',
      hintCoffee: 'cafeteira',
      hintAnd: ' ou no ',
      hintOctopus: 'polvo',
      hintAfter: ' da cama.',
      education: 'Formação',
      languages: 'Idiomas',
    },
    room: {
      imageLabel:
        'Quarto em pixel art: Ryan programando na mesa, uma cafeteira e um polvo de pelúcia na cama.',
      labels: {
        ryan: 'Ryan programando. Ativar para chamar a atenção dele.',
        cafeteira: 'Cafeteira. Ativar para passar um café.',
        polvo: 'Polvo de pelúcia na cama. Ativar para virar o polvo.',
      },
      reactions: {
        ryan: 'Opa! Me chamou? Estou terminando um deploy.',
        cafeteira: 'Café passando. Combustível de dev.',
        polvo: 'O polvo virou! Ele muda de humor.',
      },
    },
    stack: { title: 'Stack', techLabel: 'Tecnologias' },
    experience: { title: 'Experiência', client: 'Cliente', techLabel: 'Tecnologias' },
    projects: { title: 'Projetos', view: 'Ver projeto', code: 'Código' },
    contact: {
      title: 'Contato',
      intro: 'Possui alguma dúvida ou quer trabalhar em conjunto? Me envie uma mensagem!',
      name: 'Nome',
      email: 'E-mail',
      message: 'Mensagem',
      nameError: 'Informe seu nome (pelo menos 2 letras).',
      emailError: 'Informe um e-mail válido, como nome@empresa.com.',
      messageError: 'Escreva uma mensagem com pelo menos 10 caracteres.',
      submit: 'Enviar mensagem',
      sent: 'Abrimos seu app de e-mail com a mensagem pronta. É só enviar por lá.',
      direct: 'Ou escreva direto para',
      mailSubject: 'Contato pelo portfólio',
    },
    footer: { backToTop: 'Voltar ao topo' },
    newTab: 'abre em nova aba',
  },
  en: {
    meta: {
      title: 'Ryan Capurso — Java Developer',
      description:
        'Portfolio of Ryan Capurso, Java Developer (Backend and Fullstack) working with Spring, microservices, Kafka and Angular.',
      ogDescription:
        'Portfolio of Ryan Capurso, Java Developer: high-volume APIs and systems with Java, Spring, microservices, Kafka and Angular.',
      ogImage: 'https://ryancapurso.github.io/images/og-image-en.png',
    },
    header: {
      skipToContent: 'Skip to content',
      logoLabel: 'Ryan Capurso, back to top',
      sectionsLabel: 'Sections',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      languageLabel: 'Language',
    },
    hero: {
      greeting: "Hi, I'm",
      ctaExperience: 'See my experience',
      ctaContact: 'Get in touch',
      photoAlt: 'Photo of Ryan Capurso',
    },
    about: {
      title: 'About me',
      hintBefore: 'Click ',
      hintMe: 'me',
      hintMiddle: ', the ',
      hintCoffee: 'coffee maker',
      hintAnd: ' or the ',
      hintOctopus: 'octopus',
      hintAfter: ' on the bed.',
      education: 'Education',
      languages: 'Languages',
    },
    room: {
      imageLabel:
        'Pixel art bedroom: Ryan coding at his desk, a coffee maker and a plush octopus on the bed.',
      labels: {
        ryan: 'Ryan coding. Activate to get his attention.',
        cafeteira: 'Coffee maker. Activate to brew some coffee.',
        polvo: 'Plush octopus on the bed. Activate to flip the octopus.',
      },
      reactions: {
        ryan: 'Hey! Did you call me? Just finishing a deploy.',
        cafeteira: 'Coffee is brewing. Developer fuel.',
        polvo: 'The octopus flipped! It changes its mood.',
      },
    },
    stack: { title: 'Stack', techLabel: 'Technologies' },
    experience: { title: 'Experience', client: 'Client', techLabel: 'Technologies' },
    projects: { title: 'Projects', view: 'View project', code: 'Code' },
    contact: {
      title: 'Contact',
      intro: 'Have a question or want to work together? Send me a message!',
      name: 'Name',
      email: 'E-mail',
      message: 'Message',
      nameError: 'Enter your name (at least 2 letters).',
      emailError: 'Enter a valid e-mail, like name@company.com.',
      messageError: 'Write a message with at least 10 characters.',
      submit: 'Send message',
      sent: 'Your e-mail app opened with the message ready. Just send it from there.',
      direct: 'Or write directly to',
      mailSubject: 'Contact from your portfolio',
    },
    footer: { backToTop: 'Back to top' },
    newTab: 'opens in a new tab',
  },
};

import {
  Competence,
  Experience,
  NavItem,
  Profile,
  Project,
  SocialLink,
} from '../models/portfolio.model';

/**
 * All site content lives here. Edit this file to update the portfolio;
 * components only render what they receive.
 */

export const PROFILE: Profile = {
  name: 'Ryan Capurso',
  fullName: 'Ryan Capurso Ramos',
  role: 'Desenvolvedor Java Pleno',
  kicker: 'Backend · Fullstack · São Paulo',
  summary:
    'Construo APIs e sistemas de alto volume com Java, Spring e microsserviços. ' +
    'Hoje modernizo sistemas da B3 como Desenvolvedor Java Fullstack na Deal.',
  location: 'São Paulo, Brasil',
  email: 'ryan_capurso@hotmail.com',
  photo: 'images/ryan.webp',
  about: [
    'Sou Desenvolvedor Backend Java, especializado em APIs e bases de dados de larga escala, ' +
      'performáticas e confiáveis, sempre com arquiteturas robustas e escaláveis. ' +
      'Gosto de código limpo, organizado e sustentável.',
    'Também atuo no Fullstack com Angular, criando interfaces dinâmicas e responsivas. ' +
      'Já passei por saúde digital, logística portuária, setor jurídico e mercado financeiro.',
  ],
  education: 'Análise e Desenvolvimento de Sistemas — FIAP',
};

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ryancapurso/', icon: 'linkedin' },
  // Add your résumé PDF to /public and uncomment:
  // { label: 'Currículo', href: 'curriculo-ryan-capurso.pdf', icon: 'resume' },
];

export const SKILLS: readonly string[] = [
  'Java',
  'Spring Boot',
  'Spring Data JPA',
  'Struts 2',
  'Quarkus',
  'Angular',
  'Apache Kafka',
  'RabbitMQ',
  'Docker',
  'CI/CD',
  'Oracle',
  'SQL Server',
  'PostgreSQL',
  'MariaDB',
  'MongoDB',
  'JUnit',
  'Mockito',
  'Sonar',
];

export const COMPETENCES: readonly Competence[] = [
  {
    title: 'Backend Java & Spring',
    description:
      'APIs REST e SOAP com Java, Spring Boot, Spring Data JPA, Hibernate, Struts 2 e Quarkus.',
  },
  {
    title: 'Microsserviços & Mensageria',
    description:
      'Sistemas desacoplados e escaláveis com Apache Kafka, RabbitMQ, webhooks e eventos.',
  },
  {
    title: 'Bancos de Dados',
    description:
      'Consultas performáticas em Oracle, SQL Server, PostgreSQL, MariaDB, MySQL e MongoDB.',
  },
  {
    title: 'Arquitetura & Qualidade',
    description:
      'Clean e Hexagonal Architecture, DDD, CQRS, SOLID e testes com JUnit, Mockito e Sonar.',
  },
  {
    title: 'Frontend com Angular',
    description: 'Interfaces dinâmicas e responsivas com Angular, HTML, CSS e JavaScript.',
  },
  {
    title: 'DevOps & Agilidade',
    description: 'Docker, CI/CD, Git e GitFlow, Jira e Azure DevOps em times Scrum.',
  },
];

export const EXPERIENCES: readonly Experience[] = [
  {
    period: 'Nov 2025 — Atual',
    company: 'Deal',
    client: 'B3',
    role: 'Desenvolvedor Java Fullstack',
    description:
      'Modernização de sistemas da B3 com alto volume de dados, baixa latência e microsserviços. ' +
      'Refatoração de código legado, análise de causa raiz de incidentes e alta cobertura de testes.',
    stack: ['Java', 'Spring', 'Microsserviços', 'JUnit', 'Mockito', 'Sonar'],
  },
  {
    period: 'Mai 2025 — Nov 2025',
    company: 'Qintess',
    client: 'TJ-BA',
    role: 'Desenvolvedor Java',
    description:
      'Sustentação técnica do PJe, sistema de processos judiciais do Tribunal de Justiça da Bahia: ' +
      'diagnóstico e correção de falhas em produção, reduzindo a recorrência de incidentes.',
    stack: ['Java', 'Sustentação', 'Análise de causa raiz'],
  },
  {
    period: 'Jun 2024 — Mai 2025',
    company: 'Mosten',
    client: 'Ecopátio',
    role: 'Desenvolvedor Fullstack',
    description:
      'Sistema integrado ao pátio regulador do Porto de Santos para agendamento, permanência e ' +
      'pagamento, com programa de fidelidade, novos meios de pagamento e notificações.',
    stack: ['Spring Boot', 'APIs REST', 'Oracle', 'Hibernate', 'Angular'],
  },
  {
    period: 'Fev 2024 — Ago 2024',
    company: 'Mosten',
    client: 'Techscan',
    role: 'Desenvolvedor Fullstack',
    description:
      'Reconstrução de um portal administrativo com problemas críticos de desempenho e segurança, ' +
      'reduzindo em mais de 90% o tempo de resposta das consultas.',
    stack: ['Spring Boot', 'CQRS', 'Spring Data JPA', 'MariaDB', 'Angular'],
  },
  {
    period: 'Jun 2023 — Mai 2024',
    company: 'Mosten',
    client: 'MV',
    role: 'Desenvolvedor Backend',
    description:
      'Integração de sistemas médicos via microsserviços e webhooks, unificando o histórico do ' +
      'paciente entre clínicas. 100% de cobertura de testes unitários.',
    stack: ['Java', 'Quarkus', 'Kafka', 'MongoDB', 'Docker'],
  },
];

/**
 * Empty for now. The "Projetos" section and its menu link appear automatically
 * as soon as this list has at least one item.
 */
export const PROJECTS: readonly Project[] = [];

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'inicio', label: 'Home' },
  { id: 'sobre', label: 'Sobre mim' },
  { id: 'stack', label: 'Stack' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
];

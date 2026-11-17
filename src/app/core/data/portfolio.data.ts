import { Lang } from '../i18n/lang';
import { PortfolioContent } from '../models/portfolio.model';

/**
 * All site content lives here, in Portuguese and English. Edit this file to
 * update the portfolio; components only render what they receive.
 */

/** Same in both languages. */
const SHARED = {
  name: 'Ryan Capurso',
  fullName: 'Ryan Capurso Ramos',
  email: 'ryan_capurso@hotmail.com',
  photo: 'images/ryan.webp',
};

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

const LINKEDIN = 'https://www.linkedin.com/in/ryancapurso/';

export const CONTENT: Readonly<Record<Lang, PortfolioContent>> = {
  pt: {
    profile: {
      ...SHARED,
      role: 'Desenvolvedor Java',
      kicker: 'Backend · Fullstack · São Paulo',
      summary:
        'Construo APIs e sistemas de alto volume com Java, Spring e microsserviços. ' +
        'Hoje modernizo sistemas da B3 como Desenvolvedor Java Fullstack na Deal.',
      location: 'São Paulo, Brasil',
      about: [
        'Sou Desenvolvedor Backend Java, especializado em APIs e bases de dados de larga escala, ' +
          'performáticas e confiáveis, sempre com arquiteturas robustas e escaláveis. ' +
          'Gosto de código limpo, organizado e sustentável.',
        'Também atuo no Fullstack com Angular, criando interfaces dinâmicas e responsivas. ' +
          'Já passei por saúde digital, logística portuária, setor jurídico e mercado financeiro.',
      ],
      education: [
        'Pós-graduação em Arquitetura e Desenvolvimento Java — FIAP',
        'Análise e Desenvolvimento de Sistemas — FIAP',
      ],
      languages: 'Português (nativo) · Inglês (A2)',
    },
    socialLinks: [
      { label: 'LinkedIn', href: LINKEDIN, icon: 'linkedin' },
      // Add your résumé PDF to /public and uncomment:
      // { label: 'Currículo', href: 'curriculo-ryan-capurso.pdf', icon: 'resume' },
    ],
    competences: [
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
    ],
    experiences: [
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
    ],
    /**
     * Empty for now. The "Projetos" section and its menu link appear automatically
     * as soon as this list has at least one item (add the English version too).
     */
    projects: [],
    navItems: [
      { id: 'inicio', label: 'Home' },
      { id: 'sobre', label: 'Sobre mim' },
      { id: 'stack', label: 'Stack' },
      { id: 'experiencia', label: 'Experiência' },
      { id: 'projetos', label: 'Projetos' },
      { id: 'contato', label: 'Contato' },
    ],
  },

  en: {
    profile: {
      ...SHARED,
      role: 'Java Developer',
      kicker: 'Backend · Fullstack · São Paulo',
      summary:
        'I build high-volume APIs and systems with Java, Spring and microservices. ' +
        "Today I'm modernizing B3 systems as a Fullstack Java Developer at Deal.",
      location: 'São Paulo, Brazil',
      about: [
        "I'm a Backend Java Developer focused on large-scale APIs and databases that are fast " +
          'and reliable, always built on robust, scalable architectures. ' +
          'I care about clean, well-organized and maintainable code.',
        'I also work fullstack with Angular, building dynamic and responsive interfaces. ' +
          "I've worked in digital health, port logistics, the judicial sector and financial markets.",
      ],
      education: [
        'Postgraduate degree in Java Architecture and Development — FIAP',
        'Technologist degree in Systems Analysis and Development — FIAP',
      ],
      languages: 'Portuguese (native) · English (A2)',
    },
    socialLinks: [
      { label: 'LinkedIn', href: LINKEDIN, icon: 'linkedin' },
      // { label: 'Résumé', href: 'curriculo-ryan-capurso.pdf', icon: 'resume' },
    ],
    competences: [
      {
        title: 'Backend Java & Spring',
        description:
          'REST and SOAP APIs with Java, Spring Boot, Spring Data JPA, Hibernate, Struts 2 and Quarkus.',
      },
      {
        title: 'Microservices & Messaging',
        description:
          'Decoupled, scalable systems with Apache Kafka, RabbitMQ, webhooks and events.',
      },
      {
        title: 'Databases',
        description: 'Fast queries on Oracle, SQL Server, PostgreSQL, MariaDB, MySQL and MongoDB.',
      },
      {
        title: 'Architecture & Quality',
        description:
          'Clean and Hexagonal Architecture, DDD, CQRS, SOLID and testing with JUnit, Mockito and Sonar.',
      },
      {
        title: 'Frontend with Angular',
        description: 'Dynamic, responsive interfaces with Angular, HTML, CSS and JavaScript.',
      },
      {
        title: 'DevOps & Agile',
        description: 'Docker, CI/CD, Git and GitFlow, Jira and Azure DevOps on Scrum teams.',
      },
    ],
    experiences: [
      {
        period: 'Nov 2025 — Present',
        company: 'Deal',
        client: 'B3',
        role: 'Fullstack Java Developer',
        description:
          "Modernizing systems at B3 (Brazil's stock exchange) with high data volume, low latency " +
          'and microservices. Legacy code refactoring, root cause analysis of incidents and high test coverage.',
        stack: ['Java', 'Spring', 'Microservices', 'JUnit', 'Mockito', 'Sonar'],
      },
      {
        period: 'May 2025 — Nov 2025',
        company: 'Qintess',
        client: 'TJ-BA',
        role: 'Java Developer',
        description:
          "Technical support for PJe, the electronic court case system of Bahia's Court of Justice: " +
          'diagnosing and fixing production failures, reducing recurring incidents.',
        stack: ['Java', 'Production support', 'Root cause analysis'],
      },
      {
        period: 'Jun 2024 — May 2025',
        company: 'Mosten',
        client: 'Ecopátio',
        role: 'Fullstack Developer',
        description:
          "System integrated with the Port of Santos' truck holding yard for scheduling, stay and " +
          'payment, with a loyalty program, new payment methods and notifications.',
        stack: ['Spring Boot', 'REST APIs', 'Oracle', 'Hibernate', 'Angular'],
      },
      {
        period: 'Feb 2024 — Aug 2024',
        company: 'Mosten',
        client: 'Techscan',
        role: 'Fullstack Developer',
        description:
          'Rebuilt an admin portal with critical performance and security issues, ' +
          'cutting query response times by more than 90%.',
        stack: ['Spring Boot', 'CQRS', 'Spring Data JPA', 'MariaDB', 'Angular'],
      },
      {
        period: 'Jun 2023 — May 2024',
        company: 'Mosten',
        client: 'MV',
        role: 'Backend Developer',
        description:
          'Integrated medical systems through microservices and webhooks, unifying patient history ' +
          'across clinics. 100% unit test coverage.',
        stack: ['Java', 'Quarkus', 'Kafka', 'MongoDB', 'Docker'],
      },
    ],
    projects: [],
    navItems: [
      { id: 'inicio', label: 'Home' },
      { id: 'sobre', label: 'About' },
      { id: 'stack', label: 'Stack' },
      { id: 'experiencia', label: 'Experience' },
      { id: 'projetos', label: 'Projects' },
      { id: 'contato', label: 'Contact' },
    ],
  },
};

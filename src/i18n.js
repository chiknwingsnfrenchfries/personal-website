export const i18n = {
  en: {
    lang: 'en',
    greeting: "Hi, I'm",
    name: 'Edgar',
    tagline: 'I help businesses get more out of their Martech stack by wiring up their customer data and automating the right touchpoints to drive revenue across <strong>email, SMS/RCS, WhatsApp</strong> and more.',
    badgeRole: 'Marketing Automation',
    badgeCity: 'Montréal, QC',
    whatLabel: 'What I do',
    whatTitle: 'The right message.\nThe right channel.\nEvery time.',
    channels: [
      '📧 Email Flows', '📱 SMS / RCS', '💬 WhatsApp', '🔗 CDP Integration',
      '⚙️ CRM Automation', '🗺️ Customer Journeys', '📊 Segmentation',
      '🚀 Lead Nurture', '🎯 Lead Scoring', '⚡ Lead Generation',
    ],
    linksLabel: 'Work with me',
    links: [
      { icon: '▶️', title: 'Watch My Vlog', sub: 'Flows & Funnels on YouTube', href: 'https://www.youtube.com/@FlowsandFunnels', yt: true },
      { icon: '🗂️', title: 'Projects', sub: 'Flows, CDP setups & campaigns', href: '#', id: 'projects' },
      { icon: '📞', title: '20 Min Call — Book Now', sub: "Let's talk automation strategy", href: 'https://cal.com/edgarramos/discoverycall', featured: true },
      { icon: '✉️', title: 'Shoot Me an Email', sub: 'Hello@edgarramos.com', href: 'mailto:Hello@edgarramos.com' },
    ],
    socialLabel: 'Find me',
    aboutLabel: 'More about me',
    projectLabel: 'Project I\'m working on',
    projectStatus: 'In progress',
    musicLabel: 'Song I\'m into at the moment',
    booksLabel: 'Books',
    currentlyReading: 'Currently reading',
    readingNext: 'Reading next',
    formLabel: 'Stay in the loop',
    formDesc: 'Automation tips, flow breakdowns & tools — straight to your inbox. No spam, ever.',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email',
    submitLabel: 'Subscribe →',
    projectsTitle: 'Projects',
    portfolioEyebrow: 'Work',
    portfolioProjects: [
      {
        title: 'Real Estate Lead Gen Quiz',
        client: 'Eugenie Do — Broker, Greater Montréal',
        desc: 'Neighbourhood-matching quiz with a full CDP data pipeline, profile reconciliation, and privacy-aware lead tracking.',
        tags: ['CDP', 'Lead Gen', 'Email Flows'],
        slug: 'real-estate-quiz',
      },
    ],
    footer: 'Edgar · Marketing Automation · Montréal',
  },
  fr: {
    lang: 'fr',
    greeting: 'Bonjour, je suis',
    name: 'Edgar',
    tagline: 'J\'aide les entreprises à tirer le maximum de leur stack Martech en connectant leurs données clients et en automatisant les bons points de contact pour générer des revenus via <strong>courriel, SMS/RCS, WhatsApp</strong> et plus encore.',
    badgeRole: 'Automatisation Marketing',
    badgeCity: 'Montréal, QC',
    whatLabel: 'Ce que je fais',
    whatTitle: 'Le bon message.\nLe bon canal.\nÀ chaque fois.',
    channels: [
      '📧 Flux d\'e-mails', '📱 SMS / RCS', '💬 WhatsApp', '🔗 Intégration CDP',
      '⚙️ Automatisation CRM', '🗺️ Parcours client', '📊 Segmentation',
      '🚀 Nurture de leads', '🎯 Scoring de leads', '⚡ Génération de leads',
    ],
    linksLabel: 'Travailler ensemble',
    links: [
      { icon: '▶️', title: 'Regarder mon Vlog', sub: 'Flows & Funnels sur YouTube', href: 'https://www.youtube.com/@FlowsandFunnels', yt: true },
      { icon: '🗂️', title: 'Projets', sub: 'Flows, CDP et campagnes réalisés', href: '#', id: 'projects' },
      { icon: '📞', title: 'Appel 20 min — Réserver', sub: 'Parlons stratégie d\'automatisation', href: 'https://cal.com/edgarramos/discoverycall', featured: true },
      { icon: '✉️', title: 'Envoyez-moi un courriel', sub: 'Hello@edgarramos.com', href: 'mailto:Hello@edgarramos.com' },
    ],
    socialLabel: 'Me trouver',
    aboutLabel: 'En savoir plus sur moi',
    projectLabel: 'Projet en cours',
    projectStatus: 'En cours',
    musicLabel: 'Ce que j\'écoute en ce moment',
    booksLabel: 'Lectures',
    currentlyReading: 'En cours de lecture',
    readingNext: 'Prochaine lecture',
    formLabel: 'Restez informé',
    formDesc: 'Conseils d\'automatisation, décryptages de flows et outils — directement dans votre boîte mail. Zéro spam.',
    namePlaceholder: 'Votre nom',
    emailPlaceholder: 'Votre courriel',
    submitLabel: 'S\'abonner →',
    projectsTitle: 'Projets',
    portfolioEyebrow: 'Projets',
    portfolioProjects: [
      {
        title: 'Quiz de génération de leads immobiliers',
        client: 'Eugenie Do — Courtière, Grand Montréal',
        desc: 'Quiz de correspondance de quartier avec pipeline CDP complet, réconciliation de profils et capture de leads respectueuse de la vie privée.',
        tags: ['CDP', 'Génération de leads', 'Flux e-mail'],
        slug: 'real-estate-quiz',
      },
    ],
    footer: 'Edgar · Automatisation Marketing · Montréal',
  },
}

export function detectLang() {
  const path = window.location.pathname.toLowerCase()
  if (/^\/(fr)(\/|$)/.test(path)) return 'fr'
  if (/^\/(en)(\/|$)/.test(path)) return 'en'
  const nav = (navigator.language || '').toLowerCase()
  if (nav.startsWith('fr')) return 'fr'
  return 'en'
}

export function detectPage() {
  const path = window.location.pathname.toLowerCase()
  if (/^\/(en|fr)\/projects\/[^/]+/.test(path)) return 'article'
  if (/^\/(en|fr)\/projects(\/|$)/.test(path)) return 'projects'
  return 'home'
}

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
      { icon: '🗂️', title: 'Portfolio', sub: 'Flows, CDP setups & campaigns', href: '#' },
      { icon: '📞', title: '20 Min Call — Book Now', sub: "Let's talk automation strategy", href: 'https://calendly.com/YOURLINK', featured: true },
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
      { icon: '🗂️', title: 'Portfolio', sub: 'Flows, CDP et campagnes réalisés', href: '#' },
      { icon: '📞', title: 'Appel 20 min — Réserver', sub: 'Parlons stratégie d\'automatisation', href: 'https://calendly.com/YOURLINK', featured: true },
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

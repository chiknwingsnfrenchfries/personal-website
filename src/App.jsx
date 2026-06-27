import { useState, useEffect, useRef } from 'react'
import { i18n, detectLang, detectPage } from './i18n'
import { useReveal } from './useReveal'
import ScrollExpand from './ScrollExpand'
import ArticlePage from './ArticlePage'

/* ─── FULL SCREEN MENU ─── */
function FullMenu({ open, onClose, lang, setLang, t }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function switchLang(l) {
    setLang(l)
    history.pushState({ lang: l }, '', `/${l}`)
    onClose()
  }

  return (
    <div className={`fullmenu ${open ? 'fullmenu--open' : ''}`}>
      <div className="fullmenu-inner">
        {/* top bar inside menu */}
        <div className="fullmenu-bar">
          <span className="fullmenu-wordmark">edgarramos.com</span>
          <button className="hamburger hamburger--close" onClick={onClose} aria-label="Close menu">
            <span /><span />
          </button>
        </div>

        {/* main nav links */}
        <nav className="fullmenu-nav">
          {t.links.map((l, i) => (
            <a
              key={i}
              className="fullmenu-link"
              href={l.href}
              style={{ transitionDelay: open ? `${i * 60 + 100}ms` : '0ms' }}
              {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
              onClick={(e) => {
                if (l.onClick) { e.preventDefault(); l.onClick() }
                else onClose()
              }}
            >
              <span className="fullmenu-link-num">0{i + 1}</span>
              {l.title}
              <span className="fullmenu-link-arrow">↗</span>
            </a>
          ))}
        </nav>

        {/* bottom: social + lang */}
        <div className="fullmenu-bottom">
          <div className="fullmenu-social">
            <a href="https://linkedin.com/in/YOURHANDLE" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://instagram.com/YOURHANDLE" target="_blank" rel="noopener">Instagram</a>
            <a href="https://bsky.app/profile/YOURHANDLE.bsky.social" target="_blank" rel="noopener">Bluesky</a>
            <a href="https://upscrolled.com/YOURHANDLE" target="_blank" rel="noopener">Upscrolled</a>
            <a href="https://www.youtube.com/@FlowsandFunnels" target="_blank" rel="noopener">YouTube</a>
          </div>
          <div className="fullmenu-lang">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => switchLang('en')}>EN</button>
            <span>/</span>
            <button className={lang === 'fr' ? 'active' : ''} onClick={() => switchLang('fr')}>FR</button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── NAV ─── */
function Nav({ onOpen }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
      <div className="site-nav-inner">
        <a href="/" className="site-wordmark">edgarramos.com</a>
        <button className="hamburger" onClick={onOpen} aria-label="Open menu">
          <span /><span />
        </button>
      </div>
    </header>
  )
}

/* ─── HERO ─── */
function Hero({ t }) {
  const eyebrowRef = useReveal(0)
  const nameRef    = useReveal(80)
  const avatarRef  = useReveal(160)
  const taglineRef = useReveal(240)
  const badgesRef  = useReveal(320)

  return (
    <section className="hero">
      <span ref={eyebrowRef} className="hero-eyebrow reveal">{t.greeting}</span>
      <span ref={nameRef} className="hero-name reveal">{t.name}</span>
      <div ref={avatarRef} className="avatar-wrap reveal">
        <div className="avatar-ring">
          {/* Replace with: <img src="/photo.jpg" alt="Edgar" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
          <span className="avatar-initial">E</span>
        </div>
      </div>
      <p ref={taglineRef} className="hero-tagline reveal"
        dangerouslySetInnerHTML={{ __html: t.tagline }} />
      <div ref={badgesRef} className="badge-row reveal">
        <span className="badge accent">{t.badgeRole}</span>
        <span className="badge">{t.badgeCity}</span>
      </div>
    </section>
  )
}

/* ─── WHAT I DO ─── */
function WhatIDo({ t }) {
  const eyebrowRef = useReveal(0)
  const titleRef   = useReveal(80)
  const pillsRef   = useReveal(160)
  return (
    <section className="section">
      <span ref={eyebrowRef} className="section-eyebrow reveal">{t.whatLabel}</span>
      <h2 ref={titleRef} className="section-title reveal" style={{ whiteSpace: 'pre-line' }}>{t.whatTitle}</h2>
      <div ref={pillsRef} className="pills reveal">
        {t.channels.map((c, i) => <span key={i} className="pill">{c}</span>)}
      </div>
    </section>
  )
}

/* ─── LINKS ─── */
function Links({ t }) {
  const eyebrowRef = useReveal(0)
  return (
    <section className="section">
      <span ref={eyebrowRef} className="section-eyebrow reveal">{t.linksLabel}</span>
      <div className="link-list">
        {t.links.map((l, i) => {
          const ref = useReveal(i * 60)
          const isExt = l.href.startsWith('http')
          if (l.onClick) {
            return (
              <a key={i} ref={ref}
                className={`link-row reveal ${l.featured ? 'featured' : ''}`}
                href="#" onClick={e => { e.preventDefault(); l.onClick() }}>
                <div className="link-left">
                  <div className="link-icon-wrap">{l.icon}</div>
                  <div className="link-text-wrap">
                    <div className="link-title">{l.title}</div>
                    <div className="link-sub">{l.sub}</div>
                  </div>
                </div>
                <span className="link-arrow">↗</span>
              </a>
            )
          }
          return (
            <a key={i} ref={ref}
              className={`link-row reveal ${l.featured ? 'featured' : ''}`}
              href={l.href}
              {...(isExt ? { target: '_blank', rel: 'noopener' } : {})}>
              <div className="link-left">
                <div className="link-icon-wrap">{l.icon}</div>
                <div className="link-text-wrap">
                  <div className="link-title">{l.title}</div>
                  <div className="link-sub">{l.sub}</div>
                </div>
              </div>
              <span className="link-arrow">↗</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}

/* ─── SOCIAL ─── */
function Social({ t }) {
  const ref = useReveal(0)
  return (
    <section className="section">
      <span className="section-eyebrow">{t.socialLabel}</span>
      <div ref={ref} className="social-row reveal">
        <a className="social-btn" href="https://linkedin.com/in/YOURHANDLE" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        <a className="social-btn" href="https://instagram.com/YOURHANDLE" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
        </a>
        <a className="social-btn" href="https://bsky.app/profile/YOURHANDLE.bsky.social" target="_blank" rel="noopener" aria-label="Bluesky">
          <svg width="17" height="17" viewBox="0 0 568 501" fill="currentColor"><path d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.209C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.463-7.327-3.615-10.751-3.631-7.847-.016-2.904-1.168.52-3.631 7.847-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.889-129.52 80.986-149.07-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.66 0 75.293 0 57.947 0-28.906 76.134-1.611 123.121 33.664Z"/></svg>
        </a>
        <a className="social-btn" href="https://upscrolled.com/YOURHANDLE" target="_blank" rel="noopener" aria-label="Upscrolled">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 11 12 6 7 11"/><polyline points="17 18 12 13 7 18"/></svg>
        </a>
        <a className="social-btn" href="https://www.youtube.com/@FlowsandFunnels" target="_blank" rel="noopener" aria-label="YouTube">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
      </div>
    </section>
  )
}

/* ─── ABOUT ME ─── */
function AboutMe({ t }) {
  const titleRef   = useReveal(0)
  const projectRef = useReveal(80)
  const musicRef   = useReveal(0)
  const booksRef   = useReveal(0)
  return (
    <section className="section">
      <span ref={titleRef} className="section-eyebrow reveal">{t.aboutLabel}</span>
      <div className="about-stack">
        <div className="about-block">
          <span className="about-label">{t.projectLabel}</span>
          <ScrollExpand>
            <a ref={projectRef} className="project-card reveal" href="https://edgarramos.com/en/portfolio/real-estate-quiz" target="_blank" rel="noopener noreferrer">
              <div className="project-emoji">🏡</div>
              <div>
                <div className="project-name">Real estate quiz</div>
                <div className="project-desc">Your best neighbourhood match — Greater Montréal</div>
                <span className="project-badge">{t.projectStatus}</span>
              </div>
            </a>
          </ScrollExpand>
        </div>
        <div className="about-block">
          <span className="about-label">{t.musicLabel}</span>
          <div ref={musicRef} className="music-embed reveal">
            <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0" height="175"
              style={{ width: '100%', overflow: 'hidden', borderRadius: '10px' }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/us/song/solifican12/1839970298" />
          </div>
        </div>
        <div className="about-block">
          <span className="about-label">{t.booksLabel}</span>
          <div ref={booksRef} className="book-list reveal">
            <a className="book-card" href="https://www.goodreads.com/book/show/123857637" target="_blank" rel="noopener">
              <ScrollExpand>
                <img className="book-cover"
                  src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1680014152i/123857637.jpg"
                  alt="Never Split the Difference" />
              </ScrollExpand>
              <div>
                <div className="book-title">Never Split the Difference</div>
                <div className="book-author">Chris Voss</div>
                <span className="book-status">{t.currentlyReading}</span>
              </div>
            </a>
            <a className="book-card" href="https://www.goodreads.com/book/show/17274667" target="_blank" rel="noopener">
              <ScrollExpand>
                <img className="book-cover"
                  src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1379621430i/17274667.jpg"
                  alt="Metro 2033" />
              </ScrollExpand>
              <div>
                <div className="book-title">Metro 2033</div>
                <div className="book-author">Dmitry Glukhovsky</div>
                <span className="book-status next">{t.readingNext}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── NEWSLETTER ─── */
function Newsletter({ t }) {
  const ref = useReveal(0)
  return (
    <section className="section">
      <span className="section-eyebrow">{t.formLabel}</span>
      <div ref={ref} className="form-wrap reveal">
        <p className="form-desc">{t.formDesc}</p>
        <input className="form-input" type="text" placeholder={t.namePlaceholder} />
        <input className="form-input" type="email" placeholder={t.emailPlaceholder} />
        <button className="form-submit">{t.submitLabel}</button>
      </div>
    </section>
  )
}

/* ─── FOOTER ─── */
function Footer({ t }) {
  return (
    <footer className="footer">
      <span className="footer-name">{t.footer}</span>
      <span className="footer-name" style={{ color: '#e8410a' }}>©{new Date().getFullYear()}</span>
    </footer>
  )
}

/* ─── PORTFOLIO LISTING ─── */
function PortfolioPage({ t, onCardClick }) {
  return (
    <div className="site-wrap" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 16,
      }}>
        {t.portfolioEyebrow}
      </span>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 10vw, 60px)',
        fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em',
        color: 'var(--ink)', marginBottom: 56,
      }}>
        Portfolio
      </h1>
      <div className="portfolio-grid">
        {t.portfolioProjects.map((project, i) => (
          <button key={i} className="portfolio-card" onClick={() => onCardClick(project.slug)}>
            <div className="portfolio-card-title">{project.title}</div>
            <div className="portfolio-card-client">{project.client}</div>
            <div className="portfolio-card-desc">{project.desc}</div>
            <div className="portfolio-card-footer">
              <div className="portfolio-card-tags">
                {project.tags.map((tag, j) => (
                  <span key={j} className="portfolio-tag">{tag}</span>
                ))}
              </div>
              <span className="portfolio-card-arrow">↗</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── APP ─── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState(() => {
    const redirectPath = sessionStorage.getItem('redirectPath')
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath')
      history.replaceState(null, '', redirectPath)
    }
    return detectLang()
  })
  const [page, setPage] = useState(() => detectPage())

  const t = i18n[lang]

  function goToPortfolio() {
    setPage('portfolio')
    setMenuOpen(false)
    history.pushState({ page: 'portfolio', lang }, '', `/${lang}/portfolio`)
    window.scrollTo(0, 0)
  }

  function goToArticle(slug) {
    setPage('article')
    history.pushState({ page: 'article', slug, lang }, '', `/${lang}/portfolio/${slug}`)
    window.scrollTo(0, 0)
  }

  function goHome() {
    setPage('home')
    history.pushState({ page: 'home', lang }, '', `/${lang}`)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = page === 'article'
      ? 'Lead Gen Quiz — Edgar Ramos'
      : page === 'portfolio'
      ? 'Portfolio — Edgar Ramos'
      : lang === 'fr' ? 'Edgar — Automatisation Marketing' : 'Edgar — Marketing Automation'
    const path = window.location.pathname
    if (!/^\/(en|fr)(\/|$)/.test(path)) {
      history.replaceState({ lang }, '', `/${lang}`)
    }
  }, [lang, page])

  useEffect(() => {
    const onPop = (e) => {
      if (e.state?.page === 'article') setPage('article')
      else if (e.state?.page === 'portfolio') setPage('portfolio')
      else { setPage('home'); if (e.state?.lang) setLang(e.state.lang) }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const tWithNav = {
    ...t,
    links: t.links.map(l =>
      l.title === 'Portfolio'
        ? { ...l, onClick: goToPortfolio }
        : l
    ),
  }

  if (page === 'article') {
    return (
      <>
        <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} lang={lang} setLang={setLang} t={tWithNav} />
        <Nav onOpen={() => setMenuOpen(true)} />
        <ArticlePage onBack={goToPortfolio} />
      </>
    )
  }

  if (page === 'portfolio') {
    return (
      <>
        <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} lang={lang} setLang={setLang} t={tWithNav} />
        <Nav onOpen={() => setMenuOpen(true)} />
        <PortfolioPage t={t} onCardClick={goToArticle} />
      </>
    )
  }

  return (
    <>
      <FullMenu open={menuOpen} onClose={() => setMenuOpen(false)} lang={lang} setLang={setLang} t={tWithNav} />
      <Nav onOpen={() => setMenuOpen(true)} />
      <div className="site-wrap">
        <Hero t={t} />
        <WhatIDo t={t} />
        <Links t={tWithNav} />
        <Social t={t} />
        <AboutMe t={t} />
        <Newsletter t={t} />
        <Footer t={t} />
      </div>
    </>
  )
}

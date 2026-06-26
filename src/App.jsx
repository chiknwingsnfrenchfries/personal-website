import { useState, useEffect } from 'react'
import { i18n, detectLang } from './i18n'
import { useReveal } from './useReveal'
import ScrollExpand from './ScrollExpand'

/* ─── TICKER ─── */
function Ticker({ t }) {
  const items = [...t.channels, ...t.channels]
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((c, i) => (
          <span key={i}>{i % 2 === 0 ? c : <><span className="dot">✦</span>{c}</>}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── NAV ─── */
function Nav({ lang, setLang }) {
  function switchLang(l) {
    setLang(l)
    history.pushState({ lang: l }, '', `/${l}`)
  }
  return (
    <nav className="nav">
      <span className="nav-name">Edgar Ramos</span>
      <div className="lang-toggle">
        <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => switchLang('en')}>EN</button>
        <button className={`lang-btn ${lang === 'fr' ? 'active' : ''}`} onClick={() => switchLang('fr')}>FR</button>
      </div>
    </nav>
  )
}

/* ─── HERO ─── */
function Hero({ t }) {
  const eyebrowRef = useReveal(0)
  const nameRef = useReveal(80)
  const avatarRef = useReveal(160)
  const taglineRef = useReveal(240)
  const badgesRef = useReveal(320)

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
      <p
        ref={taglineRef}
        className="hero-tagline reveal"
        dangerouslySetInnerHTML={{ __html: t.tagline }}
      />
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
  const titleRef = useReveal(80)
  const pillsRef = useReveal(160)

  return (
    <section className="section">
      <span ref={eyebrowRef} className="section-eyebrow reveal">{t.whatLabel}</span>
      <h2 ref={titleRef} className="section-title reveal" style={{ whiteSpace: 'pre-line' }}>{t.whatTitle}</h2>
      <div ref={pillsRef} className="pills reveal">
        {t.channels.map((c, i) => (
          <span key={i} className="pill">{c}</span>
        ))}
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
          return (
            <a
              key={i}
              ref={ref}
              className={`link-row reveal ${l.featured ? 'featured' : ''}`}
              href={l.href}
              {...(isExt ? { target: '_blank', rel: 'noopener' } : {})}
            >
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
        {/* LinkedIn */}
        <a className="social-btn" href="https://linkedin.com/in/YOURHANDLE" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
        {/* Instagram */}
        <a className="social-btn" href="https://instagram.com/YOURHANDLE" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
        </a>
        {/* Bluesky */}
        <a className="social-btn" href="https://bsky.app/profile/YOURHANDLE.bsky.social" target="_blank" rel="noopener" aria-label="Bluesky">
          <svg width="17" height="17" viewBox="0 0 568 501" fill="currentColor"><path d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.209C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.463-7.327-3.615-10.751-3.631-7.847-.016-2.904-1.168.52-3.631 7.847-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.889-129.52 80.986-149.07-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.66 0 75.293 0 57.947 0-28.906 76.134-1.611 123.121 33.664Z"/></svg>
        </a>
        {/* Upscrolled */}
        <a className="social-btn" href="https://upscrolled.com/YOURHANDLE" target="_blank" rel="noopener" aria-label="Upscrolled">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 11 12 6 7 11"/><polyline points="17 18 12 13 7 18"/></svg>
        </a>
        {/* GitHub */}
        <a className="social-btn" href="https://github.com/chiknwingsnfrenchfries" target="_blank" rel="noopener" aria-label="GitHub">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
        </a>
        {/* YouTube */}
        <a className="social-btn" href="https://www.youtube.com/@FlowsandFunnels" target="_blank" rel="noopener" aria-label="YouTube">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
      </div>
    </section>
  )
}

/* ─── MORE ABOUT ME ─── */
function AboutMe({ t }) {
  const titleRef = useReveal(0)
  const projectRef = useReveal(80)
  const musicRef = useReveal(0)
  const booksRef = useReveal(0)

  return (
    <section className="section">
      <span ref={titleRef} className="section-eyebrow reveal">{t.aboutLabel}</span>
      <div className="about-stack">

        {/* PROJECT */}
        <div className="about-block">
          <span className="about-label">{t.projectLabel}</span>
          <ScrollExpand>
            <div ref={projectRef} className="project-card reveal">
              <div className="project-emoji">🏡</div>
              <div>
                <div className="project-name">Real estate quiz</div>
                <div className="project-desc">Your best neighbourhood match — Greater Montréal</div>
                <span className="project-badge">{t.projectStatus}</span>
              </div>
            </div>
          </ScrollExpand>
        </div>

        {/* MUSIC */}
        <div className="about-block">
          <span className="about-label">{t.musicLabel}</span>
          <div ref={musicRef} className="music-embed reveal">
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="175"
              style={{ width: '100%', overflow: 'hidden', borderRadius: '10px' }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src="https://embed.music.apple.com/us/song/solifican12/1839970298"
            />
          </div>
        </div>

        {/* BOOKS */}
        <div className="about-block">
          <span className="about-label">{t.booksLabel}</span>
          <div ref={booksRef} className="book-list reveal">
            <a className="book-card" href="https://www.goodreads.com/book/show/123857637" target="_blank" rel="noopener">
              <ScrollExpand>
                <img
                  className="book-cover"
                  src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1680014152i/123857637.jpg"
                  alt="Never Split the Difference"
                />
              </ScrollExpand>
              <div>
                <div className="book-title">Never Split the Difference</div>
                <div className="book-author">Chris Voss</div>
                <span className="book-status">{t.currentlyReading}</span>
              </div>
            </a>
            <a className="book-card" href="https://www.goodreads.com/book/show/17274667" target="_blank" rel="noopener">
              <ScrollExpand>
                <img
                  className="book-cover"
                  src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1379621430i/17274667.jpg"
                  alt="Metro 2033"
                />
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

/* ─── APP ─── */
export default function App() {
  const [lang, setLang] = useState(() => {
    // Check sessionStorage for GitHub Pages 404 redirect
    const redirectPath = sessionStorage.getItem('redirectPath')
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath')
      history.replaceState(null, '', redirectPath)
    }
    return detectLang()
  })

  const t = i18n[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = lang === 'fr' ? 'Edgar — Automatisation Marketing' : 'Edgar — Marketing Automation'
    // Push clean URL if not already set
    const path = window.location.pathname
    if (!/^\/(en|fr)(\/|$)/.test(path)) {
      history.replaceState({ lang }, '', `/${lang}`)
    }
  }, [lang])

  // Handle back/forward
  useEffect(() => {
    function onPop(e) {
      if (e.state?.lang) setLang(e.state.lang)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <>
      <Ticker t={t} />
      <div className="site-wrap">
        <Nav lang={lang} setLang={setLang} />
        <Hero t={t} />
        <WhatIDo t={t} />
        <Links t={t} />
        <Social t={t} />
        <AboutMe t={t} />
        <Newsletter t={t} />
        <Footer t={t} />
      </div>
    </>
  )
}

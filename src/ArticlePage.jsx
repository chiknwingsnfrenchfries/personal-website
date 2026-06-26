import { useState, useEffect } from 'react'

/* ─── INTERACTIVE DIAGRAM ─── */
const sharedSteps = [
  {
    icon: '🌐',
    title: 'Visitor lands on the quiz',
    tag: 'Anonymous',
    detail: 'A random session ID is created instantly. No name, no email, no IP address. Just a number like #a3f92c.',
  },
  {
    icon: '📋',
    title: 'They answer questions',
    tag: 'Anonymous',
    detail: 'Each answer is recorded under that session ID — which question, which answer, which lifestyle axis. Nothing personal.',
  },
  {
    icon: '📊',
    title: 'Behaviour goes into the warehouse',
    tag: 'Stored anonymously',
    detail: 'Drop-off points, time spent, completion rate. Stored anonymously. Useful for improving the quiz, invisible as a person.',
  },
]

const consentedStep = {
  icon: '📡',
  title: 'Ad platforms get the signal',
  tag: 'Ad platforms notified',
  detail: 'Because this visitor accepted marketing cookies, Facebook and Google are notified that someone visited and engaged with the quiz. No personal identity is shared — just the behavioural signal.',
  last: true,
}

const declinedStep = {
  icon: '🚫',
  title: 'Ad platforms get nothing',
  tag: 'Ad platforms blocked',
  tagAccent: true,
  detail: 'Because this visitor declined marketing cookies, Facebook and Google receive zero data about them. Full stop.',
  last: true,
}

const convertSteps = [
  { icon: '🌐', title: 'Visitor lands on the quiz', tag: 'Anonymous', detail: 'Same as before: a random session ID is created. All their actions are recorded anonymously from the start.' },
  { icon: '🧩', title: 'They complete all 13 questions', tag: 'Anonymous', detail: 'Every answer is tracked. Their neighbourhood match is calculated across 9 lifestyle axes. Their top 5 results appear.' },
  { icon: '📝', title: 'They submit the contact form', tag: 'Identity revealed', detail: 'Name, email, optional phone. The moment this hits the database, the identity stitch fires.' },
  { icon: '🔗', title: 'Session ID links to their email', tag: 'Profile reconciliation', tagPurple: true, detail: 'Every anonymous event from step one — page view, every answer, quiz completion — is now retroactively tied to a real person.' },
  { icon: '📬', title: 'Two emails fire automatically', tag: 'Instant', tagGreen: true, detail: 'Eugenie gets a lead notification with full context. The visitor gets a personalized confirmation in their language.' },
  { icon: '📡', title: 'Ad platforms get the signal', tag: 'If consented', detail: 'If the visitor accepted marketing cookies, Facebook and Google receive a conversion event to improve future campaign targeting.' },
]

function Step({ step, isLast }) {
  const tagStyle = step.tagPurple
    ? { background: 'rgba(124,58,237,0.08)', color: '#7C3AED', border: '1px solid rgba(124,58,237,0.2)' }
    : step.tagGreen
    ? { background: 'rgba(22,163,74,0.08)', color: '#16A34A', border: '1px solid rgba(22,163,74,0.2)' }
    : step.tagAccent
    ? { background: 'rgba(232,65,10,0.08)', color: '#e8410a', border: '1px solid rgba(232,65,10,0.2)' }
    : { background: 'rgba(17,17,16,0.05)', color: 'var(--muted)', border: '1px solid var(--rule)' }

  return (
    <div style={{ display: 'flex', gap: 16, position: 'relative' }}>
      {!isLast && (
        <div style={{
          position: 'absolute', left: 19, top: 44, width: 1,
          bottom: -12, background: 'var(--rule)', zIndex: 0,
        }} />
      )}
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '1px solid var(--rule)', background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 17, flexShrink: 0, zIndex: 1, position: 'relative',
      }}>
        {step.icon}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 24, flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', marginBottom: 6, fontFamily: 'var(--font-body)' }}>
          {step.title}
        </div>
        <span style={{
          ...tagStyle,
          fontFamily: 'var(--font-mono)', fontSize: 9,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          borderRadius: 4, padding: '3px 8px',
          display: 'inline-block', marginBottom: 8,
        }}>
          {step.tag}
        </span>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
          {step.detail}
        </p>
      </div>
    </div>
  )
}

function Diagram() {
  const [tab, setTab] = useState('anonymous')
  const [consented, setConsented] = useState(true)

  const anonSteps = [...sharedSteps, consented ? consentedStep : declinedStep]
  const tabs = [
    { id: 'anonymous', label: 'Anonymous visitor' },
    { id: 'convert', label: 'Visitor who converts' },
    { id: 'data', label: 'What the data looks like' },
  ]

  return (
    <div style={{
      background: 'var(--surface, #eceae6)',
      border: '1px solid var(--rule)',
      borderRadius: 16,
      padding: '28px 20px 32px',
      margin: '40px 0',
    }}>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.6 }}>
        The interactive diagram below shows how each type of visitor flows through the system, and what the data looks like on each end.
      </p>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '9px 14px', borderRadius: 8,
            border: '1px solid ' + (tab === t.id ? 'var(--ink)' : 'var(--rule)'),
            cursor: 'pointer', fontSize: 12, fontWeight: 500,
            fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', flexShrink: 0,
            background: tab === t.id ? 'var(--ink)' : 'var(--bg)',
            color: tab === t.id ? '#f4f3f0' : 'var(--muted)',
            transition: 'all 0.15s',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Anonymous visitor tab */}
      {tab === 'anonymous' && (
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
            Engaged with the quiz but never submitted the contact form
          </div>

          {/* Consent toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--bg)', border: '1px solid var(--rule)', borderRadius: 10, padding: 4, marginBottom: 16, width: 'fit-content' }}>
            <button onClick={() => setConsented(true)} style={{
              padding: '7px 14px', borderRadius: 7, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-body)',
              background: consented ? 'var(--ink)' : 'transparent',
              color: consented ? '#f4f3f0' : 'var(--muted)',
              transition: 'all 0.15s',
            }}>Accepted cookies</button>
            <button onClick={() => setConsented(false)} style={{
              padding: '7px 14px', borderRadius: 7, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-body)',
              background: !consented ? '#e8410a' : 'transparent',
              color: !consented ? '#fff' : 'var(--muted)',
              transition: 'all 0.15s',
            }}>Declined cookies</button>
          </div>

          <div style={{
            borderRadius: 8, padding: '10px 14px', marginBottom: 24,
            background: consented ? 'rgba(17,17,16,0.04)' : 'rgba(232,65,10,0.06)',
            border: '1px solid ' + (consented ? 'var(--rule)' : 'rgba(232,65,10,0.2)'),
            fontSize: 13, lineHeight: 1.55,
            color: consented ? 'var(--muted)' : '#e8410a',
          }}>
            {consented
              ? 'The first 3 steps are identical regardless of consent. What changes is the last step: whether ad platforms receive a signal.'
              : 'Even without consent, anonymous behavioural data still reaches the warehouse. Ad platforms are the only thing that changes.'}
          </div>

          <div>
            {anonSteps.map((step, i) => (
              <Step key={i} step={step} isLast={i === anonSteps.length - 1} />
            ))}
          </div>
        </div>
      )}

      {/* Convert tab */}
      {tab === 'convert' && (
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>
            Completes the quiz and submits the contact form
          </div>
          <div>
            {convertSteps.map((step, i) => (
              <Step key={i} step={step} isLast={i === convertSteps.length - 1} />
            ))}
          </div>
          <div style={{
            background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 12, padding: 20, marginTop: 24,
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>🔗</span>
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#7C3AED', marginBottom: 6 }}>What profile reconciliation means in practice</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
                Sophie found the quiz through an Instagram ad on May 14th, completed all 13 questions, and got Lorraine as her top match. She didn't submit the form. The next day she came back, took the quiz again, and got Saint-Lambert. She liked that result and filled out the form. Without profile reconciliation, you see a new lead interested in Saint-Lambert. With it, you see someone who reconsidered overnight, re-did the quiz, and only reached out once the result changed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Data tab */}
      {tab === 'data' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Converting visitor */}
          <div style={{ border: '1px solid var(--rule)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>
              🏷️ Converting visitor — what we know
            </div>
            {[
              ['Name', 'Sophie Tremblay'], ['Email', 'sophie@gmail.com'], ['Phone', '+1 514 555 0192'],
              ['Top match', 'Saint-Lambert (84%)'], ['Previous match', 'Lorraine (session 1)'],
              ['Quiz attempts', '2 (May 14 + May 15)'], ['Language', 'French'],
              ['Came from', 'Facebook ad, May carousel'], ['Campaign', 'southshore_fr_may2026'],
              ['Quiz completed', 'Yes, all 13 questions'], ['Marketing consent', 'Yes'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '8px 12px', background: 'var(--bg)', borderRadius: 6, marginBottom: 6, fontSize: 13 }}>
                <span style={{ color: 'var(--muted)', flexShrink: 0 }}>{k}</span>
                <span style={{ color: 'var(--ink)', fontWeight: 500, textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Anonymous visitor */}
          <div style={{ border: '1px solid var(--rule)', borderRadius: 12, padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>
              🔒 Anonymous visitor — what we know
            </div>
            {[
              ['Session ID', '#a3f92c (random)'], ['Name', 'Unknown'], ['Email', 'Unknown'],
              ['Dropped off at', 'Question 9'], ['Language', 'French'],
              ['Came from', 'Organic (no UTM)'], ['Quiz completed', 'No'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '8px 12px', background: 'var(--bg)', borderRadius: 6, marginBottom: 6, fontSize: 13 }}>
                <span style={{ color: 'var(--muted)', flexShrink: 0 }}>{k}</span>
                <span style={{ color: 'var(--ink)', fontWeight: 500, textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(17,17,16,0.04)', border: '1px solid var(--rule)', borderRadius: 12, padding: 16, fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--ink)' }}>The key insight:</strong> the anonymous visitor data is still useful. It tells you how many people drop off at question 9, what percentage start the quiz but never finish, and whether French-language visitors behave differently to English ones. You never know who those people are, and you don't need to.
          </div>
        </div>
      )}

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)', textAlign: 'center', marginTop: 20 }}>
        Built for quiz.eugeniedo.com — neighbourhood-matching quiz, Greater Montréal
      </p>
    </div>
  )
}

/* ─── ARTICLE PAGE ─── */
export default function ArticlePage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="site-wrap" style={{ paddingTop: 80, paddingBottom: 80 }}>

      <button onClick={onBack} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'var(--muted)', background: 'none',
        border: 'none', cursor: 'pointer', padding: 0, marginBottom: 48,
        transition: 'color 0.2s',
      }}
        onMouseOver={e => e.currentTarget.style.color = 'var(--ink)'}
        onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}
      >
        ← Back
      </button>

      {/* Eyebrow */}
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 16,
      }}>
        Case Study
      </span>

      {/* Title */}
      <h1 style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 6vw, 38px)',
        fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em',
        color: 'var(--ink)', marginBottom: 24,
      }}>
        I Built a Lead Generation Quiz for a Real Estate Agent. Here's What Most People Miss About the Tech Behind It.
      </h1>

      {/* Lead */}
      <p style={{
        fontSize: 17, color: 'var(--muted)', lineHeight: 1.75,
        marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid var(--rule)',
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
      }}>
        Most lead generation tools collect a name and an email and stop there. You get a spreadsheet row. Maybe a notification. And then you're left guessing who that person actually is, where they came from, and whether they're worth calling back.
      </p>

      <Article />
    </div>
  )
}

function Article() {
  const p = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 18 }
  const h2 = {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 5vw, 26px)',
    fontWeight: 600, color: 'var(--ink)', margin: '52px 0 16px',
    letterSpacing: '-0.01em', lineHeight: 1.2,
  }

  return (
    <>
      <p style={p}>For a real estate project I worked on with Eugenie Do, a residential broker covering the Greater Montreal area, we built a neighbourhood-matching quiz that captures leads in a more useful way. A buyer answers 13 lifestyle questions and gets matched to the Greater Montreal neighbourhoods that best fit how they actually live. At the end, they can fill out a short form to get in touch with Eugenie directly.</p>
      <p style={p}>That part is the lead magnet. But the interesting part is what happens in the background, with every visitor, before anyone fills out a form.</p>

      <h2 style={h2}>The Blind Spot Most Businesses Have</h2>
      <p style={p}>Most contact forms and lead tools only know about a person once they decide to identify themselves. Everything before that is a black box. You don't know where they came from, how long they spent, or why they left without submitting. And if they do leave, they're gone completely.</p>
      <p style={p}>The other problem is that your tools don't talk to each other. Your analytics knows about page views. Your CRM knows about form submissions. Your ad platform knows about clicks. None of them share a single picture of the same person moving through all three.</p>
      <p style={p}>This is what a Customer Data Platform, or CDP, solves.</p>

      <h2 style={h2}>What a CDP Does (Without the Jargon)</h2>
      <p style={p}>A CDP sits in the middle of all your tools and records every meaningful action a visitor takes, from the first page load onward. Each action gets tagged with an anonymous ID the moment someone arrives, before they've told you anything about themselves.</p>
      <p style={p}>When they eventually submit a form, the CDP links their email to that anonymous ID. Every action they took before identifying themselves is now retroactively attached to a real person in your database. This is called profile reconciliation, and it's where things get genuinely useful.</p>
      <p style={p}>Take Sophie Tremblay. She found the quiz through an Instagram ad on May 14th, went through all 13 questions, and got Lorraine as her top match. She didn't submit the form. The next day she came back, took the quiz again, and this time got Saint-Lambert. That one she liked. She filled out the form and reached out.</p>
      <p style={p}>Without a CDP, you see a new lead named Sophie who's interested in Saint-Lambert. With one, you know she originally matched Lorraine, thought about it overnight, came back and re-did the quiz, and only reached out once the result changed. That's a completely different conversation to have with a client.</p>

      <h2 style={h2}>How This Works With Privacy Consent</h2>
      <p style={p}>This setup is built to respect privacy laws in Canada and Europe. Visitors who decline cookies are still tracked, but only with a random session ID and no personal information whatsoever. There is no way to connect that data to a real individual. Visitors who accept cookies and submit the form get their session linked to their identity. Ad platforms like Facebook and Google only receive data from visitors who explicitly accepted marketing cookies. The diagram below shows exactly how each path works.</p>

      <Diagram />

      <h2 style={h2}>Who This Is For</h2>
      <p style={p}>You don't need to be a real estate broker to benefit from this kind of setup. Any service business with a longer sales cycle, where people visit multiple times before committing, stands to gain a lot from knowing the full story before picking up the phone.</p>
      <p style={p}>The quiz format works particularly well when lead quality matters more than lead volume. But the data infrastructure underneath it applies to contact forms, booking tools, calculators, and waitlists just as well.</p>
      <p style={p}>If you want to understand what this could look like for your business, I'm happy to walk through it.</p>

      <div style={{
        background: 'rgba(17,17,16,0.04)', border: '1px solid var(--rule)',
        borderRadius: 12, padding: '24px 20px', marginTop: 48,
      }}>
        <p style={{ ...p, marginBottom: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16 }}>
          Reach out through the site and we can set up a call. No pitch, just a conversation about whether it makes sense for what you're building.
        </p>
      </div>
    </>
  )
}

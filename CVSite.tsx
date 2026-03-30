'use client';

import React, { useEffect } from 'react';

/* ─────────────── styles ─────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  .cv-root {
    font-family: 'DM Sans', system-ui, sans-serif;
    background: #0a0a0b;
    color: #e8e4df;
    min-height: 100vh;
    position: relative;
  }

  .font-display { font-family: 'Instrument Serif', Georgia, serif; }

  /* noise overlay */
  .cv-root::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 200;
    opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
  }

  /* fade-in on scroll */
  .fade-target {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .fade-target.in-view { opacity: 1; transform: translateY(0); }

  /* hero entrance */
  .hero-enter {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .hero-enter.visible { opacity: 1; transform: translateY(0); }

  /* card hover lift */
  .card-lift {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.4s ease,
                background-color 0.35s ease;
  }
  .card-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px -15px rgba(0,0,0,0.55);
  }

  /* accent underline expand */
  .accent-line {
    width: 0;
    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .in-view .accent-line { width: 3.5rem; }

  /* profile slow zoom */
  .profile-img {
    transition: transform 6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .profile-card:hover .profile-img { transform: scale(1.04); }

  /* nav */
  .cv-nav {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(10,10,11,0.82);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    height: 3.5rem;
  }
  .cv-nav-inner {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 2.5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cv-nav-links {
    display: flex;
    gap: 2rem;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(232,228,223,0.45);
  }
  .cv-nav-links a {
    text-decoration: none;
    transition: color 0.2s;
    color: inherit;
  }
  .cv-nav-links a:hover { color: #2dd4bf; }

  /* layout */
  .cv-container {
    max-width: 80rem;
    margin: 0 auto;
    padding: 0 2.5rem;
    width: 100%;
  }
  .cv-section { padding: 5rem 0; }
  .cv-section-border { border-top: 1px solid rgba(255,255,255,0.05); }

  /* section header */
  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }
  .section-label {
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: rgba(45,212,191,0.65);
  }

  /* hero grid */
  .hero-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 4rem;
    align-items: center;
  }

  /* experience cards grid */
  .exp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  /* education grid */
  .edu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }

  /* skills grid */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  /* awards grid */
  .awards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  /* tag pill */
  .tag-teal {
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(45,212,191,0.2);
    background: rgba(45,212,191,0.07);
    border-radius: 9999px;
    padding: 0.2rem 0.75rem;
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    color: rgba(134,239,220,0.9);
  }
  .tag-muted {
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    border-radius: 9999px;
    padding: 0.2rem 0.75rem;
    font-size: 0.72rem;
    color: rgba(232,228,223,0.5);
  }

  /* responsive */
  @media (max-width: 1024px) {
    .hero-grid { grid-template-columns: 1fr; }
    .hero-image-col { display: none; }
    .exp-grid { grid-template-columns: 1fr; }
    .edu-grid { grid-template-columns: 1fr 1fr; }
    .awards-grid { grid-template-columns: 1fr; }
    .cv-nav-links { display: none; }
  }
  @media (max-width: 768px) {
    .cv-container { padding: 0 1.5rem; }
    .cv-section { padding: 3.5rem 0; }
    .hero-h1 { font-size: 3rem !important; }
    .edu-grid { grid-template-columns: 1fr; }
    .skills-grid { grid-template-columns: 1fr; }
    .stats-row { flex-direction: column; gap: 1rem !important; }
    .cta-row { flex-direction: column; }
    .cta-row a { text-align: center; justify-content: center; }
  }
`;

/* ─────────────── data ─────────────── */
const EXPERIENCES = [
  {
    title: 'Co-Founder',
    company: 'FUTECH',
    location: 'Jeddah, Saudi Arabia & Shenzhen, China',
    period: 'Jan 2025 – Present',
    bullets: [
      'Conducted 20+ stakeholder interviews and analyzed 140+ survey responses; synthesized findings into prioritized customer needs and refined go-to-market strategy',
      'Secured 5 pilot partnerships (football clubs/academies + FIFA research lab) by drafting and negotiating LOIs',
      'Built a hardware product with an analytical dashboard',
    ],
    tag: 'Startup',
    current: true,
  },
  {
    title: 'President',
    company: 'UW-Madison Saudi Alumni Chapter',
    location: 'Saudi Arabia & Madison, WI',
    period: 'June 2025 – Present',
    bullets: [
      'Founded and led the first chapter for all UW-Madison graduates in Saudi Arabia',
      'Managing & leading a team of 6 for events tailored to 300+ people',
    ],
    tag: 'Leadership',
    current: true,
  },
  {
    title: 'Strategy Consultant',
    company: 'Tamara (BNPL)',
    location: 'Jeddah, Saudi Arabia',
    period: 'Dec 2025 – Jan 2026',
    bullets: [
      'Built executive strategy case assessing a new personal loans product: market sizing, scenario modeling, risk analysis, competitive benchmarking, and GTM recommendations',
      'Synthesized findings into a concise executive deck',
    ],
    tag: 'Consulting',
    current: false,
  },
  {
    title: 'Design Thinking Workshop Lead',
    company: 'SANA Smart City Hackathon',
    location: 'Makkah, Saudi Arabia',
    period: 'May 2025',
    bullets: [
      'Delivered workshops on ideation, stakeholder analysis, and market research',
      'Mentored 40 teams (150+ participants)',
    ],
    tag: 'Facilitation',
    current: false,
  },
  {
    title: 'AI Intern',
    company: 'PBS Wisconsin',
    location: 'Madison, WI',
    period: 'Feb – May 2024',
    bullets: [
      'Built an AI transcription workflow, reducing manual effort by 50% per batch and improving ops throughput',
      'Produced operations playbook for editorial and engineering teams',
    ],
    tag: 'AI / ML',
    current: false,
  },
  {
    title: 'Sustainability Research Intern',
    company: 'KAUST',
    location: 'Thuwal, Saudi Arabia',
    period: 'Jun – Aug 2023',
    bullets: [
      'Led data analysis & computational modeling of urban thermal discomfort in Arabian cities',
      'Co-authored peer-reviewed article; translated findings into policy-relevant insights',
    ],
    tag: 'Research',
    current: false,
  },
  {
    title: 'Big Data Research Intern',
    company: 'University of Washington',
    location: 'Seattle, WA',
    period: 'Jul – Aug 2022',
    bullets: [
      'Analyzed ~5M wearable/smartphone data points from 272 students; engineered features and built models exploring behavior–wellbeing relationships',
    ],
    tag: 'Research',
    current: false,
  },
];

const EDUCATION = [
  {
    school: 'King Abdullah University of Science & Technology',
    abbr: 'KAUST',
    degree: 'MSc. Technology, Innovation & Entrepreneurship',
    period: '2024 – 2026',
    detail: 'Thuwal, Saudi Arabia',
  },
  {
    school: 'University of Wisconsin–Madison',
    abbr: 'UW–Madison',
    degree: 'B.S. Computer Science',
    period: '2020 – 2024',
    detail: 'Madison, WI, United States',
  },
  {
    school: 'Prince Mohammed Bin Salman College',
    abbr: 'MBSC',
    degree: 'Certificate in Venture Building',
    period: '2025',
    detail: 'Saudi Arabia',
  },
];

const SKILLS: Record<string, string[]> = {
  'Analytics & Tech': [
    'AI', 'Machine Learning', 'Computer Vision', 'Big Data',
    'Prototyping', 'Product Design', 'Systems Design', 'Hardware',
  ],
  'Business': [
    'Market Research', 'Market Sizing', 'Partnership Strategy',
    'Pitch Decks', 'Startups', 'Strategy',
    'Workshop Facilitation', 'Stakeholder Interviews', 'Structured Problem Framing',
  ],
  'Languages': [
    'Arabic — Native', 'English — Fluent', 'Mandarin — Beginner',
  ],
};

const AWARDS = [
  {
    title: 'KGSP Scholar',
    subtitle: 'King Abdullah Gifted Students Program',
    body: 'Prestigious scholarship for the top 0.1% of Saudi students to pursue STEM degrees at elite global universities. Also selected as a Program Ambassador.',
    tag: 'Scholarship',
    icon: '★',
  },
  {
    title: 'Peer-Reviewed Publication',
    subtitle: 'Scientific Reports (Nature Portfolio)',
    body: 'Co-authored research on urban thermal discomfort in Arabian cities; published in 2023. Translated complex computational findings into sustainable, policy-relevant insights.',
    tag: 'Publication',
    icon: '◆',
  },
];

/* ─────────────── hook ─────────────── */
function useFadeIn() {
  useEffect(() => {
    const targets = document.querySelectorAll('.fade-target');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────── component ─────────────── */
export default function CVSite() {
  useFadeIn();

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.hero-enter').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 180);
      });
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="cv-root">
      <style>{STYLES}</style>

      {/* ── Navigation ── */}
      <nav className="cv-nav">
        <div className="cv-nav-inner">
          <span
            className="font-display"
            style={{ fontSize: '1.05rem', color: 'rgba(232,228,223,0.9)' }}
          >
            Abdullah Aldossary
          </span>
          <div className="cv-nav-links">
            {['Experience', 'Education', 'Skills', 'Awards', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Background atmosphere ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 10% 0%, rgba(45,212,191,0.07), transparent), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(251,191,36,0.04), transparent)',
        }}
      />

      {/* ── Hero ── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '3.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="cv-container" style={{ padding: '5rem 2.5rem' }}>
          <div className="hero-grid">
            {/* Left column */}
            <div className="hero-enter" style={{ transitionDelay: '0.05s' }}>
              {/* Badge */}
              <div
                className="tag-teal"
                style={{ marginBottom: '1.75rem', fontSize: '0.72rem', letterSpacing: '0.14em' }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#2dd4bf',
                    display: 'inline-block',
                    marginRight: '0.45rem',
                  }}
                />
                KGSP Scholar · Top 0.1% National Talent
              </div>

              {/* Name */}
              <h1
                className="font-display hero-h1"
                style={{
                  fontSize: '4.75rem',
                  lineHeight: 1.04,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.75rem',
                  color: '#e8e4df',
                }}
              >
                Abdullah
                <br />
                <span style={{ fontStyle: 'italic', color: 'rgba(232,228,223,0.65)' }}>
                  Aldossary
                </span>
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(232,228,223,0.45)',
                  marginBottom: '1.5rem',
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                }}
              >
                Founder · Researcher · Technologist
              </p>

              {/* Summary */}
              <p
                style={{
                  fontSize: '0.97rem',
                  lineHeight: 1.88,
                  color: 'rgba(232,228,223,0.65)',
                  maxWidth: '31rem',
                  marginBottom: '2.5rem',
                  fontWeight: 300,
                }}
              >
                Data-driven problem-solver with a background in deep tech, market research, and
                startups. Experienced across international markets including 6 months of deep tech
                venture incubation in Shenzhen, China and technical research in the United States.
              </p>

              {/* Stats */}
              <div
                className="stats-row"
                style={{ display: 'flex', gap: '2.5rem', marginBottom: '2.5rem' }}
              >
                {[
                  { value: '20+', label: 'Stakeholder Interviews' },
                  { value: '5', label: 'Pilot Partnerships' },
                  { value: '40+', label: 'Teams Mentored' },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      className="font-display"
                      style={{ fontSize: '2.25rem', color: '#e8e4df', lineHeight: 1 }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        color: 'rgba(232,228,223,0.38)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginTop: '0.3rem',
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="cta-row" style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href="mailto:abdullahbandar@yahoo.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#fff',
                    color: '#0a0a0b',
                    borderRadius: '9999px',
                    padding: '0.75rem 1.6rem',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'background 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f0fdfa';
                    e.currentTarget.style.boxShadow = '0 8px 30px -8px rgba(45,212,191,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Get in Touch
                  <span style={{ fontSize: '0.9rem' }}>→</span>
                </a>
                <a
                  href="https://linkedin.com/in/abdullah44aldossary"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(232,228,223,0.75)',
                    borderRadius: '9999px',
                    padding: '0.75rem 1.6rem',
                    fontSize: '0.85rem',
                    fontWeight: 400,
                    textDecoration: 'none',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  }}
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>

            {/* Right column — profile image */}
            <div
              className="hero-enter hero-image-col profile-card"
              style={{ transitionDelay: '0.28s', position: 'relative' }}
            >
              <div
                style={{
                  borderRadius: '1.75rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  aspectRatio: '4/5',
                  position: 'relative',
                }}
              >
                <img
                  src="/images/profile.jpg"
                  alt="Abdullah Aldossary"
                  className="profile-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
                {/* gradient overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, #0a0a0b 0%, rgba(10,10,11,0.15) 45%, transparent 100%)',
                  }}
                />
                {/* bottom info */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.78rem',
                      color: 'rgba(232,228,223,0.55)',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <span>📍</span> Jeddah, Saudi Arabia
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {['MSc KAUST', 'CS UW–Madison', 'Co-Founder'].map((t) => (
                      <span key={t} className="tag-teal" style={{ fontSize: '0.68rem' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* decorative circles */}
              <div
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '-1rem',
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: '50%',
                  border: '1px solid rgba(45,212,191,0.14)',
                  background: 'rgba(45,212,191,0.03)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '2.5rem',
                  left: '-1.5rem',
                  width: '5.5rem',
                  height: '5.5rem',
                  borderRadius: '50%',
                  border: '1px solid rgba(45,212,191,0.07)',
                  background: 'rgba(45,212,191,0.015)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="cv-section cv-section-border" style={{ position: 'relative', zIndex: 1 }}>
        <div className="cv-container">
          {/* Section header */}
          <div className="section-header fade-target">
            <div
              className="accent-line"
              style={{ height: '1px', background: 'rgba(45,212,191,0.5)', flexShrink: 0 }}
            />
            <span className="section-label">Experience</span>
          </div>

          <div className="exp-grid">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={i}
                className="card-lift fade-target"
                style={{
                  transitionDelay: `${(i % 2) * 80}ms`,
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '1.6rem 1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.9rem',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.035)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                }}
              >
                {/* Subtle teal left border accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.6rem',
                    left: 0,
                    width: '2px',
                    height: '2rem',
                    background: 'rgba(45,212,191,0.55)',
                    borderRadius: '0 2px 2px 0',
                  }}
                />

                {/* Top row: period + tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      color: 'rgba(232,228,223,0.35)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {exp.period}
                  </span>
                  <span
                    className={exp.current ? 'tag-teal' : 'tag-muted'}
                    style={{ fontSize: '0.66rem' }}
                  >
                    {exp.current && (
                      <span
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: '#2dd4bf',
                          display: 'inline-block',
                          marginRight: '0.35rem',
                        }}
                      />
                    )}
                    {exp.tag}
                  </span>
                </div>

                {/* Title + company */}
                <div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.15rem',
                      color: '#e8e4df',
                      lineHeight: 1.25,
                      marginBottom: '0.2rem',
                    }}
                  >
                    {exp.title}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(45,212,191,0.7)', fontWeight: 500 }}>
                    {exp.company}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(232,228,223,0.32)', marginTop: '0.1rem' }}>
                    {exp.location}
                  </div>
                </div>

                {/* Bullets */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: '0.82rem',
                        lineHeight: 1.7,
                        color: 'rgba(232,228,223,0.58)',
                        paddingLeft: '0.9rem',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '0.55rem',
                          width: '3px',
                          height: '3px',
                          borderRadius: '50%',
                          background: 'rgba(45,212,191,0.4)',
                        }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="education" className="cv-section cv-section-border" style={{ position: 'relative', zIndex: 1 }}>
        <div className="cv-container">
          <div className="section-header fade-target">
            <div
              className="accent-line"
              style={{ height: '1px', background: 'rgba(45,212,191,0.5)', flexShrink: 0 }}
            />
            <span className="section-label">Education</span>
          </div>

          <div className="edu-grid">
            {EDUCATION.map((edu, i) => (
              <div
                key={i}
                className="card-lift fade-target"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(45,212,191,0.03)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(45,212,191,0.12)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(45,212,191,0.15)',
                    background: 'rgba(45,212,191,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    letterSpacing: '0.05em',
                    color: 'rgba(45,212,191,0.8)',
                    fontWeight: 600,
                    marginBottom: '0.25rem',
                  }}
                >
                  {edu.abbr.slice(0, 2)}
                </div>
                <div>
                  <h3
                    className="font-display"
                    style={{ fontSize: '1.05rem', color: '#e8e4df', lineHeight: 1.25, marginBottom: '0.15rem' }}
                  >
                    {edu.abbr}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(232,228,223,0.45)', lineHeight: 1.5 }}>
                    {edu.school}
                  </div>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(45,212,191,0.65)', fontWeight: 500 }}>
                  {edu.degree}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'rgba(232,228,223,0.3)', letterSpacing: '0.08em' }}>
                    {edu.detail}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(232,228,223,0.35)', fontVariantNumeric: 'tabular-nums' }}>
                    {edu.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="cv-section cv-section-border" style={{ position: 'relative', zIndex: 1 }}>
        <div className="cv-container">
          <div className="section-header fade-target">
            <div
              className="accent-line"
              style={{ height: '1px', background: 'rgba(45,212,191,0.5)', flexShrink: 0 }}
            />
            <span className="section-label">Skills</span>
          </div>

          <div className="skills-grid">
            {Object.entries(SKILLS).map(([category, items], i) => (
              <div
                key={category}
                className="fade-target"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(232,228,223,0.35)',
                    marginBottom: '1rem',
                  }}
                >
                  {category}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className={category === 'Languages' ? 'tag-teal' : 'tag-muted'}
                      style={{ transition: 'border-color 0.2s, background 0.2s', cursor: 'default' }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = 'rgba(45,212,191,0.25)';
                        el.style.color = 'rgba(232,228,223,0.85)';
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = '';
                        el.style.color = '';
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards & Publications ── */}
      <section id="awards" className="cv-section cv-section-border" style={{ position: 'relative', zIndex: 1 }}>
        <div className="cv-container">
          <div className="section-header fade-target">
            <div
              className="accent-line"
              style={{ height: '1px', background: 'rgba(45,212,191,0.5)', flexShrink: 0 }}
            />
            <span className="section-label">Awards & Publications</span>
          </div>

          <div className="awards-grid">
            {AWARDS.map((award, i) => (
              <div
                key={i}
                className="card-lift fade-target"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(45,212,191,0.025)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                }}
              >
                {/* Large decorative icon */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.75rem',
                    fontSize: '3.5rem',
                    color: 'rgba(45,212,191,0.06)',
                    fontFamily: 'serif',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {award.icon}
                </div>

                <div>
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(45,212,191,0.15)',
                      background: 'rgba(45,212,191,0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      marginBottom: '1rem',
                      color: 'rgba(45,212,191,0.8)',
                    }}
                  >
                    {award.icon}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <h3
                      className="font-display"
                      style={{ fontSize: '1.2rem', color: '#e8e4df', lineHeight: 1.2 }}
                    >
                      {award.title}
                    </h3>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(45,212,191,0.6)', fontWeight: 500 }}>
                    {award.subtitle}
                  </div>
                </div>

                <p style={{ fontSize: '0.84rem', lineHeight: 1.78, color: 'rgba(232,228,223,0.55)', fontWeight: 300 }}>
                  {award.body}
                </p>

                <div style={{ marginTop: 'auto' }}>
                  <span className="tag-teal" style={{ fontSize: '0.68rem' }}>
                    {award.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / Footer ── */}
      <section
        id="contact"
        className="cv-section cv-section-border"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="cv-container">
          <div
            className="fade-target"
            style={{
              borderRadius: '2rem',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.015)',
              padding: '3.5rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-40%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40rem',
                height: '20rem',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(45,212,191,0.06), transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <p
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(45,212,191,0.6)',
                marginBottom: '1rem',
              }}
            >
              Get in Touch
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: '2.75rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#e8e4df',
                marginBottom: '1rem',
              }}
            >
              Let&apos;s build something
              <br />
              <span style={{ fontStyle: 'italic', color: 'rgba(232,228,223,0.55)' }}>remarkable together</span>
            </h2>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(232,228,223,0.45)',
                marginBottom: '2.25rem',
                maxWidth: '26rem',
                margin: '0 auto 2.25rem',
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Open to roles in venture, strategy, and deep tech. Feel free to reach out for
              collaboration, opportunities, or just a conversation.
            </p>

            <div
              style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <a
                href="mailto:abdullahbandar@yahoo.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: '#fff',
                  color: '#0a0a0b',
                  borderRadius: '9999px',
                  padding: '0.8rem 1.8rem',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f0fdfa';
                  e.currentTarget.style.boxShadow = '0 8px 30px -8px rgba(45,212,191,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                abdullahbandar@yahoo.com →
              </a>
              <a
                href="https://linkedin.com/in/abdullah44aldossary"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(232,228,223,0.7)',
                  borderRadius: '9999px',
                  padding: '0.8rem 1.8rem',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                }}
              >
                LinkedIn ↗
              </a>
            </div>

            {/* Bottom meta */}
            <div
              style={{
                marginTop: '3rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                fontSize: '0.75rem',
                color: 'rgba(232,228,223,0.3)',
              }}
            >
              <span>Jeddah, Saudi Arabia</span>
              <span>+966 56 938 5055</span>
              <span>Open to remote & relocation</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

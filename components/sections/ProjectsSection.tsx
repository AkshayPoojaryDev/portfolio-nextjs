import React from 'react'
import Reveal from '@/components/Reveal'
import data from '@/data/portfolio.json'

const tagClass: Record<string, string> = { full: 'tag-full', fe: 'tag-fe', be: 'tag-be' }

const FeaturedVisual = () => (
  <svg className="p-art" viewBox="0 0 260 200" fill="none">
    <rect x="10" y="30" width="240" height="140" rx="8" stroke="#7c6fff" strokeWidth="0.5" fill="none"/>
    <rect x="10" y="30" width="240" height="24" rx="8" fill="#13131f"/>
    <rect x="10" y="42" width="240" height="12" fill="#13131f"/>
    <circle cx="24" cy="42" r="4" fill="#ff6b6b"/><circle cx="38" cy="42" r="4" fill="#ffd93d"/><circle cx="52" cy="42" r="4" fill="#43e8b0"/>
    <rect x="26" y="68" width="80" height="8" rx="2" fill="#7c6fff" opacity="0.3"/>
    <rect x="26" y="82" width="120" height="6" rx="2" fill="#1e1e35"/>
    <rect x="26" y="94" width="100" height="6" rx="2" fill="#1e1e35"/>
    <rect x="26" y="110" width="60" height="28" rx="4" fill="#7c6fff" opacity="0.8"/>
    <rect x="92" y="110" width="60" height="28" rx="4" fill="none" stroke="#7c6fff" strokeWidth="0.5"/>
    <rect x="160" y="68" width="70" height="78" rx="6" fill="#0f0f1a" stroke="#1e1e35" strokeWidth="0.5"/>
    <rect x="168" y="78" width="54" height="30" rx="3" fill="#7c6fff" opacity="0.15"/>
    <path d="M80 168 Q130 150 180 168" stroke="#43e8b0" strokeWidth="0.5" fill="none" strokeDasharray="4 2"/>
  </svg>
)

const DashboardVisual = () => (
  <svg className="p-art" viewBox="0 0 240 160" fill="none">
    <circle cx="120" cy="80" r="50" stroke="#7c6fff" strokeWidth="0.5" fill="none"/>
    <circle cx="120" cy="80" r="35" stroke="#7c6fff" strokeWidth="0.5" fill="none" opacity="0.5"/>
    <circle cx="120" cy="80" r="20" fill="#7c6fff" opacity="0.15"/>
    <circle cx="120" cy="80" r="6" fill="#7c6fff"/>
    <line x1="120" y1="30" x2="120" y2="50" stroke="#7c6fff" strokeWidth="0.5"/>
    <line x1="120" y1="110" x2="120" y2="130" stroke="#7c6fff" strokeWidth="0.5"/>
    <line x1="70" y1="80" x2="90" y2="80" stroke="#7c6fff" strokeWidth="0.5"/>
    <line x1="150" y1="80" x2="170" y2="80" stroke="#7c6fff" strokeWidth="0.5"/>
    <circle cx="120" cy="30" r="5" fill="#43e8b0"/>
    <circle cx="170" cy="80" r="5" fill="#7c6fff"/>
  </svg>
)

const TerminalVisual = () => (
  <svg className="p-art" viewBox="0 0 240 160" fill="none">
    <rect x="30" y="20" width="180" height="120" rx="6" fill="#0d2e2e" stroke="#43e8b0" strokeWidth="0.5"/>
    <text x="42" y="44" fill="#43e8b0" fontFamily="monospace" fontSize="10">$ npm run dev</text>
    <text x="42" y="60" fill="#43e8b0" fontFamily="monospace" fontSize="10" opacity="0.7">✓ Server running</text>
    <text x="42" y="76" fill="#43e8b0" fontFamily="monospace" fontSize="10" opacity="0.5">✓ DB connected</text>
    <text x="42" y="92" fill="#43e8b0" fontFamily="monospace" fontSize="10" opacity="0.3">✓ Ready on :3000</text>
  </svg>
)

const visuals: Record<string, React.FC> = { featured: FeaturedVisual, dashboard: DashboardVisual, terminal: TerminalVisual }
const visBg: Record<string, string> = { featured: 'p-vis-featured', dashboard: 'p-vis-1', terminal: 'p-vis-2' }

export default function ProjectsSection() {
  const featured = data.projects.find(p => p.featured)
  const rest = data.projects.filter(p => !p.featured)
  return (
    <section id="work">
      <div className="section-label">03 — Work</div>
      <Reveal><h2 className="section-title">Things I&apos;ve<br />shipped.</h2></Reveal>
      <div className="projects-grid">
        {featured && (
          <Reveal className="project-card featured">
            <div className={`project-visual ${visBg[featured.visual]}`}>
              {visuals[featured.visual] ? <>{React.createElement(visuals[featured.visual])}</> : null}
            </div>
            <div className="project-body">
              <div className="project-tags">{featured.tags.map(t => <span key={t.label} className={`project-tag ${tagClass[t.type]}`}>{t.label}</span>)}</div>
              <div className="project-title">{featured.title}</div>
              <div className="project-desc">{featured.description}</div>
              <a href={featured.link} className="project-link">View project →</a>
            </div>
          </Reveal>
        )}
        {rest.map((p, i) => {
          const Visual = visuals[p.visual]
          return (
            <Reveal key={p.id} className="project-card" delay={i * 100}>
              <div className={`project-visual ${visBg[p.visual]}`}>{Visual ? <Visual /> : null}</div>
              <div className="project-body">
                <div className="project-tags">{p.tags.map(t => <span key={t.label} className={`project-tag ${tagClass[t.type]}`}>{t.label}</span>)}</div>
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.description}</div>
                <a href={p.link} className="project-link">View project →</a>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}



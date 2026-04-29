import data from '@/data/portfolio.json'

export default function HeroSection() {
  const h = data.hero
  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
      <div className="hero-content">
        <div className="label">{h.label}</div>
        <h1 className="hero-title">
          <span className="line1">{h.name}</span>
          <span className="line2 glitch" data-text={h.tagline}>{h.tagline}</span>
          <span className="line3">{h.subtitle}</span>
        </h1>
        <p className="hero-sub">
          I craft <span>{h.bioHighlight1}</span> and architect <span>{h.bioHighlight2}</span> —{' '}
          {h.bio.replace(`I craft ${h.bioHighlight1} and architect ${h.bioHighlight2} — `, '')}
        </p>
        <div className="terminal-line">
          <span className="prompt">~/portfolio $</span>
          <span className="cmd">{h.terminalCmd}</span>
          <span className="cursor-blink" />
        </div>
        <div className="hero-cta">
          <a href="#work" className="btn btn-primary">{h.ctaPrimary}</a>
          <a href="#contact" className="btn btn-ghost">{h.ctaSecondary}</a>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line" /><span>scroll</span>
      </div>
    </section>
  )
}

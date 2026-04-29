import Reveal from '@/components/Reveal'
import data from '@/data/portfolio.json'

export default function SkillsSection() {
  return (
    <section id="skills" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="section-label">02 — Skills</div>
      <Reveal><h2 className="section-title">What I work<br />with daily.</h2></Reveal>
      <Reveal delay={100}>
        <div className="skills-container">
          {data.skills.map((g) => (
            <div key={g.title} className="skill-group">
              <div className="skill-group-title">{g.title}</div>
              {g.items.map((s) => <span key={s} className="skill-tag">{s}</span>)}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

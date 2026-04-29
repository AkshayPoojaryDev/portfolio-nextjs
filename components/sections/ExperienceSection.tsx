import Reveal from '@/components/Reveal'
import data from '@/data/portfolio.json'

export default function ExperienceSection() {
  return (
    <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="section-label">04 — Experience</div>
      <Reveal><h2 className="section-title">Where I&apos;ve<br />been.</h2></Reveal>
      <Reveal delay={100}>
        <div className="timeline">
          {data.experience.map((item, i) => (
            <div key={`${i}-${item.date}`} className="timeline-item">
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-role">{item.role}</div>
              <div className="timeline-company">{item.company}</div>
              <div className="timeline-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

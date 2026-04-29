import Reveal from '@/components/Reveal'
import data from '@/data/portfolio.json'

export default function AboutSection() {
  const { about } = data
  const c = about.code
  return (
    <section id="about">
      <div className="section-label">01 — About</div>
      <div className="about-grid">
        <div className="about-text">
          <Reveal>
            <h2 className="section-title">Developer<br />by choice,<br /><em>artist</em> by nature.</h2>
            <p>{about.para1}</p>
            <p>{about.para2}</p>
            <p>{about.para3}</p>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <div className="code-block">
            <div className="code-header">
              <div className="dot r" /><div className="dot y" /><div className="dot g" />
              <span className="code-filename">about.ts</span>
            </div>
            <div className="code-body">
              <span className="code-key">const</span> <span className="code-fn">developer</span> = {'{'}<br />
              &nbsp;&nbsp;<span className="code-key">name</span>: <span className="code-str">&quot;{c.name}&quot;</span>,<br />
              &nbsp;&nbsp;<span className="code-key">role</span>: <span className="code-str">&quot;{c.role}&quot;</span>,<br />
              &nbsp;&nbsp;<span className="code-key">experience</span>: <span className="code-str">&quot;{c.experience}&quot;</span>,<br />
              &nbsp;&nbsp;<span className="code-key">location</span>: <span className="code-str">&quot;{c.location}&quot;</span>,<br />
              &nbsp;&nbsp;<span className="code-key">stack</span>: {'{'}<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-key">frontend</span>: [{c.frontend.map(s => `"${s}"`).join(', ')}],<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-key">backend</span>: [{c.backend.map(s => `"${s}"`).join(', ')}],<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-key">db</span>: [{c.db.map(s => `"${s}"`).join(', ')}]<br />
              &nbsp;&nbsp;{'}'},<br />
              &nbsp;&nbsp;<span className="code-key">available</span>: <span className="code-num">true</span><br />
              {'}'};
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

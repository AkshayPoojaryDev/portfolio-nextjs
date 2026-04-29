import Reveal from '@/components/Reveal'
import data from '@/data/portfolio.json'

export default function ContactSection() {
  const { contact } = data
  return (
    <section id="contact">
      <div className="contact-inner">
        <Reveal className="contact-reveal">
          <div className="section-label" style={{ justifyContent: 'center' }}>05 — Contact</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', textAlign: 'center' }}>
            Got an idea?<br />Let&apos;s make it real.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '1rem', textAlign: 'center' }}>
            I&apos;m currently open to new opportunities.<br />Drop a line and let&apos;s talk.
          </p>
          <a href={`mailto:${contact.email}`} className="contact-email">{contact.email}</a>
          <div className="social-links">
            {contact.social.map((s) => (
              <a key={s.label} href={s.href} className="social-link" title={s.label}>{s.short}</a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import data from '@/data/portfolio.json'

export default function MarqueeSection() {
  const items = [...data.marquee, ...data.marquee]
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} style={{ display: 'contents' }}>
            <span>{t}</span>
            <span className="dot-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

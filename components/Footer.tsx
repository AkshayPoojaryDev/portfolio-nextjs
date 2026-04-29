import data from '@/data/portfolio.json'

export default function Footer() {
  const { footer } = data
  return (
    <footer>
      <span style={{ color: 'var(--muted)' }}>
        Designed & built by <span>{footer.name}</span> · {footer.year}
      </span>
      <span style={{ color: 'var(--muted)' }}>
        Made with <span>♥</span> and too much coffee
      </span>
    </footer>
  )
}

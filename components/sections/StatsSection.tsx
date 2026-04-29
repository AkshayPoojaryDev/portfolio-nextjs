'use client'

import { useEffect, useRef } from 'react'

interface Stat {
  display: string
  label: string
  animate: boolean
  target?: number
  suffix?: string
}

interface Props {
  stats: Stat[]
}

export default function StatsSection({ stats }: Props) {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    refs.current.forEach((el, i) => {
      if (!el) return
      const s = stats[i]
      if (!s.animate || !s.target) return
      const io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        let count = 0
        const target = s.target!
        const suffix = s.suffix ?? ''
        const step = Math.ceil(target / 30)
        const interval = setInterval(() => {
          count = Math.min(count + step, target)
          el.textContent = `${count}${suffix}`
          if (count >= target) clearInterval(interval)
        }, 40)
        io.unobserve(el)
      }, { threshold: 0.5 })
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [stats])

  return (
    <div className="stats">
      {stats.map((s, i) => (
        <div key={i} className="stat">
          <div className="stat-num" ref={el => { refs.current[i] = el }}>{s.display}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

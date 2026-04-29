'use client'

import { useState, useEffect } from 'react'

interface Props {
  logo: string
}

export default function Navigation({ logo }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isImage = logo.includes('/') || logo.includes('.')
  const imageSrc = isImage ? logo.replace(/^\/?public\//, '/') : logo

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <a className="nav-logo" href="#">
        {isImage ? (
          <img src={imageSrc} alt="Logo" style={{ height: '40px', width: 'auto', display: 'block', objectFit: 'contain' }} />
        ) : (
          logo
        )}
      </a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}

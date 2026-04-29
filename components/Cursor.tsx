'use client'

import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!cursor || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let frame: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`
    }

    const animateRing = () => {
      rx += (mx - rx - 18) * 0.12
      ry += (my - ry - 18) * 0.12
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      frame = requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', onMove)
    frame = requestAnimationFrame(animateRing)
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(frame) }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
    </>
  )
}

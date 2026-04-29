import type { Metadata } from 'next'
import { Space_Mono, Syne } from 'next/font/google'
import './globals.css'
import Cursor from '@/components/Cursor'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-space-mono',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'Dev Portfolio | Full Stack Developer',
  description: 'Full-stack developer crafting fast, scalable web experiences. Pixel-perfect UIs and scalable backends.',
  keywords: ['developer', 'portfolio', 'react', 'next.js', 'full-stack'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${syne.variable}`}>
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  )
}

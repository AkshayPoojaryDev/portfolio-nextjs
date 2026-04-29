# Next.js Portfolio - Best Practices & File Structure

## Architecture Decisions

### 1. App Router vs Pages Router
✅ **App Router** (chosen)
- Modern, recommended by Vercel
- Built-in Server Components
- Streaming & Suspense support
- Better file organization
- Simplified layouts

### 2. Server Components vs Client Components
```tsx
// Server Component (default)
export default async function Page() {
  const data = await fetch(...) // ✅ On server
  return <div>{data}</div>
}

// Client Component (when needed)
'use client'
import { useState } from 'react'
export default function Form() {
  const [state, setState] = useState(null) // ✅ Browser state
  return <form>{state}</form>
}
```

**Rule**: Use Server Components by default. Use `'use client'` only for:
- Hooks (useState, useEffect, useContext)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)

### 3. File Organization

```
app/
├── layout.tsx              # Root layout, metadata
├── page.tsx                # Home route
├── globals.css             # Global styles
├── actions/
│   └── contact.ts          # Server actions (form handling)
├── components/
│   ├── Navigation.tsx      # Shared components
│   ├── Footer.tsx
│   ├── providers/
│   │   └── ThemeProvider.tsx  # Context providers
│   └── sections/
│       ├── HeroSection.tsx    # Page sections
│       ├── AboutSection.tsx
│       └── ...
├── api/                    # API routes (if needed)
│   └── route.ts
└── blog/
    ├── page.tsx            # Blog index
    ├── [slug]/
    │   └── page.tsx        # Blog post page
    └── layout.tsx          # Blog layout

lib/
├── mdx.ts                  # Blog utilities
├── utils.ts                # Helper functions
└── constants.ts            # Constants

content/
└── blog/                   # MDX blog posts
    ├── post-1.mdx
    └── post-2.mdx

public/                     # Static files
├── favicon.ico
└── ...
```

---

## Performance Best Practices

### 1. Image Optimization
```tsx
// ❌ Bad
<img src="/hero.jpg" alt="" />

// ✅ Good
import Image from 'next/image'
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  priority // LCP image
  className="w-full h-auto"
/>
```

### 2. Font Loading
```tsx
// ✅ Next.js Fonts (optimized)
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
<html>
  <body className={inter.className}>
```

### 3. Dynamic Imports
```tsx
// ✅ Code split heavy components
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => <p>Loading...</p>,
})
```

### 4. Metadata & SEO
```tsx
// ✅ Dynamic metadata
export async function generateMetadata() {
  return {
    title: 'My Portfolio',
    description: 'Full-stack developer',
    openGraph: { ... }
  }
}
```

### 5. Caching Strategy
```tsx
// ✅ Static generation (default)
export default function Page() {
  return <div>Static page</div>
}

// ✅ Revalidate every 1 hour
export const revalidate = 3600

// ✅ Dynamic (no cache)
export const dynamic = 'force-dynamic'
```

---

## TypeScript Best Practices

### 1. Type Everything
```tsx
// ✅ Typed props
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}

// ✅ Typed state
const [count, setCount] = useState<number>(0)

// ✅ Typed API responses
interface Post {
  id: number
  title: string
}

const posts: Post[] = []
```

### 2. Avoid `any`
```tsx
// ❌ Bad
function getData(data: any) { }

// ✅ Good
interface Data {
  name: string
  email: string
}
function getData(data: Data) { }
```

### 3. Use Unions & Literals
```tsx
// ✅ Strict typing
type Status = 'pending' | 'success' | 'error'
type Theme = 'light' | 'dark'

interface FormState {
  status: Status
}
```

---

## Component Best Practices

### 1. Naming
```tsx
// ✅ Clear, descriptive names
function ContactForm() { }
function HeroSection() { }
function NavigationBar() { }

// ❌ Vague names
function Form() { }
function Section() { }
function Nav() { }
```

### 2. Prop Drilling Prevention
```tsx
// ❌ Bad (prop drilling)
<Parent theme={theme}>
  <Child theme={theme}>
    <GrandChild theme={theme} />

// ✅ Good (Context)
<ThemeProvider>
  <Parent>
    <Child>
      <GrandChild /> {/* useTheme() */}
```

### 3. Component Size
- Keep components < 300 lines
- Extract logic into hooks
- One responsibility per component

```tsx
// ❌ Too big
function Dashboard() {
  // 500 lines of rendering, logic, hooks
}

// ✅ Separated concerns
function Dashboard() {
  return (
    <>
      <Header />
      <Content />
      <Sidebar />
    </>
  )
}
```

### 4. Memoization (when needed)
```tsx
// ✅ Memoize expensive components
const MemoizedCard = memo(function Card({ data }: Props) {
  return <div>{data}</div>
})

// ✅ useMemo for expensive calculations
const filteredList = useMemo(
  () => items.filter(item => item.active),
  [items]
)
```

---

## Tailwind CSS Best Practices

### 1. Use Design Tokens
```tsx
// ✅ Custom config values
const colors = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
}

// HTML
<div className="bg-primary text-white">

// CSS
:root {
  --color-primary: 147 51 234;
}
```

### 2. Avoid Inline Styles
```tsx
// ❌ Bad
<div style={{ fontSize: '24px', color: 'red' }}>

// ✅ Good
<div className="text-2xl text-red-600">

// ✅ If dynamic, use CSS variables
<div style={{ color: `rgb(${colorVar})` }}>
```

### 3. Responsive Classes
```tsx
// ✅ Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// ✅ Text sizing
<h1 className="text-4xl md:text-5xl lg:text-6xl">
```

---

## State Management

### 1. Use Context for Global State
```tsx
// ✅ For theme, auth, etc.
<ThemeProvider>
  <AuthProvider>
    <App />
  </AuthProvider>
</ThemeProvider>
```

### 2. Keep Local State Local
```tsx
// ✅ Form state lives in component
export function Form() {
  const [formData, setFormData] = useState(initialState)
  // Don't put this in global state
}
```

### 3. Server Actions for Mutations
```tsx
// ✅ Form submission on server
'use client'
import { submitForm } from '@/actions'

export function Form() {
  const handleSubmit = async (data) => {
    await submitForm(data)
  }
}
```

---

## Accessibility (a11y)

```tsx
// ✅ Semantic HTML
<nav aria-label="Main navigation">
<button aria-label="Toggle menu">

// ✅ Form labels
<label htmlFor="email">Email:</label>
<input id="email" type="email" />

// ✅ Images
<Image alt="Descriptive text" src="..." />

// ✅ ARIA when needed
<div role="status" aria-live="polite">Loading...</div>
```

---

## Deployment Checklist

- [ ] All env vars set in Vercel
- [ ] No `console.log` in production
- [ ] Images optimized
- [ ] Metadata complete (OG, Twitter)
- [ ] Contact form email working
- [ ] Dark mode tested
- [ ] Mobile responsive tested
- [ ] Lighthouse 90+ all metrics
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No console errors/warnings

---

## Common Pitfalls to Avoid

❌ Using `useState` in Server Components  
❌ Putting all state in Context  
❌ Not typing props  
❌ Hardcoding colors instead of CSS vars  
❌ Forgetting `alt` on images  
❌ Blocking render with data fetching  
❌ Not using `next/image` for images  
❌ Over-memoizing (premature optimization)  

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Best Practices](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Web Vitals](https://web.dev/vitals)

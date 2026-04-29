# Dev Portfolio

Bold, creative portfolio built with **Next.js 14**, **App Router**, **Framer Motion**, and **Tailwind CSS**.

## Features

✅ **Next.js 14** with App Router  
✅ **TypeScript** for type safety  
✅ **Framer Motion** animations  
✅ **Dark Mode** toggle with localStorage  
✅ **MDX Blog** with reading time  
✅ **Contact Form** with email (Nodemailer)  
✅ **Responsive Design** (mobile-first)  
✅ **SEO Optimized** (metadata, sitemap)  
✅ **Performance** (image optimization, lazy loading)  
✅ **Deployed on Vercel** (one-click deploy)

---

## Project Structure

```
portfolio-next/
├── app/
│   ├── actions/              # Server actions (contact form)
│   ├── api/                  # API routes (if needed)
│   ├── blog/                 # Blog pages
│   ├── components/           # React components
│   │   ├── sections/         # Page sections
│   │   ├── providers/        # Context providers
│   │   └── Navigation.tsx    # Header nav
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── page.tsx              # Home page
├── content/
│   └── blog/                 # MDX blog posts
├── lib/                      # Utilities
│   ├── mdx.ts               # Blog parsing
│   └── utils.ts             # Helper functions
├── public/                   # Static assets
├── types/                    # TypeScript types
├── .env.example              # Environment template
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind config
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies

```

---

## Quick Start

### 1. Clone & Install
```bash
git clone <repo-url>
cd portfolio-next
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
```

Update `.env.local`:
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-specific-password
CONTACT_EMAIL=your-email@gmail.com
```

**Gmail Setup:**
- Enable 2FA on Google Account
- Generate [App Password](https://myaccount.google.com/apppasswords)
- Use app password in `GMAIL_APP_PASSWORD`

### 3. Run Dev Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Development

### Add Blog Post
Create `content/blog/my-post.mdx`:
```yaml
---
title: "My First Post"
description: "Short description"
date: "2024-01-15"
author: "Your Name"
---

# Your content here

This is a markdown blog post.
```

### Update Portfolio Content
Edit sections in `app/components/sections/`:
- `HeroSection.tsx` - Hero / headline
- `AboutSection.tsx` - About me
- `ExperienceSection.tsx` - Work experience
- `SkillsSection.tsx` - Tech skills
- `ProjectsSection.tsx` - Featured projects
- `ContactSection.tsx` - Contact form

### Customize Theme
Update `tailwind.config.ts` and `app/globals.css`:
- Colors: `--color-primary`, `--color-secondary`
- Fonts: `--font-sans`, `--font-mono`
- Animations: keyframes in globals

---

## Performance Best Practices

### ✅ Implemented

1. **Image Optimization**
   - Next.js Image component
   - Automatic format conversion (WebP, AVIF)
   - Lazy loading by default

2. **Code Splitting**
   - Dynamic imports for components
   - Tree-shaking unused code

3. **Caching**
   - Static generation for blog posts
   - Browser cache headers
   - CDN optimization on Vercel

4. **Bundle Size**
   - Tailwind CSS purges unused styles
   - Framer Motion tree-shaken
   - No unnecessary dependencies

5. **Animations**
   - GPU-accelerated transforms
   - `will-change` for smooth animations
   - Reduced motion support

### 📊 Lighthouse Targets
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

---

## Deployment on Vercel

### 1 Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/yourusername/portfolio-next)

### Manual Deploy
```bash
npm install -g vercel
vercel
```

### Environment Variables
Set on Vercel dashboard:
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `CONTACT_EMAIL`

---

## SEO

✅ Meta tags (OG, Twitter)  
✅ Sitemap auto-generated  
✅ Structured data (JSON-LD)  
✅ Mobile-responsive  
✅ Fast LCP/FID/CLS  

Add `sitemap.xml` and `robots.txt` to `/public`

---

## TypeScript

Strict mode enabled. Run type checking:
```bash
npm run type-check
```

All components typed for IDE autocompletion and safety.

---

## Linting

```bash
npm run lint
```

Configured with ESLint + Next.js recommended rules.

---

## Customization Checklist

- [ ] Update name in `layout.tsx`
- [ ] Add profile image to `/public`
- [ ] Update `HeroSection` text and links
- [ ] Add experience in `ExperienceSection`
- [ ] Add skills in `SkillsSection`
- [ ] Add projects in `ProjectsSection`
- [ ] Setup email in `.env.local`
- [ ] Update social links in `Navigation.tsx` and `Footer.tsx`
- [ ] Change colors in `tailwind.config.ts`
- [ ] Deploy to Vercel

---

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Email**: Nodemailer
- **Blog**: MDX with gray-matter
- **Hosting**: Vercel
- **Icons**: Lucide React

---

## License

MIT © 2024

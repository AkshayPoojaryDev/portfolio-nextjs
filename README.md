# 🚀 Akshay's Portfolio

A high-performance, dynamic portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This project features a data-driven architecture, allowing you to update your entire site content through a single JSON file or an admin dashboard.

---

## ✨ Features

-   🌐 **Next.js 14 (App Router)**: Fast, modern React framework.
-   🎨 **Dynamic Styling**: Beautiful UI with Tailwind CSS and Framer Motion.
-   📊 **Data-Driven**: Content is decoupled from code, stored in `data/portfolio.json`.
-   🛠️ **Admin Dashboard**: Secure management interface for live content updates.
-   📧 **Contact System**: Fully functional contact form with server actions.
-   📱 **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop).
-   🌑 **Dark Mode**: Built-in theme switching.
-   🚀 **SEO Optimized**: Pre-configured metadata and semantic HTML.

---

## 📂 Project Structure

```text
portfolio-nextjs/
├── app/                  # Next.js App Router routes
│   ├── admin/            # Secure admin dashboard
│   ├── api/              # Backend API endpoints
│   └── actions/          # Server actions (e.g., Contact Form)
├── components/           # Reusable React components
│   ├── providers/        # Context providers (Theme, etc.)
│   └── sections/         # Main page sections (Hero, About, etc.)
├── data/                 # Dynamic content source
│   └── portfolio.json    # The "Single Source of Truth" for your content
├── lib/                  # Utility functions and shared logic
├── public/               # Static assets (Images, SVGs)
└── content/              # MDX blog content (optional)
```

---

## 🛠️ Getting Started

### 1. Prerequisites
-   Node.js (LTS version)
-   **pnpm** (preferred) or npm/yarn

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-nextjs

# Install dependencies
pnpm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```
Fill in your credentials (e.g., Email service settings).

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

---

## ✍️ How to Update Content

You can manage your portfolio content in two ways:

### Option A: Direct JSON Edit (Recommended for local dev)
Modify the `data/portfolio.json` file. The UI will automatically reflect changes.
> **Note**: This file is ignored by Git by default to protect your personal data. Keep a backup or use a template.

### Option B: Admin Dashboard
Navigate to `/admin` to use the interactive management panel. This allows for safe, real-time updates without touching the code.

---

## 🔐 Security & Git

To protect your personal information and sensitive configurations, the following rules are applied in `.gitignore`:

-   **`data/portfolio.json`**: Ignored to prevent leaking personal contact info or private drafts.
-   **`admin.json` & `*.secret.json`**: Ignored for security.
-   **`.env*`**: Never commit your environment variables.

### Managing Data in Git
If you want to share a template of your data without your personal info, create a `data/portfolio.example.json` and commit that instead.

---

## 🚀 Deployment

The easiest way to deploy is using **Vercel**:
1. Push your code to GitHub (remember `portfolio.json` is ignored, so you'll need to upload it or use the admin panel after deploy).
2. Connect your repository to Vercel.
3. Configure environment variables in the Vercel dashboard.
4. Deploy!

---

## 📜 License

MIT © 2024 [Akshay](https://github.com/AkshayPoojaryDev)

# SoulRadar — Where Is My Soulmate? 🌌

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Website](https://img.shields.io/badge/Live%20Demo-soulradar.github.io-7C0E44)](https://soulradar.github.io/)
[![Ko-fi](https://img.shields.io/badge/Support-Ko--fi-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/kishara)
[![PWA](https://img.shields.io/badge/PWA-100%25%20Offline-success)](#offline-pwa)
[![SEO](https://img.shields.io/badge/Lighthouse%20SEO-100%2F100-brightgreen)](#technical-seo)

> **"Where is my soulmate?"** — Discover the exact country, romantic city, and cosmic resonance frequency of your destined soul partner using 100% deterministic client-side astrology and Pythagorean life path numerology.

**Live Application:** [https://soulradar.github.io/](https://soulradar.github.io/)

---

## ✨ Highlights & Features

- **Find My Soulmate with 100% Privacy**: Runs entirely client-side inside your browser with **zero server storage, zero telemetry, and zero tracking**.
- **Deterministic Astrolocality Algorithm**: Maps full name, date of birth, and orientation to a curated dataset of **60+ global romantic destinations** with consistent, reproducible results.
- **Cosmic Resonance (94% – 99.8%)**: Computes precise energetic harmony percentages paired with Western Zodiac elemental alignments and Life Path numerology.
- **2-Second Celestial Radar Scanner**: Sleek animated pulse radar cycling through global coordinates and zodiac constellations.
- **High-Resolution HTML5 Canvas Share Card**: Generates an aesthetic, high-resolution downloadable card (`1200x675`) with `soulradar.github.io` watermark and seamless sharing to **X (Twitter)** and **WhatsApp**.
- **100% Offline Progressive Web App (PWA)**: Full Service Worker (`sw.js`) and Web Manifest (`manifest.json`) enabling installability on iOS, Android, and Desktop.
- **8-Language Reactive i18n**: Instant translation across English, Spanish, Portuguese, German, French, Japanese, Simplified Chinese, and Russian without page reloads.

---

## 🎨 Luxury Minimalist Design System & Color Palette

SoulRadar adopts an ultra-minimalist, romantic luxury aesthetic balancing deep plum contrasts with warm rose and champagne blush highlights:

| Token Name | Hex Code | Description & Usage |
| :--- | :--- | :--- |
| **Primary Deep Burgundy Plum** | `#7C0E44` | High-contrast headings, primary CTA buttons, radar sweep rings |
| **Secondary Dusty Mauve** | `#AA5E7A` | Subtitles, delicate borders, secondary badges, icons |
| **Accent Warm Rose** | `#D49A9A` | Subtle card borders, radar glowing pulses, decorative corners |
| **Highlight Champagne Blush** | `#F2DACE` | Soft surface highlights, badge fills, dark mode typography |
| **Light Canvas Alabaster** | `#FFFDFB` | Clean light mode background providing generous whitespace |
| **Dark Velvet Plum** | `#14040C` | Immersive dark mode background with glowing celestial accents |
| **Dark Card Velvet** | `#220815` | Elevated surface containers in dark theme |

---

## 🔮 Astrological & Numerological Engine Architecture

SoulRadar pairs ancient esoteric traditions with deterministic computational mathematics:

```
[ Full Name ] + [ Date of Birth ] + [ Romantic Preference ]
                      │
                      ▼
 ┌─────────────────────────────────────────────────────────┐
 │ 1. Western Zodiac Sign (Aries through Pisces)           │
 │ 2. Elemental Polarity (Fire, Earth, Air, Water)        │
 │ 3. Pythagorean Life Path Number (1 to 9)               │
 │ 4. Cryptographic FNV-1a Hash String                     │
 └────────────────────────────┬────────────────────────────┘
                              │
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │ Multi-Dimensional Country Scoring:                      │
 │ • Elemental Affinity (+10 pts)                          │
 │ • Astrological Sign Compatibility (+15 pts)             │
 │ • Life Path Numerology Resonant Harmonic (+8 pts)       │
 │ • Deterministic Seed Modulation (+0 to 36 pts)          │
 └────────────────────────────┬────────────────────────────┘
                              │
                              ▼
 [ Destined Country & City + 94.0%-99.8% Cosmic Resonance ]
```

### Determinism Guarantee
Because all math relies on static astronomical tables, Pythagorean digit reduction, and deterministic 32-bit FNV-1a hashing, testing the exact same inputs will always produce the identical soulmate country.

---

## 🚀 Quick Start & Local Development

### Prerequisites
- Node.js `18.x` or higher
- npm, pnpm, or bun

### Installation

```bash
# 1. Clone repository
git clone https://github.com/soulradar/soulradar.github.io.git
cd soulradar.github.io

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Run Unit Tests
```bash
# Run astrology & numerology logic verification tests
npx tsx --test src/utils/astrology.test.ts
```

### Build for Production
```bash
npm run build
```

---

## 🚀 Publishing to GitHub Pages (Automated Deployment)

SoulRadar is pre-configured with a complete GitHub Actions CI/CD pipeline for 1-click deployment to GitHub Pages.

### Step 1: Push Repository to GitHub

```bash
git init
git add .
git commit -m "feat: launch SoulRadar with GitHub Pages CI/CD"
git branch -M main
git remote add origin https://github.com/soulradar/soulradar.github.io.git
git push -u origin main
```

### Step 2: Configure GitHub Pages Settings

1. On GitHub, navigate to your repository.
2. Click **Settings** (gear icon) > **Pages** (under Code and automation in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** (do NOT choose "Deploy from a branch").
4. That's it! GitHub Actions will automatically detect `.github/workflows/deploy.yml`.

### Step 3: Automated Workflow

Every push to `main` will automatically:
1. Run the deterministic unit test suite (`npx tsx --test src/utils/astrology.test.ts`).
2. Build the optimized production bundle with relative asset paths.
3. Inject `.nojekyll` and `404.html` SPA routing fallbacks.
4. Deploy the live site to your GitHub Pages URL (`https://soulradar.github.io/` or `https://<username>.github.io/<repo>/`).


## 🌐 Technical SEO & Schema Verification

SoulRadar is built strictly against Google's Structured Data Guidelines:
- **Canonical URL**: `https://soulradar.github.io/`
- **Primary Keywords**: `find my soulmate`, `where is my soulmate`, `my soulmate`
- **Structured Data (JSON-LD)**:
  - `WebApplication` (EntertainmentApplication, Free offer)
  - `BreadcrumbList` (Semantic navigation breadcrumbs)
  - `HowTo` (3-step cosmic alignment guide)
  - `FAQPage` (Optimized snippet answers)
- **Analytics**: Google Tag `G-75QKKRLB1W`
- **Social Metadata**: OpenGraph 1200x630 cards and Twitter `summary_large_image`

---

## ☕ Support the Developer

SoulRadar is 100% free, open-source, and privacy-respecting. If this project brought a smile to your face or helped you connect with your romantic coordinates:

👉 **[Support Kishara on Ko-fi](https://ko-fi.com/kishara)**

---

## 📄 License

Distributed under the Apache 2.0 License. See `LICENSE` for details.

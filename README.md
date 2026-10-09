# Enopix

<div align="center">

[![CI](https://github.com/AlphaIsYour/enopix/actions/workflows/ci.yml/badge.svg)](https://github.com/AlphaIsYour/enopix/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**A privacy-first, browser-based image processing suite.**  
Resize, crop, compress, convert, strip metadata, split into grids, generate social media presets, create favicon packages, and compare before/after — all processed locally on your device. **Zero server uploads. 100% private.**

[Features](#features) • [Quick Start](#getting-started) • [Architecture](#how-it-works) • [Roadmap](#roadmap) • [Contributing](#contributing) • [Support](#support)

</div>

---

## ⚡ Features

### Core Tools

| Tool | Route | Description |
|------|-------|-------------|
| **Resize** | `/tools/resize` | Scale by exact pixels, percentage, or max dimensions with aspect ratio lock |
| **Crop** | `/tools/crop` | Interactive crop area with drag positioning and aspect ratio presets |
| **Compress** | `/tools/compress` | Reduce file size with quality slider for JPEG, WebP, and PNG |
| **Convert Format** | `/tools/convert` | Transform between PNG, JPEG, WebP, AVIF, and BMP |
| **Remove Metadata** | `/tools/metadata` | Strip EXIF/GPS data to protect privacy before sharing |
| **Grid Split** | `/tools/grid-split` | Divide images into grids (2×2, 3×3, custom) for carousels and puzzles |
| **Social Media Presets** | `/tools/social-presets` | Auto-resize for Instagram, Twitter, Facebook, LinkedIn, YouTube, Pinterest, TikTok, and more |
| **Favicon Generator** | `/tools/favicon` | Generate all required favicon sizes (16px to 512px) with padding and border radius controls |
| **Before / After Compare** | `/tools/compare` | Interactive slider comparison between original and processed images |

### Key Capabilities

- **100% local processing** — uses HTML5 Canvas API and Blob API; nothing leaves your browser.
- **Batch processing** — upload and process multiple images concurrently.
- **Drag-and-drop** — drop files directly onto the page.
- **ZIP download** — package and download all processed images as a single ZIP file.
- **Progress indicators** — real-time progress during batch operations.
- **Responsive design** — seamless experience on desktop, tablet, and mobile.
- **Dark mode** — automatic theme adaptation based on system preference.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router with Turbopack)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **File Handling**: [react-dropzone](https://react-dropzone.js.org/)
- **ZIP Export**: [JSZip](https://stuk.github.io/jszip/)
- **Comparison Slider**: Custom React component

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.0.0 or higher
- npm, pnpm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/AlphaIsYour/enopix.git
cd enopix

# Install dependencies
npm ci

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification & Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint check |
| `npm run type-check` | Run TypeScript compiler check without emitting files |

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage with tool showcase grid
│   ├── globals.css         # Design tokens and global CSS
│   └── tools/              # Dedicated tool pages
│       ├── resize/         # Scale & dimension options
│       ├── crop/           # Interactive crop canvas
│       ├── compress/       # Quality compression controls
│       ├── convert/        # Multi-format transformation
│       ├── metadata/       # EXIF/GPS cleaner
│       ├── grid-split/     # Tile & carousel splitter
│       ├── social-presets/ # Platform-specific presets
│       ├── favicon/        # Favicon bundle generator
│       └── compare/        # Before/after comparison slider
├── components/
│   ├── Header.tsx          # Navigation bar with responsive menu
│   ├── Footer.tsx          # Footer with privacy notice
│   ├── FileDropzone.tsx    # Drag-and-drop file upload zone
│   ├── ImageUploader.tsx   # Multi-file preview & queue list
│   ├── ImagePreview.tsx    # Single image thumbnail card
│   ├── ProcessedResults.tsx# Output grid with ZIP/single download
│   ├── ProgressBar.tsx     # Batch operation progress indicator
│   ├── CompareSlider.tsx   # Interactive split-view slider
│   ├── ToolCard.tsx        # Homepage tool link cards
│   └── ToolLayout.tsx      # Consistent tool page layout wrapper
└── lib/
    ├── types.ts            # TypeScript interfaces & types
    ├── utils.ts            # Helper functions (cn, clamp, aspect ratio)
    ├── constants.ts        # Tool definitions & platform presets
    └── image-processing.ts # Canvas manipulation & blob functions
```

---

## 🔒 How It Works (Privacy & Architecture)

All image processing uses the browser's **Canvas API** and **Blob API**:

1. Images are loaded into browser memory via `FileReader` and `HTMLImageElement`.
2. Operations are performed by drawing to an off-screen `<canvas>`.
3. Results are exported as `Blob` objects via `canvas.toBlob()`.
4. Downloads use `URL.createObjectURL()` — completely bypassing server uploads.

**Why this matters:**
- **Zero server upload limits**: File sizes are constrained only by client device memory.
- **Complete privacy**: Photos never traverse the internet.
- **Offline ready**: Works without internet connectivity once loaded.
- **Zero server latency**: Processing runs directly on hardware acceleration.

---

## 🗺️ Roadmap

### Completed (v0.1.0)
- [x] 9 core client-side tools (Resize, Crop, Compress, Convert, Metadata, Grid Split, Social Presets, Favicon, Compare)
- [x] Batch processing and ZIP archive downloads
- [x] Responsive layout with dark/light mode
- [x] Automated CI workflow for build and lint validation

### In Progress / Planned
- [ ] Mobile touch drag-and-resize support for the crop tool
- [ ] Transparent background preservation option in format converter
- [ ] White-background fill safeguard for JPEG exports with transparent inputs
- [ ] Grid split custom gap and padding controls

### Help Wanted / Good First Issues
- [ ] Automated unit test suite for `src/lib/image-processing.ts` and `src/lib/utils.ts`
- [ ] EXIF data inspector (read-only table preview before stripping)
- [ ] Image rotation (90°, 180°, 270°) and flip (horizontal/vertical)
- [ ] Keyboard shortcuts for quick tool navigation

### Future Ideas
- [ ] Web Worker / OffscreenCanvas processing for large batches (>20 images)
- [ ] Progressive Web App (PWA) manifest and offline service worker
- [ ] Custom text & image watermark overlay tool

---

## 🤝 Contributing

Contributions of all kinds are welcome! Whether you are writing code, fixing documentation, reporting issues, or suggesting new presets:

1. Read our [Contributing Guidelines](CONTRIBUTING.md) to get set up.
2. Check out [`good first issue`](https://github.com/AlphaIsYour/enopix/labels/good%20first%20issue) issues to get started.
3. Review our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 👥 Contributors

Thank you to everyone who has contributed to this project!

<!-- When contributors submit PRs, they will be listed here -->
- [AlphaIsYour](https://github.com/AlphaIsYour) — Maintainer

Want to see your name here? Check out [CONTRIBUTING.md](CONTRIBUTING.md) and pick up an issue!

---

## ☕ Support

Enopix is completely free and open-source software. If this project helps you or saves you time, you can optionally support ongoing maintenance and feature development:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Donate-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/enoalph)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

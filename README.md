# Eno Image Tools

A privacy-first, browser-based image processing suite. Resize, crop, compress, convert, strip metadata, split into grids, generate social media presets, create favicon packages, and compare before/after — all processed locally on your device. Zero uploads.

## Features

### Core Tools

| Tool | Description |
|------|-------------|
| **Resize** | Scale by exact pixels, percentage, or max dimensions with aspect ratio lock |
| **Crop** | Interactive crop area with drag positioning and aspect ratio presets |
| **Compress** | Reduce file size with quality slider for JPEG, WebP, and PNG |
| **Convert Format** | Transform between PNG, JPEG, WebP, AVIF, and BMP |
| **Remove Metadata** | Strip EXIF/GPS data to protect privacy before sharing |
| **Grid Split** | Divide images into grids (2×2, 3×3, custom) for carousels and puzzles |
| **Social Media Presets** | Auto-resize for Instagram, Twitter, Facebook, LinkedIn, YouTube, Pinterest, TikTok, and more |
| **Favicon Generator** | Generate all required favicon sizes (16px to 512px) with padding and border radius controls |
| **Before / After Compare** | Interactive slider comparison between original and processed images |

### Key Capabilities

- **100% local processing** — uses Canvas API, nothing leaves your browser
- **Batch processing** — upload and process multiple images at once
- **Drag-and-drop** — drop files directly onto the page
- **ZIP download** — download all processed images as a single ZIP file
- **Progress indicators** — see real-time progress during batch operations
- **Responsive design** — works on desktop, tablet, and mobile
- **Dark mode** — automatic dark/light theme based on system preference

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **File handling**: [react-dropzone](https://react-dropzone.js.org/)
- **ZIP export**: [JSZip](https://stuk.github.io/jszip/)
- **Comparison slider**: Custom-built with React

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd 10-eno-image-tools

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Homepage with tool grid
│   ├── globals.css         # Design tokens and global styles
│   └── tools/
│       ├── resize/         # Resize tool page
│       ├── crop/           # Crop tool page
│       ├── compress/       # Compress tool page
│       ├── convert/        # Format converter page
│       ├── metadata/       # Metadata stripper page
│       ├── grid-split/     # Grid split tool page
│       ├── social-presets/ # Social media presets page
│       ├── favicon/        # Favicon generator page
│       └── compare/        # Before/after comparison page
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer with privacy badge
│   ├── FileDropzone.tsx    # Drag-and-drop file upload
│   ├── ImageUploader.tsx   # Image upload with preview
│   ├── ImagePreview.tsx    # Single image preview card
│   ├── ProcessedResults.tsx# Results grid with download
│   ├── ProgressBar.tsx     # Processing progress indicator
│   ├── CompareSlider.tsx   # Before/after slider
│   ├── ToolCard.tsx        # Homepage tool cards
│   └── ToolLayout.tsx      # Tool page layout wrapper
└── lib/
    ├── types.ts            # TypeScript interfaces
    ├── utils.ts            # Utility functions
    ├── constants.ts        # Tool definitions, social presets
    └── image-processing.ts # All image processing functions
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/eno-image-tools)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js — no configuration needed
4. Deploy

No environment variables required. No database needed. Everything runs in the browser.

## How It Works

All image processing uses the browser's **Canvas API** and **Blob API**:

1. Images are loaded into memory via `FileReader` and `HTMLImageElement`
2. Operations are performed by drawing to an off-screen `<canvas>`
3. Results are exported as `Blob` objects via `canvas.toBlob()`
4. Downloads use `URL.createObjectURL()` — no server round-trip

This means:
- **No file size limits** from server upload constraints (limited only by browser memory)
- **No privacy concerns** — images never leave your device
- **Works offline** once the page is loaded
- **Instant processing** — no network latency

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

## Roadmap

- [ ] Undo/redo history per tool
- [ ] Custom watermark overlay
- [ ] Image rotation and flip
- [ ] EXIF data viewer (read-only)
- [ ] Animated GIF frame extraction
- [ ] Color profile conversion
- [ ] Keyboard shortcuts
- [ ] PWA support for offline use
- [ ] Drag-and-drop reordering in batch mode

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License. See [LICENSE](LICENSE) for details.

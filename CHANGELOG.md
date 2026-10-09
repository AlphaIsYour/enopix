# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- GitHub Actions CI workflow for automated lint, type-check, unit tests, and build validation.
- Issue and Pull Request templates for structured community contributions.
- Contributor documentation (`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`).
- Automated unit test suite via `npm test` using Node.js native test runner.
- `type-check` script in `package.json`.
- Touch-screen drag-and-move support for the interactive Crop tool on mobile/tablet devices.
- Customizable Tile Gap and Outer Padding slider controls for the Grid Split tool.
- Transparency preservation option in the Format Converter for WebP, PNG, and AVIF.

### Fixed
- Resolved black background artifact when exporting transparent images (PNG/WebP/SVG) to JPEG in Social Presets.
- Fixed hardcoded white background filling that broke alpha transparency in Format Converter.
- Fixed `splitImageGrid()` calculation to properly account for gap and padding offsets.
- Corrected MIME type and file extension handling for ICO format in Favicon Generator.

## [0.1.0] - 2026-06-12

### Added
- Core client-side image processing suite:
  - **Resize**: Exact pixel, percentage, and max dimensions with aspect-ratio locking.
  - **Crop**: Interactive crop area with aspect-ratio presets.
  - **Compress**: Quality slider and format optimization for JPEG, WebP, and PNG.
  - **Convert Format**: Direct in-browser conversion between PNG, JPEG, WebP, AVIF, and BMP.
  - **Remove Metadata**: Canvas-based EXIF and GPS data stripping for privacy.
  - **Grid Split**: Divide images into tiles for carousels and multi-post grids.
  - **Social Media Presets**: One-click dimensions for Instagram, Twitter/X, Facebook, LinkedIn, YouTube, Pinterest, and TikTok.
  - **Favicon Generator**: Export complete favicon packages (16px to 512px) with custom padding and rounded corners.
  - **Before / After Compare**: Interactive slider for visual quality verification.
- Batch image upload and processing with ZIP export.
- Fully responsive dark-mode enabled UI built with Next.js 16 and Tailwind CSS.
- Zero-upload privacy guarantee using the HTML5 Canvas API.

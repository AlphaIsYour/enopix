# Contributing to Eno Image Tools

Welcome! We are excited that you want to contribute to **Eno Image Tools**. Whether you are fixing a typo, resolving a bug, writing tests, or adding a new client-side tool, your contributions are warmly welcomed!

This project is built on a core philosophy: **100% privacy-first, client-side processing**. No user image ever leaves the browser. Any contribution must strictly preserve this guarantee.

---

## 🧭 Table of Contents
1. [Contributor Code of Conduct](#contributor-code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
3. [Contributor Ladder](#contributor-ladder)
4. [Setting Up Your Local Development Environment](#setting-up-your-local-development-environment)
5. [Development Workflow & Branching](#development-workflow--branching)
6. [Coding & Style Guidelines](#coding--style-guidelines)
7. [Submitting a Pull Request](#submitting-a-pull-request)
8. [Reporting Issues & Getting Help](#reporting-issues--getting-help)
9. [Recognition](#recognition)

---

## 📜 Contributor Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. Please review our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

---

## 🎯 How Can I Contribute?

You do not need to be an expert in graphics programming or Next.js to make an impact:
- **Good First Issues**: Look for issues tagged [`good first issue`](https://github.com/AlphaIsYour/eno-image-tools/labels/good%20first%20issue). These are small, self-contained tasks designed specifically for new contributors.
- **Documentation**: Improve explanations, fix grammar, document edge cases, or add clear usage examples.
- **Bug Fixes**: Help squash browser inconsistencies, handle edge-case images, or fix canvas rendering glitches.
- **UI & Accessibility**: Improve keyboard navigation, high-contrast states, and mobile touch interactions.
- **Tool Enhancements**: Improve image resampling, add presets, or optimize canvas memory usage.

---

## 🪜 Contributor Ladder

We want you to grow as a long-term collaborator:

```
┌────────────────────────────────────────────────────────┐
│  Level 1: First Steps (Beginner)                       │
│  • Fix typos, clarify docs, update presets             │
│  • Add missing tests or fix minor UI styling           │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│  Level 2: Core Enhancements (Intermediate)             │
│  • Fix complex canvas processing edge cases            │
│  • Implement new presets or format transformations     │
│  • Improve drag-and-drop or interactive crop UI        │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│  Level 3: Architecture & Feature Leads (Advanced)      │
│  • Design and implement new standalone tools           │
│  • Off-thread processing with Web Workers / Offscreen  │
│  • Review community PRs and guide new contributors     │
└────────────────────────────────────────────────────────┘
```

---

## 💻 Setting Up Your Local Development Environment

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher (Node 20+ recommended)
- `npm` (or `pnpm` / `bun`)
- Git

### Steps

1. **Fork and Clone**
   ```bash
   git clone https://github.com/<your-username>/eno-image-tools.git
   cd eno-image-tools
   ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/AlphaIsYour/eno-image-tools.git
   ```

3. **Install Dependencies**
   ```bash
   npm ci
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Verify Quality Checks**
   ```bash
   # Run ESLint
   npm run lint

   # Run TypeScript compilation check
   npm run type-check

   # Test production build
   npm run build
   ```

---

## 🌿 Development Workflow & Branching

1. Ensure your local `master` branch is synchronized with upstream:
   ```bash
   git checkout master
   git pull upstream master
   ```
2. Create a focused feature branch with a descriptive name:
   ```bash
   # Examples:
   git checkout -b fix/crop-touch-drag
   git checkout -b feat/watermark-overlay
   git checkout -b docs/clarify-favicon-format
   ```
3. Make atomic, well-described commits:
   ```bash
   git commit -m "fix(crop): enable touch events on mobile crop canvas"
   ```

---

## 🎨 Coding & Style Guidelines

- **Zero-Server Rule**: Under no circumstances should user image binaries or metadata be transmitted over network requests. Everything must be processed in-browser using the Canvas API, Web Workers, or Blobs.
- **Modern Next.js & React**:
  - Use Next.js App Router conventions.
  - Interactive client components must include `'use client';` at the top.
  - Use TypeScript for all source code. Avoid `any`; define explicit types in `src/lib/types.ts`.
- **Styling**:
  - We use Tailwind CSS v4 utility classes and semantic CSS variables.
  - Keep styling consistent with existing components in `src/components/`.
  - Maintain dark/light mode compatibility.
- **Resource Cleanup**: Always revoke object URLs (`URL.revokeObjectURL(url)`) when previews or blobs are no longer needed to prevent browser memory leaks.

---

## 🚀 Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin <your-branch-name>
   ```
2. Open a Pull Request targeting `master` of `AlphaIsYour/eno-image-tools`.
3. Complete the PR template description:
   - Reference the issue being solved (`Fixes #123`).
   - Describe what changed and include screenshots/GIFs for UI changes.
   - Confirm that all quality checks (`npm run lint`, `npm run type-check`, `npm run build`) pass.
4. Maintainers will review your PR and provide friendly, constructive feedback.

---

## 🙋 Reporting Issues & Getting Help

- **Found a bug?** Check existing issues first. If it has not been reported, open a [Bug Report](https://github.com/AlphaIsYour/eno-image-tools/issues/new?template=bug_report.yml).
- **Have an idea?** Open a [Feature Request](https://github.com/AlphaIsYour/eno-image-tools/issues/new?template=feature_request.yml).
- **Need help or have questions?** Feel free to start a discussion or leave a comment on the relevant issue. We are here to help you succeed!

---

## 🌟 Recognition

Every contribution counts! Whether you write code, report bugs, improve documentation, or suggest features, you will be celebrated in our release notes and contributor acknowledgments.

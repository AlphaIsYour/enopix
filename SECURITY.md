# Security Policy

## Supported Versions

We actively maintain the latest release of Enopix.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Core Security & Privacy Architecture

Enopix is strictly designed as an **offline-first, zero-upload** application.
- All image decoding, transformation, cropping, and encoding operations are executed purely client-side within the user's browser sandbox using HTML5 Canvas and Blob APIs.
- No image binary, canvas data, or EXIF metadata is ever sent to any remote server or third-party service.

## Potential Security Considerations

Because images are processed client-side, the primary threat models involve:
1. **Malicious SVG Payloads**: SVG files containing embedded `<script>` or inline event handlers executed during parsing.
2. **Resource Exhaustion (Canvas Decompression Bombs)**: Images with extreme dimensions designed to cause browser memory crashes.
3. **Dependency Vulnerabilities**: Third-party JavaScript library vulnerabilities.

## Reporting a Vulnerability

If you discover a security vulnerability or potential privacy leak, please do **not** open a public issue.

Instead, please send an email directly to the maintainer:
- **Email**: [alphrenoorz@gmail.com](mailto:alphrenoorz@gmail.com)
- **Subject line**: `[SECURITY] Vulnerability in Enopix`

Please include:
- A description of the vulnerability and attack vector
- Steps or a minimal test file to reproduce the issue
- Potential mitigation or fix recommendations if available

We take all security reports seriously and will acknowledge receipt within 48 hours.

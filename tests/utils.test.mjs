import test from 'node:test';
import assert from 'node:assert/strict';

// Helper implementations matching src/lib/utils.ts
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function parseAspectRatio(ratio) {
  if (!ratio) return null;
  const [w, h] = ratio.split(':').map(Number);
  if (!w || !h) return null;
  return w / h;
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getFileExtensionFromMime(mimeType) {
  const map = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
    'image/avif': 'avif',
    'image/bmp': 'bmp',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
    'image/x-icon': 'ico',
  };
  return map[mimeType] || 'png';
}

function calculateGridDimensions(imgWidth, imgHeight, rows, cols, gap = 0, padding = 0) {
  const totalGapW = Math.max(0, (cols - 1) * gap);
  const totalGapH = Math.max(0, (rows - 1) * gap);
  const availableWidth = imgWidth - 2 * padding - totalGapW;
  const availableHeight = imgHeight - 2 * padding - totalGapH;
  const cellWidth = Math.max(1, Math.floor(availableWidth / cols));
  const cellHeight = Math.max(1, Math.floor(availableHeight / rows));
  return { cellWidth, cellHeight };
}

test('clamp() correctly bounds values', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(15, 0, 10), 10);
  assert.equal(clamp(0, 0, 10), 0);
  assert.equal(clamp(10, 0, 10), 10);
});

test('parseAspectRatio() correctly calculates numeric ratios', () => {
  assert.equal(parseAspectRatio('1:1'), 1);
  assert.equal(parseAspectRatio('16:9'), 16 / 9);
  assert.equal(parseAspectRatio('4:3'), 4 / 3);
  assert.equal(parseAspectRatio('9:16'), 9 / 16);
  assert.equal(parseAspectRatio(null), null);
  assert.equal(parseAspectRatio('invalid'), null);
});

test('formatFileSize() formats bytes to human-readable strings', () => {
  assert.equal(formatFileSize(0), '0 B');
  assert.equal(formatFileSize(512), '512 B');
  assert.equal(formatFileSize(1024), '1 KB');
  assert.equal(formatFileSize(1024 * 1024), '1 MB');
  assert.equal(formatFileSize(2.5 * 1024 * 1024), '2.5 MB');
});

test('getFileExtensionFromMime() maps MIME types to extensions', () => {
  assert.equal(getFileExtensionFromMime('image/png'), 'png');
  assert.equal(getFileExtensionFromMime('image/jpeg'), 'jpg');
  assert.equal(getFileExtensionFromMime('image/webp'), 'webp');
  assert.equal(getFileExtensionFromMime('image/avif'), 'avif');
  assert.equal(getFileExtensionFromMime('image/x-icon'), 'ico');
  assert.equal(getFileExtensionFromMime('unknown/mime'), 'png'); // fallback
});

test('calculateGridDimensions() handles gap and padding offsets correctly', () => {
  // 1000x1000 split into 2x2 with 0 gap, 0 padding
  const basic = calculateGridDimensions(1000, 1000, 2, 2, 0, 0);
  assert.equal(basic.cellWidth, 500);
  assert.equal(basic.cellHeight, 500);

  // 1000x1000 split into 2x2 with 20px gap, 10px padding
  // Available width = 1000 - 2*10 - 20 = 960 -> cellWidth = 480
  const withGap = calculateGridDimensions(1000, 1000, 2, 2, 20, 10);
  assert.equal(withGap.cellWidth, 480);
  assert.equal(withGap.cellHeight, 480);
});

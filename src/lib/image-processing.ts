import {
  ImageFile,
  ProcessedImage,
  ResizeOptions,
  CropOptions,
  CompressOptions,
  ConvertOptions,
  GridSplitOptions,
  FaviconOptions,
} from './types';

let idCounter = 0;
function generateId(): string {
  return `img_${Date.now()}_${++idCounter}`;
}

export function loadImageFile(file: File): Promise<ImageFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const thumbnail = createThumbnail(img, 200);
        resolve({
          id: generateId(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          width: img.width,
          height: img.height,
          dataUrl,
          thumbnail,
        });
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = dataUrl;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function createThumbnail(img: HTMLImageElement, maxSize: number): string {
  const canvas = document.createElement('canvas');
  const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1);
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.7);
}

function imageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

async function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob'));
      },
      type,
      quality
    );
  });
}

export async function resizeImage(
  imageFile: ImageFile,
  options: ResizeOptions
): Promise<ProcessedImage> {
  const img = await imageFromDataUrl(imageFile.dataUrl);
  let targetWidth: number;
  let targetHeight: number;

  switch (options.mode) {
    case 'percentage':
      targetWidth = Math.round(img.width * (options.percentage / 100));
      targetHeight = Math.round(img.height * (options.percentage / 100));
      break;
    case 'max-width':
      targetWidth = Math.min(options.maxWidth, img.width);
      targetHeight = options.maintainAspectRatio
        ? Math.round((targetWidth / img.width) * img.height)
        : img.height;
      break;
    case 'max-height':
      targetHeight = Math.min(options.maxHeight, img.height);
      targetWidth = options.maintainAspectRatio
        ? Math.round((targetHeight / img.height) * img.width)
        : img.width;
      break;
    default: // exact
      targetWidth = options.width;
      targetHeight = options.height;
      if (options.maintainAspectRatio) {
        const ratio = img.width / img.height;
        if (targetWidth / targetHeight > ratio) {
          targetWidth = Math.round(targetHeight * ratio);
        } else {
          targetHeight = Math.round(targetWidth / ratio);
        }
      }
  }

  targetWidth = Math.max(1, targetWidth);
  targetHeight = Math.max(1, targetHeight);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d')!;

  // High quality resize
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const blob = await canvasToBlob(canvas, imageFile.type, 0.92);
  const newName = addSuffixToFilename(imageFile.name, '_resized');

  return {
    id: generateId(),
    originalId: imageFile.id,
    name: newName,
    blob,
    dataUrl: canvas.toDataURL(imageFile.type, 0.92),
    width: targetWidth,
    height: targetHeight,
    size: blob.size,
    type: imageFile.type,
  };
}

export async function cropImage(
  imageFile: ImageFile,
  options: CropOptions
): Promise<ProcessedImage> {
  const img = await imageFromDataUrl(imageFile.dataUrl);
  const { x, y, width, height } = options;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

  const blob = await canvasToBlob(canvas, imageFile.type, 0.92);
  const newName = addSuffixToFilename(imageFile.name, '_cropped');

  return {
    id: generateId(),
    originalId: imageFile.id,
    name: newName,
    blob,
    dataUrl: canvas.toDataURL(imageFile.type, 0.92),
    width,
    height,
    size: blob.size,
    type: imageFile.type,
  };
}

export async function compressImage(
  imageFile: ImageFile,
  options: CompressOptions
): Promise<ProcessedImage> {
  const img = await imageFromDataUrl(imageFile.dataUrl);
  const mimeType = `image/${options.format}`;
  const quality = options.quality / 100;

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;

  // For JPEG, fill white background (no transparency)
  if (options.format === 'jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);
  const blob = await canvasToBlob(canvas, mimeType, quality);
  const ext = options.format === 'jpeg' ? '.jpg' : `.${options.format}`;
  const newName = replaceExtension(imageFile.name, ext);

  return {
    id: generateId(),
    originalId: imageFile.id,
    name: newName,
    blob,
    dataUrl: canvas.toDataURL(mimeType, quality),
    width: img.width,
    height: img.height,
    size: blob.size,
    type: mimeType,
  };
}

export async function convertImage(
  imageFile: ImageFile,
  options: ConvertOptions
): Promise<ProcessedImage> {
  const img = await imageFromDataUrl(imageFile.dataUrl);
  const mimeType = `image/${options.format}`;
  const quality = options.quality / 100;

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;

  if (options.backgroundColor) {
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else if (options.format === 'jpeg' || options.format === 'bmp') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  let blob: Blob;
  try {
    blob = await canvasToBlob(canvas, mimeType, quality);
  } catch {
    // Fallback for formats that may not be supported
    blob = await canvasToBlob(canvas, 'image/png', 1);
  }

  const ext = options.format === 'jpeg' ? '.jpg' : `.${options.format}`;
  const newName = replaceExtension(imageFile.name, ext);

  return {
    id: generateId(),
    originalId: imageFile.id,
    name: newName,
    blob,
    dataUrl: canvas.toDataURL(mimeType, quality),
    width: img.width,
    height: img.height,
    size: blob.size,
    type: mimeType,
  };
}

export async function stripMetadata(imageFile: ImageFile): Promise<ProcessedImage> {
  const img = await imageFromDataUrl(imageFile.dataUrl);

  // Redrawing on canvas strips all EXIF metadata
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);

  const blob = await canvasToBlob(canvas, imageFile.type, 0.95);
  const newName = addSuffixToFilename(imageFile.name, '_clean');

  return {
    id: generateId(),
    originalId: imageFile.id,
    name: newName,
    blob,
    dataUrl: canvas.toDataURL(imageFile.type, 0.95),
    width: img.width,
    height: img.height,
    size: blob.size,
    type: imageFile.type,
  };
}

export async function splitImageGrid(
  imageFile: ImageFile,
  options: GridSplitOptions
): Promise<ProcessedImage[]> {
  const img = await imageFromDataUrl(imageFile.dataUrl);
  const { rows, cols, backgroundColor } = options;

  const cellWidth = Math.floor(img.width / cols);
  const cellHeight = Math.floor(img.height / rows);
  const results: ProcessedImage[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const canvas = document.createElement('canvas');
      canvas.width = cellWidth;
      canvas.height = cellHeight;
      const ctx = canvas.getContext('2d')!;

      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, cellWidth, cellHeight);
      }

      ctx.drawImage(
        img,
        c * cellWidth,
        r * cellHeight,
        cellWidth,
        cellHeight,
        0,
        0,
        cellWidth,
        cellHeight
      );

      const blob = await canvasToBlob(canvas, imageFile.type, 0.95);
      const ext = getFileExtension(imageFile.name);
      const baseName = imageFile.name.replace(`.${ext}`, '');
      const newName = `${baseName}_${r + 1}-${c + 1}.${ext}`;

      results.push({
        id: generateId(),
        originalId: imageFile.id,
        name: newName,
        blob,
        dataUrl: canvas.toDataURL(imageFile.type, 0.95),
        width: cellWidth,
        height: cellHeight,
        size: blob.size,
        type: imageFile.type,
      });
    }
  }

  return results;
}

export async function generateSocialPreset(
  imageFile: ImageFile,
  targetWidth: number,
  targetHeight: number,
  presetName: string
): Promise<ProcessedImage> {
  const img = await imageFromDataUrl(imageFile.dataUrl);

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d')!;

  // Smart cover-fit: fill canvas while maintaining aspect ratio
  const sourceRatio = img.width / img.height;
  const targetRatio = targetWidth / targetHeight;

  let sx = 0, sy = 0, sw = img.width, sh = img.height;

  if (sourceRatio > targetRatio) {
    // Source is wider — crop sides
    sw = img.height * targetRatio;
    sx = (img.width - sw) / 2;
  } else {
    // Source is taller — crop top/bottom
    sh = img.width / targetRatio;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);

  const blob = await canvasToBlob(canvas, 'image/jpeg', 0.92);
  const cleanName = presetName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const baseName = imageFile.name.replace(/\.[^.]+$/, '');
  const newName = `${baseName}_${cleanName}.jpg`;

  return {
    id: generateId(),
    originalId: imageFile.id,
    name: newName,
    blob,
    dataUrl: canvas.toDataURL('image/jpeg', 0.92),
    width: targetWidth,
    height: targetHeight,
    size: blob.size,
    type: 'image/jpeg',
  };
}

export async function generateFavicons(
  imageFile: ImageFile,
  options: FaviconOptions
): Promise<ProcessedImage[]> {
  const img = await imageFromDataUrl(imageFile.dataUrl);
  const results: ProcessedImage[] = [];

  for (const size of options.sizes) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    if (options.backgroundColor) {
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(0, 0, size, size);
    }

    const padding = Math.round(size * (options.padding / 100));
    const innerSize = size - padding * 2;

    // Apply border radius if specified
    if (options.borderRadius > 0) {
      const radius = Math.round(innerSize * (options.borderRadius / 100));
      ctx.beginPath();
      ctx.roundRect(padding, padding, innerSize, innerSize, radius);
      ctx.clip();
    }

    ctx.drawImage(img, padding, padding, innerSize, innerSize);

    const mimeType = options.format === 'ico' ? 'image/png' : 'image/png';
    const blob = await canvasToBlob(canvas, mimeType, 1);
    const baseName = imageFile.name.replace(/\.[^.]+$/, '');
    const newName = `${baseName}-${size}x${size}.png`;

    results.push({
      id: generateId(),
      originalId: imageFile.id,
      name: newName,
      blob,
      dataUrl: canvas.toDataURL(mimeType, 1),
      width: size,
      height: size,
      size: blob.size,
      type: mimeType,
    });
  }

  return results;
}

// Utility functions
function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || 'png';
}

function replaceExtension(filename: string, newExt: string): string {
  const base = filename.replace(/\.[^.]+$/, '');
  return `${base}${newExt}`;
}

function addSuffixToFilename(filename: string, suffix: string): string {
  const ext = getFileExtension(filename);
  const base = filename.replace(`.${ext}`, '');
  return `${base}${suffix}.${ext}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getFileExtensionFromMime(mimeType: string): string {
  const map: Record<string, string> = {
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

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadAllAsZip(images: ProcessedImage[], zipName: string = 'eno-images.zip'): Promise<void> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  for (const img of images) {
    zip.file(img.name, img.blob);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  downloadBlob(content, zipName);
}

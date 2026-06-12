export interface ImageFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  width: number;
  height: number;
  dataUrl: string;
  thumbnail: string;
}

export interface ProcessedImage {
  id: string;
  originalId: string;
  name: string;
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  size: number;
  type: string;
}

export interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  mode: 'exact' | 'percentage' | 'max-width' | 'max-height';
  percentage: number;
  maxWidth: number;
  maxHeight: number;
  resample: 'bicubic' | 'bilinear' | 'nearest';
}

export interface CropOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio: string | null;
}

export interface CompressOptions {
  quality: number; // 0-100
  format: 'jpeg' | 'webp' | 'png';
  targetSizeKB?: number;
}

export interface ConvertOptions {
  format: 'png' | 'jpeg' | 'webp' | 'avif' | 'bmp' | 'ico';
  quality: number;
  backgroundColor?: string;
}

export interface GridSplitOptions {
  rows: number;
  cols: number;
  gap: number;
  padding: number;
  backgroundColor: string;
}

export interface SocialPreset {
  name: string;
  platform: string;
  width: number;
  height: number;
  description: string;
  icon: string;
}

export interface FaviconSize {
  size: number;
  label: string;
  usage: string;
}

export interface FaviconOptions {
  sizes: number[];
  format: 'png' | 'ico';
  backgroundColor?: string;
  padding: number;
  borderRadius: number;
}

export interface ProcessResult {
  success: boolean;
  images: ProcessedImage[];
  error?: string;
}

export interface ProcessingProgress {
  current: number;
  total: number;
  currentFile: string;
  stage: string;
}

export type OutputFormat = 'png' | 'jpeg' | 'webp' | 'avif' | 'bmp';

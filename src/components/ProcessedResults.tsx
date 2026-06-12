'use client';

import { Download, Package, Trash2, Eye } from 'lucide-react';
import { ProcessedImage } from '@/lib/types';
import { formatFileSize, downloadBlob, downloadAllAsZip } from '@/lib/image-processing';
import { cn } from '@/lib/utils';

interface ProcessedResultsProps {
  images: ProcessedImage[];
  onClear?: () => void;
  className?: string;
}

export function ProcessedResults({ images, onClear, className }: ProcessedResultsProps) {
  if (images.length === 0) return null;

  const totalSize = images.reduce((sum, img) => sum + img.size, 0);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Results</h3>
          <p className="text-sm text-muted-foreground">
            {images.length} image{images.length !== 1 ? 's' : ''} · {formatFileSize(totalSize)} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          {images.length > 1 && (
            <button
              onClick={() => downloadAllAsZip(images)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Package className="h-4 w-4" />
              Download ZIP
            </button>
          )}
          {onClear && (
            <button
              onClick={onClear}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative rounded-xl border border-border/50 bg-card overflow-hidden animate-fade-in"
          >
            <div className="aspect-square overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.dataUrl}
                alt={img.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-2.5">
              <p className="text-xs font-medium truncate" title={img.name}>
                {img.name}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {img.width}×{img.height} · {formatFileSize(img.size)}
              </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={img.dataUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-gray-900 hover:bg-white transition-colors"
                title="Preview"
              >
                <Eye className="h-4 w-4" />
              </a>
              <button
                onClick={() => downloadBlob(img.blob, img.name)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-gray-900 hover:bg-white transition-colors"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

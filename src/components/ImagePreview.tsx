'use client';

import { X, Download } from 'lucide-react';
import { formatFileSize } from '@/lib/image-processing';
import { cn } from '@/lib/utils';

interface ImagePreviewProps {
  src: string;
  name: string;
  width?: number;
  height?: number;
  size?: number;
  onRemove?: () => void;
  onDownload?: () => void;
  className?: string;
  compact?: boolean;
}

export function ImagePreview({
  src,
  name,
  width,
  height,
  size,
  onRemove,
  onDownload,
  className,
  compact = false,
}: ImagePreviewProps) {
  return (
    <div
      className={cn(
        'group relative rounded-xl border border-border/50 bg-card overflow-hidden',
        compact ? 'flex items-center gap-3 p-2' : 'p-3',
        className
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-lg bg-muted',
          compact ? 'h-14 w-14 shrink-0' : 'aspect-video w-full mb-3'
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name}
          className={cn(
            'object-contain w-full h-full',
            compact ? '' : 'group-hover:scale-105 transition-transform duration-300'
          )}
        />
      </div>

      <div className={cn('min-w-0', compact ? 'flex-1' : '')}>
        <p className="text-sm font-medium truncate" title={name}>
          {name}
        </p>
        {(width || size) && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {width && height && `${width} × ${height}`}
            {width && size && ' · '}
            {size && formatFileSize(size)}
          </p>
        )}
      </div>

      {/* Actions */}
      <div
        className={cn(
          'flex items-center gap-1',
          compact ? '' : 'absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
        )}
      >
        {onDownload && (
          <button
            onClick={onDownload}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/90 backdrop-blur-sm border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            title="Download"
          >
            <Download className="h-4 w-4" />
          </button>
        )}
        {onRemove && (
          <button
            onClick={onRemove}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/90 backdrop-blur-sm border border-border/50 hover:bg-destructive hover:text-white hover:border-destructive transition-all"
            title="Remove"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

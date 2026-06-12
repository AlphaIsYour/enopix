'use client';

import { useCallback, useState } from 'react';
import { ImageFile } from '@/lib/types';
import { loadImageFile } from '@/lib/image-processing';
import { FileDropzone } from './FileDropzone';
import { ImagePreview } from './ImagePreview';
import { ProgressBar } from './ProgressBar';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  images: ImageFile[];
  onImagesChange: (images: ImageFile[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}

export function ImageUploader({
  images,
  onImagesChange,
  multiple = true,
  maxFiles = 20,
  className,
}: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const handleFiles = useCallback(
    async (files: File[]) => {
      setLoading(true);
      setProgress({ current: 0, total: files.length });

      const newImages: ImageFile[] = [];

      for (let i = 0; i < files.length; i++) {
        try {
          const img = await loadImageFile(files[i]);
          newImages.push(img);
        } catch (err) {
          console.error(`Failed to load ${files[i].name}:`, err);
        }
        setProgress({ current: i + 1, total: files.length });
      }

      const updated = multiple ? [...images, ...newImages] : newImages;
      onImagesChange(updated.slice(0, maxFiles));
      setLoading(false);
    },
    [images, onImagesChange, multiple, maxFiles]
  );

  const removeImage = useCallback(
    (id: string) => {
      onImagesChange(images.filter((img) => img.id !== id));
    },
    [images, onImagesChange]
  );

  return (
    <div className={cn('space-y-4', className)}>
      <FileDropzone onFiles={handleFiles} multiple={multiple} maxFiles={maxFiles} />

      {loading && (
        <ProgressBar
          current={progress.current}
          total={progress.total}
          label="Loading images..."
        />
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img) => (
            <ImagePreview
              key={img.id}
              src={img.thumbnail || img.dataUrl}
              name={img.name}
              width={img.width}
              height={img.height}
              size={img.size}
              onRemove={() => removeImage(img.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

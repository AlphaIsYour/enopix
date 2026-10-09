'use client';

import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Upload, ImagePlus, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/constants';
import { formatFileSize } from '@/lib/image-processing';

interface FileDropzoneProps {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}

export function FileDropzone({ onFiles, multiple = true, maxFiles = 20, className }: FileDropzoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setError(null);

      if (fileRejections.length > 0) {
        const firstError = fileRejections[0].errors[0];
        setError(firstError.message);
        return;
      }

      if (acceptedFiles.length > 0) {
        onFiles(acceptedFiles);
      }
    },
    [onFiles]
  );

  const accept: Record<string, string[]> = {};
  for (const mime of ACCEPTED_IMAGE_TYPES) {
    const ext = mime.split('/')[1];
    if (mime === 'image/jpeg') {
      accept[mime] = ['.jpg', '.jpeg'];
    } else if (mime === 'image/svg+xml') {
      accept[mime] = ['.svg'];
    } else {
      accept[mime] = [`.${ext}`];
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxFiles,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <div className={cn('w-full', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-12 transition-all duration-200 cursor-pointer group bg-card/60 backdrop-blur-sm',
          isDragActive
            ? 'border-[#44ACFF] bg-[#89D4FF]/15 scale-[1.01]'
            : 'border-border/80 hover:border-[#44ACFF]/60 hover:bg-[#89D4FF]/5'
        )}
      >
        <input {...getInputProps()} />

        <div
          className={cn(
            'flex h-16 w-16 items-center justify-center rounded-2xl mb-4 transition-all duration-200',
            isDragActive
              ? 'bg-[#44ACFF]/20 scale-110'
              : 'bg-muted group-hover:bg-[#89D4FF]/20 group-hover:scale-105'
          )}
        >
          {isDragActive ? (
            <ImagePlus className="h-8 w-8 text-[#44ACFF]" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground group-hover:text-[#44ACFF] transition-colors" />
          )}
        </div>

        <div className="text-center">
          <p className="text-base font-semibold text-foreground">
            {isDragActive ? 'Lepaskan gambar di sini...' : 'Tarik & lepas gambar di sini'}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            atau <span className="text-[#44ACFF] font-semibold underline underline-offset-2">pilih file</span> dari perangkatmu
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            PNG, JPEG, WebP, GIF, BMP, SVG, AVIF • Maks {formatFileSize(MAX_FILE_SIZE)} per file
            {multiple && ` • Hingga ${maxFiles} file`}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
}

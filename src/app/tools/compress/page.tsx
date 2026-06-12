'use client';

import { useState, useCallback } from 'react';
import { Minimize2, Play, Loader2, TrendingDown } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { ProcessedResults } from '@/components/ProcessedResults';
import { ImageFile, ProcessedImage, CompressOptions } from '@/lib/types';
import { compressImage, formatFileSize } from '@/lib/image-processing';
import { FORMAT_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function CompressPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [options, setOptions] = useState<CompressOptions>({
    quality: 80,
    format: 'jpeg',
  });

  const handleProcess = useCallback(async () => {
    if (images.length === 0) return;
    setProcessing(true);
    const allResults: ProcessedImage[] = [];

    for (const img of images) {
      try {
        const result = await compressImage(img, options);
        allResults.push(result);
      } catch (err) {
        console.error(`Failed to compress ${img.name}:`, err);
      }
    }

    setResults(allResults);
    setProcessing(false);
  }, [images, options]);

  const totalOriginal = images.reduce((s, i) => s + i.size, 0);
  const totalResult = results.reduce((s, i) => s + i.size, 0);
  const savings = totalOriginal > 0 && results.length > 0
    ? Math.round(((totalOriginal - totalResult) / totalOriginal) * 100)
    : 0;

  return (
    <ToolLayout
      title="Compress Images"
      description="Reduce file size with adjustable quality control. Perfect for web optimization and faster loading."
      icon={<Minimize2 className="h-7 w-7 text-white" />}
      color="from-green-500 to-emerald-500"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            1. Upload Images
          </h2>
          <ImageUploader images={images} onImagesChange={setImages} />
        </section>

        {images.length > 0 && (
          <section className="animate-slide-up">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              2. Compression Settings
            </h2>
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-5">
              {/* Format */}
              <div>
                <label className="block text-sm font-medium mb-2">Output Format</label>
                <div className="flex flex-wrap gap-2">
                  {FORMAT_OPTIONS.filter((f) => ['jpeg', 'webp', 'png'].includes(f.value)).map((fmt) => (
                    <button
                      key={fmt.value}
                      onClick={() => setOptions((o) => ({ ...o, format: fmt.value as CompressOptions['format'] }))}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                        options.format === fmt.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {FORMAT_OPTIONS.find((f) => f.value === options.format)?.description}
                </p>
              </div>

              {/* Quality */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Quality</label>
                  <span className="text-sm font-mono text-muted-foreground">{options.quality}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={options.quality}
                  onChange={(e) => setOptions((o) => ({ ...o, quality: Number(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Smallest file</span>
                  <span>Best quality</span>
                </div>
              </div>

              {/* Stats */}
              {results.length > 0 && (
                <div className="flex items-center gap-4 rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3">
                  <TrendingDown className="h-5 w-5 text-green-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">
                      {savings > 0 ? `${savings}% smaller` : 'Similar size'}
                    </p>
                    <p className="text-xs text-green-600/80 dark:text-green-400/80">
                      {formatFileSize(totalOriginal)} → {formatFileSize(totalResult)}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleProcess}
                disabled={images.length === 0 || processing}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Compress {images.length > 1 ? `${images.length} Images` : 'Image'}
              </button>
            </div>
          </section>
        )}

        <ProcessedResults images={results} onClear={() => setResults([])} />
      </div>
    </ToolLayout>
  );
}

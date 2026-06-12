'use client';

import { useState, useCallback } from 'react';
import { Maximize2, Play, Loader2 } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { ProcessedResults } from '@/components/ProcessedResults';
import { ImageFile, ProcessedImage, ResizeOptions } from '@/lib/types';
import { resizeImage } from '@/lib/image-processing';
import { cn } from '@/lib/utils';

export default function ResizePage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [options, setOptions] = useState<ResizeOptions>({
    width: 800,
    height: 600,
    maintainAspectRatio: true,
    mode: 'exact',
    percentage: 50,
    maxWidth: 1200,
    maxHeight: 1200,
    resample: 'bicubic',
  });

  const handleProcess = useCallback(async () => {
    if (images.length === 0) return;
    setProcessing(true);
    const allResults: ProcessedImage[] = [];

    for (const img of images) {
      try {
        const result = await resizeImage(img, options);
        allResults.push(result);
      } catch (err) {
        console.error(`Failed to resize ${img.name}:`, err);
      }
    }

    setResults(allResults);
    setProcessing(false);
  }, [images, options]);

  return (
    <ToolLayout
      title="Resize Images"
      description="Scale images by exact pixels, percentage, or maximum dimensions. Maintains quality with high-quality resampling."
      icon={<Maximize2 className="h-7 w-7 text-white" />}
      color="from-blue-500 to-cyan-500"
    >
      <div className="space-y-8">
        {/* Upload */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            1. Upload Images
          </h2>
          <ImageUploader images={images} onImagesChange={setImages} />
        </section>

        {/* Options */}
        {images.length > 0 && (
          <section className="animate-slide-up">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              2. Resize Options
            </h2>
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-5">
              {/* Mode tabs */}
              <div className="flex flex-wrap gap-2">
                {(['exact', 'percentage', 'max-width', 'max-height'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setOptions((o) => ({ ...o, mode }))}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      options.mode === mode
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {mode === 'exact' && 'Exact Size'}
                    {mode === 'percentage' && 'Percentage'}
                    {mode === 'max-width' && 'Max Width'}
                    {mode === 'max-height' && 'Max Height'}
                  </button>
                ))}
              </div>

              {/* Mode-specific inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {options.mode === 'exact' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Width (px)</label>
                      <input
                        type="number"
                        value={options.width}
                        onChange={(e) => setOptions((o) => ({ ...o, width: Number(e.target.value) }))}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        min={1}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Height (px)</label>
                      <input
                        type="number"
                        value={options.height}
                        onChange={(e) => setOptions((o) => ({ ...o, height: Number(e.target.value) }))}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        min={1}
                      />
                    </div>
                  </>
                )}

                {options.mode === 'percentage' && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Scale ({options.percentage}%)</label>
                    <input
                      type="range"
                      min={1}
                      max={200}
                      value={options.percentage}
                      onChange={(e) => setOptions((o) => ({ ...o, percentage: Number(e.target.value) }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1%</span>
                      <span>100%</span>
                      <span>200%</span>
                    </div>
                  </div>
                )}

                {options.mode === 'max-width' && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Max Width (px)</label>
                    <input
                      type="number"
                      value={options.maxWidth}
                      onChange={(e) => setOptions((o) => ({ ...o, maxWidth: Number(e.target.value) }))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      min={1}
                    />
                  </div>
                )}

                {options.mode === 'max-height' && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Max Height (px)</label>
                    <input
                      type="number"
                      value={options.maxHeight}
                      onChange={(e) => setOptions((o) => ({ ...o, maxHeight: Number(e.target.value) }))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      min={1}
                    />
                  </div>
                )}
              </div>

              {/* Maintain aspect ratio */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.maintainAspectRatio}
                  onChange={(e) => setOptions((o) => ({ ...o, maintainAspectRatio: e.target.checked }))}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium">Maintain aspect ratio</span>
              </label>

              {/* Process button */}
              <button
                onClick={handleProcess}
                disabled={images.length === 0 || processing}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                Resize {images.length > 1 ? `${images.length} Images` : 'Image'}
              </button>
            </div>
          </section>
        )}

        {/* Results */}
        <ProcessedResults images={results} onClear={() => setResults([])} />
      </div>
    </ToolLayout>
  );
}

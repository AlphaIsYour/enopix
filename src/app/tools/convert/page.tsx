'use client';

import { useState, useCallback } from 'react';
import { RefreshCw, Play, Loader2 } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { ProcessedResults } from '@/components/ProcessedResults';
import { ImageFile, ProcessedImage, ConvertOptions } from '@/lib/types';
import { convertImage } from '@/lib/image-processing';
import { FORMAT_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function ConvertPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [options, setOptions] = useState<ConvertOptions>({
    format: 'webp',
    quality: 92,
    backgroundColor: '#ffffff',
  });

  const handleProcess = useCallback(async () => {
    if (images.length === 0) return;
    setProcessing(true);
    const allResults: ProcessedImage[] = [];

    for (const img of images) {
      try {
        const result = await convertImage(img, options);
        allResults.push(result);
      } catch (err) {
        console.error(`Failed to convert ${img.name}:`, err);
      }
    }

    setResults(allResults);
    setProcessing(false);
  }, [images, options]);

  return (
    <ToolLayout
      title="Convert Format"
      description="Transform images between PNG, JPEG, WebP, AVIF, and BMP with a single click."
      icon={<RefreshCw className="h-7 w-7 text-white" />}
      color="from-orange-500 to-amber-500"
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
              2. Conversion Settings
            </h2>
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-5">
              {/* Format */}
              <div>
                <label className="block text-sm font-medium mb-2">Convert To</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {FORMAT_OPTIONS.map((fmt) => (
                    <button
                      key={fmt.value}
                      onClick={() => setOptions((o) => ({ ...o, format: fmt.value as ConvertOptions['format'] }))}
                      className={cn(
                        'flex flex-col items-center gap-1 px-3 py-3 rounded-xl text-sm font-medium transition-all border',
                        options.format === fmt.value
                          ? 'bg-primary/10 border-primary/30 text-primary'
                          : 'border-transparent bg-muted text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <span className="text-lg font-bold">.{fmt.value}</span>
                      <span className="text-[11px]">{fmt.description.split(',')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality (for lossy formats) */}
              {['jpeg', 'webp', 'avif'].includes(options.format) && (
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
                </div>
              )}

              {/* Background color for formats without transparency */}
              {['jpeg', 'bmp'].includes(options.format) && (
                <div>
                  <label className="block text-sm font-medium mb-2">Background Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={options.backgroundColor || '#ffffff'}
                      onChange={(e) => setOptions((o) => ({ ...o, backgroundColor: e.target.value }))}
                      className="h-10 w-14 rounded-lg border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={options.backgroundColor || '#ffffff'}
                      onChange={(e) => setOptions((o) => ({ ...o, backgroundColor: e.target.value }))}
                      className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPEG and BMP do not support transparency. Transparent areas will be filled with this color.
                  </p>
                </div>
              )}

              <button
                onClick={handleProcess}
                disabled={images.length === 0 || processing}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Convert {images.length > 1 ? `${images.length} Images` : 'Image'}
              </button>
            </div>
          </section>
        )}

        <ProcessedResults images={results} onClear={() => setResults([])} />
      </div>
    </ToolLayout>
  );
}

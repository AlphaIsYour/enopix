'use client';

import { useState, useCallback } from 'react';
import { Star, Play, Loader2, Check } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { ProcessedResults } from '@/components/ProcessedResults';
import { ImageFile, ProcessedImage, FaviconOptions } from '@/lib/types';
import { generateFavicons } from '@/lib/image-processing';
import { FAVICON_SIZES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function FaviconPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [options, setOptions] = useState<FaviconOptions>({
    sizes: [16, 32, 180, 192, 512],
    format: 'png',
    backgroundColor: '',
    padding: 10,
    borderRadius: 0,
  });

  const toggleSize = (size: number) => {
    setOptions((o) => {
      const sizes = o.sizes.includes(size)
        ? o.sizes.filter((s) => s !== size)
        : [...o.sizes, size].sort((a, b) => a - b);
      return { ...o, sizes };
    });
  };

  const selectEssential = () => {
    setOptions((o) => ({ ...o, sizes: [16, 32, 180, 192, 512] }));
  };

  const selectAll = () => {
    setOptions((o) => ({ ...o, sizes: FAVICON_SIZES.map((s) => s.size) }));
  };

  const handleProcess = useCallback(async () => {
    if (images.length === 0 || options.sizes.length === 0) return;
    setProcessing(true);
    const allResults: ProcessedImage[] = [];

    for (const img of images) {
      try {
        const result = await generateFavicons(img, options);
        allResults.push(...result);
      } catch (err) {
        console.error(`Failed to generate favicons from ${img.name}:`, err);
      }
    }

    setResults(allResults);
    setProcessing(false);
  }, [images, options]);

  return (
    <ToolLayout
      title="Favicon Generator"
      description="Create a complete favicon package with all required sizes for web browsers, mobile devices, and PWAs."
      icon={<Star className="h-7 w-7 text-white" />}
      color="from-yellow-500 to-orange-500"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            1. Upload Icon (square recommended)
          </h2>
          <ImageUploader images={images} onImagesChange={setImages} multiple={false} maxFiles={1} />
        </section>

        {images.length > 0 && (
          <section className="animate-slide-up">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              2. Favicon Settings
            </h2>
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-5">
              {/* Quick selects */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={selectEssential}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground"
                >
                  Essential Sizes
                </button>
                <button
                  onClick={selectAll}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:text-foreground"
                >
                  All Sizes
                </button>
              </div>

              {/* Size selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Sizes ({options.sizes.length} selected)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {FAVICON_SIZES.map((favSize) => {
                    const selected = options.sizes.includes(favSize.size);
                    return (
                      <button
                        key={favSize.size}
                        onClick={() => toggleSize(favSize.size)}
                        className={cn(
                          'flex items-center gap-2 rounded-lg border p-2.5 text-left transition-all text-sm',
                          selected
                            ? 'border-primary bg-primary/5'
                            : 'border-border/50 hover:border-primary/30'
                        )}
                      >
                        {selected && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                        <div>
                          <p className="font-medium">{favSize.label}</p>
                          <p className="text-[11px] text-muted-foreground">{favSize.usage}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Customization */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Padding ({options.padding}%)</label>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={options.padding}
                    onChange={(e) => setOptions((o) => ({ ...o, padding: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Border Radius ({options.borderRadius}%)</label>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={options.borderRadius}
                    onChange={(e) => setOptions((o) => ({ ...o, borderRadius: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Background</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={options.backgroundColor || '#ffffff'}
                      onChange={(e) => setOptions((o) => ({ ...o, backgroundColor: e.target.value }))}
                      className="h-9 w-12 rounded-lg border border-border cursor-pointer"
                    />
                    <button
                      onClick={() => setOptions((o) => ({ ...o, backgroundColor: '' }))}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Transparent
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-medium mb-2">Preview</label>
                <div className="flex items-end gap-3">
                  {[16, 32, 48, 96].map((size) => (
                    <div key={size} className="text-center">
                      <div
                        className="border border-border/50 rounded overflow-hidden bg-[repeating-conic-gradient(#e5e7eb_0%_25%,_white_0%_50%)] bg-[length:8px_8px]"
                        style={{ width: Math.max(size, 32), height: Math.max(size, 32) }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={images[0].dataUrl}
                          alt="favicon preview"
                          className="w-full h-full object-contain"
                          style={{
                            padding: `${options.padding}%`,
                            borderRadius: `${options.borderRadius}%`,
                            backgroundColor: options.backgroundColor || undefined,
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">{size}px</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleProcess}
                disabled={images.length === 0 || options.sizes.length === 0 || processing}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Generate {options.sizes.length} Favicon{options.sizes.length !== 1 ? 's' : ''}
              </button>
            </div>
          </section>
        )}

        <ProcessedResults images={results} onClear={() => setResults([])} />
      </div>
    </ToolLayout>
  );
}

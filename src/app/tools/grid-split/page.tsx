'use client';

import { useState, useCallback } from 'react';
import { Grid3X3, Play, Loader2 } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { ProcessedResults } from '@/components/ProcessedResults';
import { ImageFile, ProcessedImage, GridSplitOptions } from '@/lib/types';
import { splitImageGrid } from '@/lib/image-processing';
import { cn } from '@/lib/utils';

export default function GridSplitPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [options, setOptions] = useState<GridSplitOptions>({
    rows: 3,
    cols: 3,
    gap: 0,
    padding: 0,
    backgroundColor: '#ffffff',
  });

  const handleProcess = useCallback(async () => {
    if (images.length === 0) return;
    setProcessing(true);
    const allResults: ProcessedImage[] = [];

    for (const img of images) {
      try {
        const result = await splitImageGrid(img, options);
        allResults.push(...result);
      } catch (err) {
        console.error(`Failed to split ${img.name}:`, err);
      }
    }

    setResults(allResults);
    setProcessing(false);
  }, [images, options]);

  const presetGrids = [
    { rows: 2, cols: 2, label: '2×2' },
    { rows: 3, cols: 3, label: '3×3' },
    { rows: 2, cols: 3, label: '2×3' },
    { rows: 3, cols: 2, label: '3×2' },
    { rows: 1, cols: 3, label: '1×3 Strip' },
    { rows: 4, cols: 4, label: '4×4' },
  ];

  return (
    <ToolLayout
      title="Grid Split"
      description="Divide an image into a grid of tiles. Perfect for Instagram carousels, puzzles, and creative layouts."
      icon={<Grid3X3 className="h-7 w-7 text-white" />}
      color="from-teal-500 to-cyan-500"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            1. Upload Image
          </h2>
          <ImageUploader images={images} onImagesChange={setImages} multiple={false} maxFiles={1} />
        </section>

        {images.length > 0 && (
          <section className="animate-slide-up">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              2. Grid Settings
            </h2>
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-5">
              {/* Presets */}
              <div>
                <label className="block text-sm font-medium mb-2">Quick Presets</label>
                <div className="flex flex-wrap gap-2">
                  {presetGrids.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setOptions((o) => ({ ...o, rows: preset.rows, cols: preset.cols }))}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        options.rows === preset.rows && options.cols === preset.cols
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Rows</label>
                  <input
                    type="number"
                    value={options.rows}
                    onChange={(e) => setOptions((o) => ({ ...o, rows: Math.max(1, Number(e.target.value)) }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    min={1}
                    max={20}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Columns</label>
                  <input
                    type="number"
                    value={options.cols}
                    onChange={(e) => setOptions((o) => ({ ...o, cols: Math.max(1, Number(e.target.value)) }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                    min={1}
                    max={20}
                  />
                </div>
              </div>

              {/* Gap & Padding */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium">Tile Gap</label>
                    <span className="text-xs font-mono text-muted-foreground">{options.gap}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={options.gap}
                    onChange={(e) => setOptions((o) => ({ ...o, gap: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium">Outer Padding</label>
                    <span className="text-xs font-mono text-muted-foreground">{options.padding}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={options.padding}
                    onChange={(e) => setOptions((o) => ({ ...o, padding: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Preview grid */}
              <div>
                <label className="block text-sm font-medium mb-2">Preview</label>
                <div
                  className="grid w-fit gap-0.5 p-3 bg-muted rounded-lg"
                  style={{
                    gridTemplateColumns: `repeat(${options.cols}, minmax(12px, 1fr))`,
                  }}
                >
                  {Array.from({ length: options.rows * options.cols }).map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-sm bg-primary/20 border border-primary/30"
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {options.rows} × {options.cols} = {options.rows * options.cols} tiles
                </p>
              </div>

              <button
                onClick={handleProcess}
                disabled={images.length === 0 || processing}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Split into {options.rows * options.cols} Tiles
              </button>
            </div>
          </section>
        )}

        <ProcessedResults images={results} onClear={() => setResults([])} />
      </div>
    </ToolLayout>
  );
}

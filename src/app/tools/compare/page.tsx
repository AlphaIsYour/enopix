'use client';

import { useState, useCallback } from 'react';
import { ArrowLeftRight, ImagePlus } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { CompareSlider } from '@/components/CompareSlider';
import { FileDropzone } from '@/components/FileDropzone';
import { loadImageFile, formatFileSize } from '@/lib/image-processing';
import { ImageFile } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function ComparePage() {
  const [before, setBefore] = useState<ImageFile | null>(null);
  const [after, setAfter] = useState<ImageFile | null>(null);

  const handleBefore = useCallback(async (files: File[]) => {
    if (files[0]) {
      try {
        const img = await loadImageFile(files[0]);
        setBefore(img);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleAfter = useCallback(async (files: File[]) => {
    if (files[0]) {
      try {
        const img = await loadImageFile(files[0]);
        setAfter(img);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  return (
    <ToolLayout
      title="Before / After Compare"
      description="Compare original and processed images side by side with an interactive slider. Perfect for quality checks."
      icon={<ArrowLeftRight className="h-7 w-7 text-white" />}
      color="from-indigo-500 to-blue-500"
    >
      <div className="space-y-8">
        {/* Upload two images */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Before (Original)
            </h2>
            {before ? (
              <div className="relative rounded-xl border border-border/50 bg-card overflow-hidden">
                <div className="aspect-video bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={before.dataUrl}
                    alt="Before"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium truncate">{before.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {before.width}×{before.height} · {formatFileSize(before.size)}
                    </p>
                  </div>
                  <button
                    onClick={() => setBefore(null)}
                    className="text-xs text-muted-foreground hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <FileDropzone onFiles={handleBefore} multiple={false} maxFiles={1} />
            )}
          </div>

          {/* After */}
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              After (Processed)
            </h2>
            {after ? (
              <div className="relative rounded-xl border border-border/50 bg-card overflow-hidden">
                <div className="aspect-video bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={after.dataUrl}
                    alt="After"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium truncate">{after.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {after.width}×{after.height} · {formatFileSize(after.size)}
                    </p>
                  </div>
                  <button
                    onClick={() => setAfter(null)}
                    className="text-xs text-muted-foreground hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <FileDropzone onFiles={handleAfter} multiple={false} maxFiles={1} />
            )}
          </div>
        </div>

        {/* Comparison slider */}
        {before && after && (
          <section className="animate-slide-up">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Interactive Comparison
            </h2>
            <CompareSlider
              before={before.dataUrl}
              after={after.dataUrl}
              beforeLabel="Before"
              afterLabel="After"
            />

            {/* Stats comparison */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: 'Before Size',
                  value: formatFileSize(before.size),
                  sub: `${before.width}×${before.height}`,
                },
                {
                  label: 'After Size',
                  value: formatFileSize(after.size),
                  sub: `${after.width}×${after.height}`,
                },
                {
                  label: 'Size Diff',
                  value: formatFileSize(Math.abs(before.size - after.size)),
                  sub: before.size > after.size ? 'smaller' : before.size < after.size ? 'larger' : 'same',
                  positive: before.size >= after.size,
                },
                {
                  label: 'Savings',
                  value: before.size > 0
                    ? `${Math.abs(Math.round(((before.size - after.size) / before.size) * 100))}%`
                    : '0%',
                  sub: before.size >= after.size ? 'reduction' : 'increase',
                  positive: before.size >= after.size,
                },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/50 bg-card p-3 text-center">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className={cn(
                    'text-lg font-bold mt-0.5',
                    stat.positive !== undefined && (stat.positive ? 'text-green-500' : 'text-red-500')
                  )}>
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Instructions */}
        {!before && !after && (
          <div className="rounded-xl border border-border/50 bg-muted/30 p-6 text-center">
            <ImagePlus className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold">How to compare</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Upload the original image on the left and the processed version on the right.
              Then drag the slider to compare them pixel by pixel.
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

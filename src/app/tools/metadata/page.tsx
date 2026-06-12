'use client';

import { useState, useCallback } from 'react';
import { Shield, Play, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { ProcessedResults } from '@/components/ProcessedResults';
import { ImageFile, ProcessedImage } from '@/lib/types';
import { stripMetadata, formatFileSize } from '@/lib/image-processing';

export default function MetadataPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleProcess = useCallback(async () => {
    if (images.length === 0) return;
    setProcessing(true);
    const allResults: ProcessedImage[] = [];

    for (const img of images) {
      try {
        const result = await stripMetadata(img);
        allResults.push(result);
      } catch (err) {
        console.error(`Failed to strip metadata from ${img.name}:`, err);
      }
    }

    setResults(allResults);
    setProcessing(false);
  }, [images]);

  const metadataTypes = [
    { name: 'EXIF Data', description: 'Camera make, model, settings, date/time', risk: 'medium' },
    { name: 'GPS Location', description: 'Latitude, longitude, altitude of where photo was taken', risk: 'high' },
    { name: 'Camera Info', description: 'Lens, focal length, aperture, ISO, shutter speed', risk: 'low' },
    { name: 'Timestamps', description: 'Date taken, date modified, date digitized', risk: 'medium' },
    { name: 'Software Tags', description: 'Editing software used (Photoshop, Lightroom, etc.)', risk: 'low' },
    { name: 'Thumbnail', description: 'Embedded preview image that may differ from actual', risk: 'low' },
  ];

  return (
    <ToolLayout
      title="Remove Metadata"
      description="Strip EXIF data including GPS location, camera info, and timestamps. Protect your privacy before sharing."
      icon={<Shield className="h-7 w-7 text-white" />}
      color="from-red-500 to-rose-500"
    >
      <div className="space-y-8">
        {/* Privacy warning */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">Why remove metadata?</h3>
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                Photos taken on phones and cameras contain hidden EXIF data that can reveal your exact GPS location,
                device information, and when the photo was taken. This tool strips all that data by re-encoding
                the image on a clean canvas.
              </p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            1. Upload Images
          </h2>
          <ImageUploader images={images} onImagesChange={setImages} />
        </section>

        {images.length > 0 && (
          <section className="animate-slide-up">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              2. Metadata to Remove
            </h2>
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {metadataTypes.map((meta) => (
                  <div
                    key={meta.name}
                    className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{meta.name}</p>
                      <p className="text-xs text-muted-foreground">{meta.description}</p>
                    </div>
                    <span
                      className={`ml-auto shrink-0 inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                        meta.risk === 'high'
                          ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                          : meta.risk === 'medium'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {meta.risk} risk
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                All metadata types above will be removed. This works by re-drawing the image on a fresh canvas,
                which inherently strips all embedded data.
              </p>

              <button
                onClick={handleProcess}
                disabled={images.length === 0 || processing}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Strip Metadata from {images.length > 1 ? `${images.length} Images` : 'Image'}
              </button>
            </div>
          </section>
        )}

        {results.length > 0 && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Metadata stripped from {results.length} image{results.length !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-green-600/80 dark:text-green-400/80">
                {formatFileSize(images.reduce((s, i) => s + i.size, 0))} → {formatFileSize(results.reduce((s, i) => s + i.size, 0))}
              </p>
            </div>
          </div>
        )}

        <ProcessedResults images={results} onClear={() => setResults([])} />
      </div>
    </ToolLayout>
  );
}

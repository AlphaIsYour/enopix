'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Crop, Play, Loader2 } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { ProcessedResults } from '@/components/ProcessedResults';
import { ImageFile, ProcessedImage, CropOptions } from '@/lib/types';
import { cropImage } from '@/lib/image-processing';
import { ASPECT_RATIOS } from '@/lib/constants';
import { parseAspectRatio, cn } from '@/lib/utils';

export default function CropPage() {
  const [images, setImagesRaw] = useState<ImageFile[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [options, setOptions] = useState<CropOptions>({
    x: 0,
    y: 0,
    width: 400,
    height: 400,
    aspectRatio: null,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragging, setDragging] = useState(false);

  // Wrapper that also resets crop options for new images
  const setImages = useCallback((newImages: ImageFile[]) => {
    setImagesRaw(newImages);
    if (newImages[0]) {
      const img = newImages[0];
      const size = Math.min(img.width, img.height, 400);
      setOptions((o) => ({
        ...o,
        width: size,
        height: size,
        x: Math.round((img.width - size) / 2),
        y: Math.round((img.height - size) / 2),
      }));
    }
  }, []);

  // Draw the image and crop overlay on the canvas
  const drawCanvas = useCallback(() => {
    if (!images[0] || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const maxW = 600;
      const maxH = 400;
      const scale = Math.min(maxW / img.width, maxH / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const cx = options.x * scale;
      const cy = options.y * scale;
      const cw = options.width * scale;
      const ch = options.height * scale;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.clearRect(cx, cy, cw, ch);
      ctx.drawImage(img, cx / scale, cy / scale, cw / scale, ch / scale, cx, cy, cw, ch);

      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.strokeRect(cx, cy, cw, ch);

      const hs = 8;
      ctx.fillStyle = '#6366f1';
      [[cx, cy], [cx + cw, cy], [cx, cy + ch], [cx + cw, cy + ch]].forEach(([hx, hy]) => {
        ctx.fillRect(hx - hs / 2, hy - hs / 2, hs, hs);
      });
    };
    img.src = images[0].dataUrl;
  }, [images, options]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const updateCropPosition = (clientX: number, clientY: number) => {
    if (!images[0] || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const realScale = images[0].width / canvasRef.current.width;
    const x = Math.max(0, Math.min((clientX - rect.left) * realScale, images[0].width - options.width));
    const y = Math.max(0, Math.min((clientY - rect.top) * realScale, images[0].height - options.height));
    setOptions((o) => ({ ...o, x: Math.round(x), y: Math.round(y) }));
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDragging(true);
    updateCropPosition(e.clientX, e.clientY);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging) return;
    updateCropPosition(e.clientX, e.clientY);
  };

  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches[0]) {
      setDragging(true);
      updateCropPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!dragging || !e.touches[0]) return;
    updateCropPosition(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleCanvasMouseUp = () => {
    setDragging(false);
  };

  const handleProcess = useCallback(async () => {
    if (images.length === 0) return;
    setProcessing(true);
    const allResults: ProcessedImage[] = [];

    for (const img of images) {
      try {
        const result = await cropImage(img, options);
        allResults.push(result);
      } catch (err) {
        console.error(`Failed to crop ${img.name}:`, err);
      }
    }

    setResults(allResults);
    setProcessing(false);
  }, [images, options]);

  return (
    <ToolLayout
      title="Crop Images"
      description="Cut out a specific region from your image with pixel-precise control. Drag to position the crop area."
      icon={<Crop className="h-7 w-7 text-white" />}
      color="from-violet-500 to-purple-500"
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
              2. Crop Area
            </h2>
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-5">
              {/* Canvas preview */}
              <div className="flex justify-center overflow-hidden rounded-lg bg-muted">
                <canvas
                  ref={canvasRef}
                  className="cursor-crosshair max-w-full touch-none"
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onMouseLeave={handleCanvasMouseUp}
                  onTouchStart={handleCanvasTouchStart}
                  onTouchMove={handleCanvasTouchMove}
                  onTouchEnd={handleCanvasMouseUp}
                  onTouchCancel={handleCanvasMouseUp}
                />
              </div>

              {/* Aspect ratio */}
              <div>
                <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
                <div className="flex flex-wrap gap-2">
                  {ASPECT_RATIOS.map((ratio) => (
                    <button
                      key={ratio.label}
                      onClick={() => {
                        const r = parseAspectRatio(ratio.value);
                        setOptions((o) => ({
                          ...o,
                          aspectRatio: ratio.value,
                          ...(r ? { height: Math.round(o.width / r) } : {}),
                        }));
                      }}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        options.aspectRatio === ratio.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual inputs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['x', 'y', 'width', 'height'] as const).map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-medium text-muted-foreground mb-1 uppercase">
                      {field}
                    </label>
                    <input
                      type="number"
                      value={options[field]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setOptions((o) => {
                          const next = { ...o, [field]: val };
                          if (o.aspectRatio && field === 'width') {
                            const r = parseAspectRatio(o.aspectRatio);
                            if (r) next.height = Math.round(val / r);
                          }
                          if (o.aspectRatio && field === 'height') {
                            const r = parseAspectRatio(o.aspectRatio);
                            if (r) next.width = Math.round(val * r);
                          }
                          return next;
                        });
                      }}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                      min={0}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={handleProcess}
                disabled={images.length === 0 || processing}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Crop Image
              </button>
            </div>
          </section>
        )}

        <ProcessedResults images={results} onClear={() => setResults([])} />
      </div>
    </ToolLayout>
  );
}

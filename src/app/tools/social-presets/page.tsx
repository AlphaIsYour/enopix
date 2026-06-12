'use client';

import { useState, useCallback } from 'react';
import { Share2, Play, Loader2, Check } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ImageUploader } from '@/components/ImageUploader';
import { ProcessedResults } from '@/components/ProcessedResults';
import { ImageFile, ProcessedImage } from '@/lib/types';
import { generateSocialPreset } from '@/lib/image-processing';
import { SOCIAL_PRESETS, SOCIAL_PLATFORMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function SocialPresetsPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [results, setResults] = useState<ProcessedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [selectedPresets, setSelectedPresets] = useState<Set<string>>(new Set());
  const [activePlatform, setActivePlatform] = useState<string>('Instagram');

  const togglePreset = (name: string) => {
    setSelectedPresets((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const selectAllForPlatform = (platform: string) => {
    const platformPresets = SOCIAL_PRESETS.filter((p) => p.platform === platform).map((p) => p.name);
    setSelectedPresets((prev) => {
      const next = new Set(prev);
      platformPresets.forEach((n) => next.add(n));
      return next;
    });
  };

  const handleProcess = useCallback(async () => {
    if (images.length === 0 || selectedPresets.size === 0) return;
    setProcessing(true);
    const allResults: ProcessedImage[] = [];
    const presets = SOCIAL_PRESETS.filter((p) => selectedPresets.has(p.name));

    for (const img of images) {
      for (const preset of presets) {
        try {
          const result = await generateSocialPreset(img, preset.width, preset.height, preset.name);
          allResults.push(result);
        } catch (err) {
          console.error(`Failed for ${preset.name}:`, err);
        }
      }
    }

    setResults(allResults);
    setProcessing(false);
  }, [images, selectedPresets]);

  const filteredPresets = SOCIAL_PRESETS.filter((p) => p.platform === activePlatform);

  return (
    <ToolLayout
      title="Social Media Presets"
      description="Auto-resize images to perfect dimensions for every major social platform. Smart crop ensures the best fit."
      icon={<Share2 className="h-7 w-7 text-white" />}
      color="from-pink-500 to-fuchsia-500"
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
              2. Select Presets ({selectedPresets.size} selected)
            </h2>
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-5">
              {/* Platform tabs */}
              <div className="flex flex-wrap gap-2 border-b border-border/50 pb-4">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setActivePlatform(platform)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      activePlatform === platform
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {platform}
                  </button>
                ))}
              </div>

              {/* Select all */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {activePlatform} presets
                </span>
                <button
                  onClick={() => selectAllForPlatform(activePlatform)}
                  className="text-sm text-primary hover:underline"
                >
                  Select all {activePlatform}
                </button>
              </div>

              {/* Preset cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredPresets.map((preset) => {
                  const selected = selectedPresets.has(preset.name);
                  return (
                    <button
                      key={preset.name}
                      onClick={() => togglePreset(preset.name)}
                      className={cn(
                        'flex items-center gap-4 rounded-xl border p-4 text-left transition-all',
                        selected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                          : 'border-border/50 hover:border-primary/30'
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{preset.name}</span>
                          {selected && <Check className="h-4 w-4 text-primary shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {preset.description}
                        </p>
                        <p className="text-xs font-mono text-muted-foreground mt-1">
                          {preset.width} × {preset.height}px
                        </p>
                      </div>
                      {/* Aspect ratio preview */}
                      <div
                        className="shrink-0 rounded-md bg-muted border border-border/50"
                        style={{
                          width: `${Math.min(48, (preset.width / preset.height) * 36)}px`,
                          height: `${Math.min(48, (preset.height / preset.width) * 48)}px`,
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleProcess}
                disabled={images.length === 0 || selectedPresets.size === 0 || processing}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Generate {selectedPresets.size * images.length} Image{selectedPresets.size * images.length !== 1 ? 's' : ''}
              </button>
            </div>
          </section>
        )}

        <ProcessedResults images={results} onClear={() => setResults([])} />
      </div>
    </ToolLayout>
  );
}

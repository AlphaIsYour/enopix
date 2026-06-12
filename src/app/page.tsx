import { ToolCard } from '@/components/ToolCard';
import { TOOLS } from '@/lib/constants';
import { Shield, Zap, Lock, Monitor, Image as ImageIcon } from 'lucide-react';

export default function HomePage() {
  const categories = [
    { key: 'resize', label: 'Resize & Transform', tools: TOOLS.filter((t) => t.category === 'resize') },
    { key: 'optimize', label: 'Optimize & Clean', tools: TOOLS.filter((t) => t.category === 'optimize') },
    { key: 'convert', label: 'Convert', tools: TOOLS.filter((t) => t.category === 'convert') },
    { key: 'generate', label: 'Generate', tools: TOOLS.filter((t) => t.category === 'generate') },
    { key: 'analyze', label: 'Compare & Analyze', tools: TOOLS.filter((t) => t.category === 'analyze') },
  ].filter((c) => c.tools.length > 0);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-4 py-1.5 text-sm font-medium text-green-700 dark:text-green-400 mb-6">
              <Shield className="h-4 w-4" />
              100% Private — Zero Server Uploads
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Image Processing,{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A complete suite of browser-based image tools. Resize, crop, compress, convert,
              strip metadata, generate social presets, favicons, and more — all processed locally
              on your device.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-500" />
                No data leaves your browser
              </span>
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                Instant processing
              </span>
              <span className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-blue-500" />
                Works offline-capable
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools grid by category */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {categories.map((category) => (
          <div key={category.key} className="mb-12 last:mb-0">
            <h2 className="text-xl font-semibold mb-1">{category.label}</h2>
            <p className="text-sm text-muted-foreground mb-5">
              {category.key === 'resize' && 'Scale, crop, split, and adapt images for any platform.'}
              {category.key === 'optimize' && 'Reduce file size and remove sensitive metadata.'}
              {category.key === 'convert' && 'Transform images between formats instantly.'}
              {category.key === 'generate' && 'Create favicons and other image assets.'}
              {category.key === 'analyze' && 'Compare and inspect your images.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.tools.map((tool, i) => (
                <ToolCard key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Privacy section */}
      <section className="border-t border-border/50 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 mb-4">
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Every operation runs entirely in your browser using Canvas API. No images are ever uploaded to any server.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 mb-4">
                <Zap className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                No network round-trips means instant processing. Batch process dozens of images in seconds.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 mb-4">
                <ImageIcon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Batch Processing</h3>
              <p className="text-sm text-muted-foreground">
                Drop multiple files at once. Process entire folders and download everything as a ZIP.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

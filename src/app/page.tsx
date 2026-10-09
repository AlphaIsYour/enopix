import { ToolCard } from '@/components/ToolCard';
import { TOOLS } from '@/lib/constants';
import { Shield, Zap, Lock, Monitor, Sparkles, Layers, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const categories = [
    { key: 'resize', label: 'Resize & Transform', tools: TOOLS.filter((t) => t.category === 'resize') },
    { key: 'optimize', label: 'Optimize & Clean', tools: TOOLS.filter((t) => t.category === 'optimize') },
    { key: 'convert', label: 'Convert', tools: TOOLS.filter((t) => t.category === 'convert') },
    { key: 'generate', label: 'Generate', tools: TOOLS.filter((t) => t.category === 'generate') },
    { key: 'analyze', label: 'Compare & Analyze', tools: TOOLS.filter((t) => t.category === 'analyze') },
  ].filter((c) => c.tools.length > 0);

  return (
    <div className="relative overflow-hidden">
      {/* Ambient background glow using Enopix palette */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#89D4FF] blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-[#FE9EC7] blur-[120px]" />
        <div className="absolute top-48 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#F9F6C4] blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative border-b border-border/60">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FE9EC7]/15 via-[#89D4FF]/15 to-[#F9F6C4]/30 border border-[#44ACFF]/30 px-4 py-1.5 text-xs sm:text-sm font-semibold text-foreground mb-8 shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#44ACFF]" />
              <span>SaaS-Grade Image Suite</span>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <span className="hidden sm:inline text-[#FE9EC7] font-bold">100% Client-Side Privacy</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Image Processing,{' '}
              <span className="font-accent block sm:inline bg-gradient-to-r from-[#44ACFF] via-[#89D4FF] to-[#FE9EC7] bg-clip-text text-transparent drop-shadow-sm mt-1 sm:mt-0">
                Reimagined
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Solusi pengolah gambar lengkap di browsermu. Resize, kompres, konversi, hapus metadata EXIF, buat grid split, dan export preset sosial — tanpa perlu upload gambar ke server mana pun.
            </p>

            {/* Quick Actions / Highlights */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/tools/resize"
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#44ACFF] to-[#89D4FF] hover:opacity-95 shadow-lg shadow-[#44ACFF]/25 hover:shadow-[#44ACFF]/40 transition-all text-sm sm:text-base flex items-center gap-2"
              >
                Mulai Resize & Crop
                <span className="text-lg leading-none">→</span>
              </Link>
              <Link
                href="/tools/compress"
                className="px-6 py-3 rounded-xl font-semibold text-foreground bg-card hover:bg-muted border border-border/80 shadow-sm transition-all text-sm sm:text-base flex items-center gap-2"
              >
                Kompres Gambar
              </Link>
            </div>

            {/* Trust pills */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto text-left">
              <div className="p-3.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
                <Lock className="h-4 w-4 text-[#44ACFF] mb-1.5" />
                <p className="text-xs font-bold text-foreground">Zero Uploads</p>
                <p className="text-[11px] text-muted-foreground">Diproses lokal di device</p>
              </div>
              <div className="p-3.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
                <Zap className="h-4 w-4 text-[#FE9EC7] mb-1.5" />
                <p className="text-xs font-bold text-foreground">Super Cepat</p>
                <p className="text-[11px] text-muted-foreground">Tanpa antrean server</p>
              </div>
              <div className="p-3.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
                <Monitor className="h-4 w-4 text-[#89D4FF] mb-1.5" />
                <p className="text-xs font-bold text-foreground">Bisa Offline</p>
                <p className="text-[11px] text-muted-foreground">Native Canvas & Web API</p>
              </div>
              <div className="p-3.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
                <Layers className="h-4 w-4 text-[#FE9EC7] mb-1.5" />
                <p className="text-xs font-bold text-foreground">Batch Ready</p>
                <p className="text-[11px] text-muted-foreground">Download ZIP instan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid by Category */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col gap-12 sm:gap-16">
          {categories.map((category) => (
            <div key={category.key} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-border/50 pb-4 gap-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    {category.label}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.key === 'resize' && 'Scale, crop, split, dan adaptasi format untuk berbagai layar.'}
                    {category.key === 'optimize' && 'Perkecil ukuran file dan bersihkan data pribadi yang tersembunyi.'}
                    {category.key === 'convert' && 'Ubah format gambar antar PNG, JPEG, WebP, AVIF, dan BMP.'}
                    {category.key === 'generate' && 'Hasilkan ikon favicon komplit dan aset siap pakai.'}
                    {category.key === 'analyze' && 'Inspeksi dan bandingkan gambar sebelum serta sesudah diedit.'}
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#89D4FF]/20 text-[#44ACFF] self-start sm:self-auto">
                  {category.tools.length} Tools
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {category.tools.map((tool, i) => (
                  <ToolCard key={tool.slug} tool={tool} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SaaS Feature / Privacy Highlights */}
      <section className="border-t border-border/60 bg-muted/20 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-accent text-xl text-[#44ACFF] block mb-1">Aman & Terpercaya</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Kenapa Memilih Enopix?
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Dibuat untuk kreator konten, developer, dan desainer yang mengutamakan kecepatan dan privasi data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-2xl border border-border/70 bg-card shadow-sm hover:border-[#89D4FF]/50 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#89D4FF]/30 to-[#44ACFF]/30 text-[#44ACFF] mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold mb-2">100% Client-Side Privacy</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Seluruh pemrosesan berjalan di memori browser dengan Canvas API. Foto keluarga, dokumen, maupun aset rahasia tidak pernah meninggalkan komputermu.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/70 bg-card shadow-sm hover:border-[#FE9EC7]/50 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FE9EC7]/30 to-[#F9F6C4]/30 text-[#FE9EC7] mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold mb-2">Performa Tanpa Batas</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tidak ada limit upload bandwidth atau antrean server. Manfaatkan langsung kecepatan CPU dan GPU laptop atau ponselmu untuk pemrosesan gambar instan.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/70 bg-card shadow-sm hover:border-[#44ACFF]/50 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#44ACFF]/30 to-[#89D4FF]/30 text-[#44ACFF] mb-4">
                <Cpu className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold mb-2">Open Source & Bebas Iklan</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kode sumber terbuka dengan lisensi MIT. Dikembangkan secara kolaboratif oleh komunitas tanpa popup mengganggu atau subscription tersembunyi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

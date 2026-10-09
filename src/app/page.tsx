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
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] overflow-hidden opacity-50">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#89D4FF] blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-[#FE9EC7] blur-[120px]" />
        <div className="absolute top-48 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#F9F6C4] blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative border-b border-[#89D4FF]/30">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-white/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 mb-8 shadow-xs backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#44ACFF]" />
              <span>SaaS-Grade Image Suite</span>
              <span className="text-slate-400">•</span>
              <span className="text-[#006BB8] font-bold">Privacy First</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Image Processing,{' '}
              <span className="font-accent block sm:inline bg-gradient-to-r from-[#44ACFF] via-[#FE9EC7] to-[#44ACFF] bg-clip-text text-transparent drop-shadow-xs mt-1 sm:mt-0">
                Reimagined
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Solusi pengolah gambar lengkap di browsermu. Resize, kompres, konversi, hapus metadata EXIF, buat grid split, dan export preset sosial — tanpa perlu upload gambar ke server mana pun.
            </p>

            {/* Quick Actions / Highlights */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/tools/resize"
                className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-[#44ACFF] to-[#89D4FF] hover:opacity-95 shadow-md shadow-[#44ACFF]/30 hover:scale-[1.02] transition-all text-sm sm:text-base flex items-center gap-2"
              >
                Mulai Resize & Crop
                <span className="text-lg leading-none">→</span>
              </Link>
              <Link
                href="/tools/compress"
                className="px-6 py-3 rounded-2xl font-bold text-slate-800 bg-white/90 hover:bg-white border border-white/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:scale-[1.02] transition-all text-sm sm:text-base flex items-center gap-2"
              >
                Kompres Gambar
              </Link>
            </div>

            {/* Trust pills with glowing white cards */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 max-w-3xl mx-auto text-left">
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_0_12px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_8px_24px_-4px_rgba(68,172,255,0.15)] hover:border-[#89D4FF]/50 hover:scale-[1.02] transition-all">
                <Lock className="h-5 w-5 text-[#44ACFF] mb-2" />
                <p className="text-xs font-extrabold text-slate-900">Zero Uploads</p>
                <p className="text-[11px] text-slate-600 font-medium">Diproses lokal di device</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_0_12px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_8px_24px_-4px_rgba(68,172,255,0.15)] hover:border-[#89D4FF]/50 hover:scale-[1.02] transition-all">
                <Zap className="h-5 w-5 text-[#44ACFF] mb-2" />
                <p className="text-xs font-extrabold text-slate-900">Super Cepat</p>
                <p className="text-[11px] text-slate-600 font-medium">Tanpa antrean server</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_0_12px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_8px_24px_-4px_rgba(68,172,255,0.15)] hover:border-[#89D4FF]/50 hover:scale-[1.02] transition-all">
                <Monitor className="h-5 w-5 text-[#44ACFF] mb-2" />
                <p className="text-xs font-extrabold text-slate-900">Bisa Offline</p>
                <p className="text-[11px] text-slate-600 font-medium">Native Canvas & Web API</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_0_12px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_8px_24px_-4px_rgba(68,172,255,0.15)] hover:border-[#89D4FF]/50 hover:scale-[1.02] transition-all">
                <Layers className="h-5 w-5 text-[#44ACFF] mb-2" />
                <p className="text-xs font-extrabold text-slate-900">Batch Ready</p>
                <p className="text-[11px] text-slate-600 font-medium">Download ZIP instan</p>
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
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-[#89D4FF]/30 pb-4 gap-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {category.label}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {category.key === 'resize' && 'Scale, crop, split, dan adaptasi format untuk berbagai layar.'}
                    {category.key === 'optimize' && 'Perkecil ukuran file dan bersihkan data pribadi yang tersembunyi.'}
                    {category.key === 'convert' && 'Ubah format gambar antar PNG, JPEG, WebP, AVIF, dan BMP.'}
                    {category.key === 'generate' && 'Hasilkan ikon favicon komplit dan aset siap pakai.'}
                    {category.key === 'analyze' && 'Inspeksi dan bandingkan gambar sebelum serta sesudah diedit.'}
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 border border-white/80 text-[#005B9C] shadow-xs self-start sm:self-auto">
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
      <section className="border-t border-[#89D4FF]/30 bg-white/40 backdrop-blur-lg py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-accent text-xl text-[#44ACFF] block mb-1">Aman & Terpercaya</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Kenapa Memilih Enopix?
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Dibuat untuk kreator konten, developer, dan desainer yang mengutamakan kecepatan dan privasi data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_0_15px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_12px_32px_-6px_rgba(68,172,255,0.18)] hover:border-[#89D4FF]/60 hover:-translate-y-1 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#44ACFF] to-[#89D4FF] text-white shadow-md mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-900">Privasi Data Terjamin</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Seluruh pemrosesan berjalan di memori browser dengan Canvas API. Foto keluarga, dokumen, maupun aset rahasia tidak pernah meninggalkan komputermu.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_0_15px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_12px_32px_-6px_rgba(68,172,255,0.18)] hover:border-[#89D4FF]/60 hover:-translate-y-1 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FE9EC7] to-[#E86D9F] text-white shadow-md mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-900">Performa Tanpa Batas</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Tidak ada limit upload bandwidth atau antrean server. Manfaatkan langsung kecepatan CPU dan GPU laptop atau ponselmu untuk pemrosesan gambar instan.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_0_15px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_12px_32px_-6px_rgba(68,172,255,0.18)] hover:border-[#89D4FF]/60 hover:-translate-y-1 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#44ACFF] to-[#89D4FF] text-white shadow-md mb-4">
                <Cpu className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-900">Open Source & Bebas Iklan</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Kode sumber terbuka dengan lisensi MIT. Dikembangkan secara kolaboratif oleh komunitas tanpa popup mengganggu atau subscription tersembunyi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

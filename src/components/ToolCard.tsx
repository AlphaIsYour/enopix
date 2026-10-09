'use client';

import Link from 'next/link';
import {
  Maximize2,
  Crop,
  Minimize2,
  RefreshCw,
  Shield,
  Grid3X3,
  Share2,
  Star,
  ArrowLeftRight,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ToolDef } from '@/lib/constants';

const iconMap: Record<string, LucideIcon> = {
  Maximize2,
  Crop,
  Minimize2,
  RefreshCw,
  Shield,
  Grid3X3,
  Share2,
  Star,
  ArrowLeftRight,
};

interface ToolCardProps {
  tool: ToolDef;
  index?: number;
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const Icon = iconMap[tool.icon] || Maximize2;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col justify-between rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),0_0_15px_rgba(255,255,255,0.9)_inset] hover:shadow-[0_12px_32px_-6px_rgba(68,172,255,0.18)] hover:border-[#89D4FF]/60 hover:-translate-y-1.5 transition-all duration-300 animate-slide-up overflow-hidden"
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'backwards' }}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-md group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 text-white',
              tool.color
            )}
          >
            <Icon className="h-6 w-6 text-white drop-shadow-sm" />
          </div>

          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-slate-100/90 text-slate-600 border border-slate-200/60 shadow-xs">
            {tool.category}
          </span>
        </div>

        <h3 className="text-xl font-extrabold mb-2 text-slate-900 group-hover:text-[#44ACFF] group-hover:translate-x-0.5 transition-all">
          {tool.name}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          {tool.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs font-bold">
        <span className="text-[#006BB8] group-hover:translate-x-1 transition-transform duration-200">
          Buka Tool
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#89D4FF]/20 text-[#006BB8] transition-all duration-200 text-sm shadow-xs group-hover:scale-110 group-hover:bg-[#44ACFF] group-hover:text-white">
          →
        </span>
      </div>
    </Link>
  );
}

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
      className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 transition-all duration-300 hover:border-[#44ACFF]/50 hover:shadow-xl hover:shadow-[#44ACFF]/10 hover:-translate-y-1 animate-slide-up overflow-hidden"
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'backwards' }}
    >
      {/* Top accent gradient indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FE9EC7] via-[#89D4FF] to-[#44ACFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-md group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 mb-4',
            tool.color
          )}
        >
          <Icon className="h-6 w-6 text-white drop-shadow-sm" />
        </div>

        <h3 className="text-lg font-bold mb-1.5 group-hover:text-[#44ACFF] transition-colors">
          {tool.name}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-[#44ACFF]">
        <span className="group-hover:translate-x-0.5 transition-transform duration-200">Buka Tool</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#89D4FF]/20 group-hover:bg-[#44ACFF] group-hover:text-white transition-all duration-200 text-xs">
          →
        </span>
      </div>
    </Link>
  );
}

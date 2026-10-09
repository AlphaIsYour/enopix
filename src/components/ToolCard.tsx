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
      className={cn(
        'group relative flex flex-col justify-between rounded-3xl border p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 animate-slide-up overflow-hidden shadow-sm',
        tool.cardBg,
        tool.cardBorder
      )}
      style={{ animationDelay: `${index * 40}ms`, animationFillMode: 'backwards' }}
    >
      {/* Top accent gradient indicator */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity duration-300',
          tool.color
        )}
      />

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

          <span
            className={cn(
              'text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs',
              tool.accentBadge
            )}
          >
            {tool.category}
          </span>
        </div>

        <h3 className="text-xl font-extrabold mb-2 text-foreground group-hover:translate-x-0.5 transition-transform">
          {tool.name}
        </h3>

        <p className="text-sm text-foreground/80 leading-relaxed font-medium">
          {tool.description}
        </p>
      </div>

      <div className="mt-6 pt-3.5 border-t border-black/8 flex items-center justify-between text-xs font-bold">
        <span
          className={cn(
            'group-hover:translate-x-1 transition-transform duration-200',
            tool.buttonText
          )}
        >
          Buka Tool
        </span>
        <span
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 text-sm shadow-xs group-hover:scale-110',
            tool.accentBadge
          )}
        >
          →
        </span>
      </div>
    </Link>
  );
}

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
      className="group relative rounded-2xl border border-border/50 bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 animate-slide-up"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
    >
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg mb-4',
          tool.color
        )}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>

      <h3 className="text-lg font-semibold mb-1.5 group-hover:text-primary transition-colors">
        {tool.name}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {tool.description}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Open tool</span>
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  );
}

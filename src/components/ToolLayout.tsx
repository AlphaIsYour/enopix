'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  children: ReactNode;
}

export function ToolLayout({ title, description, icon, color, children }: ToolLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <div className="border-b border-border/60 bg-gradient-to-b from-[#89D4FF]/5 via-transparent to-transparent">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-[#44ACFF] transition-colors mb-5 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Semua Tools</span>
          </Link>

          <div className="flex items-start gap-4 sm:gap-5">
            <div
              className={cn(
                'flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-md text-white',
                color
              )}
            >
              {icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                {title}
              </h1>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                {description}
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-[#44ACFF]">
                <Shield className="h-3.5 w-3.5" />
                Diproses 100% lokal di browsermu — Tanpa upload ke server
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}

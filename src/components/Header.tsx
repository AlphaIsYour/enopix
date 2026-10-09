'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import enopixLogo from '../../public/enopix.png';

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tools/resize', label: 'Resize' },
    { href: '/tools/compress', label: 'Compress' },
    { href: '/tools/convert', label: 'Convert' },
    { href: '/tools/social-presets', label: 'Social' },
    { href: '/tools/favicon', label: 'Favicon' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden ring-2 ring-[#44ACFF]/30 shadow-sm group-hover:ring-[#FE9EC7]/60 group-hover:scale-105 transition-all bg-card/80 p-0.5">
              <Image
                src={enopixLogo}
                alt="Enopix Logo"
                width={40}
                height={40}
                className="h-full w-full object-contain rounded-lg"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-accent text-2xl tracking-wide leading-none text-foreground group-hover:text-[#44ACFF] transition-colors">
                Enopix
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase flex items-center gap-1 mt-0.5">
                <Shield className="h-2.5 w-2.5 text-[#44ACFF]" />
                100% Client-Side
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 pt-2 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

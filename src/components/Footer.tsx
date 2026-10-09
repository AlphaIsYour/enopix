import { Shield, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#89D4FF]/30 bg-white/70 backdrop-blur-xl">
      <div className="h-[2px] w-full bg-gradient-to-r from-[#44ACFF] via-[#89D4FF] via-[#F9F6C4] to-[#FE9EC7]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-500" />
            <span>
              All images are processed <strong className="text-foreground">locally in your browser</strong>. Nothing is uploaded to any server.
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              Built with <Heart className="h-3.5 w-3.5 text-[#FE9EC7] fill-[#FE9EC7]" /> for creators by{' '}
              <span className="font-accent text-base text-foreground">Enopix</span>
            </span>
            <span className="text-muted-foreground/60">•</span>
            <a
              href="https://github.com/AlphaIsYour/enopix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#44ACFF] hover:underline"
            >
              GitHub (MIT)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

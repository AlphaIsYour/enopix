import { Shield, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-500" />
            <span>
              All images are processed <strong className="text-foreground">locally in your browser</strong>. Nothing is uploaded to any server.
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              Built with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> by Enopix
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

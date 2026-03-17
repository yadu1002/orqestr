import React from 'react';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
            <Zap className="w-3 h-3 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">Orqestr</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Orqestr. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
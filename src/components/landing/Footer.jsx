import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center">
          <img
            src="https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/76d337b2b_OrqestrLogo.jpg"
            alt="Orqestr"
            className="h-10 w-auto mix-blend-multiply"
          />
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Orqestr. All rights reserved.</p>
        <div />
      </div>
    </footer>
  );
}
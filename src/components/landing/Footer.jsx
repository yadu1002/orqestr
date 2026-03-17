import React from 'react';
export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <img
            src="https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/ac801a90c_ChatGPTImageMar17202603_13_55PM.png"
            alt="Orqestr"
            className="h-6 w-auto"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Orqestr. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
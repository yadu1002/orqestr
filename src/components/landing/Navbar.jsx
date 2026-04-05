import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar({ onWaitlistClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-border/40'
          : 'bg-background/70 backdrop-blur-xl border-b border-border/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img
            src="https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/76d337b2b_OrqestrLogo.jpg"
            alt="Orqestr"
            className="h-16 w-auto"
          />
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: 'Problem', id: 'problem' },
              { label: 'How It Works', id: 'how-it-works' },
              { label: 'Demo', id: 'demo' },
              { label: 'Founders', id: 'founders' },
              { label: 'Waitlist', id: 'waitlist' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/Demo"
            className="hidden sm:inline-flex px-5 py-2 text-sm font-medium rounded-full border border-border text-foreground hover:bg-secondary transition-all duration-200"
          >
            Live Demo
          </Link>
          <button
            onClick={onWaitlistClick}
            className="px-5 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
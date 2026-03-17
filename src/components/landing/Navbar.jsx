import React from 'react';
import { motion } from 'framer-motion';
export default function Navbar({ onWaitlistClick }) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/76d337b2b_OrqestrLogo.jpg"
            alt="Orqestr"
            className="h-16 w-auto"
          />
        </div>
        <button
          onClick={onWaitlistClick}
          className="px-5 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
        >
          Join Waitlist
        </button>
      </div>
    </motion.nav>
  );
}
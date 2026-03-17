import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection({ onWaitlistClick }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Base dark gradient */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, hsl(222, 44%, 6%) 0%, hsl(210, 40%, 10%) 40%, hsl(160, 30%, 8%) 100%)'
      }} />

      {/* Mesh glow orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, hsl(142, 72%, 36%) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(172, 60%, 40%) 0%, transparent 70%)', animationDelay: '1s' }} />
        <div className="absolute top-[40%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: 'radial-gradient(circle, hsl(200, 80%, 50%) 0%, transparent 70%)', animationDelay: '2s' }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(hsl(142, 60%, 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(142, 60%, 50%) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Customer Signal Orchestration
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6 text-white"
        >
          Know when customers need help.
          <span className="block text-primary mt-1">Act instantly.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-white/70"
        >
          Orqestr connects your CRM, product telemetry, and CS tools — then automatically 
          triggers the right playbooks when customers need attention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onWaitlistClick}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium rounded-full border border-border text-foreground hover:bg-secondary transition-all duration-300"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-sm text-white/40"
        >
          Built for enterprise CS, Sales, and RevOps teams
        </motion.p>
      </div>
    </section>
  );
}
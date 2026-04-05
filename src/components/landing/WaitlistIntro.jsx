import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { emoji: '📬', label: 'We reach out within 48 hours' },
  { emoji: '🛠', label: 'You get early beta access' },
  { emoji: '🎯', label: 'We build your first playbook together' },
];

export default function WaitlistIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
    >
      {steps.map((step, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-5 py-4 rounded-xl bg-primary/5 border border-primary/15 flex-1 max-w-xs"
        >
          <span className="text-2xl">{step.emoji}</span>
          <p className="text-sm font-medium text-foreground">{step.label}</p>
        </div>
      ))}
    </motion.div>
  );
}
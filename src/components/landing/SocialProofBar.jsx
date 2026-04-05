import React from 'react';
import { motion } from 'framer-motion';

export default function SocialProofBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="relative z-10 py-5 border-y border-border/40"
    >
      <p className="text-center text-sm font-semibold text-primary">
        47 CS and RevOps leaders already on the waitlist
      </p>
    </motion.div>
  );
}
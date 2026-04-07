import React from 'react';
import { motion } from 'framer-motion';

const udayPhoto = "https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/cab0b13e6_240F2BE1-E623-4AD1-8FAD-08174BCD00A3_1_105_c.jpg";
const shubhadaPhoto = "https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/65bed8622_d5125165-5566-45cb-b7ac-909c9b22fa24.jpg";

function FounderCard({ photo, name, role, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-border shadow-md mb-4">
        <img src={photo} alt={name} className="w-full h-full object-cover object-top" />
      </div>
      <p className="font-semibold text-foreground text-base">{name}</p>
      <p className="text-sm text-muted-foreground mt-1">{role}</p>
    </motion.div>
  );
}

export default function FoundersSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Why we built Orqestr
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Uday */}
          <FounderCard
            photo={udayPhoto}
            name="Uday Mandala"
            role="Co-Founder · Economics · Georgia Tech"
            delay={0}
          />

          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl px-8 py-12 flex flex-col justify-center shadow-xl text-center"
            style={{ background: 'hsl(222, 44%, 12%)' }}
          >
            <span className="text-5xl font-serif leading-none mb-6" style={{ color: 'hsl(142, 60%, 45%)' }}>"</span>

            <p className="text-white/90 text-base leading-relaxed mb-4">
              Modern software companies collect enormous amounts of customer data across{' '}
              <span className="text-white font-semibold">CRM systems</span>,{' '}
              <span className="text-white font-semibold">product analytics</span>, and{' '}
              <span className="text-white font-semibold">support platforms</span>.
            </p>
            <p className="text-white/90 text-base leading-relaxed mb-4">
              But acting on those signals requires{' '}
              <span className="text-white font-semibold">jumping between tools</span>,{' '}
              notifying the right people, and{' '}
              <span className="text-white font-semibold">coordinating teams manually</span>.
            </p>
            <p className="text-base leading-relaxed font-semibold border-t border-white/10 pt-4 mt-2" style={{ color: 'hsl(142, 60%, 55%)' }}>
              Orqestr was created to turn those signals into coordinated action — automatically.
            </p>
          </motion.div>

          {/* Shubhada */}
          <FounderCard
            photo={shubhadaPhoto}
            name="Shubhada Mandala"
            role="Co-Founder · Computer Science · Georgia State"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
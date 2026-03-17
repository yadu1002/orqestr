import React from 'react';
import { motion } from 'framer-motion';

const udayPhoto = "https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/cab0b13e6_240F2BE1-E623-4AD1-8FAD-08174BCD00A3_1_105_c.jpg";
const abnerPhoto = "https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/bf315c229_7F02DF97-E5A3-4D5B-B2E8-6A3562CC561B_1_105_c.jpeg";

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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            Why we built Orqestr
          </h2>

          <div className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto space-y-4">
            <p>
              Modern software companies collect enormous amounts of customer data across{' '}
              <span className="text-foreground font-medium">CRM systems</span>,{' '}
              <span className="text-foreground font-medium">product analytics</span>, and{' '}
              <span className="text-foreground font-medium">support platforms</span>.
            </p>
            <p>
              But acting on those signals requires{' '}
              <span className="text-foreground font-medium">jumping between tools</span>,{' '}
              notifying the right people, and{' '}
              <span className="text-foreground font-medium">coordinating teams manually</span>.
            </p>
            <p className="text-foreground font-semibold text-lg pt-2 border-t border-border/50">
              Orqestr was created to turn those signals into{' '}
              <span className="text-primary">coordinated action</span> — automatically.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-16 mt-14">
          <FounderCard
            photo={udayPhoto}
            name="Uday Mandala"
            role="Co-Founder · Economics · Georgia Tech"
            delay={0}
          />
          <FounderCard
            photo={abnerPhoto}
            name="Abner Noel"
            role="Co-Founder · Computer Science · Georgia Tech"
            delay={0.15}
          />
        </div>
      </div>
    </section>
  );
}
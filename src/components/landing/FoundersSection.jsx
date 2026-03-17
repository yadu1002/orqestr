import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const udayPhoto = "https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/cab0b13e6_240F2BE1-E623-4AD1-8FAD-08174BCD00A3_1_105_c.jpg";
const abnerPhoto = "https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/bf315c229_7F02DF97-E5A3-4D5B-B2E8-6A3562CC561B_1_105_c.jpeg";

function FounderCard({ photo, initials, name, degree, origin }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg mb-5">
        <img src={photo} alt={name} className="w-full h-full object-cover object-top" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground mt-1">{degree}</p>
      <p className="text-sm text-muted-foreground">{origin}</p>
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
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">The Team</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Built by founders who felt the pain</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Uday */}
          <FounderCard
            photo={udayPhoto}
            initials="UM"
            name="Uday Mandala"
            degree="B.S. Economics · Georgia Tech"
            origin="From Hyderabad, India"
          />

          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl bg-foreground text-background p-8 flex flex-col justify-center shadow-xl"
          >
            <span className="text-5xl font-serif text-primary leading-none mb-4">"</span>
            <p className="text-base leading-relaxed font-medium">
              We kept watching enterprise teams drown in dashboards while customers slipped through the cracks. So we built the missing layer.
            </p>
            <p className="mt-6 text-sm text-background/50 font-medium">
              — Uday & Abner, Co-Founders of Orqestr
            </p>
          </motion.div>

          {/* Abner */}
          <FounderCard
            photo={abnerPhoto}
            initials="AN"
            name="Abner Noel"
            degree="B.S. Computer Science · Georgia Tech"
            origin="From Singapore"
          />
        </div>

        {/* Divider + arrow */}
        <div className="flex flex-col items-center mt-16 gap-3">
          <div className="w-px h-10 bg-border" />
          <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
}
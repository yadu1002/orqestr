import React from 'react';
import { motion } from 'framer-motion';

const udayPhoto = "https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/cab0b13e6_240F2BE1-E623-4AD1-8FAD-08174BCD00A3_1_105_c.jpg";
const abnerPhoto = "https://media.base44.com/images/public/69b99ed6c3a6d72f46930260/bf315c229_7F02DF97-E5A3-4D5B-B2E8-6A3562CC561B_1_105_c.jpeg";

const founders = [
  { photo: udayPhoto, name: "Uday Mandala", role: "Co-Founder · Georgia Tech" },
  { photo: abnerPhoto, name: "Abner Noel", role: "Co-Founder · Georgia Tech" },
];

export default function FoundersSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            Why we built Orqestr
          </h2>
          <div className="space-y-4 text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto mb-16">
            <p>
              Modern software companies collect enormous amounts of customer data across CRM systems, product analytics, and support platforms.
            </p>
            <p>
              But acting on those signals requires jumping between tools, notifying the right people, and coordinating teams manually.
            </p>
            <p className="text-foreground font-medium">
              Orqestr was created to turn those signals into coordinated action automatically.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-12">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-border shadow-md mb-4">
                <img src={founder.photo} alt={founder.name} className="w-full h-full object-cover object-top" />
              </div>
              <p className="font-semibold text-foreground">{founder.name}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{founder.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
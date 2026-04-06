import React from 'react';
import { motion } from 'framer-motion';

const quotes = [
  {
    text: "By the time I'm getting around to talking to customers, the damage is already being done. All my work is reactive.",
    attribution: "— Director, Cloud Advisory · Fortune 500 Enterprise SaaS",
    tag: "CHURN SIGNAL GAP",
  },
  {
    text: "The dashboard is retrospective. It's not predictive. How do we make recommendations before the problem starts?",
    attribution: "— Director, Cloud Advisory · Fortune 500 Enterprise SaaS",
    tag: "RETROSPECTIVE DATA",
  },
  {
    text: "I could put three project managers on this and just scratch the surface sending 30 emails a day. The small accounts add up to a third of our problem.",
    attribution: "— Director, Cloud Advisory · Fortune 500 Enterprise SaaS",
    tag: "MANUAL SCALING FAILURE",
  },
];

const stats = [
  { value: "34%",    label: "of churn signals missed due to manual processes" },
  { value: "3+ tools", label: "the average CS team manually coordinates across to act on one signal" },
  { value: "2–5 days", label: "average time from signal detected to action taken" },
];

export default function CustomerPainSection() {
  return (
    <section className="py-20 px-6 bg-slate-50/80">
      <div className="max-w-6xl mx-auto">

        {/* Label + Headings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Customer Discovery</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            We didn't guess the problem. We heard it firsthand.
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Before writing a single line of code, we spoke with CS and RevOps leaders at enterprise SaaS companies. Here's what they told us — in their own words.
          </p>
        </motion.div>

        {/* Quote Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex flex-col bg-white rounded-xl shadow-sm border border-border"
              style={{ borderLeft: '3px solid #16a34a' }}
            >
              <div className="p-6 flex flex-col flex-1">
                {/* Large quotation mark */}
                <span className="text-5xl font-serif leading-none text-primary/70 mb-3 select-none">"</span>
                {/* Quote text */}
                <p className="text-[15px] font-medium text-foreground leading-relaxed flex-1 mb-4">
                  {q.text}
                </p>
                {/* Attribution */}
                <p className="text-xs text-muted-foreground italic mb-4">{q.attribution}</p>
                {/* Tag */}
                <span className="self-start text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {q.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stat Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl bg-primary/5 border border-primary/15 px-6 py-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-primary/20 gap-0">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center px-8 py-4 sm:py-0 w-full sm:w-auto">
                <span className="text-3xl font-bold text-primary mb-1">{s.value}</span>
                <span className="text-xs text-muted-foreground max-w-[160px] leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-base font-medium text-foreground"
        >
          These aren't hypothetical problems. They are the{' '}
          <span className="relative inline-block">
            exact gaps
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/60 rounded-full" />
          </span>
          {' '}Orqestr was built to close.
        </motion.p>

      </div>
    </section>
  );
}
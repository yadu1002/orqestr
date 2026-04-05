import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "How is Orqestr different from Gainsight or ChurnZero?",
    a: "Gainsight and ChurnZero are full customer success platforms that require months to implement and significant ongoing admin. Orqestr is not a replacement — it is an orchestration layer that sits on top of your existing tools, including Gainsight, and turns the signals already in your stack into automated action. Setup takes days, not months."
  },
  {
    q: "What integrations does Orqestr support?",
    a: "In our initial release we connect to Salesforce, HubSpot, Segment, Amplitude, Gainsight, Slack, and Zendesk. We are adding new integrations every sprint based on waitlist feedback."
  },
  {
    q: "How long does it take to get value from Orqestr?",
    a: "Most teams see their first automated playbook trigger within 48 hours of connecting their first integration. There is no implementation project, no professional services engagement, and no data team required."
  },
  {
    q: "Do we need to replace our current CS platform?",
    a: "No. Orqestr is designed to work alongside Gainsight, ChurnZero, Vitally, and any other CS platform you already use. It reads signals from those tools and adds the coordination layer on top."
  },
  {
    q: "How do we join the early access program?",
    a: "Fill out the waitlist form below. We are onboarding a small group of teams in our first cohort and will reach out within 48 hours of your submission."
  }
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="border-b border-border/60 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-medium text-foreground">{q}</span>
        <span className="shrink-0 text-primary">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Common Questions</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Everything you need to know</h2>
        </motion.div>
        <div className="rounded-2xl border border-border/50 bg-card/50 px-8">
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
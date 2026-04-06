import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: "How is Orqestr different from Gainsight or ChurnZero?",
    a: "Gainsight and ChurnZero are full CS platforms that take months to implement and require dedicated admins. Orqestr is not a replacement — it is the coordination layer that sits on top of whatever you already have. If Gainsight is your system of record, Orqestr reads from it and turns its signals into automated cross-team action. Gainsight tells you a customer is at risk. Orqestr is what actually does something about it — automatically, across every team that needs to be involved, in seconds."
  },
  {
    q: "Why not just build this internally or use Zapier?",
    a: "Zapier connects apps. Orqestr understands customers. No Zapier workflow knows that a $95k ARR account with a 23-point health score drop and a renewal in 32 days needs to be escalated immediately with a specific playbook. Internal builds take 6 to 9 months and still miss the cross-team coordination layer. Orqestr is live in 48 hours with pre-built playbooks, signal normalization, and entity resolution included from day one."
  },
  {
    q: "Why are two students the right people to build this?",
    a: "Uday spent time inside SAP as a Cloud Adoption Advisor working with 100+ enterprise accounts — building the dashboards that were supposed to surface customer risk and watching firsthand as those signals went unacted on because no coordination system existed. Abner brings a computer science background in systems design and has built production software from the ground up. We did not theorize this problem. We lived it from inside one of the largest enterprise SaaS companies in the world."
  },
  {
    q: "How is this different from AI features being added to Salesforce or Gainsight?",
    a: "What Gainsight and Salesforce are building is smarter reporting — better health scores, better predictions, better dashboards. What they are not building is the operational layer that takes those predictions and executes across CS, Sales, and Support simultaneously. An AI health score a CSM still has to manually read and act on is still a dashboard problem. Orqestr is the system that acts on the signal — not the system that surfaces it."
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
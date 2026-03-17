import React from 'react';
import { motion } from 'framer-motion';
import { Cable, Search, Play } from 'lucide-react';

const steps = [
  {
    number: "01",
    icon: Cable,
    title: "Ingest signals from your stack",
    description: "Connect your CRM, product analytics, support tools, and CS platforms. Orqestr unifies signals into a single intelligence layer.",
    tags: ["Salesforce", "Segment", "Gainsight", "Zendesk"]
  },
  {
    number: "02",
    icon: Search,
    title: "Detect adoption gaps automatically",
    description: "AI-powered detection identifies churn risk, stalled onboarding, underused features, and expansion opportunities — in real time.",
    tags: ["Churn Risk", "Low Usage", "Feature Gaps", "Expansion"]
  },
  {
    number: "03",
    icon: Play,
    title: "Trigger coordinated playbooks",
    description: "Automatically notify the right people, create tasks, trigger workflows, and schedule outreach — across CS, Sales, and Support.",
    tags: ["Auto-notify", "Task Creation", "Workflows", "Outreach"]
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">How It Works</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Three steps to automated action
          </h2>
        </motion.div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative grid md:grid-cols-[120px_1fr] gap-6 p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
                  {step.number}
                </span>
              </div>
              <div>
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground border border-border/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
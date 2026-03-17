import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Clock, Bell, Mail, CheckCircle2 } from 'lucide-react';

const timelineSteps = [
  {
    icon: ShoppingCart,
    label: "Signal Detected",
    title: "Customer bought Feature X",
    detail: "Enterprise plan — Analytics Pro module activated",
    color: "bg-chart-2/20 text-chart-2"
  },
  {
    icon: Clock,
    label: "60 Days Later",
    title: "No usage after 60 days",
    detail: "Zero logins to Analytics Pro — adoption score: 0%",
    color: "bg-destructive/20 text-destructive"
  },
  {
    icon: Bell,
    label: "Auto-triggered",
    title: "Signaly notifies CSM",
    detail: "Slack alert + Salesforce task created for account owner",
    color: "bg-primary/20 text-primary"
  },
  {
    icon: Mail,
    label: "Playbook Action",
    title: "Onboarding workflow triggered",
    detail: "Personalized email sequence + training session scheduled",
    color: "bg-chart-3/20 text-chart-3"
  },
  {
    icon: CheckCircle2,
    label: "Outcome",
    title: "Customer activates in 2 weeks",
    detail: "Adoption score jumps to 78% — renewal risk eliminated",
    color: "bg-primary/20 text-primary"
  }
];

export default function UseCaseTimeline() {
  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">In Action</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            From signal to outcome
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            See how Signaly turns a missed adoption signal into coordinated action — automatically.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40" />

          <div className="space-y-8">
            {timelineSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content card */}
                <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{step.label}</span>
                  <h4 className="text-lg font-semibold mt-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.detail}</p>
                </div>

                {/* Icon dot */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center z-10">
                  <step.icon className={`w-5 h-5 ${step.color.split(' ')[1]}`} />
                </div>

                {/* Spacer for other side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
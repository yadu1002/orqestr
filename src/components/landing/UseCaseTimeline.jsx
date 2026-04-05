import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Clock, Bell, Mail, CheckCircle2, Play } from 'lucide-react';

const timelineSteps = [
  {
    icon: ShoppingCart,
    label: "Signal Detected",
    title: "Customer purchased Advanced Analytics module",
    detail: "Enterprise plan — Advanced Analytics module activated",
    color: "text-chart-2"
  },
  {
    icon: Clock,
    label: "60 Days Later",
    title: "No usage after 60 days",
    detail: "Zero logins to Analytics Pro — adoption score: 0%",
    color: "text-destructive"
  },
  {
    icon: Bell,
    label: "Auto-triggered",
    title: "Orqestr notifies CSM",
    detail: "Slack alert + Salesforce task created for account owner",
    color: "text-primary"
  },
  {
    icon: Mail,
    label: "Playbook Action",
    title: "Onboarding workflow triggered",
    detail: "Personalized email sequence + training session scheduled",
    color: "text-chart-3"
  },
  {
    icon: CheckCircle2,
    label: "Outcome",
    title: "Customer activates in 2 weeks",
    detail: "Adoption score jumps to 78% — renewal risk eliminated",
    color: "text-primary"
  }
];

const alerts = [
  {
    company: "Acme Corp",
    detail: "Login drop 60% over 14 days",
    meta: "Triggered: Daily Active Users · CRM: Salesforce · Health: 42",
    action: "Run \"At-risk playbook\"",
    borderColor: "border-l-destructive",
    actionColor: "text-destructive",
  },
  {
    company: "Globex Inc",
    detail: "No activity in 21 days, renewal in 30",
    meta: "Triggered: Engagement gap · Owner: Sarah M.",
    action: "Schedule QBR",
    borderColor: "border-l-orange-400",
    actionColor: "text-orange-500",
  },
  {
    company: "Wayne Ent",
    detail: "Feature adoption +3 modules this week",
    meta: "Triggered: Expansion signal · Potential upsell: $24k ARR",
    action: "Notify AE",
    borderColor: "border-l-primary",
    actionColor: "text-primary",
  }
];

export default function UseCaseTimeline() {
  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
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
            See how Orqestr turns a missed adoption signal into coordinated action — automatically.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40" />

            <div className="space-y-8">
              {timelineSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex items-start gap-6 pl-16"
                >
                  {/* Icon dot */}
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center z-10">
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>

                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{step.label}</span>
                    <h4 className="text-lg font-semibold mt-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{step.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl border border-border/60 shadow-2xl overflow-hidden bg-card/90 backdrop-blur-sm"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-secondary/60">
              <span className="w-3 h-3 rounded-full bg-destructive/70" />
              <span className="w-3 h-3 rounded-full bg-orange-400/70" />
              <span className="w-3 h-3 rounded-full bg-primary/70" />
              <span className="ml-3 text-xs text-muted-foreground font-medium">Orqestr — Signal Dashboard</span>
            </div>

            {/* Dashboard body */}
            <div className="grid grid-cols-[180px_1fr] divide-x divide-border/50">
              {/* Sidebar */}
              <div className="p-4 space-y-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Signal Feeds</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-destructive/8 border border-destructive/20">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-destructive" />
                        <span className="text-xs font-medium">Churn risk</span>
                      </div>
                      <span className="text-[10px] font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">12</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-secondary/60">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-orange-400" />
                        <span className="text-xs">Expansion signals</span>
                      </div>
                      <span className="text-[10px] font-bold text-orange-500 bg-orange-100 px-1.5 py-0.5 rounded">5</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-secondary/60">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-xs">Health → green</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Integrations</p>
                  <div className="flex flex-wrap gap-1">
                    {["Salesforce", "Segment", "Intercom", "Mixpanel"].map(t => (
                      <span key={t} className="px-1.5 py-0.5 text-[10px] rounded border border-border bg-secondary text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Alerts panel */}
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Active Alerts</p>
                <div className="space-y-2.5">
                  {alerts.map((alert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                      className={`p-3 rounded-xl border-l-4 bg-background border border-border/50 ${alert.borderColor}`}
                    >
                      <p className="text-xs font-semibold text-foreground leading-snug">
                        {alert.company} — {alert.detail}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{alert.meta}</p>
                      <button className={`mt-1.5 flex items-center gap-1 text-[10px] font-medium ${alert.actionColor}`}>
                        <Play className="w-2.5 h-2.5 fill-current" />
                        {alert.action}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
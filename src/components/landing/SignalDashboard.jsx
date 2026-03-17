import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const alerts = [
  {
    company: "Acme Corp",
    detail: "Login drop 60% over 14 days",
    meta: "Triggered: Daily Active Users · CRM: Salesforce · Health: 42",
    action: "Run \"At-risk playbook\"",
    color: "border-destructive",
    actionColor: "text-destructive",
    dot: "bg-destructive"
  },
  {
    company: "Globex Inc",
    detail: "No activity in 21 days, renewal in 30",
    meta: "Triggered: Engagement gap · Owner: Sarah M.",
    action: "Schedule QBR",
    color: "border-orange-400",
    actionColor: "text-orange-500",
    dot: "bg-orange-400"
  },
  {
    company: "Wayne Ent",
    detail: "Feature adoption +3 modules this week",
    meta: "Triggered: Expansion signal · Potential upsell: $24k ARR",
    action: "Notify AE",
    color: "border-primary",
    actionColor: "text-primary",
    dot: "bg-primary"
  }
];

export default function SignalDashboard() {
  return (
    <section className="py-8 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
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
          <div className="grid grid-cols-[220px_1fr] divide-x divide-border/50">
            {/* Left sidebar */}
            <div className="p-5 space-y-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Signal Feeds</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-destructive/8 border border-destructive/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      <span className="text-sm font-medium text-foreground">Churn risk</span>
                    </div>
                    <span className="text-xs font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">12</span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary/60">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-400" />
                      <span className="text-sm text-foreground">Expansion signals</span>
                    </div>
                    <span className="text-xs font-bold text-orange-500 bg-orange-100 px-1.5 py-0.5 rounded">5</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/60">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">Health → green</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Integrations</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Salesforce", "Segment", "Intercom", "Mixpanel"].map(t => (
                    <span key={t} className="px-2 py-1 text-xs rounded border border-border bg-secondary text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right alerts panel */}
            <div className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">Active Alerts</p>
              <div className="space-y-3">
                {alerts.map((alert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
                    className={`p-4 rounded-xl border-l-4 bg-background border border-border/50 ${alert.color}`}
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {alert.company} — {alert.detail}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.meta}</p>
                    <button className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${alert.actionColor}`}>
                      <Play className="w-3 h-3 fill-current" />
                      {alert.action}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
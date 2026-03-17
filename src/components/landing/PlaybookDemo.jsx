import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Users, ArrowRight, Target, TrendingUp, UserMinus, Play } from 'lucide-react';

const playbooks = {
  low_adoption: {
    icon: AlertTriangle,
    signal: "Low Feature Adoption",
    trigger: "Feature usage drops below 15% after 30 days of activation",
    team: "Customer Success Manager + Solutions Engineer",
    action: "Auto-create onboarding checklist, send personalized training invite, schedule CSM check-in call within 48 hours",
    outcome: "72% of flagged accounts reach healthy adoption within 3 weeks",
    color: "text-chart-4"
  },
  no_login: {
    icon: UserMinus,
    signal: "No Login in 30 Days",
    trigger: "Primary user and all team members inactive for 30+ consecutive days",
    team: "Account Executive + Customer Success Manager",
    action: "Trigger re-engagement email sequence, alert AE with expansion context, create at-risk flag in CRM with health score details",
    outcome: "58% re-engagement rate vs. 12% with manual outreach alone",
    color: "text-destructive"
  },
  expansion: {
    icon: TrendingUp,
    signal: "Expansion Opportunity Detected",
    trigger: "Usage exceeds plan limits by 20%+ for 2 consecutive weeks, with new team members added",
    team: "Account Executive + RevOps",
    action: "Generate expansion proposal draft, notify AE with usage data, schedule QBR if none planned within 30 days",
    outcome: "3.2x higher expansion close rate when triggered within the first week of signal detection",
    color: "text-primary"
  }
};

const alerts = [
  {
    company: "Acme Corp",
    detail: "Login drop 60% over 14 days",
    meta: "Triggered: Daily Active Users · CRM: Salesforce · Health: 42",
    action: "Run \"At-risk playbook\"",
    borderColor: "border-destructive",
    actionColor: "text-destructive"
  },
  {
    company: "Globex Inc",
    detail: "No activity in 21 days, renewal in 30",
    meta: "Triggered: Engagement gap · Owner: Sarah M.",
    action: "Schedule QBR",
    borderColor: "border-orange-400",
    actionColor: "text-orange-500"
  },
  {
    company: "Wayne Ent",
    detail: "Feature adoption +3 modules this week",
    meta: "Triggered: Expansion signal · Potential upsell: $24k ARR",
    action: "Notify AE",
    borderColor: "border-primary",
    actionColor: "text-primary"
  }
];

function PlaybookRow({ label, value, icon }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
        <p className="text-foreground">{value}</p>
      </div>
    </div>
  );
}

function PlaybookView() {
  const [selected, setSelected] = useState('low_adoption');
  const playbook = playbooks[selected];
  const Icon = playbook.icon;

  return (
    <>
      <div className="flex justify-center mb-10">
        <Select value={selected} onValueChange={setSelected}>
          <SelectTrigger className="w-72 h-12 rounded-xl bg-secondary border-border text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low_adoption">Low feature adoption</SelectItem>
            <SelectItem value="no_login">No login in 30 days</SelectItem>
            <SelectItem value="expansion">Expansion opportunity detected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden"
        >
          <div className="px-8 py-6 border-b border-border/50 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <Icon className={`w-6 h-6 ${playbook.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Signal Type</p>
              <h3 className="text-lg font-semibold">{playbook.signal}</h3>
            </div>
          </div>
          <div className="p-8 space-y-6">
            <PlaybookRow label="Trigger Condition" value={playbook.trigger} icon={<Target className="w-4 h-4 text-muted-foreground" />} />
            <PlaybookRow label="Team Notified" value={playbook.team} icon={<Users className="w-4 h-4 text-muted-foreground" />} />
            <PlaybookRow label="Action Taken" value={playbook.action} icon={<ArrowRight className="w-4 h-4 text-muted-foreground" />} />
            <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Expected Outcome</p>
              <p className="text-foreground font-medium">{playbook.outcome}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function DashboardView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-border/60 shadow-xl overflow-hidden bg-card/90 backdrop-blur-sm"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-secondary/60">
        <span className="w-3 h-3 rounded-full bg-destructive/70" />
        <span className="w-3 h-3 rounded-full bg-orange-400/70" />
        <span className="w-3 h-3 rounded-full bg-primary/70" />
        <span className="ml-3 text-xs text-muted-foreground font-medium">Orqestr — Signal Dashboard</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] divide-y sm:divide-y-0 sm:divide-x divide-border/50">
        {/* Sidebar */}
        <div className="p-5 space-y-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Signal Feeds</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary border border-border/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-sm font-medium text-foreground">Churn risk</span>
                </div>
                <span className="text-xs font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">12</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-sm text-foreground">Expansion signals</span>
                </div>
                <span className="text-xs font-bold text-orange-500 bg-orange-100 px-1.5 py-0.5 rounded">5</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
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

        {/* Alerts panel */}
        <div className="p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">Active Alerts</p>
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border-l-4 bg-background border border-border/50 ${alert.borderColor}`}
              >
                <p className="text-sm font-semibold text-foreground">{alert.company} — {alert.detail}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{alert.meta}</p>
                <button className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${alert.actionColor}`}>
                  <Play className="w-3 h-3 fill-current" />
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PlaybookDemo() {
  const [view, setView] = useState('playbook');

  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Interactive Demo</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            See Orqestr in action
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto mb-8">
            Choose how you'd like to explore the platform.
          </p>

          {/* View toggle */}
          <div className="flex justify-center">
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-72 h-12 rounded-xl bg-secondary border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="playbook">Step-by-step playbook flow</SelectItem>
                <SelectItem value="dashboard">Live signal dashboard view</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'playbook' ? (
            <motion.div key="playbook">
              <PlaybookView />
            </motion.div>
          ) : (
            <motion.div key="dashboard">
              <DashboardView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
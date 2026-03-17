import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Users, ArrowRight, Target, TrendingUp, UserMinus } from 'lucide-react';

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

export default function PlaybookDemo() {
  const [selected, setSelected] = useState('low_adoption');
  const playbook = playbooks[selected];
  const Icon = playbook.icon;

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
            Explore sample playbooks
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Select a signal type to see how Signaly would respond.
          </p>
        </motion.div>

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
            {/* Header */}
            <div className="px-8 py-6 border-b border-border/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Icon className={`w-6 h-6 ${playbook.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Signal Type</p>
                <h3 className="text-lg font-semibold">{playbook.signal}</h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6">
              <PlaybookRow
                label="Trigger Condition"
                value={playbook.trigger}
                icon={<Target className="w-4 h-4 text-muted-foreground" />}
              />
              <PlaybookRow
                label="Team Notified"
                value={playbook.team}
                icon={<Users className="w-4 h-4 text-muted-foreground" />}
              />
              <PlaybookRow
                label="Action Taken"
                value={playbook.action}
                icon={<ArrowRight className="w-4 h-4 text-muted-foreground" />}
              />

              {/* Outcome highlight */}
              <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">Expected Outcome</p>
                <p className="text-foreground font-medium">{playbook.outcome}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

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
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ToggleLeft, ToggleRight } from 'lucide-react';

const playbooks = [
  {
    id: 1, name: 'Feature Adoption — No Usage After 60 Days',
    trigger: 'Feature purchased but 0 usage after 60 days',
    status: 'active', fired: 34, completed: 28,
    steps: [
      { channel: 'slack', action: 'Alert CSM via Slack with account context + one-click actions' },
      { channel: 'crm', action: 'Create Salesforce task: "Schedule onboarding call"' },
      { channel: 'email', action: 'Send training email sequence (3 emails, 7-day cadence)' },
      { channel: 'calendar', action: 'Schedule 30-min onboarding session via Calendly' },
    ],
    outcome: '82% adoption recovery rate within 30 days'
  },
  {
    id: 2, name: 'Churn Risk — Login Drop',
    trigger: 'DAU drops > 50% over 14-day window',
    status: 'active', fired: 19, completed: 14,
    steps: [
      { channel: 'slack', action: 'Alert CSM + Manager in #cs-alerts with urgency flag' },
      { channel: 'crm', action: 'Update Salesforce health score, create escalation task' },
      { channel: 'email', action: 'CSM sends personalized re-engagement email within 24h' },
      { channel: 'slack', action: 'If no action in 48h — escalate to VP CS automatically' },
    ],
    outcome: '73% of at-risk accounts re-engaged within 2 weeks'
  },
  {
    id: 3, name: 'Renewal Risk — No QBR Scheduled',
    trigger: 'Renewal < 60 days, no QBR meeting logged in CRM',
    status: 'active', fired: 11, completed: 9,
    steps: [
      { channel: 'slack', action: 'Notify CSM + AE: QBR not scheduled, renewal approaching' },
      { channel: 'crm', action: 'Flag renewal opportunity in Salesforce as "At Risk"' },
      { channel: 'calendar', action: 'Auto-schedule QBR with account contacts via Google Calendar' },
    ],
    outcome: '91% QBR completion rate before renewal'
  },
  {
    id: 4, name: 'Expansion Opportunity',
    trigger: 'Seat growth > 30% or new module adoption spike',
    status: 'active', fired: 8, completed: 6,
    steps: [
      { channel: 'slack', action: 'Notify AE with upsell context and suggested SKU' },
      { channel: 'crm', action: 'Create Salesforce expansion opportunity with context' },
      { channel: 'email', action: 'AE sends personalized outreach within 1 business day' },
    ],
    outcome: '$180k in expansion ARR attributed this quarter'
  },
  {
    id: 5, name: 'Support Escalation Pattern',
    trigger: 'Support tickets > 3x baseline over 7 days',
    status: 'draft', fired: 0, completed: 0,
    steps: [
      { channel: 'slack', action: 'Alert CSM + Support Lead with ticket summary' },
      { channel: 'crm', action: 'Update health score, log escalation in Salesforce' },
      { channel: 'email', action: 'CSM sends proactive outreach: "We saw an uptick in tickets..."' },
    ],
    outcome: 'Reduce escalation-to-churn rate'
  },
];

const channelColors = {
  slack: 'bg-purple-50 text-purple-700 border-purple-200',
  email: 'bg-blue-50 text-blue-700 border-blue-200',
  crm: 'bg-orange-50 text-orange-700 border-orange-200',
  calendar: 'bg-primary/8 text-primary border-primary/20',
};

function PlaybookCard({ playbook }) {
  const [expanded, setExpanded] = useState(false);
  const [enabled, setEnabled] = useState(playbook.status === 'active');
  const completion = playbook.fired > 0 ? Math.round((playbook.completed / playbook.fired) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${enabled ? 'bg-primary/8 text-primary border-primary/20' : 'bg-secondary text-muted-foreground border-border'}`}>
                {enabled ? 'Active' : 'Draft'}
              </span>
              <span className="text-[10px] text-muted-foreground">{playbook.steps.length} steps</span>
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">{playbook.name}</p>
            <p className="text-xs text-muted-foreground">Trigger: {playbook.trigger}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Fired</p>
              <p className="text-sm font-semibold text-foreground">{playbook.fired}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Completed</p>
              <p className="text-sm font-semibold text-primary">{completion}%</p>
            </div>
            <button onClick={() => setEnabled(!enabled)} className="text-muted-foreground hover:text-foreground transition-colors">
              {enabled ? <ToggleRight className="w-6 h-6 text-primary" /> : <ToggleLeft className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          {expanded ? 'Hide steps' : 'View steps'}
          <ArrowRight className={`w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 pt-3 border-t border-border"
          >
            <div className="space-y-2 mb-3">
              {playbook.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                    <span className="text-muted-foreground text-xs">{i + 1}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium capitalize ${channelColors[step.channel]}`}>{step.channel}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{step.action}</p>
                </div>
              ))}
            </div>
            <div className="p-2.5 rounded-xl bg-accent border border-primary/20">
              <p className="text-xs text-accent-foreground">
                <span className="font-semibold">Outcome: </span>{playbook.outcome}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function PlaybooksView() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Active Playbooks', value: '4', color: 'text-primary' },
          { label: 'Total Fired (30d)', value: '72', color: 'text-foreground' },
          { label: 'Avg Completion', value: '84%', color: 'text-blue-600' },
        ].map(stat => (
          <div key={stat.label} className="rounded-2xl bg-card border border-border p-4 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {playbooks.map(pb => <PlaybookCard key={pb.id} playbook={pb} />)}
      </div>
    </div>
  );
}
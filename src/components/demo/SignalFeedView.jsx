import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Play, CheckCircle, X, ChevronDown, BellOff } from 'lucide-react';

const signals = [
  {
    id: 1, type: 'churn_risk', urgency: 'critical',
    company: 'Acme Corp', arr: '$84,000', csm: 'Jordan P.',
    title: 'Login drop — 62% over 14 days',
    detail: 'Daily active users fell from 47 to 18. Analytics Pro module has 0 sessions this week.',
    triggered: 'Daily Active Users threshold', source: 'Segment', daysAgo: 1, health: 38,
  },
  {
    id: 2, type: 'churn_risk', urgency: 'high',
    company: 'Globex Industries', arr: '$120,000', csm: 'Maria K.',
    title: 'No activity in 21 days — renewal in 30',
    detail: 'Zero logins across all users. Renewal date: May 4. No QBR scheduled.',
    triggered: 'Engagement gap + renewal proximity', source: 'Salesforce + Mixpanel', daysAgo: 2, health: 24,
  },
  {
    id: 3, type: 'feature_gap', urgency: 'medium',
    company: 'Initech LLC', arr: '$36,000', csm: 'Tom B.',
    title: 'Purchased Reporting Suite — zero usage after 45 days',
    detail: 'Customer purchased Reporting Suite on Feb 18. No user has accessed it.',
    triggered: 'Feature adoption threshold (60-day)', source: 'Amplitude', daysAgo: 3, health: 55,
  },
  {
    id: 4, type: 'expansion', urgency: 'opportunity',
    company: 'Wayne Enterprises', arr: '$52,000', csm: 'Lisa A.',
    title: 'High engagement — 3 new modules activated this week',
    detail: 'Users expanded from 12 to 28 this quarter. Power usage indicates upsell readiness.',
    triggered: 'Expansion signal — seat growth + module usage', source: 'Segment + Salesforce', daysAgo: 1, health: 91,
  },
  {
    id: 5, type: 'churn_risk', urgency: 'high',
    company: 'Umbrella Corp', arr: '$67,000', csm: 'Jordan P.',
    title: 'Support escalations spiked — 5 tickets in 7 days',
    detail: 'Avg ticket volume is 0.8/week. This week: 5. All related to API integration failures.',
    triggered: 'Support escalation pattern', source: 'Zendesk', daysAgo: 0, health: 41,
  },
  {
    id: 6, type: 'feature_gap', urgency: 'low',
    company: 'Stark Industries', arr: '$210,000', csm: 'Maria K.',
    title: 'Admin module used by only 1 of 8 licensed admins',
    detail: 'License utilization: 12.5%. 7 admin seats completely idle for 90+ days.',
    triggered: 'Seat utilization threshold', source: 'Mixpanel', daysAgo: 4, health: 67,
  },
];

const urgencyConfig = {
  critical: { label: 'Critical', color: 'text-red-600', bg: 'bg-red-50 border-red-200', dot: 'bg-red-500', borderLeft: 'border-l-red-500' },
  high: { label: 'High', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', dot: 'bg-orange-400', borderLeft: 'border-l-orange-400' },
  medium: { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200', dot: 'bg-yellow-400', borderLeft: 'border-l-yellow-400' },
  low: { label: 'Low', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', dot: 'bg-blue-400', borderLeft: 'border-l-blue-400' },
  opportunity: { label: 'Opportunity', color: 'text-primary', bg: 'bg-accent border-primary/20', dot: 'bg-primary', borderLeft: 'border-l-primary' },
};

function HealthBar({ score }) {
  const color = score >= 70 ? 'bg-primary' : score >= 40 ? 'bg-orange-400' : 'bg-red-500';
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-[10px] text-muted-foreground">{score}</span>
    </div>
  );
}

function SignalCard({ signal, onDismiss }) {
  const [expanded, setExpanded] = useState(false);
  const [acted, setActed] = useState(null);
  const cfg = urgencyConfig[signal.urgency];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`rounded-2xl border border-l-4 ${cfg.bg} ${cfg.borderLeft} overflow-hidden shadow-sm`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${cfg.dot} shrink-0`} />
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${cfg.color}`}>{cfg.label}</span>
              <span className="text-[10px] text-muted-foreground">· {signal.source}</span>
              <span className="text-[10px] text-muted-foreground">· {signal.daysAgo === 0 ? 'Today' : `${signal.daysAgo}d ago`}</span>
            </div>
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-semibold text-foreground">{signal.company}</p>
              <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded border border-border">{signal.arr} ARR</span>
              <span className="text-[10px] text-muted-foreground">CSM: {signal.csm}</span>
            </div>
            <p className="text-sm text-foreground/70">{signal.title}</p>
            <div className="mt-2"><HealthBar score={signal.health} /></div>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="shrink-0 text-muted-foreground hover:text-foreground mt-0.5">
            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 mt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Details</p>
                <p className="text-xs text-foreground/70 mb-3">{signal.detail}</p>
                <p className="text-[10px] text-muted-foreground">Triggered by: <span className="text-foreground/60">{signal.triggered}</span></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!acted ? (
          <div className="flex items-center gap-2 mt-3">
            {signal.type === 'expansion' ? (
              <button onClick={() => setActed('notify')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors border border-primary/20">
                <Play className="w-3 h-3 fill-current" /> Notify AE
              </button>
            ) : (
              <>
                <button onClick={() => setActed('playbook')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors border border-primary/20">
                  <Play className="w-3 h-3 fill-current" /> Run Playbook
                </button>
                <button onClick={() => setActed('schedule')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs font-medium hover:bg-muted transition-colors border border-border">
                  <Clock className="w-3 h-3" /> Schedule Call
                </button>
                <button onClick={() => setActed('snooze')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs font-medium hover:bg-muted transition-colors border border-border">
                  <BellOff className="w-3 h-3" /> Snooze 7d
                </button>
              </>
            )}
            <button onClick={() => onDismiss(signal.id)} className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mt-3 text-primary text-xs"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            {acted === 'playbook' && 'Playbook triggered — CSM notified via Slack, Salesforce task created'}
            {acted === 'schedule' && 'Call scheduled — calendar invite sent to CSM and account owner'}
            {acted === 'snooze' && 'Snoozed for 7 days — will resurface automatically'}
            {acted === 'notify' && 'AE notified via Slack — Salesforce opportunity flagged for upsell'}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function SignalFeedView() {
  const [filter, setFilter] = useState('all');
  const [dismissed, setDismissed] = useState([]);

  const handleDismiss = (id) => setDismissed(prev => [...prev, id]);

  const filtered = signals.filter(s => {
    if (dismissed.includes(s.id)) return false;
    if (filter === 'all') return true;
    if (filter === 'churn') return s.type === 'churn_risk';
    if (filter === 'expansion') return s.type === 'expansion';
    if (filter === 'feature') return s.type === 'feature_gap';
    return true;
  });

  const counts = {
    all: signals.filter(s => !dismissed.includes(s.id)).length,
    churn: signals.filter(s => !dismissed.includes(s.id) && s.type === 'churn_risk').length,
    expansion: signals.filter(s => !dismissed.includes(s.id) && s.type === 'expansion').length,
    feature: signals.filter(s => !dismissed.includes(s.id) && s.type === 'feature_gap').length,
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Alerts', value: counts.all, color: 'text-foreground' },
          { label: 'Churn Risk', value: counts.churn, color: 'text-red-600' },
          { label: 'Feature Gaps', value: counts.feature, color: 'text-yellow-600' },
          { label: 'Expansion', value: counts.expansion, color: 'text-primary' },
        ].map(stat => (
          <div key={stat.label} className="rounded-2xl bg-card border border-border p-4 shadow-sm">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {[
          { id: 'all', label: 'All Signals' },
          { id: 'churn', label: 'Churn Risk' },
          { id: 'expansion', label: 'Expansion' },
          { id: 'feature', label: 'Feature Gaps' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              filter === f.id ? 'bg-primary/10 text-primary border-primary/20' : 'text-muted-foreground hover:text-foreground bg-card border-border'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map(signal => (
            <SignalCard key={signal.id} signal={signal} onDismiss={handleDismiss} />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">All signals resolved ✓</div>
        )}
      </div>
    </div>
  );
}
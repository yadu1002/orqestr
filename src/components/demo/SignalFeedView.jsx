import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, X, CheckCircle, Calendar, User, DollarSign, Package, Play, BellOff } from 'lucide-react';
import GaugeCard from './GaugeCard';

const signals = [
  {
    id: 'SIG-001', company: 'Acme Corp', signalType: 'Low Feature Adoption', severity: 'high', status: 'open',
    description: 'Advanced Analytics purchased 67 days ago — 0 active users out of 12 licensed seats.',
    csm: 'Sarah Chen', timestamp: '2 hours ago', arr: '$84,000', renewal: 'Jun 14, 2026', health: 38,
    plan: 'Growth', feature: 'Advanced Analytics', activationDate: 'Jan 28, 2026', usagePct: 0,
    licensedSeats: 12, activeUsers: 0, source: 'Amplitude', triggerCondition: 'Feature adoption < 10% after 60 days',
    dateDetected: 'Apr 3, 2026', playbookName: 'Feature Adoption Recovery',
    playbookSteps: ['Notify CSM Sarah Chen via Slack', 'Create Salesforce task: Schedule adoption call', 'Send personalized training email to account admin', 'Schedule 30-min onboarding call with key users'],
    activityLog: [],
  },
  {
    id: 'SIG-002', company: 'TechFlow Inc', signalType: 'No Login', severity: 'critical', status: 'open',
    description: "3 key users haven't logged in for 14 days. Engagement dropping across the account.",
    csm: 'Marcus Johnson', timestamp: '5 hours ago', arr: '$42,000', renewal: 'Aug 2, 2026', health: 24,
    plan: 'Starter', feature: 'Core Platform', activationDate: 'Oct 12, 2025', usagePct: 12,
    licensedSeats: 8, activeUsers: 2, source: 'Mixpanel', triggerCondition: 'Key users inactive > 10 days',
    dateDetected: 'Apr 4, 2026', playbookName: 'Re-Engagement Campaign',
    playbookSteps: ['Alert CSM Marcus Johnson with account context', 'Send "We miss you" re-engagement email sequence', 'Create Salesforce task: Outreach within 48h', 'Flag account for health review in next team standup'],
    activityLog: [{ date: 'Apr 3, 2026', action: 'Signal detected and assigned to Marcus Johnson' }],
  },
  {
    id: 'SIG-003', company: 'DataSync Pro', signalType: 'Expansion Signal', severity: 'opportunity', status: 'open',
    description: 'Usage at 94% of plan limit. Strong upsell signal — team added 16 users this quarter.',
    csm: 'Sarah Chen', timestamp: '1 day ago', arr: '$120,000', renewal: 'Sep 30, 2026', health: 91,
    plan: 'Professional', feature: 'Full Platform', activationDate: 'Mar 1, 2025', usagePct: 94,
    licensedSeats: 50, activeUsers: 47, source: 'Segment', triggerCondition: 'Plan utilization > 90% for 7 days',
    dateDetected: 'Apr 4, 2026', playbookName: 'Expansion & Upsell',
    playbookSteps: ['Notify Account Executive of upsell opportunity', 'Create Salesforce opportunity: Expansion deal', 'Send usage report to account champion', 'Schedule business review to discuss Enterprise upgrade'],
    activityLog: [],
  },
  {
    id: 'SIG-004', company: 'CloudBase', signalType: 'Support Escalation', severity: 'high', status: 'open',
    description: '3 P1 tickets opened in 7 days. Escalation pattern detected — API integration failures.',
    csm: 'Alex Rivera', timestamp: '3 hours ago', arr: '$67,000', renewal: 'Jul 20, 2026', health: 41,
    plan: 'Growth', feature: 'API Integration Suite', activationDate: 'Nov 5, 2025', usagePct: 55,
    licensedSeats: 20, activeUsers: 11, source: 'Zendesk', triggerCondition: 'P1 tickets ≥ 3 within 7-day window',
    dateDetected: 'Apr 5, 2026', playbookName: 'Support Escalation Response',
    playbookSteps: ['Page CSM Alex Rivera immediately', 'Create Salesforce escalation task with priority: urgent', 'Loop in Support Engineering team lead', 'Schedule executive sponsor call within 24h'],
    activityLog: [{ date: 'Apr 5, 2026', action: 'Escalation pattern detected — auto-assigned to Alex Rivera' }, { date: 'Apr 5, 2026', action: 'Slack notification sent to CS team channel' }],
  },
  {
    id: 'SIG-005', company: 'FinOps Labs', signalType: 'Low Feature Adoption', severity: 'medium', status: 'snoozed',
    description: 'Workflow Builder used by only 2 of 45 licensed users — adoption at 4.4%.',
    csm: 'Marcus Johnson', timestamp: '2 days ago', arr: '$36,000', renewal: 'Oct 8, 2026', health: 55,
    plan: 'Starter', feature: 'Workflow Builder', activationDate: 'Feb 3, 2026', usagePct: 4,
    licensedSeats: 45, activeUsers: 2, source: 'Amplitude', triggerCondition: 'Feature adoption < 15% after 30 days',
    dateDetected: 'Apr 2, 2026', playbookName: 'Feature Adoption Recovery',
    playbookSteps: ['Notify CSM Marcus Johnson via Slack', 'Create Salesforce task: Schedule adoption call', 'Send personalized training email to account admin', 'Schedule 30-min onboarding call with key users'],
    activityLog: [{ date: 'Apr 2, 2026', action: 'Signal detected — snoozed for 7 days by Marcus Johnson' }],
  },
  {
    id: 'SIG-006', company: 'ScaleUp AI', signalType: 'Renewal Risk', severity: 'critical', status: 'open',
    description: 'Health score dropped 23 points in 30 days. Renewal in 32 days — no QBR scheduled.',
    csm: 'Sarah Chen', timestamp: '30 mins ago', arr: '$95,000', renewal: 'May 7, 2026', health: 31,
    plan: 'Professional', feature: 'Full Platform', activationDate: 'May 7, 2025', usagePct: 28,
    licensedSeats: 30, activeUsers: 8, source: 'Salesforce', triggerCondition: 'Health score drop > 20 pts + renewal < 45 days',
    dateDetected: 'Apr 5, 2026', playbookName: 'Renewal Risk Response',
    playbookSteps: ['Immediately alert CSM Sarah Chen + VP CS', 'Create Salesforce task: Emergency QBR outreach', 'Send personalized renewal value email', 'Schedule executive business review ASAP'],
    activityLog: [],
  },
];

const SEV = {
  critical:    { label: 'CRITICAL',  color: '#ef4444', bg: 'bg-red-50',    text: 'text-red-600',    border: 'border-red-200',    bar: '#ef4444' },
  high:        { label: 'HIGH',      color: '#f97316', bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', bar: '#f97316' },
  medium:      { label: 'MEDIUM',    color: '#eab308', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', bar: '#eab308' },
  low:         { label: 'LOW',       color: '#3b82f6', bg: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-200',   bar: '#3b82f6' },
  opportunity: { label: 'EXPANSION', color: '#16a34a', bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  bar: '#16a34a' },
};

const STATUS = {
  open:     { label: 'OPEN',     cls: 'text-orange-600 border-orange-200 bg-orange-50' },
  actioned: { label: 'ACTIONED', cls: 'text-green-700 border-green-200 bg-green-50' },
  snoozed:  { label: 'SNOOZED',  cls: 'text-muted-foreground border-border bg-secondary' },
};

function HealthBar({ score }) {
  const color = score >= 70 ? '#16a34a' : score >= 40 ? '#f97316' : '#ef4444';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-secondary">
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-xs text-foreground w-6 text-right font-semibold">{score}</span>
    </div>
  );
}

function SignalRow({ signal, onClick, onAction }) {
  const sev = SEV[signal.severity] || SEV.medium;
  const status = STATUS[signal.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12 }}
      onClick={() => onClick(signal)}
      className="relative flex items-stretch cursor-pointer group overflow-hidden rounded-lg border border-border bg-white hover:shadow-sm transition-shadow"
    >
      {/* Severity bar */}
      <div className="w-1 shrink-0 self-stretch rounded-l-lg" style={{ background: sev.bar }} />

      <div className="flex-1 flex items-center gap-4 px-4 py-3 min-w-0">
        {/* Severity badge */}
        <span className={`text-[10px] font-bold w-20 shrink-0 uppercase tracking-wide ${sev.text}`}>
          {sev.label}
        </span>

        {/* Company + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-bold text-foreground">{signal.company}</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${status.cls}`}>
              {status.label}
            </span>
          </div>
          <span className="text-xs text-muted-foreground leading-snug block truncate">
            {signal.description}
          </span>
        </div>

        {/* Source + meta */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] px-2 py-1 rounded-md border border-border bg-secondary text-muted-foreground">
            {signal.source}
          </span>
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground block">{signal.timestamp}</span>
            <span className="text-[10px] text-muted-foreground block">{signal.csm}</span>
          </div>
          <span className="text-[10px] text-border group-hover:text-muted-foreground transition-colors w-16 text-right font-medium">
            {signal.id}
          </span>
        </div>

        {/* Hover actions */}
        <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {[
            { icon: Play, action: 'playbook', title: 'Run Playbook', primary: true },
            { icon: Phone, action: 'call', title: 'Schedule Call' },
            { icon: Mail, action: 'email', title: 'Send Email' },
            { icon: BellOff, action: 'snooze', title: 'Snooze' },
          ].map(({ icon: Icon, action, title, primary }) => (
            <button
              key={action}
              onClick={e => { e.stopPropagation(); onAction(signal.id, action); }}
              title={title}
              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${primary ? 'hover:bg-primary/10 text-primary' : 'hover:bg-secondary text-muted-foreground'}`}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SignalModal({ signal, onClose, onAction }) {
  const [playbookRun, setPlaybookRun] = useState(false);
  if (!signal) return null;

  const sev = SEV[signal.severity] || SEV.medium;
  const status = STATUS[signal.status];

  return (
    <AnimatePresence>
      <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 z-40 bg-black/40" />
      <motion.div key="modal" initial={{ opacity: 0, scale: 0.97, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }} transition={{ duration: 0.16, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
      >
        <div className="pointer-events-auto flex flex-col overflow-hidden bg-white rounded-xl border border-border shadow-2xl"
          style={{ width: 640, maxHeight: '85vh' }}>

          {/* Header */}
          <div className="px-6 py-4 shrink-0 flex items-start justify-between border-b border-border">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-base font-bold text-foreground">{signal.company}</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sev.bg} ${sev.text} ${sev.border}`}>
                  {sev.label}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.cls}`}>
                  {status.label}
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">{signal.id} · {signal.signalType}</span>
            </div>
            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors shrink-0 mt-0.5">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">

            {/* Signal Summary */}
            <div className="px-6 py-4 border-b border-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Signal Summary</p>
              <div className="rounded-lg space-y-2 p-3 bg-secondary border border-border">
                {[
                  { label: 'Trigger', value: signal.triggerCondition },
                  { label: 'Date Detected', value: signal.dateDetected },
                  { label: 'Severity', value: <span className={sev.text}>{sev.label}</span> },
                  { label: 'Source', value: signal.source },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4">
                    <span className="text-[10px] text-muted-foreground shrink-0">{label}</span>
                    <span className="text-[11px] text-foreground text-right font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Context */}
            <div className="px-6 py-4 border-b border-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Account Context</p>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { icon: DollarSign, label: 'ARR', value: signal.arr },
                  { icon: User, label: 'CSM', value: signal.csm },
                  { icon: Calendar, label: 'Renewal', value: signal.renewal },
                  { icon: Package, label: 'Plan', value: signal.plan },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-lg p-3 bg-secondary border border-border">
                    <div className="flex items-center gap-1 mb-1">
                      <Icon className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[9px] text-muted-foreground uppercase tracking-wide">{label}</span>
                    </div>
                    <span className="text-xs text-foreground font-semibold">{value}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-muted-foreground">Health Score</span>
                  <span className="text-[10px] text-foreground font-semibold">{signal.health}/100</span>
                </div>
                <HealthBar score={signal.health} />
              </div>
            </div>

            {/* Adoption Metrics */}
            <div className="px-6 py-4 border-b border-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Adoption Metrics</p>
              <div className="space-y-2">
                {[
                  { label: 'Feature / Module', value: signal.feature },
                  { label: 'Activation Date', value: signal.activationDate },
                  { label: 'Active / Licensed', value: `${signal.activeUsers} / ${signal.licensedSeats} users` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-[10px] text-muted-foreground">{label}</span>
                    <span className="text-[11px] text-foreground font-medium">{value}</span>
                  </div>
                ))}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground">Usage Rate</span>
                    <span className="text-[10px] text-foreground font-semibold">{signal.usagePct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden bg-secondary">
                    <div className="h-full rounded-full" style={{ width: `${signal.usagePct}%`, background: signal.usagePct > 80 ? '#16a34a' : signal.usagePct > 40 ? '#f97316' : '#ef4444' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Playbook */}
            <div className="px-6 py-4 border-b border-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Recommended Playbook</p>
              <div className="rounded-lg p-4 bg-primary/5 border border-primary/20">
                <span className="text-xs text-foreground font-bold block mb-3">{signal.playbookName}</span>
                <div className="space-y-2">
                  {signal.playbookSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 bg-primary/10 text-primary border border-primary/20">{i + 1}</span>
                      <span className="text-[11px] text-muted-foreground leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="px-6 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Activity Log</p>
              <div className="space-y-2">
                {playbookRun && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-primary" />
                    <div>
                      <span className="text-[11px] text-foreground block font-medium">Playbook "{signal.playbookName}" triggered</span>
                      <span className="text-[10px] text-muted-foreground">Just now</span>
                    </div>
                  </div>
                )}
                {signal.activityLog.length > 0 ? signal.activityLog.map((entry, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-border" />
                    <div>
                      <span className="text-[11px] text-muted-foreground block">{entry.action}</span>
                      <span className="text-[10px] text-muted-foreground/60">{entry.date}</span>
                    </div>
                  </div>
                )) : !playbookRun && (
                  <span className="text-[11px] text-muted-foreground/60 italic">No actions taken yet.</span>
                )}
              </div>
            </div>
          </div>

          {/* Sticky bottom action bar */}
          <div className="px-6 py-4 shrink-0 border-t border-border bg-secondary/50">
            {playbookRun ? (
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Playbook running — CSM notified, Salesforce task created</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => { setPlaybookRun(true); onAction(signal.id, 'playbook'); }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current" /> Run Playbook
                </button>
                <button onClick={() => onAction(signal.id, 'call')}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border border-border bg-white text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                  <Phone className="w-3.5 h-3.5" /> Schedule Call
                </button>
                <button onClick={() => onAction(signal.id, 'snooze')}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border border-border bg-white text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                  <BellOff className="w-3.5 h-3.5" /> Snooze 7d
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function SignalFeedView() {
  const [filter, setFilter] = useState('all');
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [actionedIds, setActionedIds] = useState([]);

  const handleAction = (id, action) => {
    if (action === 'playbook') setActionedIds(prev => [...prev, id]);
  };

  const counts = {
    all: signals.length,
    open: signals.filter(s => s.status === 'open').length,
    actioned: signals.filter(s => s.status === 'actioned' || actionedIds.includes(s.id)).length,
    snoozed: signals.filter(s => s.status === 'snoozed').length,
  };

  const filtered = signals.filter(s => {
    if (filter === 'all') return true;
    if (filter === 'open') return s.status === 'open';
    if (filter === 'actioned') return s.status === 'actioned' || actionedIds.includes(s.id);
    if (filter === 'snoozed') return s.status === 'snoozed';
    return true;
  });

  const gauges = [
    { label: 'Total Signals', value: counts.all,      pct: Math.round((counts.all / 10) * 100),      accentColor: '#3b82f6', topColor: '#3b82f6' },
    { label: 'Open',          value: counts.open,     pct: Math.round((counts.open / counts.all) * 100),    accentColor: '#f97316', topColor: '#f97316' },
    { label: 'Actioned',      value: counts.actioned, pct: Math.round((counts.actioned / counts.all) * 100), accentColor: '#16a34a', topColor: '#16a34a' },
    { label: 'Snoozed',       value: counts.snoozed,  pct: Math.round((counts.snoozed / counts.all) * 100),  accentColor: '#9ca3af', topColor: '#9ca3af' },
  ];

  const filterTabs = [
    { id: 'all',      label: `All (${counts.all})` },
    { id: 'open',     label: `Open (${counts.open})` },
    { id: 'actioned', label: `Actioned (${counts.actioned})` },
    { id: 'snoozed',  label: `Snoozed (${counts.snoozed})` },
  ];

  return (
    <div className="h-full">
      {/* Stats gauges */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {gauges.map(g => <GaugeCard key={g.label} {...g} />)}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 mb-4 border-b border-border">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 -mb-px ${
              filter === tab.id ? 'text-primary border-b-primary' : 'text-muted-foreground border-b-transparent hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Signal rows */}
      <div className="space-y-1.5">
        <AnimatePresence>
          {filtered.map(signal => (
            <SignalRow key={signal.id} signal={signal} onClick={setSelectedSignal} onAction={handleAction} />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-sm text-muted-foreground">No signals match this filter</div>
        )}
      </div>

      {selectedSignal && (
        <SignalModal signal={selectedSignal} onClose={() => setSelectedSignal(null)} onAction={handleAction} />
      )}
    </div>
  );
}
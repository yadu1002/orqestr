import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, X, CheckCircle, Calendar, User, DollarSign, Package, Play, BellOff } from 'lucide-react';
import confetti from 'canvas-confetti';

// ─── Data ───────────────────────────────────────────────────────────────────

const LIVE_SIGNAL = {
  id: 'SIG-LIVE', company: 'Stripe Inc', signalType: 'Renewal Risk', severity: 'critical', status: 'open',
  description: 'Health score dropped 31 points — renewal in 18 days. No QBR scheduled.',
  csm: 'Sarah Chen', timestamp: 'Just now', arr: '$148,000', renewal: 'Apr 24, 2026', health: 29,
  plan: 'Enterprise', feature: 'Full Platform', activationDate: 'Apr 24, 2025', usagePct: 22,
  licensedSeats: 60, activeUsers: 13, source: 'Salesforce', triggerCondition: 'Health score drop > 25 pts + renewal < 21 days',
  dateDetected: 'Apr 6, 2026', playbookName: 'Renewal Risk Response',
  playbookSteps: ['Slack alert sent to Sarah Chen', 'Salesforce task created — Priority: Urgent', 'Training email drafted and sent to account admin', '30-min call scheduled via Calendly'],
  activityLog: [],
  isLive: true,
};

const BASE_SIGNALS = [
  {
    id: 'SIG-001', company: 'Acme Corp', signalType: 'Low Feature Adoption', severity: 'high', status: 'open',
    description: 'Advanced Analytics purchased 67 days ago — 0 active users out of 12 licensed seats.',
    csm: 'Sarah Chen', timestamp: '2 hours ago', arr: '$84,000', renewal: 'Jun 14, 2026', health: 38,
    plan: 'Growth', feature: 'Advanced Analytics', activationDate: 'Jan 28, 2026', usagePct: 0,
    licensedSeats: 12, activeUsers: 0, source: 'Amplitude', triggerCondition: 'Feature adoption < 10% after 60 days',
    dateDetected: 'Apr 3, 2026', playbookName: 'Feature Adoption Recovery',
    playbookSteps: ['Slack alert sent to Sarah Chen', 'Salesforce task created — Priority: Urgent', 'Training email drafted and sent to account admin', '30-min call scheduled via Calendly'],
    activityLog: [],
  },
  {
    id: 'SIG-002', company: 'TechFlow Inc', signalType: 'No Login', severity: 'critical', status: 'open',
    description: "3 key users haven't logged in for 14 days. Engagement dropping across the account.",
    csm: 'Marcus Johnson', timestamp: '5 hours ago', arr: '$42,000', renewal: 'Aug 2, 2026', health: 24,
    plan: 'Starter', feature: 'Core Platform', activationDate: 'Oct 12, 2025', usagePct: 12,
    licensedSeats: 8, activeUsers: 2, source: 'Mixpanel', triggerCondition: 'Key users inactive > 10 days',
    dateDetected: 'Apr 4, 2026', playbookName: 'Re-Engagement Campaign',
    playbookSteps: ['Slack alert sent to Marcus Johnson', 'Salesforce task created — Priority: High', 'Re-engagement email sent to 3 inactive users', '30-min call scheduled via Calendly'],
    activityLog: [{ date: 'Apr 3, 2026', action: 'Signal detected and assigned to Marcus Johnson' }],
  },
  {
    id: 'SIG-003', company: 'DataSync Pro', signalType: 'Expansion Signal', severity: 'opportunity', status: 'open',
    description: 'Usage at 94% of plan limit. Strong upsell signal — team added 16 users this quarter.',
    csm: 'Sarah Chen', timestamp: '1 day ago', arr: '$120,000', renewal: 'Sep 30, 2026', health: 91,
    plan: 'Professional', feature: 'Full Platform', activationDate: 'Mar 1, 2025', usagePct: 94,
    licensedSeats: 50, activeUsers: 47, source: 'Segment', triggerCondition: 'Plan utilization > 90% for 7 days',
    dateDetected: 'Apr 4, 2026', playbookName: 'Expansion & Upsell',
    playbookSteps: ['Slack alert sent to Sarah Chen', 'Salesforce opportunity created — Expansion deal', 'Usage report sent to account champion', 'Business review scheduled to discuss Enterprise upgrade'],
    activityLog: [],
  },
  {
    id: 'SIG-004', company: 'CloudBase', signalType: 'Support Escalation', severity: 'high', status: 'open',
    description: '3 P1 tickets opened in 7 days. Escalation pattern detected — API integration failures.',
    csm: 'Alex Rivera', timestamp: '3 hours ago', arr: '$67,000', renewal: 'Jul 20, 2026', health: 41,
    plan: 'Growth', feature: 'API Integration Suite', activationDate: 'Nov 5, 2025', usagePct: 55,
    licensedSeats: 20, activeUsers: 11, source: 'Zendesk', triggerCondition: 'P1 tickets ≥ 3 within 7-day window',
    dateDetected: 'Apr 5, 2026', playbookName: 'Support Escalation Response',
    playbookSteps: ['Slack alert sent to Alex Rivera', 'Salesforce escalation task created — Priority: Urgent', 'Support Engineering team lead looped in', 'Executive sponsor call scheduled within 24h'],
    activityLog: [{ date: 'Apr 5, 2026', action: 'Escalation pattern detected — auto-assigned to Alex Rivera' }],
  },
  {
    id: 'SIG-007', company: 'Nexus Health', signalType: 'Feature Adoption Recovery', severity: 'high', status: 'actioned',
    description: 'CSM ran adoption playbook — 3 training sessions scheduled, admin onboarded to Advanced Analytics.',
    csm: 'Sarah Chen', timestamp: '1 day ago', arr: '$78,000', renewal: 'Jul 10, 2026', health: 62,
    plan: 'Growth', feature: 'Advanced Analytics', activationDate: 'Feb 10, 2026', usagePct: 38,
    licensedSeats: 15, activeUsers: 6, source: 'Amplitude', triggerCondition: 'Feature adoption < 10% after 60 days',
    dateDetected: 'Apr 1, 2026', playbookName: 'Feature Adoption Recovery',
    playbookSteps: ['Slack alert sent to Sarah Chen', 'Salesforce task created — Priority: High', 'Training email drafted and sent to account admin', '30-min call scheduled via Calendly'],
    activityLog: [
      { date: 'Apr 1, 2026', action: 'Signal detected — assigned to Sarah Chen' },
      { date: 'Apr 1, 2026', action: 'Playbook "Feature Adoption Recovery" triggered' },
      { date: 'Apr 2, 2026', action: 'Training email sent to account admin (Jennifer Roe)' },
      { date: 'Apr 3, 2026', action: '3 onboarding sessions scheduled via Calendly' },
      { date: 'Apr 4, 2026', action: 'Salesforce task marked complete — adoption rising' },
    ],
  },
  {
    id: 'SIG-008', company: 'Stratos Capital', signalType: 'Renewal Risk Response', severity: 'critical', status: 'actioned',
    description: 'Emergency QBR held, exec sponsor engaged. Renewal confirmed — contract extended for 2 years.',
    csm: 'Marcus Johnson', timestamp: '3 days ago', arr: '$112,000', renewal: 'Apr 30, 2026', health: 71,
    plan: 'Professional', feature: 'Full Platform', activationDate: 'Apr 30, 2024', usagePct: 64,
    licensedSeats: 40, activeUsers: 26, source: 'Salesforce', triggerCondition: 'Health score drop > 20 pts + renewal < 45 days',
    dateDetected: 'Mar 29, 2026', playbookName: 'Renewal Risk Response',
    playbookSteps: ['Slack alert sent to Marcus Johnson', 'Salesforce task created — Priority: Urgent', 'Renewal value email sent to CFO and Champion', 'Emergency QBR scheduled ASAP'],
    activityLog: [
      { date: 'Mar 29, 2026', action: 'Critical renewal risk signal detected' },
      { date: 'Apr 1, 2026', action: 'Emergency QBR completed — exec sponsor re-engaged' },
      { date: 'Apr 3, 2026', action: 'Renewal confirmed — 2-year contract signed' },
    ],
  },
  {
    id: 'SIG-009', company: 'Meridian Logistics', signalType: 'Re-Engagement Campaign', severity: 'medium', status: 'actioned',
    description: 'Re-engagement sequence sent to 4 inactive users. 3 of 4 logged back in within 5 days.',
    csm: 'Alex Rivera', timestamp: '4 days ago', arr: '$48,000', renewal: 'Nov 15, 2026', health: 68,
    plan: 'Starter', feature: 'Core Platform', activationDate: 'Aug 1, 2025', usagePct: 72,
    licensedSeats: 12, activeUsers: 9, source: 'Mixpanel', triggerCondition: 'Key users inactive > 10 days',
    dateDetected: 'Mar 31, 2026', playbookName: 'Re-Engagement Campaign',
    playbookSteps: ['Slack alert sent to Alex Rivera', 'Salesforce task created — Priority: Medium', 'Re-engagement email sent to 4 inactive users', 'Account flagged for health review in standup'],
    activityLog: [
      { date: 'Mar 31, 2026', action: 'Signal detected — 4 users inactive for 12+ days' },
      { date: 'Apr 3, 2026', action: '3 of 4 users logged back in — health score recovering' },
      { date: 'Apr 5, 2026', action: 'Account flagged as recovered — signal resolved' },
    ],
  },
  {
    id: 'SIG-005', company: 'FinOps Labs', signalType: 'Low Feature Adoption', severity: 'medium', status: 'snoozed',
    description: 'Workflow Builder used by only 2 of 45 licensed users — adoption at 4.4%.',
    csm: 'Marcus Johnson', timestamp: '2 days ago', arr: '$36,000', renewal: 'Oct 8, 2026', health: 55,
    plan: 'Starter', feature: 'Workflow Builder', activationDate: 'Feb 3, 2026', usagePct: 4,
    licensedSeats: 45, activeUsers: 2, source: 'Amplitude', triggerCondition: 'Feature adoption < 15% after 30 days',
    dateDetected: 'Apr 2, 2026', playbookName: 'Feature Adoption Recovery',
    playbookSteps: ['Slack alert sent to Marcus Johnson', 'Salesforce task created — Priority: Medium', 'Training email drafted and sent to account admin', '30-min call scheduled via Calendly'],
    activityLog: [{ date: 'Apr 2, 2026', action: 'Signal detected — snoozed for 7 days by Marcus Johnson' }],
  },
  {
    id: 'SIG-006', company: 'ScaleUp AI', signalType: 'Renewal Risk', severity: 'critical', status: 'open',
    description: 'Health score dropped 23 points in 30 days. Renewal in 32 days — no QBR scheduled.',
    csm: 'Sarah Chen', timestamp: '30 mins ago', arr: '$95,000', renewal: 'May 7, 2026', health: 31,
    plan: 'Professional', feature: 'Full Platform', activationDate: 'May 7, 2025', usagePct: 28,
    licensedSeats: 30, activeUsers: 8, source: 'Salesforce', triggerCondition: 'Health score drop > 20 pts + renewal < 45 days',
    dateDetected: 'Apr 5, 2026', playbookName: 'Renewal Risk Response',
    playbookSteps: ['Slack alert sent to Sarah Chen and VP CS', 'Salesforce task created — Priority: Urgent', 'Renewal value email sent to CFO and Champion', 'Emergency QBR scheduled ASAP'],
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

const PLAYBOOK_STEP_META = [
  { icon: '💬', label: 'Slack', color: '#4A154B' },
  { icon: '☁️', label: 'Salesforce', color: '#00A1E0' },
  { icon: '✉️', label: 'Email', color: '#16a34a' },
  { icon: '📅', label: 'Calendly', color: '#006BFF' },
];

// ─── Subcomponents ───────────────────────────────────────────────────────────

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

function AnimatedNumber({ value, flash }) {
  return (
    <motion.p
      key={value}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, color: flash ? '#15803d' : undefined }}
    >
      {value}
    </motion.p>
  );
}

function StatTile({ label, value, numColor, topColor, flash }) {
  return (
    <motion.div
      animate={flash ? { backgroundColor: ['#F8F9FA', '#dcfce7', '#F8F9FA'] } : {}}
      transition={{ duration: 0.5 }}
      style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', borderTop: `3px solid ${topColor}`, borderRadius: 8, padding: 20 }}
    >
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151', marginBottom: 8 }}>{label}</p>
      <AnimatedNumber value={value} flash={flash} />
    </motion.div>
  );
}

function SignalRow({ signal, onClick, onAction, isNew }) {
  const sev = SEV[signal.severity] || SEV.medium;
  const status = STATUS[signal.status];
  const [showNew, setShowNew] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      const t = setTimeout(() => setShowNew(false), 5000);
      return () => clearTimeout(t);
    }
  }, [isNew]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={() => onClick(signal)}
      className={`relative flex items-stretch cursor-pointer group overflow-hidden rounded-lg border bg-white hover:shadow-sm transition-shadow ${
        isNew ? 'border-red-300 shadow-[0_0_12px_rgba(239,68,68,0.2)]' : 'border-border'
      }`}
    >
      {isNew && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{ boxShadow: ['0 0 0px rgba(239,68,68,0)', '0 0 16px rgba(239,68,68,0.3)', '0 0 0px rgba(239,68,68,0)'] }}
          transition={{ duration: 1.5, repeat: 3 }}
        />
      )}
      <div className="w-1 shrink-0 self-stretch rounded-l-lg" style={{ background: sev.bar }} />
      <div className="flex-1 flex items-center gap-4 px-4 py-3 min-w-0">
        <span className={`text-[10px] font-bold w-20 shrink-0 uppercase tracking-wide ${sev.text}`}>{sev.label}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-bold text-foreground">{signal.company}</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${status.cls}`}>{status.label}</span>
            <AnimatePresence>
              {showNew && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500 text-white animate-pulse"
                >NEW</motion.span>
              )}
            </AnimatePresence>
          </div>
          <span className="text-xs text-muted-foreground leading-snug block truncate">{signal.description}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] px-2 py-1 rounded-md border border-border bg-secondary text-muted-foreground">{signal.source}</span>
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground block">{signal.timestamp}</span>
            <span className="text-[10px] text-muted-foreground block">{signal.csm}</span>
          </div>
          <span className="text-[10px] text-border group-hover:text-muted-foreground transition-colors w-16 text-right font-medium">{signal.id}</span>
        </div>
        <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {[
            { icon: Play, action: 'playbook', title: 'Run Playbook', primary: true },
            { icon: Phone, action: 'call', title: 'Schedule Call' },
            { icon: Mail, action: 'email', title: 'Send Email' },
            { icon: BellOff, action: 'snooze', title: 'Snooze' },
          ].map(({ icon: Icon, action, title, primary }) => (
            <button key={action} onClick={e => { e.stopPropagation(); onAction(signal.id, action); }} title={title}
              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${primary ? 'hover:bg-primary/10 text-primary' : 'hover:bg-secondary text-muted-foreground'}`}>
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function PlaybookExecution({ steps, onComplete }) {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    steps.forEach((_, i) => {
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, i]);
        if (i === steps.length - 1) {
          setTimeout(() => {
            setDone(true);
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 }, colors: ['#16a34a', '#4ade80', '#bbf7d0'] });
            onComplete();
          }, 400);
        }
      }, (i + 1) * 600);
    });
  }, []);

  return (
    <div className="space-y-2">
      {steps.map((step, i) => {
        const meta = PLAYBOOK_STEP_META[i] || { icon: '✓', label: '', color: '#16a34a' };
        const completed = completedSteps.includes(i);
        return (
          <AnimatePresence key={i}>
            {completed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200"
              >
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-medium text-green-800">{step}</span>
                <span className="ml-auto text-base">{meta.icon}</span>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
      {done && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 p-3 rounded-lg bg-green-600 text-white mt-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="text-sm font-semibold">Playbook complete — {steps.length} actions taken in {((steps.length * 600) / 1000).toFixed(1)} seconds.</span>
        </motion.div>
      )}
    </div>
  );
}

function SignalModal({ signal, onClose, onAction, allSignals, currentIndex, onNavigate }) {
  const [playbookState, setPlaybookState] = useState('idle'); // idle | running | done
  const sev = SEV[signal.severity] || SEV.medium;
  const status = STATUS[signal.status];

  // Keyboard: Escape, ←, →
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < allSignals.length - 1) onNavigate(currentIndex + 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentIndex, allSignals]);

  return (
    <AnimatePresence>
      <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="fixed inset-0 z-40 bg-black/40" />
      <motion.div key="modal" initial={{ opacity: 0, scale: 0.97, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }} transition={{ duration: 0.16 }}
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
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sev.bg} ${sev.text} ${sev.border}`}>{sev.label}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.cls}`}>{status.label}</span>
              </div>
              <span className="text-[11px] text-muted-foreground">{signal.id} · {signal.signalType}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0 mt-0.5">
              {allSignals.length > 1 && (
                <div className="flex items-center gap-1">
                  <button onClick={() => currentIndex > 0 && onNavigate(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    className="w-6 h-6 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-secondary disabled:opacity-30 text-xs">←</button>
                  <span className="text-[10px] text-muted-foreground px-1">{currentIndex + 1}/{allSignals.length}</span>
                  <button onClick={() => currentIndex < allSignals.length - 1 && onNavigate(currentIndex + 1)}
                    disabled={currentIndex === allSignals.length - 1}
                    className="w-6 h-6 flex items-center justify-center rounded border border-border text-muted-foreground hover:bg-secondary disabled:opacity-30 text-xs">→</button>
                </div>
              )}
              <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
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

            {/* Playbook */}
            <div className="px-6 py-4 border-b border-border">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Recommended Playbook</p>
              {playbookState === 'idle' ? (
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
              ) : (
                <PlaybookExecution steps={signal.playbookSteps} onComplete={() => setPlaybookState('done')} />
              )}
            </div>

            {/* Activity Log */}
            <div className="px-6 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">Activity Log</p>
              <div className="space-y-2">
                {playbookState !== 'idle' && (
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
                )) : playbookState === 'idle' && (
                  <span className="text-[11px] text-muted-foreground/60 italic">No actions taken yet.</span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="px-6 py-4 shrink-0 border-t border-border bg-secondary/50">
            {playbookState === 'done' ? (
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Playbook running — CSM notified, Salesforce task created</span>
              </div>
            ) : playbookState === 'running' ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <span className="text-sm">Executing playbook steps...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => { setPlaybookState('running'); onAction(signal.id, 'playbook'); }}
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

// ─── Main View ────────────────────────────────────────────────────────────────

export default function SignalFeedView() {
  const [filter, setFilter] = useState('all');
  const [signals, setSignals] = useState(BASE_SIGNALS);
  const [actionedIds, setActionedIds] = useState([]);
  const [flashTile, setFlashTile] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  // Live signal injection after 3s
  useEffect(() => {
    const t = setTimeout(() => {
      setSignals(prev => {
        if (prev.find(s => s.id === LIVE_SIGNAL.id)) return prev;
        return [LIVE_SIGNAL, ...prev];
      });
      // ping sound
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 880; osc.type = 'sine';
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
      } catch (_) {}
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const handleAction = (id, action) => {
    if (action === 'playbook') {
      setActionedIds(prev => {
        if (prev.includes(id)) return prev;
        const steps = signals.find(s => s.id === id)?.playbookSteps?.length || 4;
        setTimeout(() => {
          setFlashTile('actioned');
          setTimeout(() => setFlashTile(null), 800);
        }, steps * 600 + 500);
        return [...prev, id];
      });
    }
  };

  const isActioned = (s) => s.status === 'actioned' || actionedIds.includes(s.id);

  const counts = {
    all: signals.length,
    open: signals.filter(s => s.status === 'open' && !actionedIds.includes(s.id)).length,
    actioned: signals.filter(isActioned).length,
    snoozed: signals.filter(s => s.status === 'snoozed').length,
  };

  const filtered = signals.filter(s => {
    if (filter === 'all') return true;
    if (filter === 'open') return s.status === 'open' && !actionedIds.includes(s.id);
    if (filter === 'actioned') return isActioned(s);
    if (filter === 'snoozed') return s.status === 'snoozed';
    return true;
  });

  const statTiles = [
    { label: 'TOTAL SIGNALS', value: counts.all,      numColor: '#1d4ed8', topColor: '#3b82f6' },
    { label: 'OPEN',          value: counts.open,     numColor: '#ea580c', topColor: '#f97316', flash: flashTile === 'open' },
    { label: 'ACTIONED',      value: counts.actioned, numColor: '#15803d', topColor: '#16a34a', flash: flashTile === 'actioned' },
    { label: 'SNOOZED',       value: counts.snoozed,  numColor: '#6b7280', topColor: '#9ca3af' },
  ];

  const filterTabs = [
    { id: 'all',      label: `All (${counts.all})` },
    { id: 'open',     label: `Open (${counts.open})` },
    { id: 'actioned', label: `Actioned (${counts.actioned})` },
    { id: 'snoozed',  label: `Snoozed (${counts.snoozed})` },
  ];

  const selectedSignal = selectedIdx !== null ? filtered[selectedIdx] : null;

  return (
    <div className="h-full">
      {/* Stat tiles */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {statTiles.map(t => (
          <StatTile key={t.label} {...t} />
        ))}
      </div>

      {/* Filter tabs + LIVE indicator */}
      <div className="flex items-center justify-between mb-4 border-b border-border">
        <div className="flex gap-0">
          {filterTabs.map(tab => (
            <button key={tab.id} onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 text-xs font-semibold transition-all border-b-2 -mb-px ${
                filter === tab.id ? 'text-primary border-b-primary' : 'text-muted-foreground border-b-transparent hover:text-foreground'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 pb-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-green-600">LIVE</span>
        </div>
      </div>

      {/* Signal rows */}
      <div className="space-y-1.5">
        <AnimatePresence>
          {filtered.map((signal, idx) => (
            <SignalRow key={signal.id} signal={signal} isNew={signal.isLive}
              onClick={() => setSelectedIdx(idx)}
              onAction={handleAction}
            />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-sm text-muted-foreground">No signals match this filter</div>
        )}
      </div>

      {selectedSignal && (
        <SignalModal
          signal={selectedSignal}
          onClose={() => setSelectedIdx(null)}
          onAction={handleAction}
          allSignals={filtered}
          currentIndex={selectedIdx}
          onNavigate={setSelectedIdx}
        />
      )}
    </div>
  );
}
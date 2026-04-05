import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Phone, Mail, Clock, Eye, Search, X, CheckCircle, Calendar, User, DollarSign, Activity, Package, Play, BellOff, ChevronRight } from 'lucide-react';

const signals = [
  {
    id: 'SIG-001',
    company: 'Acme Corp',
    signalType: 'Low Feature Adoption',
    severity: 'high',
    status: 'open',
    description: 'Advanced Analytics purchased 67 days ago — 0 active users out of 12 licensed seats.',
    csm: 'Sarah Chen',
    timestamp: '2 hours ago',
    arr: '$84,000',
    renewal: 'Jun 14, 2026',
    health: 38,
    plan: 'Growth',
    feature: 'Advanced Analytics',
    activationDate: 'Jan 28, 2026',
    usagePct: 0,
    licensedSeats: 12,
    activeUsers: 0,
    source: 'Amplitude',
    triggerCondition: 'Feature adoption < 10% after 60 days',
    dateDetected: 'Apr 3, 2026',
    playbookName: 'Feature Adoption Recovery',
    playbookSteps: [
      'Notify CSM Sarah Chen via Slack',
      'Create Salesforce task: Schedule adoption call',
      'Send personalized training email to account admin',
      'Schedule 30-min onboarding call with key users',
    ],
    activityLog: [],
  },
  {
    id: 'SIG-002',
    company: 'TechFlow Inc',
    signalType: 'No Login',
    severity: 'critical',
    status: 'open',
    description: "3 key users haven't logged in for 14 days. Engagement dropping across the account.",
    csm: 'Marcus Johnson',
    timestamp: '5 hours ago',
    arr: '$42,000',
    renewal: 'Aug 2, 2026',
    health: 24,
    plan: 'Starter',
    feature: 'Core Platform',
    activationDate: 'Oct 12, 2025',
    usagePct: 12,
    licensedSeats: 8,
    activeUsers: 2,
    source: 'Mixpanel',
    triggerCondition: 'Key users inactive > 10 days',
    dateDetected: 'Apr 4, 2026',
    playbookName: 'Re-Engagement Campaign',
    playbookSteps: [
      'Alert CSM Marcus Johnson with account context',
      'Send "We miss you" re-engagement email sequence',
      'Create Salesforce task: Outreach within 48h',
      'Flag account for health review in next team standup',
    ],
    activityLog: [
      { date: 'Apr 3, 2026', action: 'Signal detected and assigned to Marcus Johnson' },
    ],
  },
  {
    id: 'SIG-003',
    company: 'DataSync Pro',
    signalType: 'Expansion Signal',
    severity: 'opportunity',
    status: 'open',
    description: 'Usage at 94% of plan limit. Strong upsell signal — team added 16 users this quarter.',
    csm: 'Sarah Chen',
    timestamp: '1 day ago',
    arr: '$120,000',
    renewal: 'Sep 30, 2026',
    health: 91,
    plan: 'Professional',
    feature: 'Full Platform',
    activationDate: 'Mar 1, 2025',
    usagePct: 94,
    licensedSeats: 50,
    activeUsers: 47,
    source: 'Segment',
    triggerCondition: 'Plan utilization > 90% for 7 days',
    dateDetected: 'Apr 4, 2026',
    playbookName: 'Expansion & Upsell',
    playbookSteps: [
      'Notify Account Executive of upsell opportunity',
      'Create Salesforce opportunity: Expansion deal',
      'Send usage report to account champion',
      'Schedule business review to discuss Enterprise upgrade',
    ],
    activityLog: [],
  },
  {
    id: 'SIG-004',
    company: 'CloudBase',
    signalType: 'Support Escalation',
    severity: 'high',
    status: 'open',
    description: '3 P1 tickets opened in 7 days. Escalation pattern detected — API integration failures.',
    csm: 'Alex Rivera',
    timestamp: '3 hours ago',
    arr: '$67,000',
    renewal: 'Jul 20, 2026',
    health: 41,
    plan: 'Growth',
    feature: 'API Integration Suite',
    activationDate: 'Nov 5, 2025',
    usagePct: 55,
    licensedSeats: 20,
    activeUsers: 11,
    source: 'Zendesk',
    triggerCondition: 'P1 tickets ≥ 3 within 7-day window',
    dateDetected: 'Apr 5, 2026',
    playbookName: 'Support Escalation Response',
    playbookSteps: [
      'Page CSM Alex Rivera immediately',
      'Create Salesforce escalation task with priority: urgent',
      'Loop in Support Engineering team lead',
      'Schedule executive sponsor call within 24h',
    ],
    activityLog: [
      { date: 'Apr 5, 2026', action: 'Escalation pattern detected — auto-assigned to Alex Rivera' },
      { date: 'Apr 5, 2026', action: 'Slack notification sent to CS team channel' },
    ],
  },
  {
    id: 'SIG-005',
    company: 'FinOps Labs',
    signalType: 'Low Feature Adoption',
    severity: 'medium',
    status: 'snoozed',
    description: 'Workflow Builder used by only 2 of 45 licensed users — adoption at 4.4%.',
    csm: 'Marcus Johnson',
    timestamp: '2 days ago',
    arr: '$36,000',
    renewal: 'Oct 8, 2026',
    health: 55,
    plan: 'Starter',
    feature: 'Workflow Builder',
    activationDate: 'Feb 3, 2026',
    usagePct: 4,
    licensedSeats: 45,
    activeUsers: 2,
    source: 'Amplitude',
    triggerCondition: 'Feature adoption < 15% after 30 days',
    dateDetected: 'Apr 2, 2026',
    playbookName: 'Feature Adoption Recovery',
    playbookSteps: [
      'Notify CSM Marcus Johnson via Slack',
      'Create Salesforce task: Schedule adoption call',
      'Send personalized training email to account admin',
      'Schedule 30-min onboarding call with key users',
    ],
    activityLog: [
      { date: 'Apr 2, 2026', action: 'Signal detected — snoozed for 7 days by Marcus Johnson' },
    ],
  },
  {
    id: 'SIG-006',
    company: 'ScaleUp AI',
    signalType: 'Renewal Risk',
    severity: 'critical',
    status: 'open',
    description: 'Health score dropped 23 points in 30 days. Renewal in 32 days — no QBR scheduled.',
    csm: 'Sarah Chen',
    timestamp: '30 mins ago',
    arr: '$95,000',
    renewal: 'May 7, 2026',
    health: 31,
    plan: 'Professional',
    feature: 'Full Platform',
    activationDate: 'May 7, 2025',
    usagePct: 28,
    licensedSeats: 30,
    activeUsers: 8,
    source: 'Salesforce',
    triggerCondition: 'Health score drop > 20 pts + renewal < 45 days',
    dateDetected: 'Apr 5, 2026',
    playbookName: 'Renewal Risk Response',
    playbookSteps: [
      'Immediately alert CSM Sarah Chen + VP CS',
      'Create Salesforce task: Emergency QBR outreach',
      'Send personalized renewal value email',
      'Schedule executive business review ASAP',
    ],
    activityLog: [],
  },
];

const SEV = {
  critical: { label: 'CRITICAL', color: '#FF3B30', border: '#FF3B30', textClass: 'text-[#FF3B30]' },
  high:     { label: 'HIGH',     color: '#FF9500', border: '#FF9500', textClass: 'text-[#FF9500]' },
  medium:   { label: 'MEDIUM',   color: '#FFD60A', border: '#FFD60A', textClass: 'text-[#FFD60A]' },
  low:      { label: 'LOW',      color: '#58A6FF', border: '#58A6FF', textClass: 'text-[#58A6FF]' },
  opportunity: { label: 'EXPANSION', color: '#00C853', border: '#00C853', textClass: 'text-[#00C853]' },
};

const STATUS = {
  open:     { label: 'OPEN',     cls: 'text-[#FF9500] border-[#FF9500]/40 bg-[#FF9500]/10' },
  actioned: { label: 'ACTIONED', cls: 'text-[#00C853] border-[#00C853]/40 bg-[#00C853]/10' },
  snoozed:  { label: 'SNOOZED',  cls: 'text-[#8B949E] border-[#8B949E]/40 bg-[#8B949E]/10' },
};

function MonoValue({ children, className = '' }) {
  return (
    <span className={`font-mono ${className}`}>{children}</span>
  );
}

function HealthBar({ score }) {
  const color = score >= 70 ? '#00C853' : score >= 40 ? '#FF9500' : '#FF3B30';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#30363D' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
      <MonoValue className="text-xs text-[#F0F6FC] w-6 text-right">{score}</MonoValue>
    </div>
  );
}

function SignalRow({ signal, onClick, onAction }) {
  const sev = SEV[signal.severity] || SEV.medium;
  const status = STATUS[signal.status];

  const handleAction = (e, action) => {
    e.stopPropagation();
    onAction(signal.id, action);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12 }}
      onClick={() => onClick(signal)}
      className="relative flex items-stretch cursor-pointer group overflow-hidden rounded"
      style={{ background: '#1C2128', border: '1px solid #30363D' }}
    >
      {/* Severity bar */}
      <div className="w-1 shrink-0 self-stretch" style={{ background: sev.color }} />

      <div className="flex-1 flex items-center gap-4 px-4 py-3 min-w-0">
        {/* Severity label */}
        <MonoValue className={`text-[10px] font-bold w-20 shrink-0 ${sev.textClass}`}>
          {sev.label}
        </MonoValue>

        {/* Company + description */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-bold text-[#F0F6FC]">{signal.company}</span>
            <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border ${status.cls}`}>
              {status.label}
            </span>
          </div>
          <MonoValue className="text-xs text-[#8B949E] leading-snug block truncate">
            {signal.description}
          </MonoValue>
        </div>

        {/* Source + meta */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-mono px-2 py-1 rounded" style={{ background: '#0D1117', border: '1px solid #30363D', color: '#8B949E' }}>
            {signal.source}
          </span>
          <div className="text-right">
            <MonoValue className="text-[10px] text-[#8B949E] block">{signal.timestamp}</MonoValue>
            <MonoValue className="text-[10px] text-[#8B949E] block">{signal.csm}</MonoValue>
          </div>
          <MonoValue className="text-[10px] text-[#30363D] group-hover:text-[#8B949E] transition-colors w-16 text-right">
            {signal.id}
          </MonoValue>
        </div>

        {/* Hover actions */}
        <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {[
            { icon: Play, action: 'playbook', title: 'Run Playbook', green: true },
            { icon: Phone, action: 'call', title: 'Schedule Call' },
            { icon: Mail, action: 'email', title: 'Send Email' },
            { icon: BellOff, action: 'snooze', title: 'Snooze' },
          ].map(({ icon: Icon, action, title, green }) => (
            <button
              key={action}
              onClick={(e) => handleAction(e, action)}
              title={title}
              className="w-7 h-7 flex items-center justify-center rounded transition-colors"
              style={{ background: 'transparent' }}
              onMouseEnter={e => e.currentTarget.style.background = green ? 'rgba(0,200,83,0.15)' : '#30363D'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <Icon className={`w-3.5 h-3.5 ${green ? 'text-[#00C853]' : 'text-[#8B949E]'}`} style={green ? {} : {}} />
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

  const handleRunPlaybook = () => {
    setPlaybookRun(true);
    onAction(signal.id, 'playbook');
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      />
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
      >
        <div
          className="pointer-events-auto flex flex-col overflow-hidden"
          style={{ width: 640, maxHeight: '85vh', borderRadius: 12, background: '#1C2128', border: '1px solid #30363D', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}
        >
          {/* Header */}
          <div className="px-6 py-4 shrink-0 flex items-start justify-between" style={{ borderBottom: '1px solid #30363D' }}>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-base font-bold text-[#F0F6FC]">{signal.company}</h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border" style={{ color: sev.color, borderColor: `${sev.color}50`, background: `${sev.color}15` }}>
                  {sev.label}
                </span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${status.cls}`}>
                  {status.label}
                </span>
              </div>
              <MonoValue className="text-[11px] text-[#8B949E]">{signal.id} · {signal.signalType}</MonoValue>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded transition-colors shrink-0 mt-0.5"
              style={{ color: '#8B949E' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#30363D'; e.currentTarget.style.color = '#F0F6FC'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B949E'; }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#30363D #1C2128' }}>

            {/* Signal Summary */}
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #30363D' }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C853] mb-3">Signal Summary</p>
              <div className="rounded space-y-2 p-3" style={{ background: '#0D1117', border: '1px solid #30363D' }}>
                {[
                  { label: 'TRIGGER', value: signal.triggerCondition },
                  { label: 'DATE DETECTED', value: signal.dateDetected },
                  { label: 'SEVERITY', value: <span style={{ color: sev.color }}>{sev.label}</span> },
                  { label: 'SOURCE', value: signal.source },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4">
                    <MonoValue className="text-[10px] text-[#8B949E] shrink-0">{label}</MonoValue>
                    <MonoValue className="text-[11px] text-[#F0F6FC] text-right">{value}</MonoValue>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Context */}
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #30363D' }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C853] mb-3">Account Context</p>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { icon: DollarSign, label: 'ARR', value: signal.arr },
                  { icon: User, label: 'CSM', value: signal.csm },
                  { icon: Calendar, label: 'RENEWAL', value: signal.renewal },
                  { icon: Package, label: 'PLAN', value: signal.plan },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded p-3" style={{ background: '#0D1117', border: '1px solid #30363D' }}>
                    <div className="flex items-center gap-1 mb-1">
                      <Icon className="w-3 h-3 text-[#8B949E]" />
                      <MonoValue className="text-[9px] text-[#8B949E] uppercase tracking-wide">{label}</MonoValue>
                    </div>
                    <MonoValue className="text-xs text-[#F0F6FC] font-semibold">{value}</MonoValue>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <MonoValue className="text-[10px] text-[#8B949E]">HEALTH SCORE</MonoValue>
                  <MonoValue className="text-[10px] text-[#F0F6FC]">{signal.health}/100</MonoValue>
                </div>
                <HealthBar score={signal.health} />
              </div>
            </div>

            {/* Adoption Metrics */}
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #30363D' }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C853] mb-3">Adoption Metrics</p>
              <div className="space-y-2">
                {[
                  { label: 'FEATURE / MODULE', value: signal.feature },
                  { label: 'ACTIVATION DATE', value: signal.activationDate },
                  { label: 'ACTIVE / LICENSED', value: `${signal.activeUsers} / ${signal.licensedSeats} users` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <MonoValue className="text-[10px] text-[#8B949E]">{label}</MonoValue>
                    <MonoValue className="text-[11px] text-[#F0F6FC]">{value}</MonoValue>
                  </div>
                ))}
                <div>
                  <div className="flex justify-between mb-1">
                    <MonoValue className="text-[10px] text-[#8B949E]">USAGE RATE</MonoValue>
                    <MonoValue className="text-[10px] text-[#F0F6FC]">{signal.usagePct}%</MonoValue>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#30363D' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${signal.usagePct}%`,
                        background: signal.usagePct > 80 ? '#00C853' : signal.usagePct > 40 ? '#FF9500' : '#FF3B30'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Playbook */}
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #30363D' }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C853] mb-3">Recommended Playbook</p>
              <div className="rounded p-4" style={{ background: '#0D1117', border: '1px solid #00C85330' }}>
                <MonoValue className="text-xs text-[#F0F6FC] font-bold block mb-3">{signal.playbookName}</MonoValue>
                <div className="space-y-2">
                  {signal.playbookSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono"
                        style={{ background: '#00C85320', color: '#00C853', border: '1px solid #00C85340' }}
                      >{i + 1}</span>
                      <MonoValue className="text-[11px] text-[#8B949E] leading-snug">{step}</MonoValue>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="px-6 py-4">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00C853] mb-3">Activity Log</p>
              <div className="space-y-2">
                {playbookRun && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#00C853' }} />
                    <div>
                      <MonoValue className="text-[11px] text-[#F0F6FC] block">Playbook "{signal.playbookName}" triggered</MonoValue>
                      <MonoValue className="text-[10px] text-[#8B949E]">Just now</MonoValue>
                    </div>
                  </div>
                )}
                {signal.activityLog.length > 0 ? signal.activityLog.map((entry, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#30363D' }} />
                    <div>
                      <MonoValue className="text-[11px] text-[#8B949E] block">{entry.action}</MonoValue>
                      <MonoValue className="text-[10px] text-[#8B949E]/60">{entry.date}</MonoValue>
                    </div>
                  </div>
                )) : !playbookRun && (
                  <MonoValue className="text-[11px] text-[#8B949E]/60 italic">No actions taken yet.</MonoValue>
                )}
              </div>
            </div>
          </div>

          {/* Sticky bottom action bar */}
          <div className="px-6 py-4 shrink-0" style={{ borderTop: '1px solid #30363D', background: '#161B22' }}>
            {playbookRun ? (
              <div className="flex items-center gap-2" style={{ color: '#00C853' }}>
                <CheckCircle className="w-4 h-4" />
                <MonoValue className="text-sm">Playbook running — CSM notified, Salesforce task created</MonoValue>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunPlaybook}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-mono font-semibold rounded transition-colors"
                  style={{ background: '#00C853', color: '#0D1117' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#00A844'}
                  onMouseLeave={e => e.currentTarget.style.background = '#00C853'}
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> RUN PLAYBOOK
                </button>
                <button
                  onClick={() => onAction(signal.id, 'call')}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-mono rounded transition-colors"
                  style={{ background: 'transparent', border: '1px solid #30363D', color: '#8B949E' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#30363D'; e.currentTarget.style.color = '#F0F6FC'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B949E'; }}
                >
                  <Phone className="w-3.5 h-3.5" /> SCHEDULE CALL
                </button>
                <button
                  onClick={() => onAction(signal.id, 'snooze')}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-mono rounded transition-colors"
                  style={{ background: 'transparent', border: '1px solid #30363D', color: '#8B949E' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#30363D'; e.currentTarget.style.color = '#F0F6FC'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B949E'; }}
                >
                  <BellOff className="w-3.5 h-3.5" /> SNOOZE 7D
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
  const [search, setSearch] = useState('');
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [actionedIds, setActionedIds] = useState([]);

  const handleAction = (id, action) => {
    if (action === 'playbook') setActionedIds(prev => [...prev, id]);
  };

  const filtered = signals.filter(s => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'open' && s.status === 'open') ||
      (filter === 'actioned' && (s.status === 'actioned' || actionedIds.includes(s.id))) ||
      (filter === 'snoozed' && s.status === 'snoozed');
    const matchesSearch =
      !search ||
      s.company.toLowerCase().includes(search.toLowerCase()) ||
      s.signalType.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: signals.length,
    open: signals.filter(s => s.status === 'open').length,
    actioned: signals.filter(s => s.status === 'actioned' || actionedIds.includes(s.id)).length,
    snoozed: signals.filter(s => s.status === 'snoozed').length,
  };

  const filterTabs = [
    { id: 'all',      label: `ALL (${counts.all})` },
    { id: 'open',     label: `OPEN (${counts.open})` },
    { id: 'actioned', label: `ACTIONED (${counts.actioned})` },
    { id: 'snoozed',  label: `SNOOZED (${counts.snoozed})` },
  ];

  const statTiles = [
    { label: 'TOTAL SIGNALS', value: counts.all,      numColor: '#F0F6FC', topBorder: '#58A6FF' },
    { label: 'OPEN',          value: counts.open,     numColor: '#FF9500', topBorder: '#FF9500' },
    { label: 'ACTIONED',      value: counts.actioned, numColor: '#00C853', topBorder: '#00C853' },
    { label: 'SNOOZED',       value: counts.snoozed,  numColor: '#8B949E', topBorder: '#8B949E' },
  ];

  return (
    <div className="h-full">
      {/* Stats tiles */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {statTiles.map(t => (
          <div
            key={t.label}
            className="rounded px-4 py-3"
            style={{ background: '#1C2128', border: '1px solid #30363D', borderTop: `3px solid ${t.topBorder}` }}
          >
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#8B949E' }}>{t.label}</p>
            <p className="font-mono text-2xl font-bold" style={{ color: t.numColor }}>{t.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 mb-4" style={{ borderBottom: '1px solid #30363D' }}>
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className="px-4 py-2 font-mono text-xs font-semibold transition-all border-b-2 -mb-px"
            style={filter === tab.id
              ? { color: '#00C853', borderBottomColor: '#00C853' }
              : { color: '#8B949E', borderBottomColor: 'transparent' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Signal rows */}
      <div className="space-y-1.5">
        <AnimatePresence>
          {filtered.map(signal => (
            <SignalRow
              key={signal.id}
              signal={signal}
              onClick={setSelectedSignal}
              onAction={handleAction}
            />
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16 font-mono text-sm" style={{ color: '#8B949E' }}>
            NO SIGNALS MATCH THIS FILTER
          </div>
        )}
      </div>

      {selectedSignal && (
        <SignalModal
          signal={selectedSignal}
          onClose={() => setSelectedSignal(null)}
          onAction={handleAction}
        />
      )}
    </div>
  );
}
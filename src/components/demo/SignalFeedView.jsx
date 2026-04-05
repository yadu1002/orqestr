import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Phone, Mail, Clock, Eye, Search, X, CheckCircle, Calendar, User, DollarSign, Activity, Package, Play, BellOff, ChevronRight } from 'lucide-react';

const signals = [
  {
    id: 'SIG-001',
    company: 'Acme Corp',
    signalType: 'Low Feature Adoption',
    signalTypeColor: 'bg-orange-50 text-orange-700 border-orange-200',
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
    signalTypeColor: 'bg-red-50 text-red-700 border-red-200',
    severity: 'critical',
    status: 'open',
    description: '3 key users haven\'t logged in for 14 days. Engagement dropping across the account.',
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
    signalTypeColor: 'bg-green-50 text-green-700 border-green-200',
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
    signalTypeColor: 'bg-purple-50 text-purple-700 border-purple-200',
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
    signalTypeColor: 'bg-orange-50 text-orange-700 border-orange-200',
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
    signalTypeColor: 'bg-rose-50 text-rose-700 border-rose-200',
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

const severityConfig = {
  critical: { label: 'Critical', bolt: 'text-red-500', bar: 'bg-red-500' },
  high: { bolt: 'text-orange-500', bar: 'bg-orange-400' },
  medium: { bolt: 'text-yellow-500', bar: 'bg-yellow-400' },
  low: { bolt: 'text-blue-400', bar: 'bg-blue-400' },
  opportunity: { bolt: 'text-emerald-500', bar: 'bg-emerald-500' },
};

const statusConfig = {
  open: { label: 'Open', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  actioned: { label: 'Actioned', className: 'bg-green-50 text-green-700 border-green-200' },
  snoozed: { label: 'Snoozed', className: 'bg-slate-100 text-slate-600 border-slate-200' },
};

function HealthBar({ score }) {
  const color = score >= 70 ? 'bg-emerald-500' : score >= 40 ? 'bg-orange-400' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-semibold text-slate-600 w-6 text-right">{score}</span>
    </div>
  );
}

function SignalRow({ signal, onClick, onAction }) {
  const sev = severityConfig[signal.severity] || severityConfig.medium;
  const status = statusConfig[signal.status];

  const handleAction = (e, action) => {
    e.stopPropagation();
    onAction(signal.id, action);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16 }}
      onClick={() => onClick(signal)}
      className="bg-white border border-slate-200 rounded-lg px-5 py-4 cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start gap-4">
        {/* Severity bolt */}
        <div className="mt-0.5 shrink-0">
          <Zap className={`w-4 h-4 ${sev.bolt} fill-current`} />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-semibold text-slate-900">{signal.company}</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${signal.signalTypeColor}`}>
              {signal.signalType}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${status.className}`}>
              {status.label}
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-snug mb-2">{signal.description}</p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{signal.timestamp}</span>
            <span className="flex items-center gap-1"><User className="w-3 h-3" />{signal.csm}</span>
            <span className="text-slate-300 ml-auto font-mono">{signal.id}</span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => handleAction(e, 'call')}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            title="Schedule Call"
          >
            <Phone className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => handleAction(e, 'email')}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            title="Send Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => handleAction(e, 'snooze')}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            title="Snooze"
          >
            <BellOff className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClick(signal); }}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            title="View Detail"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SlideOverPanel({ signal, onClose, onAction }) {
  const [playbookRun, setPlaybookRun] = useState(false);
  if (!signal) return null;

  const sev = severityConfig[signal.severity] || severityConfig.medium;
  const status = statusConfig[signal.status];

  const handleRunPlaybook = () => {
    setPlaybookRun(true);
    onAction(signal.id, 'playbook');
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-40"
      />
      <motion.div
        key="panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h2 className="text-base font-semibold text-slate-900">{signal.company}</h2>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${signal.signalTypeColor}`}>
                {signal.signalType}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${status.className}`}>
                {status.label}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{signal.id}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors mt-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Signal Summary */}
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Signal Summary</h3>
            <div className="bg-slate-50 rounded-lg p-4 space-y-2.5">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs text-slate-500">Trigger</span>
                <span className="text-xs font-medium text-slate-800 text-right max-w-[240px]">{signal.triggerCondition}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs text-slate-500">Date Detected</span>
                <span className="text-xs font-medium text-slate-800">{signal.dateDetected}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs text-slate-500">Severity</span>
                <span className="flex items-center gap-1">
                  <Zap className={`w-3 h-3 ${sev.bolt} fill-current`} />
                  <span className="text-xs font-medium text-slate-800 capitalize">{signal.severity}</span>
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs text-slate-500">Source</span>
                <span className="text-xs font-medium text-slate-800">{signal.source}</span>
              </div>
            </div>
          </div>

          {/* Account Context */}
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Account Context</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: DollarSign, label: 'ARR', value: signal.arr },
                { icon: User, label: 'CSM', value: signal.csm },
                { icon: Calendar, label: 'Renewal', value: signal.renewal },
                { icon: Package, label: 'Plan', value: signal.plan },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">{label}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-slate-500">Health Score</span>
                <span className="text-xs font-semibold text-slate-800">{signal.health}/100</span>
              </div>
              <HealthBar score={signal.health} />
            </div>
          </div>

          {/* Adoption Metrics */}
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Adoption Metrics</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Feature / Module</span>
                <span className="text-xs font-medium text-slate-800">{signal.feature}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Activation Date</span>
                <span className="text-xs font-medium text-slate-800">{signal.activationDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Active / Licensed Seats</span>
                <span className="text-xs font-medium text-slate-800">{signal.activeUsers} / {signal.licensedSeats} users</span>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-500">Usage Rate</span>
                  <span className="text-xs font-semibold text-slate-800">{signal.usagePct}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${signal.usagePct > 80 ? 'bg-emerald-500' : signal.usagePct > 40 ? 'bg-orange-400' : 'bg-red-500'}`}
                    style={{ width: `${signal.usagePct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Playbook */}
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Recommended Playbook</h3>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-slate-800 mb-3">{signal.playbookName}</p>
              <div className="space-y-2">
                {signal.playbookSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-xs text-slate-600 leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="px-6 py-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Activity Log</h3>
            {playbookRun ? (
              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-600">Playbook "{signal.playbookName}" triggered</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Just now</p>
                  </div>
                </div>
                {signal.activityLog.map((entry, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600">{entry.action}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : signal.activityLog.length > 0 ? (
              <div className="space-y-2">
                {signal.activityLog.map((entry, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600">{entry.action}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No actions taken yet.</p>
            )}
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 shrink-0">
          {playbookRun ? (
            <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Playbook running — CSM notified, Salesforce task created
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunPlaybook}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Run Playbook
              </button>
              <button
                onClick={() => onAction(signal.id, 'call')}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> Schedule Call
              </button>
              <button
                onClick={() => onAction(signal.id, 'snooze')}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                <BellOff className="w-3.5 h-3.5" /> Snooze 7d
              </button>
            </div>
          )}
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
    if (action === 'playbook') {
      setActionedIds(prev => [...prev, id]);
    }
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
    { id: 'all', label: `All (${counts.all})` },
    { id: 'open', label: `Open (${counts.open})` },
    { id: 'actioned', label: `Actioned (${counts.actioned})` },
    { id: 'snoozed', label: `Snoozed (${counts.snoozed})` },
  ];

  return (
    <div className="h-full">
      {/* Page header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">Signals</h1>
          <p className="text-sm text-slate-500 mt-0.5">Customer adoption signals requiring action</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-44"
            placeholder="Search signals..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Signals', value: counts.all, color: 'text-slate-800' },
          { label: 'Open', value: counts.open, color: 'text-blue-700' },
          { label: 'Actioned', value: counts.actioned, color: 'text-emerald-700' },
          { label: 'Snoozed', value: counts.snoozed, color: 'text-slate-500' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 border-b border-slate-200">
        {filterTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              filter === tab.id
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Signal rows */}
      <div className="space-y-2">
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
          <div className="text-center py-16 text-slate-400 text-sm">No signals match this filter</div>
        )}
      </div>

      {/* Slide-over panel */}
      {selectedSignal && (
        <SlideOverPanel
          signal={selectedSignal}
          onClose={() => setSelectedSignal(null)}
          onAction={handleAction}
        />
      )}
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const signalTrend = [
  { month: 'Nov', churn: 8, expansion: 3, feature: 5 },
  { month: 'Dec', churn: 11, expansion: 4, feature: 7 },
  { month: 'Jan', churn: 14, expansion: 5, feature: 9 },
  { month: 'Feb', churn: 9, expansion: 7, feature: 6 },
  { month: 'Mar', churn: 12, expansion: 8, feature: 11 },
  { month: 'Apr', churn: 7, expansion: 6, feature: 8 },
];

const timeToAction = [
  { week: 'W1', before: 4.2, after: 0.6 },
  { week: 'W2', before: 3.8, after: 0.5 },
  { week: 'W3', before: 5.1, after: 0.7 },
  { week: 'W4', before: 4.4, after: 0.4 },
  { week: 'W5', before: 3.9, after: 0.6 },
  { week: 'W6', before: 4.7, after: 0.5 },
];

const playbookPerformance = [
  { name: 'Feature Adoption', fired: 34, completed: 28, rate: 82 },
  { name: 'Churn Risk', fired: 19, completed: 14, rate: 73 },
  { name: 'Renewal Risk', fired: 11, completed: 9, rate: 91 },
  { name: 'Expansion', fired: 8, completed: 6, rate: 75 },
];

const kpiStats = [
  { label: 'MEAN TIME TO ACTION', value: '0.5 days', sub: 'Down from 4.2 days', trend: '↓ 88%', numColor: '#15803d', topColor: '#16a34a' },
  { label: 'SIGNALS DETECTED (30D)', value: '72', sub: 'Across 6 signal types', trend: '↑ 24%', numColor: '#1d4ed8', topColor: '#3b82f6' },
  { label: 'PLAYBOOK COMPLETION', value: '84%', sub: 'Avg across all playbooks', trend: '↑ 11%', numColor: '#1d4ed8', topColor: '#3b82f6' },
  { label: 'ARR PROTECTED', value: '$340k', sub: 'From churn prevention', trend: 'This quarter', numColor: '#15803d', topColor: '#16a34a' },
];

const donuts = [
  { label: 'FEATURE ADOPTION RATE', pct: 72, color: '#3b82f6' },
  { label: 'PLAYBOOK COMPLETION RATE', pct: 68, color: '#3b82f6' },
  { label: 'AT-RISK ACCOUNT RATIO', pct: 35, color: '#f97316' },
  { label: 'EXPANSION COVERAGE', pct: 24, color: '#3b82f6' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

function DonutChart({ pct, color, label }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: 96, height: 96 }}>
        <svg width="96" height="96" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="48" cy="48" r={r} fill="none" stroke="#E5E7EB" strokeWidth="10" />
          <circle
            cx="48" cy="48" r={r} fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>{pct}%</span>
        </div>
      </div>
      <p style={{ marginTop: 10, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151', textAlign: 'center' }}>{label}</p>
    </div>
  );
}

export default function AnalyticsView() {
  return (
    <div className="space-y-5">
      {/* KPI stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {kpiStats.map(t => (
          <div key={t.label} style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', borderTop: `3px solid ${t.topColor}`, borderRadius: 8, padding: 20 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151', marginBottom: 8 }}>{t.label}</p>
            <p style={{ fontSize: 26, fontWeight: 700, color: t.numColor, lineHeight: 1 }}>{t.value}</p>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 10, color: '#6b7280' }}>{t.sub}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: t.numColor }}>{t.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Donut charts row */}
      <div className="grid grid-cols-4 gap-3">
        {donuts.map(d => <DonutChart key={d.label} {...d} />)}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-white border border-border p-5">
          <p className="text-sm font-semibold text-foreground mb-1">Signal Volume by Type</p>
          <p className="text-xs text-muted-foreground mb-4">Monthly detection trends</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={signalTrend}>
              <defs>
                <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="featGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="churn" name="Churn Risk" stroke="#ef4444" fill="url(#churnGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="expansion" name="Expansion" stroke="#16a34a" fill="url(#expGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="feature" name="Feature Gap" stroke="#f59e0b" fill="url(#featGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white border border-border p-5">
          <p className="text-sm font-semibold text-foreground mb-1">Mean Time to Action</p>
          <p className="text-xs text-muted-foreground mb-4">Days from signal to response (before vs. after Orqestr)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={timeToAction} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="week" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} unit="d" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="before" name="Before" fill="rgba(239,68,68,0.4)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="after" name="After Orqestr" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Playbook performance table */}
      <div className="rounded-lg bg-white border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Playbook Performance</p>
          <p className="text-xs text-muted-foreground mt-0.5">Last 30 days</p>
        </div>
        <div className="grid grid-cols-[2fr_1fr_1fr_2fr] gap-4 px-5 py-2.5 border-b border-border bg-white">
          {['PLAYBOOK', 'FIRED', 'COMPLETION', 'PROGRESS'].map(h => (
            <p key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#374151' }}>{h}</p>
          ))}
        </div>
        <div className="divide-y divide-border">
          {playbookPerformance.map((pb, i) => (
            <motion.div
              key={pb.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.06 }}
              className="grid grid-cols-[2fr_1fr_1fr_2fr] gap-4 px-5 py-3.5 items-center hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm text-foreground">{pb.name}</p>
              <p className="text-sm text-muted-foreground">{pb.fired}</p>
              <p className="text-sm font-semibold" style={{ color: '#15803d' }}>{pb.rate}%</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#E5E7EB' }}>
                  <div className="h-full rounded-full" style={{ width: `${pb.rate}%`, background: '#3b82f6' }} />
                </div>
                <span className="text-[10px] text-muted-foreground">{pb.completed}/{pb.fired}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}